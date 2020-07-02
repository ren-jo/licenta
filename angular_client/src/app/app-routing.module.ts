import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AnnotateImageComponent} from './annotate-image/annotate-image.component';
import {MyProjectComponent} from './my-project/my-project.component';
import {ProjectsComponent} from './projects/projects.component';
import {ForumComponent} from './forum/forum.component';
import {SecurityGuard} from './service/SecurityGuard';
import {HelpComponent} from './help/help.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {
    path: 'annotate',
    pathMatch:'prefix',
    component: AnnotateImageComponent,
    canActivate:[SecurityGuard]
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'project',
    pathMatch: 'prefix',
    component: MyProjectComponent,
    canActivate:[SecurityGuard]
  },
  {
    path: 'my-proj',
    pathMatch: 'full',
    component: ProjectsComponent,
    canActivate:[SecurityGuard]

  },
  {
    path: 'forum',
    component: ForumComponent,
    canActivate:[SecurityGuard]
  },
  {
    path: 'help',
    component: HelpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
