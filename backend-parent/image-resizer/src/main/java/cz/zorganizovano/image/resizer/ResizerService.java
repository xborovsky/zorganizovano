package cz.zorganizovano.image.resizer;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.apache.commons.io.FilenameUtils;

public abstract class ResizerService {

    public static final String SRC_FOLDER = "D:\\Temp\\zorganizovano\\images\\products";

    public abstract void scaleImages() throws IOException;
    
    protected String getFileExtension(File file) {
        return FilenameUtils.getExtension(file.getName());
    }
    
    protected void cleanupDir(String dir) throws IOException {
        Files.list(Paths.get(dir)).map(Path::toFile).forEach(File::delete);
    }

}

