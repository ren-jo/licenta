import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user-service.service';
import {User} from '../model/User';
import {MyProjectComponent} from '../my-project/my-project.component';
import {userError} from '@angular/compiler-cli/src/transformers/util';
import {Toast, ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {CreateCategoryComponent} from '../forum/create-category/create-category.component';
import {RegisterUserComponent} from '../register-user/register-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  errorMessage = false;
  errorText = '';
  isLoading = false;

  constructor(private service: UserService, private http: HttpClient, private router: Router, private formBuilder: FormBuilder,
              private toastrService:ToastrService,public dialog: MatDialog) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    sessionStorage.clear();
    console.log('here')
  }

  login() {
    this.isLoading = true;
    const credentials = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };

    let user=new User();
    user.username=credentials.username;
    user.password=credentials.password;

    this.service.authenticateUser(user).subscribe(data=> {
      this.isLoading = false;
      if(data==null){
         this.toastrService.error("Login data is invalid!", "Invalid login");
         return;
      }
      let userData = {'username': data.user.username, 'name': data.user.name, 'id': data.user.id};

      console.log(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("key", data.key);
      this.router.navigate(['my-proj']);
    },
      error => {
        this.isLoading=false;
        this.toastrService.error("Login data is invalid!", "Invalid login")
      })
  }

  register(){
    this.dialog.open(RegisterUserComponent, {
      width: '500px', height:'600px',
    });
  }

}
