using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MakeYourOwnPizza.Data;
using MakeYourOwnPizza.Models;

namespace MakeYourOwnPizza.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DbHealthController : ControllerBase
    {
        private readonly AppDbContext _db;

        public DbHealthController(AppDbContext db)
        {
            _db = db;
        }

        // GET api/dbhealth/ping
        [HttpGet("ping")]
        public async Task<IActionResult> Ping()
        {
            try
            {
                var canConnect = await _db.Database.CanConnectAsync();
                bool tableAccessible = false;
                long ingredientsCount = -1;

                if (canConnect)
                {
                    // Attempt a lightweight query against the Ingredients table
                    tableAccessible = await _db.Set<Ingredients>().AnyAsync();
                    if (tableAccessible)
                    {
                        ingredientsCount = await _db.Set<Ingredients>().LongCountAsync();
                    }
                }

                return Ok(new
                {
                    status = (canConnect && tableAccessible) ? "ok" : (canConnect ? "partial" : "unavailable"),
                    canConnect,
                    tableAccessible,
                    ingredientsCount
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "error", message = ex.Message });
            }
        }
    }
}
