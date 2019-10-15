package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.CustomerBean;
import cz.zorganizovano.backend.entity.ShipmentType;
import javax.validation.Valid;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class OrderEndpoint {

    @PostMapping("/customer")
    public void validateCustomer(@Valid @RequestBody CustomerBean customer) {
        // TODO
    }

    @GetMapping("/delivery-options")
    public ShipmentType[] getDeliveryOptions() {
        return ShipmentType.values();
    }

}
