import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { Member } from '../model/Member';

@Component({
  selector: 'app-membermainpage',
  templateUrl: './membermainpage.component.html',
  styleUrls: ['./membermainpage.component.css']
})
export class MembermainpageComponent implements OnInit {

  constructor(private configService: ConfigService) {  }
  
  token: string | null = ""
  username: string | null = ""
  member: Member = {memberId:0,firstName:"",lastName:"",userName:"",address:"",state:"",city:"",email:"",
  dateOfBirth:new Date,physicianId:0,physicianName:""}

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.username = localStorage.getItem('username')

    if (this.token != null){
      this.configService.getMemberByUserName(this.username).subscribe((data: Member) => {
      this.member = data
    })
  }
 }
}
