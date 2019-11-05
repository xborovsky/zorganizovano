package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.ClientErrorBean;
import cz.zorganizovano.backend.service.ClientErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client-error")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientErrorEndpoint {

    @Autowired
    private ClientErrorService clientErrorService;

    @PostMapping
    public void addClientError(@RequestBody ClientErrorBean errorBean) {
        clientErrorService.create(errorBean.getError(), errorBean.getBrowser());
    }

}
