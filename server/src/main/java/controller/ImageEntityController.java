package controller;

import model.annotation.ImageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import repository.ImageEntityRepository;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/backend/")
public class ImageEntityController {

    @Autowired
    private ImageEntityRepository imageEntityRepository;

    @PostMapping("/imageEntity")
    public ArrayList<ImageEntity> getImageEntitiesByIDs(@RequestBody ArrayList<Long> imagesIDs){
        return (ArrayList<ImageEntity>) imageEntityRepository.findAllById(imagesIDs);
    }

    @PutMapping("/imageEntity")
    public void saveImageEntity(@RequestBody ImageEntity entity){
        System.out.println(entity.getIsVerified());
        imageEntityRepository.save(entity);
    }
}
