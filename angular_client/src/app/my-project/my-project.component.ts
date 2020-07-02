import { Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageEntity, Project} from '../model/ImageModels';
import {ImageAnnotationService} from '../service/image-annotation-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ShowImageComponent} from './show-image/show-image.component';
import {filter} from 'rxjs/operators';
import {UserManagementModalComponent} from './user-management-modal/user-management-modal.component';
import {UserService} from '../service/user-service.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
    selector: 'app-my-images',
    templateUrl: './my-project.component.html',
    styleUrls: ['./my-project.component.scss']
})

export class MyProjectComponent implements OnInit {

  selectedImages:ImageEntity[];
  projectEntity:Project;
  displayedColumns: string[] = ['select','image-name', 'posted-by','date','verified','actions'];
  projectId:number;
  sendImages:any[];
  user:any;

  constructor(private service:ImageAnnotationService, private route:ActivatedRoute,
              private router:Router,public dialog: MatDialog,
              private userService:UserService) {

  }

  public ngOnInit(): void {
    this.projectId=parseInt(this.route.snapshot.paramMap.get('projectId'));
    this.service.getProject(this.projectId).subscribe(data=>{
      this.projectEntity=data;
      this.selectedImages=this.projectEntity.images;
      this.sendImages=[];
      for(let image of this.selectedImages)
        this.sendImages.push({image:image,checked:false});
      //console.log(this.route.snapshot['_routerState'].url);
      this.user=JSON.parse(sessionStorage.getItem("user"))
    });
  }

  imageInputChange(fileInputEvent: any) {
    let index=0;
    let size=fileInputEvent.target.files.length;
    for(let file of fileInputEvent.target.files){
      this.actualRead(file,index,size);
      index++;
    }
  }

  actualRead(file:any,index:number,length:number){
    let fileReader= new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload=()=>{
      // @ts-ignore
      let array=new Uint8Array(fileReader.result);
      // console.log(array);
      // let string=String.fromCharCode.apply(null, array);
      // let base64String = btoa(string);
      let base64String=this.Uint8ToBase64(array);
      let newImage=new ImageEntity();
      newImage.data=base64String;
      newImage.name=file.name;
      newImage.date=this.getCurrentDate();
      newImage.isVerified=false;
      newImage.postedBy=JSON.parse(sessionStorage.getItem("user")).name;
      this.projectEntity.images.push(newImage);
      if(index==length-1){
        this.service.persistProject(this.projectEntity).subscribe().add(()=>{
          this.reloadPage()
        });
      }
    };
  }

  Uint8ToBase64(u8Arr){
    var CHUNK_SIZE = 0x8000; //arbitrary number
    var index = 0;
    var length = u8Arr.length;
    var result = '';
    var slice;
    while (index < length) {
      slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
      result += String.fromCharCode.apply(null, slice);
      index += CHUNK_SIZE;
    }
    return btoa(result);
  }

  showImage(imageData:string): void {
    this.dialog.open(ShowImageComponent, {
      width: '500px', height:'500px',
      data: {image:'data:image/jpeg;base64,' + imageData}
    });
  }

  deleteImage(index:number){
    this.projectEntity.images.splice(index,1);
    this.service.persistProject(this.projectEntity).subscribe().add(()=>{
      this.reloadPage()
    });
  }


  getCurrentDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return mm + '/' + dd + '/' + yyyy
  }

  //TODO: reload same page
  reloadPage(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['project',{projectId:this.projectId}]))
  }

  filterImagesByPublished(deliverByString:string,filterBy:string){
    if(filterBy==undefined){
      for(let image of this.selectedImages){
        this.sendImages.push({image:image,checked:false});
        this.selectedImages.push(image);
      }
      return;
    }
    console.log(deliverByString + filterBy)
    this.sendImages=[];
    this.selectedImages=[];
    for(let image of this.projectEntity.images){
      if(filterBy=='imagename' && image.name.includes(deliverByString)){
        this.sendImages.push({image:image,checked:false})
        this.selectedImages.push(image);
      }
      else {
        if(filterBy=='publishedby' && image.postedBy.includes(deliverByString)){
          this.sendImages.push({image:image,checked:false});
          this.selectedImages.push(image);
        }
      }
    }
  }

  openUserModal(){
    let users;
    this.userService.getAllUsers().subscribe(data=>{
     users=data;
    }).add(()=>{
      this.dialog.open(UserManagementModalComponent, {
        width: '700px', height:'530px',
        data: {users:users, project: this.projectEntity}
      });
    })
  }

  checkImage(i:number){
    this.sendImages[i].checked= !this.sendImages[i].checked;
    console.log(this.sendImages)
  }

  isOneSelected(){
    for(let image of this.sendImages)
      if(image.checked)
        return true;

    return false;
  }


  isAllSelected() {
    for(let image of this.sendImages)
      if(!image.checked)
        return false;

      return true;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.sendImages.forEach(row=> row.checked=false):
      this.sendImages.forEach(row=> row.checked=true);
  }

  annotateImages(){
    let array=[];
    for(let image of this.sendImages)
      if(image.checked)
        array.push(image);
    let arrayIDs= array.map(entity=>entity.image.id);
    this.router.navigate(['annotate',{imageArrayIDs:arrayIDs}])
  }
}
