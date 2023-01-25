using HcmClaim.Modals;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HcmClaim.Dto
{
    public class ClaimDto
    {
        [Required]
        public string ClaimType { get; set; }
        [Required]
        public int ClaimAmount { get; set; }
        [Required]
        [MaxLength(1000)]
        public string Remarks { get; set; }
        [Required]
        public int MemberId { get; set; }
    }
}
