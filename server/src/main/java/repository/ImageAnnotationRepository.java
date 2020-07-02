package repository;

import model.annotation.ImageAnnotation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface ImageAnnotationRepository extends CrudRepository<ImageAnnotation,Long> {
    List<ImageAnnotation> findAllByImageIDIn(ArrayList<Long> imageIDs);
}
