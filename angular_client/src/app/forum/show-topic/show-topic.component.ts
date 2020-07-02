import {Component, Input, OnInit} from '@angular/core';
import {Reply, Topic} from '../../model/ForumModels';
import {ForumService} from '../../service/forum-service';
import {MatButton} from '@angular/material';

@Component({
  selector: 'app-show-topic',
  templateUrl: './show-topic.component.html',
  styleUrls: ['./show-topic.component.scss']
})
export class ShowTopicComponent implements OnInit {
  @Input() topic:Topic;
  expanded:boolean;
  reply:Reply;

  constructor(private service:ForumService) { }

  ngOnInit() {
    this.expanded=false;
    this.reply=new Reply();
  }

  closePanel(){
    this.expanded=false;
    this.reply.username=JSON.parse(sessionStorage.getItem("user")).name;
    this.reply.likes=0;
    this.reply.dislikes=0;
    this.topic.replies.push(this.reply);
    this.service.saveTopic(this.topic).subscribe();
  }

  like(reply:Reply, like:MatButton, dislike:MatButton){
    reply.likes++;
    like.disabled=true;
    dislike.disabled=true;
    this.service.saveTopic(this.topic).subscribe();

  }

  dislike(reply:Reply, like:MatButton, dislike:MatButton){
    reply.dislikes++;
    like.disabled=true;
    dislike.disabled=true;
    this.service.saveTopic(this.topic).subscribe();
  }

}
