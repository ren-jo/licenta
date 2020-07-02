package model.forum;

import javax.persistence.*;
import java.util.List;

@Entity
public class Topic {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String userName;
    private String description;
    private String fullDescription;

    @OneToOne(fetch=FetchType.EAGER,cascade=CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="category_id")
    private Category category;

    @OneToMany(fetch=FetchType.EAGER,cascade=CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="topic_id")
    private List<Reply> replies;

    public Topic() {
    }

    public Topic(String userName, String description, String fullDescription, Category category, List<Reply> replies) {
        this.userName = userName;
        this.description = description;
        this.fullDescription = fullDescription;
        this.category = category;
        this.replies = replies;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFullDescription() {
        return fullDescription;
    }

    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Reply> getReplies() {
        return replies;
    }

    public void setReplies(List<Reply> replies) {
        this.replies = replies;
    }
}
