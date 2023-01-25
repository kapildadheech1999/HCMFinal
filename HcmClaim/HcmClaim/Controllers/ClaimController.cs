using AutoMapper;
using HcmClaim.Dto;
using HcmClaim.Modals;
using HcmClaim.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Web.Http;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace HcmClaim.Controllers
{
    [ApiController]
    [Route("HealthCare")]
    public class ClaimController:ControllerBase
    {
        private readonly IClaimRepo Repo;
        private readonly IMapper mapper;
        private readonly ILogger<ClaimController> log;
        public ClaimController(IClaimRepo Repo, IMapper mapper, ILogger<ClaimController> log)
        {
            this.Repo = Repo;
            this.mapper = mapper;
            this.log = log; 
        }

        [HttpPost]
        [Route("SubmitClaim")]
        public ActionResult SubmitClaim(ClaimDto claimDto)
        {
            if (!ModelState.IsValid)
            {
                var msg = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent(string.Format("Claim model state invalid"))
                };
                throw new HttpResponseException(msg);
            }
            Claim claim = new Claim();
            claim = mapper.Map<Claim>(claimDto);
            claim.ClaimDate = DateTime.Now;
            log.LogInformation("Adding claim to database");
            Repo.AddClaim(claim);

            return Created("https://localhost:44316/HealthCare/GetClaimByClaimId/" + claim.ClaimId
                , claim);
        }
        [HttpGet]
        [Route("GetClaimByClaimId/{id}")]
        public ActionResult<Claim> GetClaimById(int id)
        {
            List<Claim> claims = Repo.GetClaims();
            var claim = claims.SingleOrDefault(c => c.ClaimId == id);
            return Ok(claim);
        }

        [HttpGet]
        [Route("GetClaims")]
        public ActionResult<Claim> getClaimsList()
        {
            log.LogInformation("Getting claims from database");
            var claims = Repo.GetClaims();
            if (claims.Count == 0)
            {
                var msg = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(string.Format("No claims in database"))
                };
                throw new HttpResponseException(msg);
            }
            return Ok(claims);
        }
    }
}
