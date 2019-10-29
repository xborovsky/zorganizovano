package cz.zorganizovano.backend.bean.blog;

import cz.zorganizovano.backend.util.DateFormatter;
import java.util.Date;

public class BlogPostPreview {

    private long id;
    private Date published;
    private String title;
    private String contentPreview;

    public BlogPostPreview(long id, Date published, String title, String contentPreview) {
        this.id = id;
        this.published = published;
        this.title = title;
        this.contentPreview = contentPreview;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getPublished() {
        return published;
    }

    public void setPublished(Date published) {
        this.published = published;
    }

    public String getPublishedFormatted() {
        return DateFormatter.formatDate(published);
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContentPreview() {
        return contentPreview;
    }

    public void setContentPreview(String contentPreview) {
        this.contentPreview = contentPreview;
    }

}
