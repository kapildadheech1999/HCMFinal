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
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { delay, of, throwError} from 'rxjs';
import { CLAIM, CLAIMS } from 'src/moqdata/memberAndClaimData';
import { ConfigService } from '../config/config.service';

import { SubmitclaimComponent } from './submitclaim.component';

describe('SubmitclaimComponent', () => {
  let component: SubmitclaimComponent;
  let fixture: ComponentFixture<SubmitclaimComponent>;
  let configService: any;
  let activatedRoute: any;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    const configServiceSpy = jasmine.createSpyObj('ConfigService', [
      'submitClaim',
    ]);
    //const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    TestBed.configureTestingModule({
      declarations: [SubmitclaimComponent],
      providers: [
        { provide: ConfigService, useValue: configServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 1,
              },
            },
          },
        },
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SubmitclaimComponent);
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
    fixture.whenStable().then(() => {
      const claimTypeEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimtype');
      claimTypeEl.value = 'Normal Injury';
      claimTypeEl.dispatchEvent(new Event('input'));

      const claimAmountEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimamount');
      claimAmountEl.value = '20000';
      claimAmountEl.dispatchEvent(new Event('input'));

      const claimRemarksEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimremarks');
      claimRemarksEl.value = 'Nothing';
      claimRemarksEl.dispatchEvent(new Event('input'));
    });

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const btnElement: HTMLButtonElement =
        fixture.debugElement.nativeElement.querySelector('#button');
      expect(btnElement.disabled).toBeFalse();
      expect(component.submitClaimForm.valid).toBeTruthy();
      expect(component.submitClaimForm.get('type')?.value).toEqual(
        'Normal Injury'
      );
      expect(component.submitClaimForm.get('amount')?.value).toEqual(20000);
      expect(component.submitClaimForm.get('remarks')?.value).toEqual(
        'Nothing'
      );
    });
  }));

  it('should check weather ng submit is called or invoked', fakeAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const claimTypeEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimtype');
      claimTypeEl.value = 'Normal Injury';
      claimTypeEl.dispatchEvent(new Event('input'));

      const claimAmountEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimamount');
      claimAmountEl.value = '20000';
      claimAmountEl.dispatchEvent(new Event('input'));

      const claimRemarksEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimremarks');
      claimRemarksEl.value = 'Nothing';
      claimRemarksEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const mockFunction = spyOn(component, 'onSubmit').and.callThrough();
        const btnElement: HTMLButtonElement =
          fixture.debugElement.nativeElement.querySelector('#button');
        expect(btnElement.disabled).toBeFalsy();
        btnElement.click();
        expect(mockFunction).toHaveBeenCalledTimes(1);
      });
    });
  }));

  it('should submit claim', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const claimTypeEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimtype');
      claimTypeEl.value = 'Normal Injury';
      claimTypeEl.dispatchEvent(new Event('input'));

      const claimAmountEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimamount');
      claimAmountEl.value = '20000';
      claimAmountEl.dispatchEvent(new Event('input'));

      const claimRemarksEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimremarks');
      claimRemarksEl.value = 'Nothing';
      claimRemarksEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const mockFunction = spyOn(component, 'onSubmit').and.callThrough();
        const btnElement: HTMLButtonElement =
          fixture.debugElement.nativeElement.querySelector('#button');
        expect(btnElement.disabled).toBeFalsy();
        btnElement.click();
        expect(mockFunction).toHaveBeenCalledTimes(1);
        expect(component.claim.claimType).toEqual('Normal Injury');
        expect(component.claim.claimAmount).toEqual(20000);
        expect(component.claim.remarks).toEqual('Nothing');
        expect(component.claim.memberId).toEqual(1);
        expect(component.token).toEqual('mksmlcxmsxclsmlxs');
      });
      configService.submitClaim.and.callFake(() => {
        return of(CLAIM).pipe(delay(300));
      });
      tick(300);
      fixture.detectChanges();
      expect(component.response).toEqual(CLAIM);
      const pageError: HTMLElement =
        fixture.debugElement.nativeElement.querySelector('#pageError');
      expect(pageError.textContent).toEqual('Claim submitted successfully');
    });
  }));

  it('should throw an error when submit claim', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const claimTypeEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimtype');
      claimTypeEl.value = 'Normal Injury';
      claimTypeEl.dispatchEvent(new Event('input'));

      const claimAmountEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimamount');
      claimAmountEl.value = '20000';
      claimAmountEl.dispatchEvent(new Event('input'));

      const claimRemarksEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimremarks');
      claimRemarksEl.value = 'Nothing';
      claimRemarksEl.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const mockFunction = spyOn(component, 'onSubmit').and.callThrough();
        const btnElement: HTMLButtonElement =
          fixture.debugElement.nativeElement.querySelector('#button');
        expect(btnElement.disabled).toBeFalsy();
        btnElement.click();
        expect(mockFunction).toHaveBeenCalledTimes(1);
        expect(component.claim.claimType).toEqual('Normal Injury');
        expect(component.claim.claimAmount).toEqual(20000);
        expect(component.claim.remarks).toEqual('Nothing');
        expect(component.claim.memberId).toEqual(1);
        expect(component.token).toEqual('mksmlcxmsxclsmlxs');
      });
      configService.submitClaim.and.returnValue(throwError(() => new HttpErrorResponse({status: 400})));
      flush();
      fixture.detectChanges();
      const pageError: HTMLElement =
        fixture.debugElement.nativeElement.querySelector('#pageError');
      expect(pageError.textContent).toEqual("We encountered an error please try again later");
    });
  }));
});
