package dto;

import model.annotation.ImageEntity;

import java.util.List;

public class ProjectDTO {

    private Long id;

    private String name;

    private Long userId;

    private List<ImageEntity> images;

    private List<Long> userIDsAllowed;

    private String createdByUser;

    public ProjectDTO(Long id,String name, Long userId, List<ImageEntity> images, List<Long> userIDsAllowed,String createdByUser) {
        this.id=id;
        this.name = name;
        this.userId = userId;
        this.images = images;
        this.userIDsAllowed = userIDsAllowed;
        this.createdByUser=createdByUser;
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

    public List<Long> getUserIDsAllowed() {
        return userIDsAllowed;
    }

    public void setUserIDsAllowed(List<Long> userIDsAllowed) {
        this.userIDsAllowed = userIDsAllowed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCreatedByUser() {
        return createdByUser;
    }

    public void setCreatedByUser(String createdByUser) {
        this.createdByUser = createdByUser;
    }
}
