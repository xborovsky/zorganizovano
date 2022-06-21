package cz.zorganizovano.image.resizer;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.stream.Collectors;
import javax.imageio.ImageIO;
import org.imgscalr.Scalr;

public class ListResizerServiceImpl extends ResizerService {
    
    private static final String DEST_FOLDER = "D:\\Temp\\zorganizovano\\images\\products-resized";
    private static final int PRODUCT_LIST_IMG_HEIGHT_PX = 200;
    
    private final ExecutorService executorService;
    
    public ListResizerServiceImpl(ExecutorService executorService) {
        this.executorService = executorService;
    }

    @Override
    public void scaleImages() throws IOException {
        System.out.println("------------- generateProductImages -------------");
        cleanupDir(DEST_FOLDER);

        Set<Path> imagePaths = Files.list(Paths.get(SRC_FOLDER)).collect(Collectors.toSet());
        for (Path path : imagePaths) {
            executorService.execute(() -> {
                File image = path.toFile();
                try {
                    System.out.println("Resizing for product list view: " + image.getName());
                    BufferedImage scaledImage = scaleToHeight(
                            ImageIO.read(image),
                            PRODUCT_LIST_IMG_HEIGHT_PX
                    );

                    ImageIO.write(scaledImage, getFileExtension(image), new File(DEST_FOLDER + File.separator + image.getName()));
                } catch (IOException e) {
                    System.err.println(image.getName() + " could not be resized and is skipped!!!");
                }
            });
        }

        System.out.println("------------- generateProductImages DONE! -------------");
    }
    
    private BufferedImage scaleToHeight(BufferedImage img, int height) {
        BufferedImage scaledImage = img;

        if (img.getHeight() > height) {
            scaledImage = Scalr.resize(img, Scalr.Method.ULTRA_QUALITY, Scalr.Mode.FIT_TO_HEIGHT, height);
        }

        return scaledImage;
    }
}
