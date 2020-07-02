import { Component, OnInit } from '@angular/core';
import {MatDialog, MatListOption} from '@angular/material';
import {CreateTopicComponent} from './create-topic/create-topic.component';
import {CreateCategoryComponent} from './create-category/create-category.component';
import {Category, Topic} from '../model/ForumModels';
import {ForumService} from '../service/forum-service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  categories:Category[];
  topics:Topic[];
  categoriesSelection:any[];
  selectedTopic:Topic;
  show:boolean;

  constructor(public dialog: MatDialog, private service:ForumService) {
    this.categories=[];
  }

  ngOnInit() {
    this.service.getAllCategories().subscribe(data=>{
      this.categories=data;
    }).add(()=>{
      this.categoriesSelection = [];
      for (let categ of this.categories)
        this.categoriesSelection.push({category:categ, isChecked: false});
      this.show=true;
    })

  }

  loadActiveTopics() {
    this.topics = [];
    this.service.getAllTopics().subscribe(data=>{
      for (let topic of data) {
        let topicCategory = topic.category;
        for (let category of this.categoriesSelection) {
          if (category.isChecked && category.category.name === topicCategory.name)
            this.topics.push(topic)
        }
      }
    })
  }

  changeSelectedStatus(i){
    this.categoriesSelection[i].isChecked=!this.categoriesSelection[i].isChecked;
    this.loadActiveTopics();
    this.show=true;
  }

  showTopicReplies(topic:Topic){
    this.selectedTopic=topic;
    console.log(topic);
    this.show=false;
  }

  openCreateTopic(){
    this.dialog.open(CreateTopicComponent, {
      width: '500px', height:'500px',
      data:{categories:this.categories}
    });
  }

  openCreateCategory(){
    this.dialog.open(CreateCategoryComponent, {
      width: '500px', height:'500px',
    });
  }

}
