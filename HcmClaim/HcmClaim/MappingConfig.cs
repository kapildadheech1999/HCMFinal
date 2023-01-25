using AutoMapper;
using HcmClaim.Dto;
using HcmClaim.Modals;

namespace HcmClaim
{
    public class MappingConfig:Profile
    {
        public MappingConfig()
        {
            CreateMap<ClaimDto, Claim>();
        }
    }
}
