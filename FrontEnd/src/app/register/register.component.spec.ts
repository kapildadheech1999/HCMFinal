import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, of, throwError } from 'rxjs';
import { CLAIM, REGISTER } from 'src/moqdata/memberAndClaimData';
import { ConfigService } from '../config/config.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let configService: any;
  let activatedRoute: any;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    const configServiceSpy = jasmine.createSpyObj('ConfigService', [
      'registerUser'
    ]);
    const activatedRouteSpy = jasmine.createSpyObj('Activatedroute', ['']);
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers:[{provide: ConfigService, useValue: configServiceSpy},
      {provide: ActivatedRoute, useValue: activatedRouteSpy}],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(RegisterComponent);
      component = fixture.componentInstance;
      configService = TestBed.inject(ConfigService);
      activatedRoute = TestBed.inject(ActivatedRoute);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check validation of form and input values', fakeAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#userName');
      userNameEl.value = 'kamil.monu@gmail.com';
      userNameEl.dispatchEvent(new Event('input'));

      const nameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#name');
      nameEl.value = 'Kapil';
      nameEl.dispatchEvent(new Event('input'));

      const passwordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#password');
      passwordEl.value = 'kapil161';
      passwordEl.dispatchEvent(new Event('input'));

      const confirmPasswordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#confirmPassword');
      confirmPasswordEl.value = 'kapil161';
      confirmPasswordEl.dispatchEvent(new Event('input'));
    });
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const btnElement: HTMLButtonElement =
        fixture.debugElement.nativeElement.querySelector('#button');
      expect(btnElement.disabled).toBeFalse();
      expect(component.registerForm.valid).toBeTruthy();
      expect(component.registerForm.get('userName')?.value).toEqual('kamil.monu@gmail.com');
      expect(component.registerForm.get('name')?.value).toEqual('Kapil');
      expect(component.registerForm.get('password')?.value).toEqual('kapil161');
      expect(component.registerForm.get('confirmPassword')?.value).toEqual('kapil161');
    });

  }));

  it('should check whether ng submit is called or invoked', fakeAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#userName');
      userNameEl.value = 'kamil.monu@gmail.com';
      userNameEl.dispatchEvent(new Event('input'));

      const nameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#name');
      nameEl.value = 'Kapil';
      nameEl.dispatchEvent(new Event('input'));

      const passwordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#password');
      passwordEl.value = 'kapil161';
      passwordEl.dispatchEvent(new Event('input'));

      const confirmPasswordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#confirmPassword');
      confirmPasswordEl.value = 'kapil16';
      confirmPasswordEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const mockFunction = spyOn(component, 'onSubmit').and.callThrough();
        const btnElement: HTMLButtonElement =
          fixture.debugElement.nativeElement.querySelector('#button');
        expect(btnElement.disabled).toBeFalsy();
        btnElement.click();
        expect(mockFunction).toHaveBeenCalledTimes(1);
        expect(component.repeatPass).toBe('inline');
      });
    });
  }));

  it('should register user', fakeAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#userName');
      userNameEl.value = 'kamil.monu@gmail.com';
      userNameEl.dispatchEvent(new Event('input'));

      const nameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#name');
      nameEl.value = 'Kapil';
      nameEl.dispatchEvent(new Event('input'));

      const passwordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#password');
      passwordEl.value = 'kapil161';
      passwordEl.dispatchEvent(new Event('input'));

      const confirmPasswordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#confirmPassword');
      confirmPasswordEl.value = 'kapil161';
      confirmPasswordEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const mockFunction = spyOn(component, 'onSubmit').and.callThrough();
        const btnElement: HTMLButtonElement =
          fixture.debugElement.nativeElement.querySelector('#button');
        expect(btnElement.disabled).toBeFalsy();
        btnElement.click();
        expect(mockFunction).toHaveBeenCalledTimes(1);
        expect(component.register.userName).toEqual('kamil.monu@gmail.com');
        expect(component.register.name).toEqual('Kapil');
        expect(component.register.password).toEqual('kapil161');
        expect(component.registerForm.value.password).toEqual('kapil161');
        expect(component.registerForm.value.confirmPassword).toEqual('kapil161');
      });
      configService.registerUser.and.callFake(() => {
        return of(REGISTER["kamil.monu@gmail.com"]).pipe(delay(300));
      });
      tick(300);
      fixture.detectChanges();
      const pageError: HTMLElement =
        fixture.debugElement.nativeElement.querySelector('#pageError');
      expect(pageError.textContent).toEqual('User Registered successfully');
    });
  }));

  it('should through an error when register user', fakeAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#userName');
      userNameEl.value = 'kamil.monu@gmail.com';
      userNameEl.dispatchEvent(new Event('input'));

      const nameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#name');
      nameEl.value = 'Kapil';
      nameEl.dispatchEvent(new Event('input'));

      const passwordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#password');
      passwordEl.value = 'kapil161';
      passwordEl.dispatchEvent(new Event('input'));

      const confirmPasswordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#confirmPassword');
      confirmPasswordEl.value = 'kapil161';
      confirmPasswordEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const mockFunction = spyOn(component, 'onSubmit').and.callThrough();
        const btnElement: HTMLButtonElement =
          fixture.debugElement.nativeElement.querySelector('#button');
        expect(btnElement.disabled).toBeFalsy();
        btnElement.click();
        expect(mockFunction).toHaveBeenCalledTimes(1);
        expect(component.register.userName).toEqual('kamil.monu@gmail.com');
        expect(component.register.name).toEqual('Kapil');
        expect(component.register.password).toEqual('kapil161');
        expect(component.registerForm.value.password).toEqual('kapil161');
        expect(component.registerForm.value.confirmPassword).toEqual('kapil161');
      });
      configService.registerUser.and.returnValue(throwError(() => new HttpErrorResponse({status: 404})));
      flush();
      fixture.detectChanges();
      const pageError: HTMLElement =
        fixture.debugElement.nativeElement.querySelector('#pageError');
        expect(pageError.textContent).toEqual('We encountered an error please try again later');
    });
  }));

});
