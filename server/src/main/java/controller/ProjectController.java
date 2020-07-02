package controller;

import dto.ProjectDTO;
import mapper.ProjectMapper;
import model.User;
import model.annotation.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import repository.ProjectRepository;
import repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/backend/")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @PutMapping("/project")
    public void saveProject(@RequestBody ProjectDTO projectDTO){
        Project project= ProjectMapper.mapDTOtoProject(projectDTO);
        projectRepository.save(project);
    }

    @GetMapping("/project/{projectId}")
    public ProjectDTO getProjectById(@PathVariable("projectId") Long projectId){
        Optional<Project> project=projectRepository.findById(projectId);
        if(project.isPresent()){
            User user=userRepository.findById(project.get().getUserId()).get();
            return ProjectMapper.mapProjectToDTO(project.get(),user.getName());
        }
        return null;
    }

    @GetMapping("/project")
    public List<ProjectDTO> getAllProjects(){
        List<Project> projects=(List<Project>)projectRepository.findAll();
        List<ProjectDTO> projectDTOS= new ArrayList<>();
        for(Project project:projects){
            User user=userRepository.findById(project.getUserId()).get();
            projectDTOS.add(ProjectMapper.mapProjectToDTO(project,user.getName()));
        }
        return projectDTOS;
    }

    @DeleteMapping("/project/{projectId}")
    public void deleteProject(@PathVariable("projectId") Long projectId){
        projectRepository.deleteById(projectId);
    }

}
