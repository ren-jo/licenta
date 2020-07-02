package controller;


import model.annotation.Annotation;
import model.annotation.ImageAnnotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import repository.ImageAnnotationRepository;
import services.ServiceComponent;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/backend/")
public class AnnotationController {

    @Autowired
    private ServiceComponent service;

    @Autowired
    private ImageAnnotationRepository imageAnnotationRepository;

    @PutMapping("/annotation")
    public void addImageAnnotation(@RequestBody ImageAnnotation[] imageAnnotation){
        List<ImageAnnotation> annotations=Arrays.asList(imageAnnotation);
        for(ImageAnnotation ia:annotations){
            for(Annotation annotation:ia.getAnnotations())
                annotation.setId(null);
            System.out.println(ia);
            imageAnnotationRepository.save(ia);
        }
    }

    @PostMapping("/annotation")
    public List<ImageAnnotation> getImageAnnotations(@RequestBody ArrayList<Long> imageIds){
        return imageAnnotationRepository.findAllByImageIDIn(imageIds);
    }


    @PostMapping(value="/export", produces = { MediaType.APPLICATION_XML_VALUE })
    public String annoToXml(@RequestBody ImageAnnotation[] annotation){
        return service.convertAnnotationToXML(annotation);
    }

}


