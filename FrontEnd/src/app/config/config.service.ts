import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthResponse } from "../model/authResponse";
import { Member } from '../model/Member';
import { Claim } from '../model/Claim';
import { PostMember } from '../model/PostMember';
import { Register } from '../model/Register';


@Injectable({
  providedIn: 'root'
})

//service to call all the microservice
export class ConfigService {

  loginserviceUrl = "https://localhost:44343/HealthCare"

  membersearchserviceUrl = "https://localhost:44325/HealthCare"

  claimserviceUrl = "https://localhost:44316/HealthCare/SubmitClaim"

  memberserviceUrl = "https://localhost:44335/HealthCare/AddMember"

  
  

  constructor(private http: HttpClient) { }

  //------------------------authentication microservice calls -----------------------
  //retrieve token after login
  getUserToken(empDetails: any) {
    return this.http.post<any>(this.loginserviceUrl + "/login", empDetails);
  }

  registerUser(user: Register) {
    return this.http.post<any>(this.loginserviceUrl + "/register", user);
  }



  //--------------------MemberSerach microservice calls --------------------------------
  getMembersByPhysicianName(physician: string) {
    return this.http.get<Member[]>(this.membersearchserviceUrl + "/GetMembersByPhysicianName?" + "name=" + physician)
  }

  getMemberByMemberId(memberid:number) {
    return this.http.get<Member>(this.membersearchserviceUrl + "/ByMemberId/" + memberid)
  }

  getMemberByClaimId(claimid: number) {
    return this.http.get<Member>(this.membersearchserviceUrl + "/GetMemberByClaim/" + claimid)
  }

  getMemberByFirstAndLastName(firstname: string,lastname: string) {
    return this.http.get<Member[]>(this.membersearchserviceUrl + "/ByFirstNameAndLastName" + "?firstName=" + firstname + "&lastName=" + lastname)
  }

  getMemberByUserName(username: string | null) {
    return this.http.get<Member>(this.membersearchserviceUrl + "/GetMemberByUserName?" + "username=" + username)
  }

  //--------------------------------Claim Microservice Calls-------------------------------------
  submitClaim(claim: Claim) {
    return this.http.post<any>(this.claimserviceUrl, claim);
  }

  //---------------------------------Member Microservice Calls------------------------------------
  addMember(member: PostMember) {
    return this.http.post<any>(this.memberserviceUrl, member)
  }
  
}