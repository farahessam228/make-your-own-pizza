using System.ComponentModel.DataAnnotations;
namespace MakeYourOwnPizza.Dtos
{
    public class CheckEmailDto
    {
        [Required(ErrorMessage ="Email Is Required")]
        [EmailAddress(ErrorMessage="Invalid Email Address")]
        public string email { get; set; }
        [Required]
        public string otp {get;set;}
    }
}
