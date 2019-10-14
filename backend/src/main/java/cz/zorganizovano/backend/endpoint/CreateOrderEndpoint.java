package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.CustomerBean;
import cz.zorganizovano.backend.delivery.DeliveryOptions;
import javax.validation.Valid;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order/new")
@Validated
public class CreateOrderEndpoint {

    @PostMapping("/customer")
    public void validateCustomer(@Valid @RequestBody CustomerBean customer) {
        // TODO
    }

    @GetMapping("/delivery-options")
    public DeliveryOptions[] getDeliveryOptions() {
        return DeliveryOptions.values();
    }

}
