using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TravelAppServer.Models;

namespace TravelAppServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelsController : ControllerBase
    {
        TravelUsersContext db;
        public HotelsController(TravelUsersContext context)
        {
            db = context;
            if (!db.Hotels.Any())
            {
                db.Hotels.Add(new Hotel { CountryId = 1, Name = "Tom", Longitude = 1.1, Latitude = 2.1, Rating = 5, Image = "imagepath", Link = "linkpath" });
                db.SaveChanges();
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> Get([FromQuery(Name = "countryId")] int countryId, [FromQuery(Name = "lat")] double lat, [FromQuery(Name = "lng")] double lng)
        {
            var hotels = db.Hotels.Where(x => x.CountryId == countryId);
            //Hotel horel = await db.Hotels.FirstOrDefaultAsync(x => x.Id == id);
            if (hotels == null)
                return NotFound();
            return new ObjectResult(hotels);
        }
        /*
        // GET api/hotels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Hotel>>> Get(int countryId)
        {
            var hotels = db.Hotels.Where(x => x.CountryId == countryId);
            //Hotel horel = await db.Hotels.FirstOrDefaultAsync(x => x.Id == id);
            List<User> users = await db.Users.ToListAsync();
            if (hotels == null)
                return NotFound();
            return new ObjectResult(hotels);
        }
        */
    }
}
