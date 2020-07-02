import {BrowserModule} from '@angular/platform-browser';
import {DoBootstrap, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CdkTreeModule} from '@angular/cdk/tree';
import {CdkTableModule} from '@angular/cdk/table';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatVideoModule} from "mat-video";
import { FlexLayoutModule } from "@angular/flex-layout";
import {TruncateModule} from "@yellowspot/ng-truncate";
import {MatFileUploadModule} from "mat-file-upload";
import {ToastrModule} from 'ngx-toastr';
import {FlipModule} from 'ngx-flip';
import {LottieAnimationViewModule} from 'ng-lottie';
import { AnnotateImageComponent } from './annotate-image/annotate-image.component';
import {NgxPolygonDrawModule} from 'ngx-polygon-draw';
import { ProjectsComponent } from './projects/projects.component';
import {MyProjectComponent} from './my-project/my-project.component';
import { ShowImageComponent } from './my-project/show-image/show-image.component';
import { UserManagementModalComponent } from './my-project/user-management-modal/user-management-modal.component';
import {NgxCanvasAreaDrawModule} from 'ngx-canvas-area-draw';
import {UpgradeModule} from '@angular/upgrade/static';
import {ForumComponent} from './forum/forum.component';
import {CreateCategoryComponent} from './forum/create-category/create-category.component';
import {CreateTopicComponent} from './forum/create-topic/create-topic.component';
import {ShowTopicComponent} from './forum/show-topic/show-topic.component';
import {RequestInterceptor} from './service/RequestInterceptor';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ExportDialogComponent } from './annotate-image/export-dialog/export-dialog.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import {NewLabelComponent} from './annotate-image/new-label/new-label.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AnnotateImageComponent,
    ProjectsComponent,
    MyProjectComponent,
    ShowImageComponent,
    UserManagementModalComponent,
    ForumComponent,
    CreateCategoryComponent,
    CreateTopicComponent,
    ShowTopicComponent,
    RegisterUserComponent,
    ExportDialogComponent,
    HelpComponent,
    HomeComponent,
    NewLabelComponent,
    NewProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatVideoModule,
    DragDropModule,
    FlexLayoutModule,
    MatFileUploadModule,
    NgbModule,
    TruncateModule,
    FlipModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: false
    }),
    LottieAnimationViewModule.forRoot(),
    NgxPolygonDrawModule,
    NgbModule,
    NgxCanvasAreaDrawModule,
    UpgradeModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
  entryComponents:[
    ShowImageComponent,
    UserManagementModalComponent,
    CreateCategoryComponent,
    CreateTopicComponent,
    RegisterUserComponent,
    ExportDialogComponent,
    NewLabelComponent,
    NewProjectComponent
  ]
})
export class AppModule{

  constructor(private upgrade:UpgradeModule){}
}
