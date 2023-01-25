using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;

namespace HcmMember.Modals
{
    public class Member
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Password not matched")]
        public string ConfirmPassword { get; set; }
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
        public Physician Physician { get; set; }
        public int PhysicianId { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastModificationDate { get; set; }
    }
}
