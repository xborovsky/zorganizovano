package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.blog.BlogPostPreview;
import cz.zorganizovano.backend.bean.blog.BlogPostTitlePicture;
import cz.zorganizovano.backend.dao.BlogPostDao;
import cz.zorganizovano.backend.entity.BlogPost;
import java.text.MessageFormat;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/blog/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class BlogPostEnpoint {

    @Autowired
    private BlogPostDao blogPostDao;

    @GetMapping
    public List<BlogPostPreview> getAllBlogPosts() {
        return blogPostDao.findBlogPosts();
    }

    @GetMapping("/{id}")
    public BlogPost getBlogPost(@PathVariable("id") Long id) {
        return blogPostDao.findById(id)
            .orElseThrow(() ->
                new IllegalArgumentException(MessageFormat.format("Blog post id={0} not found!", id))
            );
    }

    @GetMapping("/{id}/title-picture")
    public BlogPostTitlePicture getBlogPostTitlePicture(@PathVariable("id") Long id) {
        BlogPost blogPost = getBlogPost(id);
        return new BlogPostTitlePicture(blogPost);
    }

}
