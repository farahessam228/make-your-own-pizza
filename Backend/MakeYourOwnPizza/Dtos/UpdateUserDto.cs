using MakeYourOwnPizza.Models;
using System;

namespace MakeYourOwnPizza.Dtos
{
    public class UpdateUserDto
    {
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? phone { get; set; }
        public string? address { get; set; }
        public Role? role { get; set; }
        public bool? isActive { get; set; }
      
    }
}
