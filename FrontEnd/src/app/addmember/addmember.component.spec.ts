import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { delay, of, throwError } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CLAIM, MEMBER } from 'src/moqdata/memberAndClaimData';
import { ConfigService } from '../config/config.service';

import { AddmemberComponent } from './addmember.component';

describe('AddmemberComponent', () => {
  let component: AddmemberComponent;
  let fixture: ComponentFixture<AddmemberComponent>;
  let configService: any;
  let activatedRoute: any;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    const configServiceSpy = jasmine.createSpyObj('ConfigService', [
      'addMember',
    ]);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    TestBed.configureTestingModule({
      declarations: [AddmemberComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: ConfigService, useValue: configServiceSpy },
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AddmemberComponent);
        component = fixture.componentInstance;
        configService = TestBed.inject(ConfigService);
        activatedRoute = TestBed.inject(ActivatedRoute);
        el = fixture.debugElement;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check validation of form and input values', fakeAsync(() => {
    fixture.detectChanges();
    let date = new Date();
    date.setFullYear(2022, 11, 2);
    fixture.whenStable().then(() => {
      const firstNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#firstName');
      firstNameEl.value = 'Kapil';
      firstNameEl.dispatchEvent(new Event('input'));

      const lastNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#lastName');
      lastNameEl.value = 'Dadheech';
      lastNameEl.dispatchEvent(new Event('input'));

      const userNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#userName');
      userNameEl.value = 'Dadheech161';
      userNameEl.dispatchEvent(new Event('input'));

      const passwordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#password');
      passwordEl.value = 'kapil161';
      passwordEl.dispatchEvent(new Event('input'));

      const confirmPasswordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#confirmPassword');
      confirmPasswordEl.value = 'kapil161';
      confirmPasswordEl.dispatchEvent(new Event('input'));

      const addressEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#address');
      addressEl.value = 'Ward-No: 15';
      addressEl.dispatchEvent(new Event('input'));

      const stateEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#state');
      stateEl.value = 'Rajasthan';
      stateEl.dispatchEvent(new Event('input'));

      const cityEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#city');
      cityEl.value = 'Jhunjhunu';
      cityEl.dispatchEvent(new Event('input'));

      const emailEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#email');
      emailEl.value = 'kamil.monu@gmail.com';
      emailEl.dispatchEvent(new Event('input'));

      const dateOfBirthEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#dateOfBirth');
      dateOfBirthEl.valueAsDate = date;
      dateOfBirthEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        flush();
        fixture.detectChanges();
        const btnElement: HTMLButtonElement =
          fixture.debugElement.nativeElement.querySelector('#button');
        expect(btnElement.disabled).toBeFalse();
        expect(component.addMemberForm.valid).toBeTruthy();
        expect(component.addMemberForm.get('firstName')?.value).toEqual(
          'Kapil'
        );
        expect(component.addMemberForm.get('lastName')?.value).toEqual(
          'Dadheech'
        );
        expect(component.addMemberForm.get('userName')?.value).toEqual(
          'Dadheech161'
        );
        expect(component.addMemberForm.get('password')?.value).toEqual(
          'kapil161'
        );
        expect(component.addMemberForm.get('confirmPassword')?.value).toEqual(
          'kapil161'
        );
        expect(component.addMemberForm.get('address')?.value).toEqual(
          'Ward-No: 15'
        );
        expect(component.addMemberForm.get('state')?.value).toEqual(
          'Rajasthan'
        );
        expect(component.addMemberForm.get('city')?.value).toEqual('Jhunjhunu');
        expect(component.addMemberForm.get('email')?.value).toEqual(
          'kamil.monu@gmail.com'
        );
        expect(component.addMemberForm.get('dateOfBirth')?.value).toEqual(
          '2022-12-02'
        );
      });
    });
  }));

  it('should check validation of form and input values', fakeAsync(() => {
    fixture.detectChanges();
    let date = new Date();
    date.setFullYear(2022, 11, 2);
    fixture.whenStable().then(() => {
      const firstNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#firstName');
      firstNameEl.value = 'Kapil';
      firstNameEl.dispatchEvent(new Event('input'));

      const lastNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#lastName');
      lastNameEl.value = 'Dadheech';
      lastNameEl.dispatchEvent(new Event('input'));

      const userNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#userName');
      userNameEl.value = 'Dadheech161';
      userNameEl.dispatchEvent(new Event('input'));

      const passwordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#password');
      passwordEl.value = 'kapil161';
      passwordEl.dispatchEvent(new Event('input'));

      const confirmPasswordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#confirmPassword');
      confirmPasswordEl.value = 'kapil16';
      confirmPasswordEl.dispatchEvent(new Event('input'));

      const addressEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#address');
      addressEl.value = 'Ward-No: 15';
      addressEl.dispatchEvent(new Event('input'));

      const stateEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#state');
      stateEl.value = 'Rajasthan';
      stateEl.dispatchEvent(new Event('input'));

      const cityEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#city');
      cityEl.value = 'Jhunjhunu';
      cityEl.dispatchEvent(new Event('input'));

      const emailEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#email');
      emailEl.value = 'kamil.monu@gmail.com';
      emailEl.dispatchEvent(new Event('input'));

      const dateOfBirthEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#dateOfBirth');
      dateOfBirthEl.valueAsDate = date;
      dateOfBirthEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
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

  it('should add member', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    let date = new Date();
    date.setFullYear(2022, 11, 2);
    fixture.whenStable().then(() => {
      const firstNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#firstName');
      firstNameEl.value = 'Kapil';
      firstNameEl.dispatchEvent(new Event('input'));

      const lastNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#lastName');
      lastNameEl.value = 'Dadheech';
      lastNameEl.dispatchEvent(new Event('input'));

      const userNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#userName');
      userNameEl.value = 'Dadheech161';
      userNameEl.dispatchEvent(new Event('input'));

      const passwordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#password');
      passwordEl.value = 'kapil161';
      passwordEl.dispatchEvent(new Event('input'));

      const confirmPasswordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#confirmPassword');
      confirmPasswordEl.value = 'kapil161';
      confirmPasswordEl.dispatchEvent(new Event('input'));

      const addressEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#address');
      addressEl.value = 'Ward-No: 15';
      addressEl.dispatchEvent(new Event('input'));

      const stateEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#state');
      stateEl.value = 'Rajasthan';
      stateEl.dispatchEvent(new Event('input'));

      const cityEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#city');
      cityEl.value = 'Jhunjhunu';
      cityEl.dispatchEvent(new Event('input'));

      const emailEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#email');
      emailEl.value = 'kamil.monu@gmail.com';
      emailEl.dispatchEvent(new Event('input'));

      const dateOfBirthEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#dateOfBirth');
      dateOfBirthEl.valueAsDate = date;
      dateOfBirthEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const mockFunction = spyOn(component, 'onSubmit').and.callThrough();
        const btnElement: HTMLButtonElement =
          fixture.debugElement.nativeElement.querySelector('#button');
        expect(btnElement.disabled).toBeFalsy();
        btnElement.click();
        expect(mockFunction).toHaveBeenCalledTimes(1);
      });
      configService.addMember.and.callFake(() => {
        return of('Member added successfully').pipe(delay(300));
      });
      tick(300);
      fixture.detectChanges();
      expect(component.pageError).toEqual('Member added successfully');
      const pageError: HTMLElement =
        fixture.debugElement.nativeElement.querySelector('#pageError');
      expect(pageError.textContent).toEqual(' Member added successfully ');
    });
  }));

  it('should through an error when submit claim', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    let date = new Date();
    date.setFullYear(2022, 11, 2);
    fixture.whenStable().then(() => {
      const firstNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#firstName');
      firstNameEl.value = 'Kapil';
      firstNameEl.dispatchEvent(new Event('input'));

      const lastNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#lastName');
      lastNameEl.value = 'Dadheech';
      lastNameEl.dispatchEvent(new Event('input'));

      const userNameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#userName');
      userNameEl.value = 'Dadheech161';
      userNameEl.dispatchEvent(new Event('input'));

      const passwordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#password');
      passwordEl.value = 'kapil161';
      passwordEl.dispatchEvent(new Event('input'));

      const confirmPasswordEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#confirmPassword');
      confirmPasswordEl.value = 'kapil161';
      confirmPasswordEl.dispatchEvent(new Event('input'));

      const addressEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#address');
      addressEl.value = 'Ward-No: 15';
      addressEl.dispatchEvent(new Event('input'));

      const stateEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#state');
      stateEl.value = 'Rajasthan';
      stateEl.dispatchEvent(new Event('input'));

      const cityEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#city');
      cityEl.value = 'Jhunjhunu';
      cityEl.dispatchEvent(new Event('input'));

      const emailEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#email');
      emailEl.value = 'kamil.monu@gmail.com';
      emailEl.dispatchEvent(new Event('input'));

      const dateOfBirthEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#dateOfBirth');
      dateOfBirthEl.valueAsDate = date;
      dateOfBirthEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const mockFunction = spyOn(component, 'onSubmit').and.callThrough();
        const btnElement: HTMLButtonElement =
          fixture.debugElement.nativeElement.querySelector('#button');
        expect(btnElement.disabled).toBeFalsy();
        btnElement.click();
        expect(mockFunction).toHaveBeenCalledTimes(1);
      });
      configService.addMember.and.returnValue(
        throwError(() => new HttpErrorResponse({ status: 404 }))
      );
      flush();
      fixture.detectChanges();
      const pageError: HTMLElement =
        fixture.debugElement.nativeElement.querySelector('#pageError');
      expect(pageError.textContent).toEqual(
        'We encountered an error please try again later'
      );
    });
  }));
});
