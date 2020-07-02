import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {UserService} from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate{

  constructor(public router:Router, public service:UserService){

  }

  canActivate(next:ActivatedRouteSnapshot):boolean {
    let regExProject = /project/;
    let regExAnnotate = /annotate/;
    let regExForum = /forum/;
    let regExProjects = /my-proj/;
    let regExHome = /home/;
    let key=sessionStorage.getItem('key');

    if(key==null){
      this.router.navigate(['']);
      return false;
    }

    if (key.length==128) {
      if (regExProject.test(next.routeConfig.path)) {
        if (next.params.projectId != undefined)
          return true;
        else {
          this.router.navigate(["my-proj"]);
          return false;
        }
      }

      if (regExAnnotate.test(next.routeConfig.path)) {
        if (next.params.imageArrayIDs != undefined)
          return true;
        else {
          this.router.navigate(["my-proj"]);
          return false;
        }
      }

      if (regExForum.test(next.routeConfig.path)) {
        return true;
      }

      if (regExProjects.test(next.routeConfig.path)) {
        return true;
      }

      if (regExHome.test(next.routeConfig.path)) {
        return true;
      }
    }
  }

}
