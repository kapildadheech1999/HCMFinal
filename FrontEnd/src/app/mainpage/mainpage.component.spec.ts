import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { delay, of, throwError } from 'rxjs';
import { findMemberByClaimId, findMemberByFirstNameAndLastName, findMemberById, findMemberByPhysicianname, members, MEMBERS } from 'src/moqdata/memberAndClaimData';
import { ConfigService } from '../config/config.service';
import { MainpageComponent } from './mainpage.component';

describe('MainpageComponent', () => {
  let component: MainpageComponent;
  let fixture: ComponentFixture<MainpageComponent>;
  let configService: any;

  beforeEach(waitForAsync(() => {
    const configServiceSpy = jasmine.createSpyObj('ConfigService', [
      'getMembersByPhysicianName','getMemberByMemberId', 'getMemberByClaimId', 'getMemberByFirstAndLastName'
    ]);
    TestBed.configureTestingModule({
      declarations: [ MainpageComponent ],
      providers: [
        { provide: ConfigService, useValue: configServiceSpy }],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(MainpageComponent);
      component = fixture.componentInstance;
      configService = TestBed.inject(ConfigService);
    })
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should get members by physician name', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    const mockFunction = spyOn(component, 'onPhysicianChange').and.callThrough();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const physicianEl: HTMLSelectElement =
        fixture.debugElement.nativeElement.querySelector('select');
        physicianEl.value = 'John';
      physicianEl.dispatchEvent(new Event('change'));
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.physician.nativeElement.value).toEqual('John');
    })
    configService.getMembersByPhysicianName.and.callFake(() => {
      return of(findMemberByPhysicianname('John')).pipe(delay(300));
    });
    tick(300);
    flush();
    fixture.detectChanges();
    expect(component.members.length).toEqual(1);
  }));

  it('should through an error for status code 500(Member by physician name)', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    const mockFunction = spyOn(component, 'onPhysicianChange').and.callThrough();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const physicianEl: HTMLSelectElement =
        fixture.debugElement.nativeElement.querySelector('select');
        physicianEl.value = 'John';
      physicianEl.dispatchEvent(new Event('change'));
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.physician.nativeElement.value).toEqual('John');
    })
    configService.getMembersByPhysicianName.and.returnValue(throwError(() => new HttpErrorResponse({status: 500})));
    flush();
    fixture.detectChanges();
    const pageError: HTMLElement =
    fixture.debugElement.nativeElement.querySelector('#pageError');
    expect(pageError.textContent).toEqual(' We encountered an error please try again later  close ');
  }));

  it('should through an error for status code 400(Member by physician name)', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    const mockFunction = spyOn(component, 'onPhysicianChange').and.callThrough();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const physicianEl: HTMLSelectElement =
        fixture.debugElement.nativeElement.querySelector('select');
        physicianEl.value = 'John';
      physicianEl.dispatchEvent(new Event('change'));
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.physician.nativeElement.value).toEqual('John');
    })
    configService.getMembersByPhysicianName.and.returnValue(throwError(() => new HttpErrorResponse({status: 400})));
    flush();
    fixture.detectChanges();
    const pageError: HTMLElement =
    fixture.debugElement.nativeElement.querySelector('#pageError');
    expect(pageError.textContent).toEqual(' please enter a valid physician  close ');
  }));

  it('should through an error for status code 404(Member by physician name)', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    const mockFunction = spyOn(component, 'onPhysicianChange').and.callThrough();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const physicianEl: HTMLSelectElement =
        fixture.debugElement.nativeElement.querySelector('select');
        physicianEl.value = 'John';
      physicianEl.dispatchEvent(new Event('change'));
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.physician.nativeElement.value).toEqual('John');
    })
    configService.getMembersByPhysicianName.and.returnValue(throwError(() => new HttpErrorResponse({status: 404})));
    flush();
    fixture.detectChanges();
    const pageError: HTMLElement =
    fixture.debugElement.nativeElement.querySelector('#pageError');
    expect(pageError.textContent).toEqual(' no members found  close ');
  }));

  it('should get member by claim id', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const claimEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimid');
        claimEl.valueAsNumber = 1;
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const mockFunction = spyOn(component, 'getMemberByClaimId').and.callThrough();
      const btnElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#claimbtn');
      btnElement.click();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.claimid.nativeElement.valueAsNumber).toEqual(1);
    })
    configService.getMemberByClaimId.and.callFake(() => {
      return of(findMemberByClaimId(1)).pipe(delay(300));
    });
    tick(300);
    flush();
    fixture.detectChanges();
    expect(component.members.length).toEqual(1);
    expect(component.member).toEqual(findMemberByClaimId(1));
  }));

  it('should through an error for status code 500(Member by claim id)', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const claimEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimid');
        claimEl.valueAsNumber = 1;
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const mockFunction = spyOn(component, 'getMemberByClaimId').and.callThrough();
      const btnElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#claimbtn');
      btnElement.click();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.claimid.nativeElement.valueAsNumber).toEqual(1);
    })
    configService.getMemberByClaimId.and.returnValue(throwError(() => new HttpErrorResponse({status: 500})));
    flush();
    fixture.detectChanges();
    const pageError: HTMLElement =
    fixture.debugElement.nativeElement.querySelector('#pageError');
    expect(pageError.textContent).toEqual(' We encountered an error please try again later  close ');
  }));

  it('should through an error for status code 400(Member by claim id)', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const claimEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimid');
        claimEl.valueAsNumber = 1;
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const mockFunction = spyOn(component, 'getMemberByClaimId').and.callThrough();
      const btnElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#claimbtn');
      btnElement.click();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.claimid.nativeElement.valueAsNumber).toEqual(1);
    })
    configService.getMemberByClaimId.and.returnValue(throwError(() => new HttpErrorResponse({status: 400})));
    flush();
    fixture.detectChanges();
    const pageError: HTMLElement =
    fixture.debugElement.nativeElement.querySelector('#pageError');
    expect(pageError.textContent).toEqual(' please enter a valid claim id  close ');
  }));

  it('should through an error for status code 404(Member by claim id)', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const claimEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#claimid');
        claimEl.valueAsNumber = 1;
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const mockFunction = spyOn(component, 'getMemberByClaimId').and.callThrough();
      const btnElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#claimbtn');
      btnElement.click();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.claimid.nativeElement.valueAsNumber).toEqual(1);
    })
    configService.getMemberByClaimId.and.returnValue(throwError(() => new HttpErrorResponse({status: 404})));
    flush();
    fixture.detectChanges();
    const pageError: HTMLElement =
    fixture.debugElement.nativeElement.querySelector('#pageError');
    expect(pageError.textContent).toEqual(' no members found  close ');
  }));

  it('should get member by member id', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const memberEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#memberid');
        memberEl.valueAsNumber = 1;
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const mockFunction = spyOn(component, 'byMemberId').and.callThrough();
      const btnElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#memberbtn');
      btnElement.click();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.memberid.nativeElement.valueAsNumber).toEqual(1);
    })
    configService.getMemberByMemberId.and.callFake(() => {
      return of(findMemberById(1)).pipe(delay(300));
    });
    tick(300);
    flush();
    fixture.detectChanges();
    expect(component.members.length).toEqual(1);
    expect(component.member).toEqual(findMemberById(1));
  }));

  it('should through an error for status code 500(Member by member id)', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const memberEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#memberid');
        memberEl.valueAsNumber = 1;
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const mockFunction = spyOn(component, 'byMemberId').and.callThrough();
      const btnElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#memberbtn');
      btnElement.click();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.memberid.nativeElement.valueAsNumber).toEqual(1);
    })
    configService.getMemberByMemberId.and.returnValue(throwError(() => new HttpErrorResponse({status: 500})));
    flush();
    fixture.detectChanges();
    const pageError: HTMLElement =
    fixture.debugElement.nativeElement.querySelector('#pageError');
    expect(pageError.textContent).toEqual(' We encountered an error please try again later  close ');
  }));

  it('should through an error for status code 400(Member by member id)', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const memberEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#memberid');
        memberEl.valueAsNumber = 1;
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const mockFunction = spyOn(component, 'byMemberId').and.callThrough();
      const btnElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#memberbtn');
      btnElement.click();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.memberid.nativeElement.valueAsNumber).toEqual(1);
    })
    configService.getMemberByMemberId.and.returnValue(throwError(() => new HttpErrorResponse({status: 400})));
    flush();
    fixture.detectChanges();
    const pageError: HTMLElement =
    fixture.debugElement.nativeElement.querySelector('#pageError');
    expect(pageError.textContent).toEqual(' please enter a valid member id  close ');
  }));

  it('should through an error for status code 404(Member by member id)', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const memberEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#memberid');
        memberEl.valueAsNumber = 1;
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const mockFunction = spyOn(component, 'byMemberId').and.callThrough();
      const btnElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#memberbtn');
      btnElement.click();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.memberid.nativeElement.valueAsNumber).toEqual(1);
    })
    configService.getMemberByMemberId.and.returnValue(throwError(() => new HttpErrorResponse({status: 404})));
    flush();
    fixture.detectChanges();
    const pageError: HTMLElement =
    fixture.debugElement.nativeElement.querySelector('#pageError');
    expect(pageError.textContent).toEqual(' no members found  close ');
  }));

  it('should get members by first and last name', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const firstnameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#firstname');
        firstnameEl.value = 'Kapil';
      const lastnameEl: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#lastname');
      lastnameEl.value = 'Dadheech';
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const mockFunction = spyOn(component, 'getMemberByFirstAndLastName').and.callThrough();
      const btnElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#namebtn');
      btnElement.click();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.firstname.nativeElement.value).toEqual('Kapil');
      expect(component.lastname.nativeElement.value).toEqual('Dadheech');
    })
    configService.getMemberByFirstAndLastName.and.callFake(() => {
      return of(findMemberByFirstNameAndLastName('Kapil', 'Dadheech')).pipe(delay(300));
    });
    tick(300);
    flush();
    fixture.detectChanges();
    expect(component.members.length).toEqual(1);
  }));

  it('should through an error for status code 500(Member by first and last name)', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const firstnameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#firstname');
        firstnameEl.value = 'Kapil';
      const lastnameEl: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#lastname');
      lastnameEl.value = 'Dadheech';
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const mockFunction = spyOn(component, 'getMemberByFirstAndLastName').and.callThrough();
      const btnElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#namebtn');
      btnElement.click();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.firstname.nativeElement.value).toEqual('Kapil');
      expect(component.lastname.nativeElement.value).toEqual('Dadheech');
    })
    configService.getMemberByFirstAndLastName.and.returnValue(throwError(() => new HttpErrorResponse({status: 500})));
    flush();
    fixture.detectChanges();
    const pageError: HTMLElement =
    fixture.debugElement.nativeElement.querySelector('#pageError');
    expect(pageError.textContent).toEqual(' We encountered an error please try again later  close ');
  }));

  it('should through an error for status code 400(Member by first and last name)', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const firstnameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#firstname');
        firstnameEl.value = 'Kapil';
      const lastnameEl: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#lastname');
      lastnameEl.value = 'Dadheech';
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const mockFunction = spyOn(component, 'getMemberByFirstAndLastName').and.callThrough();
      const btnElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#namebtn');
      btnElement.click();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.firstname.nativeElement.value).toEqual('Kapil');
      expect(component.lastname.nativeElement.value).toEqual('Dadheech');
    })
    configService.getMemberByFirstAndLastName.and.returnValue(throwError(() => new HttpErrorResponse({status: 400})));
    flush();
    fixture.detectChanges();
    const pageError: HTMLElement =
    fixture.debugElement.nativeElement.querySelector('#pageError');
    expect(pageError.textContent).toEqual(' please enter valid first and last name.  close ');
  }));

  it('should through an error for status code 404(Member by first and last name)', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const firstnameEl: HTMLInputElement =
        fixture.debugElement.nativeElement.querySelector('#firstname');
        firstnameEl.value = 'Kapil';
      const lastnameEl: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#lastname');
      lastnameEl.value = 'Dadheech';
    })
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const mockFunction = spyOn(component, 'getMemberByFirstAndLastName').and.callThrough();
      const btnElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('#namebtn');
      btnElement.click();
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(component.firstname.nativeElement.value).toEqual('Kapil');
      expect(component.lastname.nativeElement.value).toEqual('Dadheech');
    })
    configService.getMemberByFirstAndLastName.and.returnValue(throwError(() => new HttpErrorResponse({status: 404})));
    flush();
    fixture.detectChanges();
    const pageError: HTMLElement =
    fixture.debugElement.nativeElement.querySelector('#pageError');
    expect(pageError.textContent).toEqual(' no members found  close ');
  }));
});

