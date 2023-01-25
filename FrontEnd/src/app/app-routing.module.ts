import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SubmitclaimComponent } from './submitclaim/submitclaim.component'
import { AddmemberComponent } from './addmember/addmember.component'
import { RegisterComponent } from './register/register.component'
import { MembermainpageComponent } from './membermainpage/membermainpage.component';

const routes: Routes = [
  //login page
  { path: 'login', component: LoginComponent },

  //welcome page
  { path: 'homepage', component: HomepageComponent },

  //homepage once logged in
  { path: 'main', component: MainpageComponent},

  { path: 'submitclaim/:id', component: SubmitclaimComponent},

  { path: 'addmember', component: AddmemberComponent},

  { path: 'register', component: RegisterComponent},

  {path: 'memberpage' ,component: MembermainpageComponent},
  //redirection route
  { path: '', redirectTo: "/homepage", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
