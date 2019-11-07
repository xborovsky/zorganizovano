package cz.zorganizovano.backend.bean.blog;

import cz.zorganizovano.backend.entity.BlogPost;

public class BlogPostTitlePicture {

    private final String src;
    private final String srcSet;
    
    public BlogPostTitlePicture(BlogPost blogPost) {
        this.src = blogPost.getTitlePhotoSrc();
        this.srcSet = blogPost.getTitlePhotoSrcSet();
    }

    public String getSrc() {
        return src;
    }

    public String getSrcSet() {
        return srcSet;
    }
    
    
    
}
