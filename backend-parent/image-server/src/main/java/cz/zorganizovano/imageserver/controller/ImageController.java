package cz.zorganizovano.imageserver.controller;

import cz.zorganizovano.imageserver.service.ImageService;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import javax.activation.MimetypesFileTypeMap;
import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.MatrixVariable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/img")
public class ImageController {

    private static final Logger LOG = LoggerFactory.getLogger(ImageController.class);

    @Value("${images.folder.location}")
    private String imagesFolderLocation;
    private File imagesFolder;
    private final MimetypesFileTypeMap fileTypeMap = new MimetypesFileTypeMap();
    
    private final ExecutorService executor = Executors.newFixedThreadPool(10);

    @Autowired
    private ImageService imageService;

    @PostConstruct
    public void init() {
        imagesFolder = new File(imagesFolderLocation);
        if (!imagesFolder.exists()) {
            throw new IllegalStateException(
                MessageFormat.format("{0} folder does not exist!", imagesFolder.getAbsolutePath())
            );
        }
    }

    @GetMapping("/products/{imageName}/{height}")
    public CompletableFuture<ResponseEntity<byte[]>> getProductImage(
            @PathVariable("imageName") String imageName,
            @PathVariable("height") int height) {
        return getImage("products/" + imageName, height);
    }

    @GetMapping("/blog/{imageName}/{screenWidth}")
    public ResponseEntity<byte[]> getBlogImage(
            @PathVariable("imageName") String imageName,
            @PathVariable("screenWidth") int screenWidth,
            @MatrixVariable Map<String, String> matrixConfig) throws IOException {

        return getImage("blog/" + imageName, screenWidth, matrixConfig);
    }

    @GetMapping("/other/{imageName}/{screenWidth}")
    public ResponseEntity<byte[]> getOtherImage(
            @PathVariable("imageName") String imageName,
            @PathVariable("screenWidth") int screenWidth,
            @MatrixVariable Map<String, String> matrixConfig) throws IOException {

        return getImage("other/" + imageName, screenWidth, matrixConfig);
    }

    public ResponseEntity<byte[]> getImage(String imageName, int screenWidth, Map<String, String> matrixConfig) throws IOException {
        LOG.info(
            MessageFormat.format(
                "Get image imageName={0}, screenWidth={1}, matrixConfig={2}",
                imageName, screenWidth, matrixConfig
            )
        );

        File image = new File(imagesFolder.getPath() + File.separator + imageName);
        if (!image.exists()) {
            LOG.warn(MessageFormat.format("Image {0} not found!", image.getPath()));
            return ResponseEntity.notFound().build();
        }

        BufferedImage scaledImage = imageService.scale(
                ImageIO.read(image),
                screenWidth,
                matrixConfig.get("widthPct") == null ? ImageService.DEFAULT_WIDTH_PCT : Double.valueOf(matrixConfig.get("widthPct")),
                matrixConfig.get("dpr") == null ? ImageService.DEFAULT_DPR : Double.valueOf(matrixConfig.get("dpr"))
        );

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(scaledImage, getFileExtension(image), baos);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(fileTypeMap.getContentType(image.getName())))
                .cacheControl(CacheControl.maxAge(30, TimeUnit.DAYS))
                .body(baos.toByteArray());
    }

    public CompletableFuture<ResponseEntity<byte[]>> getImage(String imageName, int height) {
        return CompletableFuture.supplyAsync(() -> {
            LOG.info(
                MessageFormat.format(
                    "Get image imageName={0}, height={1}",
                    imageName, height
                )
            );

            File image = new File(imagesFolder.getPath() + File.separator + imageName);
            if (!image.exists()) {
                LOG.warn(MessageFormat.format("Image {0} not found!", image.getPath()));
                return ResponseEntity.notFound().build();
            }

            try {
                BufferedImage scaledImage = imageService.scale(
                        ImageIO.read(image),
                        height
                );

                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                ImageIO.write(scaledImage, getFileExtension(image), baos);

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(fileTypeMap.getContentType(image.getName())))
                        .cacheControl(CacheControl.maxAge(30, TimeUnit.DAYS))
                        .body(baos.toByteArray());
            } catch (IOException e) {
                return ResponseEntity.unprocessableEntity().body(null);
            }
        }, executor);
    }

    protected String getFileExtension(File file) {
        String fileName = file.getName();
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }

}
