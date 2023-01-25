import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  findMemberByFirstNameAndLastName,
  findMemberById,
  MEMBERS,
  MEMBER,
  findMemberByPhysicianname,
  findMemberByClaimId,
  CLAIMS,
  REGISTER,
  loginResponse,
  findMemberByClaimId1,
} from 'src/moqdata/memberAndClaimData';
import { Claim } from '../model/Claim';
import { PostMember } from '../model/PostMember';
import { Register } from '../model/Register';
import { UserLogin } from '../model/userLogin';

describe('ConfigServece', () => {
  let configService: ConfigService,
    httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigService, HttpClientTestingModule],
    });
    (configService = TestBed.inject(ConfigService)),
      (httpTestingController = TestBed.inject(HttpTestingController));
  });

  it('Should find a member by id', () => {
    configService.getMemberByMemberId(1).subscribe((member) => {
      expect(member).toBeTruthy();

      expect(member.memberId).toBe(1);
    });
    const req = httpTestingController.expectOne(
      'https://localhost:44325/HealthCare/ByMemberId/1'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(MEMBER[1]);
  });

  it('Should find a member by first and last name', () => {
    configService
      .getMemberByFirstAndLastName('Kapil', 'Dadheech')
      .subscribe((members) => {
        expect(members).toBeTruthy();

        expect(members.length).toBe(1);
      });
    const req = httpTestingController.expectOne(
      'https://localhost:44325/HealthCare' +
        '/ByFirstNameAndLastName' +
        '?firstName=Kapil&lastName=Dadheech'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(findMemberByFirstNameAndLastName('Kapil', 'Dadheech'));
  });

  it('Should find a member by physician name', () => {
    configService.getMembersByPhysicianName('Mark').subscribe((members) => {
      expect(members).toBeTruthy();

      expect(members.length).toBe(1);
    });
    const req = httpTestingController.expectOne(
      'https://localhost:44325/HealthCare' +
        '/GetMembersByPhysicianName?' +
        'name=Mark'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(findMemberByPhysicianname('Mark'));
  });

  it('Should find a member by claim id', () => {
    configService.getMemberByClaimId(2).subscribe((member) => {
      expect(member).toBeTruthy();

      expect(member.memberId).toBe(2);
    });
    const req = httpTestingController.expectOne(
      'https://localhost:44325/HealthCare' + '/GetMemberByClaim/2'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(findMemberByClaimId1(2));
  });

  it('Should submit claim', () => {
    let claim: Claim = {
      claimType: 'test',
      claimAmount: 1200,
      remarks: '',
      memberId: 3,
    };
    configService.submitClaim(claim).subscribe((claim) => {
      expect(claim).toBeTruthy();

      expect(claim.claimId).toBe(3);
    });
    const req = httpTestingController.expectOne(
      'https://localhost:44316/HealthCare/SubmitClaim'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(CLAIMS[3]);
  });

  it('Should add   a member', () => {
    let member: PostMember = {
      firstName: 'Kapil',
      lastName: 'Dadheech',
      userName: 'kapil161',
      password: 'kapil',
      confirmPassword: 'kapil',
      address: 'Ward no 15',
      state: 'Rajasthan',
      city: 'Jhunjhunu',
      email: 'kamil.monu@gmail.com',
      dateOfBirth: new Date(),
    };
    configService.addMember(member).subscribe((member) => {
      expect(member).toBeTruthy();

      expect(member.memberId).toBe(1);
    });
    const req = httpTestingController.expectOne(
      'https://localhost:44335/HealthCare/AddMember'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(MEMBER[1]);
  });

  it('Should register a admin', () => {
    let user: Register = {
      userName: 'kamil.monu@gmail.com',
      name: 'Kapil dadheech',
      password: 'kapil161',
      role: 'Admin',
    };
    configService.registerUser(user).subscribe((user) => {
      expect(user).toBeTruthy();

      expect(user.userName).toBe("kamil.monu@gmail.com");
    });
    const req = httpTestingController.expectOne(
      'https://localhost:44343/HealthCare/register'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(REGISTER["kamil.monu@gmail.com"]);
  });

  it('Should login', () => {
    let user: UserLogin = {
      username: 'kamil.monu@gmail.com',
      password: 'kapil161'
    };
    configService.getUserToken(user).subscribe((user) => {
      expect(user).toBeTruthy();

      expect(user.user.userName).toBe("kamil.monu@gmail.com");
    });
    const req = httpTestingController.expectOne(
      'https://localhost:44343/HealthCare/login'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(loginResponse);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
