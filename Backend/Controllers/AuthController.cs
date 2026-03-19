using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services;
using Backend.Data;
using Newtonsoft.Json.Linq;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApiService _apiService;
        private readonly AppDbContext _context;

        public AuthController(ApiService apiService, AppDbContext context)
        {
            _apiService = apiService;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var result = await _apiService.Login(request.Email, request.Password);

            var json = JObject.Parse(result);
            var body = json["Response_Body"];

            if (body == null || body.ToString().Contains("Invalid"))
            {
                return BadRequest("Invalid login");
            }

            var locations = body[0]["User_Locations"];

            _context.Location_Details.RemoveRange(_context.Location_Details);
            await _context.SaveChangesAsync();

            foreach (var loc in locations)
            {
                _context.Location_Details.Add(new Location
                {
                    Location_Code = loc["Location_Code"].ToString(),
                    Location_Name = loc["Location_Name"].ToString()
                });
            }

            await _context.SaveChangesAsync();

            return Ok(locations);
        }

        [HttpGet("locations")]
        public IActionResult GetLocations()
        {
            return Ok(_context.Location_Details.ToList());
        }
    }
}