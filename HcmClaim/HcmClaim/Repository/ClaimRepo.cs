using HcmClaim.Modals;
using HcmClaim.Repository.IRepository;

namespace HcmClaim.Repository
{
    public class ClaimRepo : IClaimRepo
    {
        private readonly ToDoContext context;
        public ClaimRepo(ToDoContext context)
        {
            this.context = context;
        }

        public void AddClaim(Claim claim)
        {
            context.Claims.Add(claim);
            context.SaveChanges();
        }

        public List<Claim> GetClaims()
        {
            var claims = context.Claims.ToList();
            return claims;
        }
    }
}
