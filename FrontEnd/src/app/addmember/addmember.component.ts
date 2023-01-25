import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from "@angular/forms";
import { Validators } from '@angular/forms';
import { ConfigService } from '../config/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostMember } from '../model/PostMember';

@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {
  repeatPass: string = 'none';

  constructor(private route: ActivatedRoute,private configService: ConfigService) {  }

  pageError: String = ""
  token: string | null = ""

  addMemberForm: FormGroup = new FormGroup({})
  member: PostMember = {firstName: "",lastName: "",userName: "",password: "",confirmPassword: "",
    address: "",state: "",city: "",email: "",dateOfBirth: new Date}
  response: PostMember = {firstName: "",lastName: "",userName: "",password: "",confirmPassword: "",
    address: "",state: "",city: "",email: "",dateOfBirth: new Date}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.addMemberForm = new FormGroup({
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("[a-zA-Z].*")
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.minLength(2)
      ]),
      userName: new FormControl("", [
        Validators.required,
        Validators.minLength(2)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
      ]),
      confirmPassword: new FormControl("", [
      ]),
      address: new FormControl("", [
        Validators.required,
        Validators.minLength(2)
      ]),
      state: new FormControl("", [
        Validators.required,
        Validators.minLength(2)
      ]),
      city: new FormControl("", [
        Validators.required,
        Validators.minLength(2)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      dateOfBirth: new FormControl("", [
        Validators.required
      ])
    })
  }

  get firstName() { return this.addMemberForm.get('firstName') }
  get lastName() { return this.addMemberForm.get('lastName') }
  get userName() { return this.addMemberForm.get('userName') }
  get password() { return this.addMemberForm.get('password') }
  get confirmPassword() { return this.addMemberForm.get('confirmPassword') }
  get address() { return this.addMemberForm.get('address') }
  get state() { return this.addMemberForm.get('state') }
  get city() { return this.addMemberForm.get('city') }
  get email() { return this.addMemberForm.get('email') }
  get dateOfBirth() { return this.addMemberForm.get('dateOfBirth') }

  onSubmit() {

    this.member.firstName = this.addMemberForm.value.firstName
    this.member.lastName = this.addMemberForm.value.lastName
    this.member.userName = this.addMemberForm.value.userName
    this.member.password = this.addMemberForm.value.password
    this.member.confirmPassword = this.addMemberForm.value.confirmPassword
    this.member.address = this.addMemberForm.value.address
    this.member.state = this.addMemberForm.value.state
    this.member.city = this.addMemberForm.value.city
    this.member.email = this.addMemberForm.value.email
    this.member.dateOfBirth = this.addMemberForm.value.dateOfBirth

    if(this.addMemberForm.value.password == this.addMemberForm.value.confirmPassword) {
      if (this.token != null)
      this.configService.addMember(this.member).subscribe((data: any) => {
        this.pageError = "Member added successfully"
      },error=>{
        console.log(error)
        this.pageError = "We encountered an error please try again later"
      })
    } else {
      this.repeatPass = 'inline'
    }
  }
}
