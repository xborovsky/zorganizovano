package cz.zorganizovano.imageserver.service;

import java.awt.image.BufferedImage;
import org.imgscalr.Scalr;
import org.springframework.stereotype.Service;

@Service
public class ImageServiceImpl implements ImageService {

    @Override
    public BufferedImage scale(BufferedImage img, int screenWidth, double widthPct, double dpr) {
        BufferedImage scaledImage = img;
        int newWidth = (int) (screenWidth * (widthPct / 100) * dpr);

        if (img.getWidth() > newWidth)  {
            scaledImage = Scalr.resize(img, Scalr.Mode.FIT_TO_WIDTH, newWidth);
        }

        return scaledImage;
    }

}
