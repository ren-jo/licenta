package model.annotation;

import javax.persistence.*;
import javax.xml.bind.annotation.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@XmlAccessorType(XmlAccessType.FIELD)
public class Annotation implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String label;

    @XmlElementWrapper(name="points")
    @XmlElement(name = "point" )
    @OneToMany(fetch=FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name="annotation_ID")
    private List<Point> points;

    public Annotation(){};

    public Annotation(String label, ArrayList<Point> points) {
        this.label = label;
        this.points = points;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(ArrayList<Point> points) {
        this.points = points;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Annotation{" +
                "id=" + id +
                ", label=" + label +
                ", points=" + points +
                '}';
    }
}
