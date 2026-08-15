using System;
using MakeYourOwnPizza.Models;

namespace MakeYourOwnPizza.Dtos
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public Role role { get; set; }
        public string? refreshToken { get; set; }
        public DateTime? refreshTokenExpiryTime { get; set; }
        public bool isActive { get; set; }
        public bool isDeleted { get; set; }
    }
}
