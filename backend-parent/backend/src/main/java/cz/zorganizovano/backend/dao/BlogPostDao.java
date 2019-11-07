package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.bean.blog.BlogPostPreview;
import cz.zorganizovano.backend.entity.BlogPost;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BlogPostDao extends JpaRepository<BlogPost, Long> {

    @Query("SELECT new cz.zorganizovano.backend.bean.blog.BlogPostPreview(blogPost.id, blogPost.published,blogPost.title, blogPost.contentPreview) "
            + "FROM BlogPost blogPost "
            + "ORDER BY blogPost.published DESC")
    List<BlogPostPreview> findBlogPosts();

}
