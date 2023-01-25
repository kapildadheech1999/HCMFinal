using HcmMember.Dto;
using HcmMember.Modals;

namespace HcmMember.Repository.IRepository
{
    public interface IMemberAndPhysician
    {
        List<Physician> GetPhysicians();
        List<Member> GetMembers();
        void AddMember(Member member);
    }
}
