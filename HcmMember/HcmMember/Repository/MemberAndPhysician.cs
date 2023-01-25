using HcmMember.Dto;
using HcmMember.Modals;
using HcmMember.Repository.IRepository;

namespace HcmMember.Repository
{
    public class MemberAndPhysician : IMemberAndPhysician
    {
        private readonly ToDoContext context;
        public MemberAndPhysician(ToDoContext context)
        {
            this.context = context;
        }

        public void AddMember(Member member)
        {
            context.Members.Add(member);
            context.SaveChanges();
        }

        public List<Member> GetMembers()
        {
            var members = context.Members.ToList();
            return members;
        }

        public List<Physician> GetPhysicians()
        {
            var physicians = context.Physicians.ToList();
            return physicians;
        }
    }
}
