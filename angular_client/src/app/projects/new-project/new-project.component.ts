import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Project} from '../../model/ImageModels';
import {Router} from '@angular/router';
import {ImageAnnotationService} from '../../service/image-annotation-service.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewProjectComponent>, private router:Router,
              private service:ImageAnnotationService) {

  }

  ngOnInit() {

  }

  createProject(name:string){
    let userId=JSON.parse(sessionStorage.getItem("user")).id;
    let project=new Project();
    project.name=name;
    console.log(project.name);
    project.images=[];
    project.userIDsAllowed=[userId];
    project.userId=userId;
    this.service.persistProject(project).subscribe(data=>{
    }).add(()=>{
      this.dialogRef.close();
      this.redirectTo('my-proj');
    })
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }

}
