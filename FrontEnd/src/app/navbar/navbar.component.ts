import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //to store the localStorage 
  local:any
  constructor(private route:Router) { }
  ngOnInit(): void {
    this.local = localStorage
  }

  //logout function
  logout(){

    //call the auth service and reroute to login page
    localStorage.clear()
    this.route.navigate(['/login']);
  }
}
