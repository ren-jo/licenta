import { Component, OnInit } from '@angular/core';
import {ImageAnnotationService} from '../service/image-annotation-service.service';
import {Project} from '../model/ImageModels';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {NewProjectComponent} from './new-project/new-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  myProjects:Project[];
  displayedColumns: string[] = ['proj-name', 'no-images','created-by-user','actions'];
  expanded:boolean;
  userId:number;
  createForm:FormGroup;

  constructor(private service:ImageAnnotationService,private router:Router, private dialog:MatDialog) { }

    ngOnInit() {
      this.service.getAllProjects().subscribe(data=>{
          this.myProjects=data;
          console.log(data);
      });
      this.expanded=false;
      this.userId=JSON.parse(sessionStorage.getItem("user")).id;

      this.createForm=new FormGroup({
          projectName: new FormControl('',[
            Validators.required,Validators.minLength(3)
          ])
      })

  }

  openProjectModal(){
    this.dialog.open(NewProjectComponent,{
      width: '300px', height:'300px',
    })
  }

  deleteProject(projectId:number){
    this.service.deleteProject(projectId).subscribe().add(()=>{
      this.redirectTo('my-proj');
    })
  }

  editProject(projectId:number){
    this.router.navigate(['project',{projectId:projectId}])
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }

}
