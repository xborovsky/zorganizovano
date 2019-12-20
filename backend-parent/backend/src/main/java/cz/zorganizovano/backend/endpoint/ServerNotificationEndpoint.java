package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.dao.ServerNotificationDao;
import cz.zorganizovano.backend.entity.ServerNotification;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/server-notification")
public class ServerNotificationEndpoint {

    @Autowired
    private ServerNotificationDao serverNotificationDao;

    @GetMapping
    public String getServerNotification() {
        Optional<ServerNotification> notification = serverNotificationDao.findFirstByOrderByIdDesc();

        if (!notification.isPresent()) {
            throw new ResourceNotFoundException();
        }

        return notification.get().getText();
    }

}
