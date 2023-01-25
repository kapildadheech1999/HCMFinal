using AutoMapper;
using Castle.Core.Logging;
using HcmClaim;
using HcmClaim.Controllers;
using HcmClaim.Dto;
using HcmClaim.Modals;
using HcmClaim.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NUnitTests
{
    [TestFixture]
    public class ClaimControllerNUnitTests
    {
        List<Claim> claims;
        ClaimDto claim;
        private static IMapper _mapper;
        [SetUp]
        public void Setup()
        {
            claims = new()
            {
                new Claim(){ClaimId=1,ClaimAmount=45699,ClaimDate=DateTime.Now,ClaimType="Accident",Remarks="",MemberId=2},
                new Claim(){ClaimId=2,ClaimAmount=8900,ClaimDate=DateTime.Now,ClaimType="Other",Remarks="",MemberId=3}
            };
            claim = new()
            { 
                ClaimAmount = 45699,
                ClaimType = "Other",
                Remarks = "",
                MemberId = 2
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
        public void AddClaim_InputClaim_OutputCreated()
        {
            var logMock = new Mock<ILogger<ClaimController>>();
            var claimRepoMock = new Mock<IClaimRepo>();
            ClaimController obj = new ClaimController(claimRepoMock.Object, _mapper, logMock.Object);
            var response = obj.SubmitClaim(claim);
            ObjectResult result = response as ObjectResult;
            Assert.AreEqual(201, result.StatusCode);
        }
        [Test]
        public void GetClaims_OutputClaims()
        {
            var logMock = new Mock<ILogger<ClaimController>>();
            var claimRepoMock = new Mock<IClaimRepo>();
            claimRepoMock.Setup(u => u.GetClaims()).Returns(claims);
            ClaimController obj = new ClaimController(claimRepoMock.Object, _mapper, logMock.Object);
            var response = obj.getClaimsList();
            ObjectResult result = response.Result as ObjectResult;
            Assert.AreEqual(200, result.StatusCode);
        }

    }
}
