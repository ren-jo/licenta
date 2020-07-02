import {AfterViewInit, Component, DoBootstrap, HostListener, NgModule, OnInit, ViewChild} from '@angular/core';
import {NgxPolygonDrawComponent} from 'ngx-polygon-draw';
import {of} from 'rxjs';
import {Point, ImageAnnotation, Annotation, ImageEntity} from '../model/ImageModels';
import { ImageAnnotationService} from '../service/image-annotation-service.service';
import {ActivatedRoute} from '@angular/router';
import {NgbCarousel, NgbCarouselConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';
import {GenericPath, NgxCanvasAreaDrawDirective, NgxCanvasAreaDrawModule, PathData, Rect} from 'ngx-canvas-area-draw';
import {UpgradeModule} from '@angular/upgrade/static';

import {element} from 'protractor';
import {MatDialog, MatExpansionPanel} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {CreateTopicComponent} from '../forum/create-topic/create-topic.component';
import {ExportDialogComponent} from './export-dialog/export-dialog.component';
import { NewLabelComponent } from './new-label/new-label.component';

@Component({
  selector: 'e-image',
  templateUrl: './annotate-image.component.html',
  styleUrls: ['./annotate-image.component.scss'],
  providers: [NgbCarouselConfig],
})
export class AnnotateImageComponent implements OnInit, AfterViewInit{

  @ViewChild('areaDraw',{static:false})
  areaDraw: NgxCanvasAreaDrawDirective;

  @ViewChild('dataPanel',{static:false})
  dataPanel:MatExpansionPanel;

  selectedImage:ImageEntity;
  labelList:String[];
  selectedLabel:String;
  selectedDrawing: String;
  drawingList: String[];
  imageEntities:ImageEntity[];

  imageAnnotations:Map<number,ImageAnnotation>;
  imageAnnotation:ImageAnnotation;
  strokeColor: string;
  fillColor: string;
  handlerFillColor: string;
  handlerStrokeColor: string;
  updateWhileMoving: boolean;
  allowDelete: boolean;
  defaults: PathData[];
  allowExportPersist:boolean;
  isLoading:boolean=true;


  constructor(private service:ImageAnnotationService, private route:ActivatedRoute,config: NgbCarouselConfig,private upgrade:UpgradeModule,
              private toastrService:ToastrService, public dialog: MatDialog) {
    config.interval=0;
  }

  ngOnInit() {
    let imageEntitiesArray:number[]=[];
    this.route.snapshot.paramMap.get('imageArrayIDs').split(',').map((number)=>imageEntitiesArray.push(parseInt(number)));

    this.service.getImageEntities(imageEntitiesArray).subscribe(data=>{
      this.imageEntities=data;
      console.log(this.imageEntities);
    }).add(()=>{
      this.isLoading=true;
      this.initializeMap(this.imageEntities);
      this.selectedImage=this.imageEntities[0];
    }).add(()=>{
      this.isLoading=false;
    });

    this.labelList=["arrow-straight","arrow-straiht-dashed","arrow-left","arrow-left-dashed","arrow-right","arrow-right-dashed"];
    this.drawingList=["Polygon","Bounding Box"];

    this.imageAnnotation=new ImageAnnotation();
    this.imageAnnotation.annotations=[];

    this.strokeColor = 'rgba(118, 165, 207, 0.7)';
    this.fillColor = 'rgba(118, 165, 207, 0.2)';
    this.handlerFillColor = 'rgba(118, 165, 207, 1)';
    this.handlerStrokeColor = 'rgba(118, 165, 207, 1)';

    this.allowDelete = true;
    this.updateWhileMoving = true;
    this.defaults=[];

    this.allowExportPersist=false;
  }

  ngAfterViewInit(): void {
    this.changeImage(this.selectedImage);
  }

  initializeMap(entities:ImageEntity[]){
    this.imageAnnotations=new Map();
    this.service.getImageAnnotationsForImages(this.imageEntities.map(element=>element.id)).subscribe(data=>{
      console.log(data);
      for(let existingAnnotation of data){
        this.imageAnnotations.set(existingAnnotation.imageID,existingAnnotation);
        this.allowExportPersist=true;
      }
    }).add(()=>{
      for(let entity of entities){
        if(this.imageAnnotations.get(entity.id)==undefined){
          let newImageAnno=new ImageAnnotation();
          newImageAnno.imageName=entity.name;
          newImageAnno.annotations=[];
          this.imageAnnotations.set(entity.id,newImageAnno);
        }
      }
    });
  }

  changeVerifyStatus(){

    this.selectedImage.isVerified=!this.selectedImage.isVerified;
    console.log(this.selectedImage.isVerified);
    this.service.persistImageEntity(this.selectedImage).subscribe();
  }

  selectLabel(label:String){
    this.selectedLabel=label;
  }

  selectDrawing(drawing:String){
    this.selectedDrawing=drawing;
  }

  addDrawingAnnotation(){
    if (this.selectedLabel == "" || this.selectedLabel==undefined) {
      window.alert("Select a label first!");
      return;
    }

    if(this.selectedDrawing == "" || this.selectedDrawing==undefined ) {
      window.alert("Chose your drawing method!");
      return;
    }

    if(this.selectedDrawing=='Bounding Box'){
      this.areaDraw.addPath({
        name: Rect.NAME,
        keepInsideContainer: true
      });
    }
    else if(this.selectedDrawing=='Polygon'){
      this.areaDraw.startDrawing();
    }

    this.allowExportPersist=true;

  }

  changeImage(entity:ImageEntity){
    console.log(entity);
    console.log(this.imageAnnotations);
    this.selectedImage=entity;
    let existingAnnotatedObjects=this.imageAnnotations.get(entity.id);
    this.areaDraw.imageUrl=this.convertImage(this.selectedImage.data);
    this.areaDraw.paths=[];
    if(existingAnnotatedObjects!=undefined){
      for(let annotation of existingAnnotatedObjects.annotations){
        let pathDatas=[];
        for(let path of annotation.points){
          pathDatas.push([path.x,path.y])
        }
        if(pathDatas.length==4) {
          this.areaDraw.defaultPaths.push({
            name: Rect.NAME,
            points: pathDatas
          });
        }
        else{
          this.areaDraw.defaultPaths.push({
            name: GenericPath.NAME,
            points: pathDatas
          });
        }
      }
    }

  }

  onAddPath(){
    let annotation=new Annotation();
    annotation.label=this.selectedLabel;
    this.imageAnnotations.get(this.selectedImage.id).annotations.push(annotation);
    console.log(this.imageAnnotations)
  }

  onDeletePath(event:any){
    this.imageAnnotations.get(this.selectedImage.id).annotations.splice(event,1);
    console.log(this.imageAnnotations);
  }

  exportToXML(){
    this.dialog.open(ExportDialogComponent, {
      width: '600px', height:'150px',
      data:{imageAnnotations:this.imageAnnotations,
        selectedImage:this.selectedImage
      }
    });
  }

  saveCurrentSelectionToObject(){
    let pathsArray=this.areaDraw.paths;
    for(let path of pathsArray){
      let points:Point[]=[];
      for(let point of path.points)
        points.push({x:point[0],y:point[1]});
      this.imageAnnotations.get(this.selectedImage.id).annotations[pathsArray.indexOf(path)].points=points;
    }
    this.imageAnnotations.get(this.selectedImage.id).imageName=this.selectedImage.name;
    this.imageAnnotations.get(this.selectedImage.id).imageID=this.selectedImage.id;
  }



  clearSelection(){
    this.areaDraw.imageUrl=this.convertImage(this.selectedImage.data);
    this.areaDraw.paths=[];
    this.imageAnnotations.get(this.selectedImage.id).annotations=[];
    console.log(this.imageAnnotations)
  }


  convertImage(image:string){
    return 'data:image/jpeg;base64,'+image;
  }

  saveData(){
    this.service.persistImageAnnotation(Array.from(this.imageAnnotations.values())).subscribe().add(()=>{
      this.toastrService.success("Current state of the project has been saved!", "Save project data")
    });
  }

  newLabel(): void {
    this.dialog.open(NewLabelComponent, {
      width: '250px', height:'250px',
      data: { list: this.labelList}
    });
  }

  getMapValuesForHTML(){
    return Array.from(this.imageAnnotations.values());
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    let index=this.imageEntities.indexOf(this.selectedImage);
    if(event.code=="ArrowLeft"){
      if(index>0)
        this.changeImage(this.imageEntities[index-1]);
    }

    if(event.code=="ArrowRight"){
      if(index<this.imageEntities.length){
        this.changeImage(this.imageEntities[index+1]);
      }
    }
  }

}
