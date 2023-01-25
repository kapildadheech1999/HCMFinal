using HcmMember.Dto;
using HcmMember.Helper.IProvider;
using HcmMember.Provider.IProvider;
using System.Net;
using System.Text;
using System.Text.Json;

namespace HcmMember.Provider
{
    public class Registration : IRegistration
    {
        private readonly IRegister helper;
        public Registration(IRegister helper)
        {
            this.helper = helper;
        }
    
        public async Task<HttpStatusCode> Register(MemberDto memberDto)
        {
            RegistrationRequsetDto register = new RegistrationRequsetDto();
            register.UserName = memberDto.UserName;
            register.Password = memberDto.Password;
            register.Name = memberDto.FirstName;
            register.Role = "Member";

            HttpClient client = helper.Initial();
            var Register = JsonSerializer.Serialize(register);
            var requestContent = new StringContent(Register, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await client.PostAsync("HealthCare/register", requestContent);
            return response.StatusCode;
        }
    }
}
