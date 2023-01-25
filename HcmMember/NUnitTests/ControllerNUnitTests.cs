using NUnit.Framework;
using System;
using HcmMember;
using HcmMember.Dto;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HcmMember.Modals;
using Moq;
using Castle.Core.Logging;
using HcmMember.Controllers;
using Microsoft.Extensions.Logging;
using HcmMember.Repository.IRepository;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using HcmMember.Provider.IProvider;
using System.Net;

namespace NUnitTests
{
    [TestFixture]
    public class ControllerNUnitTests
    {
        MemberDto member;
        List<Member> members;
        List<Physician> physicians;
        private static IMapper _mapper;
        [SetUp]
        public void Setup()
        {
            members = new()
            {
                new Member()
                {

                    MemberId = 2,
                    FirstName ="Kapil",
                    LastName ="Dadheech",
                    UserName = "Kamil.monu@gmail.com",
                    Password = "Kapil",
                    ConfirmPassword = "Kapil",
                    Address ="Ward No 15",
                    State = "Rajasthan",
                    City = "Jhunjhunu",
                    Email = "kamil.monu@gmail.com",
                    DateOfBirth = DateTime.Now,
                    PhysicianId = 4,
                    CreationDate = DateTime.Now,    
                    LastModificationDate = DateTime.Now
                },
                new Member()
                {
                    MemberId = 3,
                    FirstName ="Rohit",
                    LastName ="Dadheech",
                    UserName = "rohit.sonu@gmail.com",
                    Address ="Ward No 15",
                    State = "Rajasthan",
                    City = "Jhunjhunu",
                    Email = "rohit.sonu@gmail.com",
                    DateOfBirth = DateTime.Now,
                    PhysicianId = 6,
                    CreationDate= DateTime.Now,
                    LastModificationDate= DateTime.Now
                }
            };
            member = new MemberDto()
            {
                FirstName = "Prakesh",
                LastName = "Sharma",
                UserName = "Prakesh@gmail.com",
                Address = "Ward No 15",
                State = "Rajasthan",
                City = "Jhunjhunu",
                Email = "Prakesh@gmail.com",
                DateOfBirth = DateTime.Now
            };
            physicians = new()
            {
                new Physician(){PhysicianId=1,PhysicianName="John",PhysicianState="UT"},
                new Physician(){PhysicianId=2,PhysicianName="Hari",PhysicianState="UA"},
                new Physician(){PhysicianId=3,PhysicianName="Mittal",PhysicianState="TX"},
                new Physician(){PhysicianId=4,PhysicianName="Patrick",PhysicianState="OH"},
                new Physician(){PhysicianId=5,PhysicianName="Mark",PhysicianState="CA"},
                new Physician(){PhysicianId=6,PhysicianName="Jessica",PhysicianState="NY"},
                new Physician(){PhysicianId=7,PhysicianName="Mary",PhysicianState="IL"},
                new Physician(){PhysicianId=8,PhysicianName="Stacy",PhysicianState="FL"}
            };
            if (_mapper == null)
            {
                var mappingConfig = new MapperConfiguration(mc =>
                {
                    mc.AddProfile(new MappingConfig());
                });
                IMapper mapper = mappingConfig.CreateMapper();
                _mapper = mapper;
            }
        }
        
        [Test]  
        public async Task AddMember_InputMember_OutputCreated()
        {
            var logMock = new Mock<ILogger<MemberAndPhysicianController>>();
            var MemberAndPhysicianMock = new Mock<IMemberAndPhysician>();
            var registrationMock = new Mock<IRegistration>();
            registrationMock.Setup(u => u.Register(member)).ReturnsAsync(HttpStatusCode.OK);
            MemberAndPhysicianController obj = new MemberAndPhysicianController(_mapper
                ,MemberAndPhysicianMock.Object,logMock.Object,registrationMock.Object);
            var response = await obj.CreateMember(member);
            ObjectResult result = response as ObjectResult;   
            Assert.AreEqual(201, result.StatusCode);
        }
        [Test]
        public void GetMembers_OutputMembers()
        {
            var logMock = new Mock<ILogger<MemberAndPhysicianController>>();
            var MemberAndPhysicianMock = new Mock<IMemberAndPhysician>();
            var registrationMock = new Mock<IRegistration>();
            MemberAndPhysicianMock.Setup(u => u.GetMembers()).Returns(members);
            MemberAndPhysicianController obj = new MemberAndPhysicianController(_mapper
                , MemberAndPhysicianMock.Object, logMock.Object, registrationMock.Object);
            var response = obj.GetMembersList();
            OkObjectResult result = response.Result as OkObjectResult;
            Assert.AreEqual(200, result.StatusCode);
        }
        [Test]
        public void GetPhysicians_OutPhysicians()
        {
            var logMock = new Mock<ILogger<MemberAndPhysicianController>>();
            var MemberAndPhysicianMock = new Mock<IMemberAndPhysician>();
            var registrationMock = new Mock<IRegistration>();
            MemberAndPhysicianMock.Setup(u => u.GetPhysicians()).Returns(physicians);
            MemberAndPhysicianController obj = new MemberAndPhysicianController(_mapper
                , MemberAndPhysicianMock.Object, logMock.Object, registrationMock.Object);
            var response = obj.GetPhysicianList();
            OkObjectResult result = response.Result as OkObjectResult;
            Assert.AreEqual(200, result.StatusCode);
        }
    }
}
