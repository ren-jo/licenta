package model.annotation;

import javax.persistence.*;

@Entity
public class ImageEntity {

    public ImageEntity() {};

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String postedBy;

    private String date;

    private boolean isVerified;

    @Lob
    private String data;



    public ImageEntity(Long id, String name, String postedBy, String date, boolean isVerified, String data) {
        this.id = id;
        this.name = name;
        this.postedBy = postedBy;
        this.date = date;
        this.isVerified = isVerified;
        this.data = data;
    }

    public String getName() {
        return name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(String postedBy) {
        this.postedBy = postedBy;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean getIsVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}