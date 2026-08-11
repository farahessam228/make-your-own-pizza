using System.ComponentModel.DataAnnotations;
using MakeYourOwnPizza.Models;
namespace MakeYourOwnPizza.Dtos
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "First name is required")]
        public string firstName { get; set; }
        [Required(ErrorMessage = "Last name is required")]
        public string lastName { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string password { get; set; }
        [Required(ErrorMessage = "Confirm password is required")]
        [Compare("password", ErrorMessage = "Passwords do not match")]
        public string confirmPassword { get; set; }
        [Required(ErrorMessage = "Phone number is required")]
        [Phone(ErrorMessage = "Invalid phone number")]
        public string phone { get; set; }
        [Required(ErrorMessage = "Address is required")]
        public string address { get; set; }
        [Required(ErrorMessage = "Role is required")]
        public Role role { get; set; }
        }
}
