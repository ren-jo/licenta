import {Component, HostListener, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from './service/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit{

  user = null;

  sideNav = [
    {
      route: 'forum',
      displayText: 'Forum'
    },
    {
      route: 'my-proj',
      displayText: 'My projects'
    },
    {
      route: 'help',
      displayText: 'Help'
    }
  ];

  constructor(private service: UserService, private http: HttpClient, private router: Router) {
  }

  ngOnInit(){
    this.authenticated()
  }

  logout() {
    let userLogged=JSON.parse(sessionStorage.getItem("user"));
    this.service.logoutUser(userLogged.username).subscribe().add(()=>{
      sessionStorage.clear();
      this.router.navigate([""]);
    })
  }

  authenticated(){
    this.user=JSON.parse(sessionStorage.getItem("user"));
    return this.user != undefined;
  }

}
