import {Component, Inject, OnInit} from '@angular/core';
import {ImageAnnotation, ImageEntity} from '../../model/ImageModels';
import {ImageAnnotationService} from '../../service/image-annotation-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss']
})
export class ExportDialogComponent implements OnInit {

  imageAnnotations:Map<number,ImageAnnotation>;
  imageEntity:ImageEntity;

  constructor(private service:ImageAnnotationService,private dialogRef: MatDialogRef<ExportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.imageAnnotations=data.imageAnnotations;
    this.imageEntity=data.selectedImage;
  }

  ngOnInit() {

  }

  exportCurrent(){
    this.service.convertAnnoToXML(Array.from([this.imageAnnotations.get(this.imageEntity.id)])).subscribe(data=>{
      console.log(data);
      let blob = new Blob([data], {
        type: "application/xml"
      });
      saveAs(blob,"XMLExport")
    }).add(()=>{
      this.dialogRef.close();
    })
  }

  exportAll(){
    this.service.convertAnnoToXML(this.checkAnnotationWithPoints(Array.from(this.imageAnnotations.values()))).subscribe(data=>{
      console.log(data);
      let blob = new Blob([data], {
        type: "application/xml"
      });
      saveAs(blob,"XMLExport")
    }).add(()=>{
      this.dialogRef.close();
    })
  }

  checkAnnotationWithPoints(imageAnnotations:ImageAnnotation[]){
    let arrayWithPoints=[];
    for(let imageAnnotation of imageAnnotations) {
      let annotations=[];
      for (let element of imageAnnotation.annotations) {
        if (element.points != undefined)
          annotations.push(element);
      }
      if(annotations.length>0){
        arrayWithPoints.push(imageAnnotation);
      }
    }
    return arrayWithPoints;
  }
}
