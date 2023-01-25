import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { AuthResponse } from '../model/authResponse';
import { UserLogin } from '../model/userLogin';
import { User } from '../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private configService: ConfigService,private router:Router) { }

  //user object to save user form details
  user: UserLogin = { username:"", password: "" }
  loginResponse: User ={id:0, userName:"", name:"", password:"", role:""}
  authResponse:AuthResponse=new AuthResponse(this.loginResponse,"")

  //reactive form for login
  userForm: FormGroup = new FormGroup({})

  //to display errors
  pageError: string = ""
  showError:boolean = false

  ngOnInit(): void {

    //initialize the form
    this.userForm = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      password: new FormControl("", [
        Validators.required,
      ])
    })
  }

  get username() { return this.userForm.get('username') }
  get password() { return this.userForm.get('password') }

  //on submitting the form
  onSubmit() {
    console.log(this.userForm.value)
    
    let userDetails = { "userName": this.userForm.value.username, "password": this.userForm.value.password}
    
    //retrive the data from the authmicroservice
    this.configService.getUserToken(userDetails).subscribe((data:AuthResponse)=>{
      this.authResponse=data
      //save the token in local storage
      localStorage.setItem("token",data.token)
      if(this.authResponse.user.role == "Admin") {
        this.router.navigate(['main'])
      } else {
        this.router.navigate(['memberpage'])
        localStorage.setItem("username", data.user.userName)
      }
    },
    error => {
      console.log(error)
      if (error.status == 400)
        this.pageError = "Invalid username and password"
      else
        this.pageError = "We encountered an error please try again later"
      this.showError = true
      console.log(error);
    });
  }
  closebar(){
    this.showError=false
  }
}
