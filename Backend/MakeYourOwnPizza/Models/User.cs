using System.ComponentModel.DataAnnotations;
namespace MakeYourOwnPizza.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        
        public string phone { get; set; }
        public string address { get; set; }

        public Role role { get; set; }
        public string refreshToken { get; set; }
        public DateTime refreshTokenExpiryTime { get; set; }
        public ICollection<Order> orders { get; set; } = new HashSet<Order>();
    }
}
