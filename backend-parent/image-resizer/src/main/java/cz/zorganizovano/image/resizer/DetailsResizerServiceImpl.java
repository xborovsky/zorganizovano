package cz.zorganizovano.image.resizer;

import static cz.zorganizovano.image.resizer.ResizerService.SRC_FOLDER;
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
import org.apache.commons.io.FilenameUtils;
import org.imgscalr.Scalr;

public class DetailsResizerServiceImpl extends ResizerService {

    private static final String DEST_FOLDER_DETAILS = "D:\\Temp\\zorganizovano\\images\\products-details-resized";
    private static final int[] SUPPORTED_WIDTHS = { 200, 600, 900, 1200, 1536, 2000 };
    
    private final ExecutorService executorService;
    
    public DetailsResizerServiceImpl(ExecutorService executorService) {
        this.executorService = executorService;
    }
    
    @Override
    public void scaleImages() throws IOException {
        System.out.println("------------- generateProductDetailsImages -------------");
        cleanupDir(DEST_FOLDER_DETAILS);

        Set<Path> imagePaths = Files.list(Paths.get(SRC_FOLDER)).collect(Collectors.toSet());
        for (Path path : imagePaths) {
            for (int targetWidth : SUPPORTED_WIDTHS) {
                executorService.execute(() -> {
                    File image = path.toFile();
                    try {
                        System.out.println("Resizing for product details view for width (" + targetWidth + "px): " + image.getName());
                        BufferedImage scaledImage = scaleToWidth(
                                ImageIO.read(image),
                                targetWidth
                        );

                        ImageIO.write(
                                scaledImage, 
                                getFileExtension(image),
                                new File(buildDestImagePath(image, targetWidth))
                        );
                    } catch (IOException e) {
                        System.err.println(image.getName() + " could not be resized and is skipped!!!");
                    }
                });
            }
        }

        System.out.println("------------- generateProductDetailsImages DONE! -------------");
    }

    private BufferedImage scaleToWidth(BufferedImage img, int width) {
        BufferedImage scaledImage = img;

        if (img.getWidth()> width) {
            scaledImage = Scalr.resize(img, Scalr.Method.ULTRA_QUALITY, Scalr.Mode.FIT_TO_WIDTH, width);
        }

        return scaledImage;
    }
    
    private String buildDestImagePath(File image, int targetWidth) {
        return new StringBuilder(DEST_FOLDER_DETAILS)
                .append(File.separator)
                .append(FilenameUtils.removeExtension(image.getName()))
                .append("_w")
                .append(targetWidth)
                .append(".")
                .append(getFileExtension(image))
                .toString();
    }
    
}
