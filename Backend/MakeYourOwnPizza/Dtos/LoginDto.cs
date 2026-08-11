using MakeYourOwnPizza.Models;
using System.ComponentModel.DataAnnotations;

namespace MakeYourOwnPizza.Dtos
{
    public class LoginDto
    {
       
       
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string email { get; set; }


        [Required(ErrorMessage = "Password is required")]
        public string password { get; set; }
    
    }
}
