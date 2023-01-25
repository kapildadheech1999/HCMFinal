import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, of, throwError } from 'rxjs';
import { loginResponse, loginResponseMember } from 'src/moqdata/memberAndClaimData';
import { ConfigService } from '../config/config.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let configService: any;
  let router: any;
  let el: DebugElement;
  beforeEach(waitForAsync(() => {
    const configServiceSpy = jasmine.createSpyObj('ConfigService', [
      'getUserToken'
    ]);
    const routeSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[{provide: ConfigService, useValue: configServiceSpy},
        {provide: Router, useValue: routeSpy}],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      configService = TestBed.inject(ConfigService);
      router = TestBed.inject(Router);
    })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check validation of form and input values', fakeAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#username');
      userNameEl.value = 'kamil.monu@gmail.com';
      userNameEl.dispatchEvent(new Event('input'));

      const passwordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#password');
      passwordEl.value = 'kapil161';
      passwordEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.userForm.valid).toBeTruthy();
        expect(component.userForm.get('username')?.value).toEqual('kamil.monu@gmail.com');
        expect(component.userForm.get('password')?.value).toEqual('kapil161');
      });
    })
  }));

  it('should check wether ng submit is called or invoked', fakeAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#username');
      userNameEl.value = 'kamil.monu@gmail.com';
      userNameEl.dispatchEvent(new Event('input'));

      const passwordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#password');
      passwordEl.value = 'kapil161';
      passwordEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const mockFunction = spyOn(component, 'onSubmit').and.callThrough();
        const btnElement: HTMLButtonElement =
          fixture.debugElement.nativeElement.querySelector('#button');
        expect(btnElement.disabled).toBeFalsy();
        btnElement.click();
        expect(mockFunction).toHaveBeenCalledTimes(1);
      });
    })
  }));

  it('should login Admin user', fakeAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#username');
      userNameEl.value = 'kamil.monu@gmail.com';
      userNameEl.dispatchEvent(new Event('input'));

      const passwordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#password');
      passwordEl.value = 'kapil161';
      passwordEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const mockFunction = spyOn(component, 'onSubmit').and.callThrough();
        const btnElement: HTMLButtonElement =
          fixture.debugElement.nativeElement.querySelector('#button');
        expect(btnElement.disabled).toBeFalsy();
        btnElement.click();
        expect(mockFunction).toHaveBeenCalledTimes(1);
      });
      spyOn(localStorage, 'setItem');
      configService.getUserToken.and.callFake(() => {
        return of(loginResponse).pipe(delay(300));
      });
      tick(300);
      fixture.detectChanges();
      expect(component.authResponse).toEqual(loginResponse);
    })
  }));

  it('should login Member user', fakeAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#username');
      userNameEl.value = 'kamil.monu@gmail.com';
      userNameEl.dispatchEvent(new Event('input'));

      const passwordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#password');
      passwordEl.value = 'kapil161';
      passwordEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const mockFunction = spyOn(component, 'onSubmit').and.callThrough();
        const btnElement: HTMLButtonElement =
          fixture.debugElement.nativeElement.querySelector('#button');
        expect(btnElement.disabled).toBeFalsy();
        btnElement.click();
        expect(mockFunction).toHaveBeenCalledTimes(1);
      });
      spyOn(localStorage, 'setItem');
      configService.getUserToken.and.callFake(() => {
        return of(loginResponseMember).pipe(delay(300));
      });
      tick(300);
      fixture.detectChanges();
      expect(component.authResponse).toEqual(loginResponseMember);
    })
  }));

  it('should through an error for invalid credentials', fakeAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#username');
      userNameEl.value = 'kamil.monu@gmail.com';
      userNameEl.dispatchEvent(new Event('input'));

      const passwordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#password');
      passwordEl.value = 'kapil161';
      passwordEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const mockFunction = spyOn(component, 'onSubmit').and.callThrough();
        const btnElement: HTMLButtonElement =
          fixture.debugElement.nativeElement.querySelector('#button');
        expect(btnElement.disabled).toBeFalsy();
        btnElement.click();
        expect(mockFunction).toHaveBeenCalledTimes(1);
      });
      spyOn(localStorage, 'setItem');
      configService.getUserToken.and.returnValue(throwError(() => new HttpErrorResponse({status: 400})));
      flush();
      fixture.detectChanges();
      const pageError: HTMLElement =
        fixture.debugElement.nativeElement.querySelector('#pageError');
        expect(pageError.textContent).toEqual('Invalid username and password');
    })
  }));

  it('should through an error for common http error', fakeAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#username');
      userNameEl.value = 'kamil.monu@gmail.com';
      userNameEl.dispatchEvent(new Event('input'));

      const passwordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#password');
      passwordEl.value = 'kapil161';
      passwordEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const mockFunction = spyOn(component, 'onSubmit').and.callThrough();
        const btnElement: HTMLButtonElement =
          fixture.debugElement.nativeElement.querySelector('#button');
        expect(btnElement.disabled).toBeFalsy();
        btnElement.click();
        expect(mockFunction).toHaveBeenCalledTimes(1);
      });
      spyOn(localStorage, 'setItem');
      configService.getUserToken.and.returnValue(throwError(() => new HttpErrorResponse({status: 404})));
      flush();
      fixture.detectChanges();
      const pageError: HTMLElement =
        fixture.debugElement.nativeElement.querySelector('#pageError');
        expect(pageError.textContent).toEqual('We encountered an error please try again later');
    })
  }));

});
