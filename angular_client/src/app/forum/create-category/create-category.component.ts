import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Category} from '../../model/ForumModels';
import {ForumService} from '../../service/forum-service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

   category:Category;

  constructor(private dialogRef: MatDialogRef<CreateCategoryComponent>, private service:ForumService,private toastrService:ToastrService, private router:Router) {
    dialogRef.disableClose = false;
  }

  ngOnInit() {
    this.category=new Category();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  onConfirm(){
    this.service.saveCategory(this.category).subscribe().add(()=>{
      this.toastrService.success("Category was successfully created!","Category creation");
      this.dialogRef.close();
      this.redirectTo('forum');
    })

  }

  redirectTo(uri:string){
    this.router.navigateByUrl('', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }

}
