import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import {HttpClientModule} from "@angular/common/http";
import { MainpageComponent } from './mainpage/mainpage.component';
import { SubmitclaimComponent } from './submitclaim/submitclaim.component';
import { AddmemberComponent } from './addmember/addmember.component';
import { RegisterComponent } from './register/register.component';
import { MembermainpageComponent } from './membermainpage/membermainpage.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomepageComponent,
    MainpageComponent,
    SubmitclaimComponent,
    AddmemberComponent,
    RegisterComponent,
    MembermainpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
