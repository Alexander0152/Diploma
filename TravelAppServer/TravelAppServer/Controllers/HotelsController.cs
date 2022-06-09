using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TravelAppServer.Models;
using TravelAppServer.Services;

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
        public async Task<ActionResult<IEnumerable<Hotel>>> Get([FromQuery(Name = "countryCode")] string countryCode, [FromQuery(Name = "lat")] double lat, [FromQuery(Name = "lng")] double lng)
        {
            List<Hotel> result = new List<Hotel>();
            List<Hotel> hotels = null;
            Country country = db.Countries.Where(x => x.CountryCode == countryCode).FirstOrDefault();
            if (country != null)
            {
                hotels = db.Hotels.Where(x => x.CountryId == country.Id).ToList();
            }


            if (hotels == null)
                return NotFound();

            MapService mapService = new MapService();
            double distance = 0;

            foreach (Hotel hotel in hotels)
            {
                distance = mapService.GetDistance(lat, lng, hotel.Latitude, hotel.Longitude);

                if (distance <= 100) // km
                {
                    result.Add(hotel);
                }

            }

            return new ObjectResult(result);
        }
    }
}
