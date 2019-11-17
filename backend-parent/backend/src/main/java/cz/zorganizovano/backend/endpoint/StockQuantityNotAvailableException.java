package cz.zorganizovano.backend.endpoint;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.EXPECTATION_FAILED)
public class StockQuantityNotAvailableException extends RuntimeException {
    public StockQuantityNotAvailableException() {
        super();
    }
    public StockQuantityNotAvailableException(String message, Throwable cause) {
        super(message, cause);
    }
    public StockQuantityNotAvailableException(String message) {
        super(message);
    }
    public StockQuantityNotAvailableException(Throwable cause) {
        super(cause);
    }
}
