import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category, Reply, Topic} from '../model/ForumModels';

@Injectable({
  providedIn: 'root'
})
export class ForumService{
  forumURL:string="http://localhost:8080/backend/forum";

  constructor(private http:HttpClient) { }

  getAllCategories(){
    return this.http.get<Category[]>(this.forumURL+"/category");
  }

  saveCategory(category:Category){
    return this.http.put(this.forumURL+"/category",category);
  }

  saveTopic(topic:Topic){
    return this.http.put(this.forumURL+"/topic",topic);
  }

  getAllTopics(){
    return this.http.get<Topic[]>(this.forumURL+"/topic");
  }

  saveReply(reply:Reply){
    return this.http.put(this.forumURL+"/reply",reply);
  }

}
