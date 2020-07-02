package mapper;

import dto.ProjectDTO;
import model.annotation.Project;

import java.util.ArrayList;
import java.util.List;

public abstract class ProjectMapper {

    public static ProjectDTO mapProjectToDTO(Project project, String userName){
        String[] stringIDs =project.getUserIDsAllowed().split("-");
        List<Long> allowedIDs=new ArrayList<>();
        for (String stringID : stringIDs) {
            allowedIDs.add(Long.valueOf(stringID));
        }
        return new ProjectDTO(project.getId(),project.getName(),project.getUserId(),project.getImages(),allowedIDs, userName);
    }


    public static Project mapDTOtoProject(ProjectDTO projectDTO){
        String allowedIDsString="";
        for(Long id:projectDTO.getUserIDsAllowed()){
            allowedIDsString=allowedIDsString+id+"-";
        }
        if(projectDTO.getId()==null){
            return new Project(projectDTO.getName(),projectDTO.getUserId(),null,allowedIDsString);
        }
        return new Project(projectDTO.getId(),projectDTO.getName(),projectDTO.getUserId(),projectDTO.getImages(),allowedIDsString);
    }

}
