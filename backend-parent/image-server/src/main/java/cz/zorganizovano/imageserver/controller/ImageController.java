package cz.zorganizovano.imageserver.controller;

import cz.zorganizovano.imageserver.service.ImageService;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import javax.activation.MimetypesFileTypeMap;
import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.MatrixVariable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/img")
public class ImageController {
    private static final Logger LOG = LoggerFactory.getLogger(ImageController.class);

    private File imagesFolder;
    private final MimetypesFileTypeMap fileTypeMap = new MimetypesFileTypeMap();

    @Autowired
    private ImageService imageService;

    @PostConstruct
    public void init() {
        try {
            imagesFolder = ResourceUtils.getFile("classpath:images");
        } catch (FileNotFoundException e) {
            throw new IllegalStateException(e);
        }
    }

    @GetMapping("/{imageName}/{screenWidth}")
    public ResponseEntity<byte[]> getImage(
        @PathVariable("imageName") String imageName,
        @PathVariable("screenWidth") int screenWidth,
        @MatrixVariable Map<String, String> matrixConfig) throws IOException {

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
        ImageIO.write(scaledImage, getFileExtenstion(image), baos);

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(fileTypeMap.getContentType(image.getName())))
            .cacheControl(CacheControl.maxAge(1, TimeUnit.DAYS))
            .body(baos.toByteArray());
    }

    protected String getFileExtenstion(File file) {
        String fileName = file.getName();
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }

}
