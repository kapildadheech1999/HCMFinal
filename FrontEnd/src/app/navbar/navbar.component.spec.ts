import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { Router } from '@angular/router';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: any;

  beforeEach(waitForAsync(() => {
    const routeSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [{ provide: Router, useValue: routeSpy }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display logged in user links in navbar', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('mksmlcxmsxclsmlxs');
    const mockFunction = spyOn(component, 'logout').and.callThrough();
    fixture.detectChanges();
    const logoutElement: HTMLAnchorElement =
      fixture.debugElement.nativeElement.querySelector('#logout');
    const nonLoggedInHomeElement: HTMLAnchorElement =
      fixture.debugElement.nativeElement.querySelector('#nonLoggedInHome');
    const loggedInHomeElement: HTMLAnchorElement =
      fixture.debugElement.nativeElement.querySelector('#loggedInHome');
    const loginElement: HTMLAnchorElement =
      fixture.debugElement.nativeElement.querySelector('#login');
    expect(logoutElement.textContent).toEqual('Logout');
    expect(loginElement).toBeNull();
    expect(loggedInHomeElement.textContent).toEqual('Home');
    expect(nonLoggedInHomeElement).toBeNull();
    logoutElement.click();
    expect(mockFunction).toHaveBeenCalledTimes(1);
  }));

  it('should display no logged in user links in navbar', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    fixture.detectChanges();
    const logoutElement: HTMLAnchorElement =
      fixture.debugElement.nativeElement.querySelector('#logout');
    const nonLoggedInHomeElement: HTMLAnchorElement =
      fixture.debugElement.nativeElement.querySelector('#nonLoggedInHome');
    const loggedInHomeElement: HTMLAnchorElement =
      fixture.debugElement.nativeElement.querySelector('#loggedInHome');
    const loginElement: HTMLAnchorElement =
      fixture.debugElement.nativeElement.querySelector('#login');
    expect(logoutElement).toBeNull();
    expect(loginElement.textContent).toEqual('Login');
    expect(loggedInHomeElement).toBeNull();
    expect(nonLoggedInHomeElement.textContent).toEqual('Home');
  }));
});
