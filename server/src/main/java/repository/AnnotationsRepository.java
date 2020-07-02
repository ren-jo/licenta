package repository;

import model.annotation.Annotation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnotationsRepository extends CrudRepository<Annotation,Long> {
    public Annotation findByLabel(String label);
}


