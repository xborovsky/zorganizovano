package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.dao.ClientErrorDao;
import cz.zorganizovano.backend.entity.ClientError;
import cz.zorganizovano.backend.manager.TimeManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClientErrorServiceImpl implements ClientErrorService {

    @Autowired
    private TimeManager timeManager;
    @Autowired
    private ClientErrorDao clientErrorDao;

    @Override
    @Transactional
    public void create(String error, String browser) {
        ClientError clientError = new ClientError();
        clientError.setError(error);
        clientError.setBrowser(browser);
        clientError.setTimestamp(timeManager.getCurrentDate());

        clientErrorDao.save(clientError);
    }

}
