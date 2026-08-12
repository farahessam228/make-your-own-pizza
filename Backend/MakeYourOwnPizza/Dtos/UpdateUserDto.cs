using MakeYourOwnPizza.Models;
using System;

namespace MakeYourOwnPizza.Dtos
{
    public class UpdateUserDto
    {
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? email { get; set; }
        // password intentionally excluded here; use dedicated endpoint to change password
        public string? phone { get; set; }
        public string? address { get; set; }
        public Role? role { get; set; }
        public bool? isActive { get; set; }
        public bool? isDeleted { get; set; }
        public string? refreshToken { get; set; }
        public DateTime? refreshTokenExpiryTime { get; set; }
    }
}
