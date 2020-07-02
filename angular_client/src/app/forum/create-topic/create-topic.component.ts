import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Category, Topic} from '../../model/ForumModels';
import {ForumService} from '../../service/forum-service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
  categories:Category[];
  topic:Topic;

  constructor(private dialogRef: MatDialogRef<CreateTopicComponent>,
              @Inject(MAT_DIALOG_DATA) data, private service:ForumService,private toastrService:ToastrService, private router:Router) {
    this.categories=data.categories;
    dialogRef.disableClose = false;
  }

  ngOnInit() {
    this.topic=new Topic();
    this.topic.replies=[];
    this.topic.userName= JSON.parse(sessionStorage.getItem("user")).name;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  onConfirm(){
    this.service.saveTopic(this.topic).subscribe().add(()=>{
      this.toastrService.success("Topic was successfully created!","Topic creation");
      this.dialogRef.close();
      this.router.navigate(["/forum"]);
    })
  }
}
