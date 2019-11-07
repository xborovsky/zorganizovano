package cz.zorganizovano.backend.service;

import java.io.IOException;

public interface GoogleRecaptchaVerifier {

    boolean isValid(String clientCaptcha) throws IOException;

}
