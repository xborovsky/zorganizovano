package cz.zorganizovano.backend.endpoint;

import com.google.common.collect.ImmutableMap;
import com.google.i18n.phonenumbers.PhoneNumberUtil;
import com.google.i18n.phonenumbers.Phonenumber.PhoneNumber;
import cz.zorganizovano.backend.bean.CustomValidationError;
import cz.zorganizovano.backend.bean.admin.order.DeliveryOptionsRequest;
import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.bean.order.OrderCreatedDTO;
import cz.zorganizovano.backend.bean.order.OrderFormBean;
import cz.zorganizovano.backend.bean.order.OrderSuccessResponse;
import cz.zorganizovano.backend.dao.StockItemDao;
import cz.zorganizovano.backend.entity.ShipmentCountry;
import cz.zorganizovano.backend.entity.ShipmentType;
import cz.zorganizovano.backend.entity.StockItem;
import cz.zorganizovano.backend.event.OrderCreatedEvent;
import cz.zorganizovano.backend.payment.PaymentInfo;
import cz.zorganizovano.backend.service.OrderService;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
@Validated
public class OrderEndpoint {

    private static final Logger LOG = LoggerFactory.getLogger(OrderEndpoint.class);

    @Autowired
    private OrderService orderService;
    @Autowired
    private ApplicationEventPublisher eventPublisher;
    @Autowired
    private StockItemDao stockItemDao;

    @PostMapping("/customer")
    public ResponseEntity<?> validateCustomer(@Valid @RequestBody CustomerInfo customer) {
        // dodatecne validovat tel. cislo
        try {
            PhoneNumber phoneNo = new PhoneNumber();
            phoneNo.setCountryCode(Integer.parseInt(customer.getPhoneNoCode()));
            phoneNo.setNationalNumber(Long.parseLong(customer.getPhoneNo()));
            if (!PhoneNumberUtil.getInstance().isValidNumber(phoneNo)) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new CustomValidationError(ImmutableMap.of("phoneNo", "Telefonní číslo není platné.")));
            }
        } catch (NumberFormatException e) {
            LOG.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new CustomValidationError(ImmutableMap.of("phoneNo", "Telefonní číslo není platné.")));
        }

        return ResponseEntity.ok().build();
    }

    @Cacheable("delivery-countries")
    @GetMapping("/delivery-countries")
    public ShipmentCountry[] getDeliveryCountries() {
        return ShipmentCountry.values();
    }

    @PostMapping("/delivery-options")
    public List<ShipmentType> getDeliveryOptions(@RequestBody DeliveryOptionsRequest request) {
        boolean showOnlineShipmentOption = true;
        for (long orderItemId : request.getOrderItemIds()) {
            Optional<StockItem> stockItem = stockItemDao.findById(orderItemId);
            if (stockItem.isPresent() && !stockItem.get().isEnableOnlineShipment()) {
                showOnlineShipmentOption = false;
            }
        }

        if (showOnlineShipmentOption) {
            return ShipmentType.getShipmentTypesByDeliveryCountry(request.getSelectedCountry()).stream()
                    .collect(Collectors.toList());
        }

        return ShipmentType.getShipmentTypesByDeliveryCountry(request.getSelectedCountry()).stream()
                .filter(shipmentType -> shipmentType != ShipmentType.ONLINE)
                .collect(Collectors.toList());
    }

    @PostMapping("/confirm")
    public OrderSuccessResponse createOrder(@Valid @RequestBody OrderFormBean order) {
        LOG.info("Create order handler", order);
        OrderCreatedDTO created = orderService.createOrder(
                order.getCustomerInfo(),
                order.getShippingAddress(),
                order.getShoppingCart(),
                order.getShipmentType(),
                order.getDiscountCode()
        );

        PaymentInfo paymentInfo = new PaymentInfo(
                String.valueOf(created.getOrder().getOrderNum()),
                created.getTotalPrice(),
                new Date()
        );

        eventPublisher.publishEvent(
                new OrderCreatedEvent(
                        created.getOrder(),
                        created.getOrderItems(),
                        paymentInfo,
                        order.getShipmentType(),
                        created.getShippingAddress(),
                        order.getCustomerInfo()
                )
        );

        LOG.info("Order successfully created.");

        return new OrderSuccessResponse(created.getOrder().getOrderNum(), paymentInfo);
    }

}
