import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Member } from '../model/Member';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})

export class MainpageComponent implements OnInit {
  @ViewChild("physician") physician: ElementRef = new ElementRef("");
  @ViewChild("memberid") memberid: ElementRef = new ElementRef("");
  @ViewChild("claimid") claimid: ElementRef = new ElementRef("");
  @ViewChild("firstname") firstname: ElementRef = new ElementRef("");
  @ViewChild("lastname") lastname: ElementRef = new ElementRef("");
  
  //to view errors
  pageError: string = ""
  showError:boolean = false

  //jwt token
  token: string | null = ""

  constructor(private configService: ConfigService) { }
  
  members: Member[] = []
  member: Member = {memberId:0,firstName:"",lastName:"",userName:"",address:"",state:"",city:"",email:"",
  dateOfBirth:new Date,physicianId:0,physicianName:""}

  ngOnInit(): void {
    //get the token
    this.token = localStorage.getItem('token');
    //this.onPhysicianChange();
  }

  onPhysicianChange() {
    let physician = this.physician.nativeElement.value
    if(physician == null){
      physician = "Mark";
    }
    if (this.token != null)
      this.configService.getMembersByPhysicianName(physician).subscribe((data: Member[]) => {
        console.log(data);
        this.members = []
        this.members = data;
      },
      error => {
        console.log(error)
        if (error.status == 400)
          this.pageError = "please enter a valid physician"

        else if (error.status == 404)
          this.pageError = "no members found"
        else
          this.pageError = "We encountered an error please try again later"
        this.showError = true
        console.log(error);
      });
  }

  byMemberId() {
    let memberid = this.memberid.nativeElement.value
    if (this.token != null)
      this.configService.getMemberByMemberId(memberid).subscribe((data: Member) => {
        console.log(data);
        this.member = data;
        this.members = []
        this.members.push(this.member)
      },
      error => {
        console.log(error)
        if (error.status == 400)
          this.pageError = "please enter a valid member id"

        else if (error.status == 404)
          this.pageError = "no members found"
        else
          this.pageError = "We encountered an error please try again later"
        this.showError = true
        console.log(error);
      });
  }

  getMemberByClaimId() {
    let claimid = this.claimid.nativeElement.value
    if (this.token != null)
      this.configService.getMemberByClaimId(claimid).subscribe((data: Member) => {
        console.log(data);
        this.member = data;
        this.members = []
        this.members.push(this.member)
      },
        error => {
          console.log(error)
          if (error.status == 400)
            this.pageError = "please enter a valid claim id"

          else if (error.status == 404)
            this.pageError = "no members found"
          else
            this.pageError = "We encountered an error please try again later"
          this.showError = true
          console.log(error);
        });
  }

  getMemberByFirstAndLastName() {
    let firstname = this.firstname.nativeElement.value
    let lastname = this.lastname.nativeElement.value
    if (this.token != null)
      this.configService.getMemberByFirstAndLastName(firstname,lastname).subscribe((data: Member[]) => {
        this.members = []
        this.members = data
      }, error => {
        console.log(error)
        if (error.status == 400)
          this.pageError = "please enter valid first and last name."

        else if (error.status == 404)
          this.pageError = "no members found"
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
