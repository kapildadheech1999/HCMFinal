using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HcmClaim.Modals
{
    public class Claim
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ClaimId { get; set; }
        [Required]
        public string ClaimType { get; set; }
        [Required]
        public int ClaimAmount { get; set; }
        [Required]
        [MaxLength(1000)]
        public string Remarks { get; set; }
        [Required]
        public DateTime ClaimDate { get; set; }
        [Required]
        public int MemberId { get; set; }
    }
}
