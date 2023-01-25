import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from '@angular/forms';
import { ConfigService } from '../config/config.service';
import { Claim } from '../model/Claim';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-submitclaim',
  templateUrl: './submitclaim.component.html',
  styleUrls: ['./submitclaim.component.css']
})
export class SubmitclaimComponent implements OnInit {
  constructor(private route: ActivatedRoute,private configService: ConfigService) {  }

  pageError: String = ""
  id: number = 0

  submitClaimForm: FormGroup = new FormGroup({})

  claim:Claim = {claimType:"",claimAmount: 0,remarks: "",memberId: 0}
  response:Claim = {claimType:"",claimAmount: 0,remarks: "",memberId: 0}

  token: string | null = ""

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.submitClaimForm = new FormGroup({
      type: new FormControl("", [
        Validators.required
      ]),
      amount: new FormControl("", [
        Validators.required,
      ]),
      remarks: new FormControl("", [
        Validators.required
      ])
    })
  }

  get type() { return this.submitClaimForm.get('type') }
  get amount() { return this.submitClaimForm.get('amount') }
  get remarks() { return this.submitClaimForm.get('remarks') }

  onSubmit() {

    this.claim.claimType = this.submitClaimForm.value.type
    this.claim.claimAmount = this.submitClaimForm.value.amount
    this.claim.remarks = this.submitClaimForm.value.remarks
    this.claim.memberId = this.id

    if (this.token != null) {
      this.configService.submitClaim(this.claim).subscribe((data: Claim) => {
        this.response = data
        this.pageError = "Claim submitted successfully"
      },error=>{
        console.log(error);
        this.pageError = "We encountered an error please try again later";
      })
    }
  }
}
