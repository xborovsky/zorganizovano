package cz.zorganizovano.backend.entity;

import cz.zorganizovano.backend.util.DateFormatter;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "blog_posts")
public class BlogPost implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Temporal(TemporalType.DATE)
    @Column(name = "published", nullable = false)
    private Date published;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "content_preview", nullable = false, columnDefinition = "TEXT")
    private String contentPreview;
    @Column(name = "content", nullable = false, columnDefinition = "MEDIUMTEXT")
    private String content;
    @Column(name = "title_photo", nullable = false)
    private String titlePhoto;
    @Column(name = "link_href", nullable = true)
    private String linkHref;
    @Column(name = "link_content", nullable = true, columnDefinition = "TEXT")
    private String linkContent;
    @Column(name = "meta_title", columnDefinition = "TEXT")
    private String metaTitle;

    public BlogPost() {
    }

    public BlogPost(long id) {
        this.id = id;
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

    public String getPublishedFormatted() {
        return DateFormatter.formatDate(published);
    }

    public void setPublished(Date published) {
        this.published = published;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitlePhoto() {
        return titlePhoto;
    }

    public void setTitlePhoto(String titlePhoto) {
        this.titlePhoto = titlePhoto;
    }

    public String getLinkHref() {
        return linkHref;
    }

    public void setLinkHref(String linkHref) {
        this.linkHref = linkHref;
    }

    public String getLinkContent() {
        return linkContent;
    }

    public void setLinkContent(String linkContent) {
        this.linkContent = linkContent;
    }

    public String getMetaTitle() {
        return metaTitle;
    }

    public void setMetaTitle(String metaTitle) {
        this.metaTitle = metaTitle;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 29 * hash + (int) (this.id ^ (this.id >>> 32));
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final BlogPost other = (BlogPost) obj;
        if (this.id != other.id) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "BlogPost{" + "id=" + id + ", published=" + published + ", title=" + title + '}';
    }

}
