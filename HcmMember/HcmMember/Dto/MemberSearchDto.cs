using System.ComponentModel.DataAnnotations;

namespace HcmMember.Dto
{
    public class MemberSearchDto
    {
        [Required]
        public int MemberId { get; set; }
        [Required]
        [MinLength(5)]
        [MaxLength(20)]
        public string FirstName { get; set; }
        [Required]
        [MinLength(5)]
        [MaxLength(20)]
        public string LastName { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        [MaxLength(100)]
        public string Address { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public int PhysicianId { get; set; }
    }
}
