import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MEMBER } from 'src/moqdata/memberAndClaimData';
import { ConfigService } from '../config/config.service';
import { Member } from '../model/Member';
import {delay} from 'rxjs/operators';


import { MembermainpageComponent } from './membermainpage.component';

describe('MembermainpageComponent', () => {
  let component: MembermainpageComponent;
  let fixture: ComponentFixture<MembermainpageComponent>;
  let configService: any;
  let activatedRoute: any;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    const configServiceSpy = jasmine.createSpyObj('ConfigService', ['getMemberByUserName']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    TestBed.configureTestingModule({
      declarations: [MembermainpageComponent],
      providers: [
        {provide: ConfigService, useValue: configServiceSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy}
      ],
      imports:[HttpClientTestingModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MembermainpageComponent);
        component = fixture.debugElement.componentInstance;
        configService = TestBed.inject(ConfigService);
        activatedRoute = TestBed.inject(ActivatedRoute);
        el = fixture.debugElement;
      });  
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrive member', fakeAsync(() => {
    configService.getMemberByUserName.and.callFake(() => {
      return of(MEMBER[1]).pipe(delay(300));
    });
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    fixture.detectChanges();
    tick(300);
    flush();
    fixture.detectChanges();
    const div = el.query(By.css('.member-content'));
    const id = div.query(By.css('.member-id'));
    expect(div).toBeTruthy();
    expect(component.member).toEqual(MEMBER[1]);
    expect(id.nativeElement.textContent).toContain('Member Id: 1');
  }));
  
});
