package model.annotation;

import javax.persistence.*;
import java.util.List;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private Long userId;

    @OneToMany(fetch=FetchType.EAGER,cascade= CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="project_ID")
    private List<ImageEntity> images;

    private String userIDsAllowed;

    public Project() {
    }

    //used with existing instance (project id not null)
    public Project(Long id,String name, Long userId, List<ImageEntity> images,String userIDsAllowed) {
        this.images = images;
        this.name=name;
        this.userId=userId;
        this.userIDsAllowed=userIDsAllowed;
        this.id=id;
    }

    //when new instance is created
    public Project(String name, Long userId, List<ImageEntity> images,String userIDsAllowed) {
        this.images = images;
        this.name=name;
        this.userId=userId;
        this.userIDsAllowed=userIDsAllowed;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<ImageEntity> getImages() {
        return images;
    }

    public void setImages(List<ImageEntity> images) {
        this.images = images;
    }

    public String getUserIDsAllowed() {
        return userIDsAllowed;
    }

    public void setUserIDsAllowed(String userIDsAllowed) {
        this.userIDsAllowed = userIDsAllowed;
    }

    public long getId() {
        return id;
    }
}
