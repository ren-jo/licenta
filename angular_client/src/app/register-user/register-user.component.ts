import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../model/User';
import {MatDialogRef} from '@angular/material';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private service:UserService,private formBuilder: FormBuilder,private dialogRef: MatDialogRef<RegisterUserComponent>,
              private toastrService:ToastrService) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      user_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  confirmRegister(){
    let newUser=new User();
    newUser.username=this.registerForm.controls.username.value;
    newUser.name=this.registerForm.controls.user_name.value;
    newUser.password=this.registerForm.controls.password.value;
    newUser.email=this.registerForm.controls.email.value;
    if(newUser.username=="" || newUser.name=="" || newUser.password=="" || newUser.email==""){
      this.toastrService.error("Please complete all fields!", "User register");
      return
    }
    this.service.persistUser(newUser).subscribe( next=>{
      this.dialogRef.close();
      this.toastrService.success("User created succesfully!", "User register");
    })
  }

}
