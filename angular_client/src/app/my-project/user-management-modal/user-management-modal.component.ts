import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ImageAnnotationService} from '../../service/image-annotation-service.service';

@Component({
  selector: 'app-user-management-modal',
  templateUrl: './user-management-modal.component.html',
  styleUrls: ['./user-management-modal.component.scss']
})
export class UserManagementModalComponent implements OnInit {
  usersPlusChecked:any[];
  displayedColumns:string[]=['user_name','in_project'];

  constructor(public dialogRef: MatDialogRef<UserManagementModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private service: ImageAnnotationService) { }

  ngOnInit() {
    this.dialogRef.afterOpened().subscribe(()=>{
      this.usersPlusChecked=[];
      for(let user of this.data.users){
        if(this.data.project.userIDsAllowed.indexOf(user.id)!=-1){
          this.usersPlusChecked.push({user:user,inProject:true})
        }
        else{
          this.usersPlusChecked.push({user:user,inProject:false})
        }
      }
    })
  }

  checkUser(i:number){
    this.usersPlusChecked[i].inProject= !this.usersPlusChecked[i].inProject;
    console.log(this.usersPlusChecked)
  }

  confirmProjectChanges(){
    let users=[];
    for(let object of this.usersPlusChecked){
      if(object.inProject){
        users.push(object.user.id)
      }
    }
    this.data.project.userIDsAllowed=users;
    this.service.persistProject(this.data.project).subscribe().add(()=>{
      this.dialogRef.close();
    });

  }

}
