using AutoMapper;
using HcmMember.Dto;
using HcmMember.Helper.IProvider;
using HcmMember.Modals;
using HcmMember.Provider.IProvider;
using HcmMember.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Web.Http;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace HcmMember.Controllers
{
    [ApiController]
    [Route("HealthCare")]
    public class MemberAndPhysicianController:ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IMemberAndPhysician Repo;
        private readonly ILogger<MemberAndPhysicianController> logger;
        private readonly IRegistration registration;
        public MemberAndPhysicianController(IMapper mapper, IMemberAndPhysician Repo, 
            ILogger<MemberAndPhysicianController> logger,IRegistration registration)
        {
            this.mapper = mapper;
            this.Repo = Repo;
            this.logger = logger;
            this.registration = registration;   
        }

        [HttpGet]
        [Route("Physicians")]
        public ActionResult<List<PhysicianDto>> GetPhysicianList()
        {
            logger.LogInformation("Getting Physician List");
            var physicians = Repo.GetPhysicians();
            if (physicians.Count == 0)
            {
                var msg = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(string.Format("No physicians in database"))
                };
                throw new HttpResponseException(msg);
            }
            return Ok(mapper.Map<List<PhysicianDto>>(physicians));
        }

        [HttpGet]
        [Route("GetMembers")]
        public ActionResult<List<MemberSearchDto>> GetMembersList()
        {
            logger.LogInformation("Getting Member List");
            List<Member> members = Repo.GetMembers();
            if (members.Count == 0)
            {
                var msg = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(string.Format("No members in database"))
                };
                throw new HttpResponseException(msg);
            }
            List<MemberSearchDto> memberSearchDto = new List<MemberSearchDto>();
            memberSearchDto = mapper.Map<List<MemberSearchDto>>(members);
            return Ok(memberSearchDto);
        }

        [HttpPost]
        [Route("AddMember")]
        public async Task<ActionResult> CreateMember(MemberDto memberDto)
        {
            if (!ModelState.IsValid)
            {
                var msg = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent(string.Format("Member model state invalid"))
                };
                throw new HttpResponseException(msg);
            }
            logger.LogInformation("Adding member in database");
            Member member = new Member();
            Random random = new Random();
            member = mapper.Map<Member>(memberDto);
            member.PhysicianId = random.Next(1,9);
            member.CreationDate = DateTime.Now;
            member.LastModificationDate = DateTime.Now;

            HttpStatusCode code = await registration.Register(memberDto);
            if(code == HttpStatusCode.OK)
            {
                Repo.AddMember(member);
                return Created("https://localhost:44325/HealthCare/ByMemberId/" + member.MemberId
                    , memberDto);
            }
            throw new HttpResponseException(HttpStatusCode.ServiceUnavailable);
        }
    }
}
