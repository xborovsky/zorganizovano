package cz.zorganizovano.image.resizer;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ImageResizer {

    private static final ExecutorService executorService = Executors.newFixedThreadPool(8);
    
    public static void main(String[] args) throws IOException {
        ResizerService productListResizer = new ListResizerServiceImpl(executorService);
        ResizerService productDetailsResizer = new DetailsResizerServiceImpl(executorService);
        
        //productListResizer.scaleImages();
        productDetailsResizer.scaleImages();
        
        executorService.shutdown();
    }

}
