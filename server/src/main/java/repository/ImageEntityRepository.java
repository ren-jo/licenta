package repository;

import model.annotation.ImageEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageEntityRepository extends CrudRepository<ImageEntity,Long> {
}
