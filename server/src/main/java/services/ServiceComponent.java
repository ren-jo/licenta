package services;

import model.annotation.ImageAnnotation;
import org.springframework.stereotype.Component;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.StringWriter;
import java.util.Arrays;
import java.util.List;


@Component
public class ServiceComponent {

    @XmlRootElement(name="imageAnnotations")
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class ImageAnnotations{

        public ImageAnnotations(){};

        public ImageAnnotations(List<ImageAnnotation> annotations) {
            this.annotations = annotations;
        }

        private List<ImageAnnotation> annotations;

        public List<ImageAnnotation> getAnnotations() {
            return annotations;
        }

        public void setAnnotations(List<ImageAnnotation> annotations) {
            this.annotations = annotations;
        }
    }

    public String convertAnnotationToXML(ImageAnnotation[] annotation){
        String xmlContent=null;
        try{

            ImageAnnotations imageAnnotations=new ImageAnnotations(Arrays.asList(annotation));
            JAXBContext jaxbContext = JAXBContext.newInstance(ImageAnnotations.class);

            Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

            jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

            StringWriter sw = new StringWriter();

            jaxbMarshaller.marshal(imageAnnotations, sw);

            xmlContent = sw.toString();
            System.out.println( xmlContent );
        }
        catch(
                JAXBException e)
        {
            e.printStackTrace();
        }

        return xmlContent;
    }

}
