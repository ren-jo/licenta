package model.annotation;

import javax.persistence.*;
import javax.xml.bind.annotation.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@XmlRootElement( name = "imageAnnotation")
@XmlAccessorType(XmlAccessType.FIELD)
public class ImageAnnotation implements Serializable {

    @XmlAttribute(name="imageAnnotation_ID")
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    private long imageID;

    @XmlElementWrapper(name="list-of-annotations")
    @XmlElement( name = "annotation")
    @OneToMany(fetch=FetchType.EAGER,cascade=CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="image_annotation_ID")
    private List<Annotation> annotations;

    private String imageName;

    public ImageAnnotation(){};

    public ImageAnnotation(ArrayList<Annotation> annotations, String imageName) {
        this.annotations = annotations;
        this.imageName = imageName;
    }

    public String getImageName(){
        return imageName;
    }

    public void setImageName(String imageName){
        this.imageName=imageName;
    }

    public List<Annotation> getAnnotations() {
        return annotations;
    }

    public void setAnnotations(ArrayList<Annotation> annotations) {
        this.annotations = annotations;
    }

    public void add(Annotation annotation){
        if ( this.annotations == null ) {
            this.annotations = new ArrayList<Annotation>();
        }
        this.annotations.add(annotation);
    }

    public long getImageID() {
        return imageID;
    }

    public void setImageID(long image_id) {
        this.imageID = image_id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
