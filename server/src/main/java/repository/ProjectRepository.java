package repository;

import model.annotation.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends CrudRepository<Project,Long> {
    List<Project> findProjectsByUserId(Long id);
    Project findProjectsByName(String name);
}
