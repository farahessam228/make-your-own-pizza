using System.ComponentModel.DataAnnotations;


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
        public string? refreshToken { get; set; } = null;
        public DateTime? refreshTokenExpiryTime { get; set; } = null;
        public bool isActive { get; set; } = false;
        public bool isDeleted { get; set; } = false;
        public ICollection<Order> orders { get; set; } = new HashSet<Order>();
    }
