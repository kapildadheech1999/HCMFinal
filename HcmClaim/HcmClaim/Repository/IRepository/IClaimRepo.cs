

using HcmClaim.Modals;

namespace HcmClaim.Repository.IRepository
{
    public interface IClaimRepo
    {
        List<Claim> GetClaims();
        void AddClaim(Claim claim);
    }
}
