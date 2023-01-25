using HcmMember.Dto;
using System.Net;

namespace HcmMember.Provider.IProvider
{
    public interface IRegistration
    {
        Task<HttpStatusCode> Register(MemberDto member);
    }
}
