import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ImageAnnotation, ImageEntity, Project} from '../model/ImageModels';

@Injectable({
  providedIn: 'root'
})
export class ImageAnnotationService {

  annotationURL:string="http://localhost:8080/backend/annotation";
  projectURL:string="http://localhost:8080/backend/project";
  imageEntityURL: string="http://localhost:8080/backend/imageEntity";
  xmlExportURL: string="http://localhost:8080/backend/export";

  constructor(private http: HttpClient) { }

  public persistImageAnnotation(imgAnn:ImageAnnotation[]){
    return this.http.put(this.annotationURL,imgAnn);
  }

  public persistProject(project:Project){
    return this.http.put(this.projectURL,project);
  }

  public getProject(projectID:number){
    return this.http.get<Project>(this.projectURL+"/"+projectID)
  }

  public getAllProjects(){
    return this.http.get<Project[]>(this.projectURL);
  }

  public deleteProject(projectId:number){
    return this.http.delete(this.projectURL+"/"+projectId);
  }

  public getImageEntities(arrayIDs:number[]){
    return this.http.post<ImageEntity[]>(this.imageEntityURL,arrayIDs);
  }

  public getImageAnnotationsForImages(arrayIDs:number[]){
    return this.http.post<ImageAnnotation[]>(this.annotationURL,arrayIDs)
  }

  public convertAnnoToXML(annotations:ImageAnnotation[]){
    return this.http.post(this.xmlExportURL,annotations,{ responseType: 'text' as 'text' });
  }

  public persistImageEntity(imageEntity:ImageEntity){
    return this.http.put(this.imageEntityURL,imageEntity)
  }

}
