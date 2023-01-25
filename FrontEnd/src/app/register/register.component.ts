import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from '@angular/forms';
import { ConfigService } from '../config/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from '../model/Register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  repeatPass: string = 'none';
  constructor(private route: ActivatedRoute,private configService: ConfigService) {  }

  pageError: String = ""
  register: Register = {userName: "", name: "", password: "", role: ""}
  response: Register = {userName: "", name: "", password: "", role: ""}

  registerForm: FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userName: new FormControl("", [
        Validators.required
      ]),
      name: new FormControl("", [
        Validators.required,
      ]),
      password: new FormControl("", [
        Validators.required
      ]),
      confirmPassword: new FormControl("",[
      ])
    })
  }

  get userName() { return this.registerForm.get('userName') }
  get name() { return this.registerForm.get('name') }
  get password() { return this.registerForm.get('password') }
  get confirmPassword() { return this.registerForm.get('confirmPassword') }

  onSubmit() {

    this.register.userName = this.registerForm.value.userName
    this.register.name = this.registerForm.value.name
    this.register.password = this.registerForm.value.password
    this.register.role = "Admin"

    if(this.registerForm.value.password == this.registerForm.value.confirmPassword) {
      this.configService.registerUser(this.register).subscribe((data: Register) => {
        this.response = data;
        this.pageError = "User Registered successfully";
      },error=>{
        console.log(error)
        this.pageError = "We encountered an error please try again later"
      })
    }  else {
      this.repeatPass = 'inline'
    } 
  }
}
