package cz.zorganizovano.imageserver.service;

import java.awt.image.BufferedImage;

public interface ImageService {

    double DEFAULT_WIDTH_PCT = 100d;
    double DEFAULT_DPR = 1d;

    BufferedImage scale(BufferedImage img, int screenWidth, double widthPct, double dpr);

}
