using AutoMapper;
using HcmMember.Dto;
using HcmMember.Modals;

namespace HcmMember
{
    public class MappingConfig:Profile
    {
        public MappingConfig()
        {
            CreateMap<MemberDto, Member>();
            CreateMap<Member,MemberSearchDto>();
            CreateMap<Physician,PhysicianDto>();
        }
    }
}
