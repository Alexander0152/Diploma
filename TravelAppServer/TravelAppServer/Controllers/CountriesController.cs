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
    public class CountriesController : ControllerBase
    {
        TravelUsersContext db;
        public CountriesController(TravelUsersContext context)
        {
            db = context;
            if (!db.Countries.Any())
            {
                db.Countries.Add(new Country { PhoneCode = 375, CountryCode = "BY", Countryname = "Default Country" });
                db.SaveChanges();
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Country>>> Get()
        {
            return await db.Countries.ToListAsync();
        }

        // GET api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Country>> Get(int id)
        {
            Country country = await db.Countries.FirstOrDefaultAsync(x => x.Id == id);
            List<Country> countries = await db.Countries.ToListAsync();
            if (country == null)
                return NotFound();
            return new ObjectResult(country);
        }


        // POST api/users
        [HttpPost]
        public async Task<ActionResult<Country>> Post(Country country)
        {
            if (country == null)
            {
                return BadRequest();
            }

            db.Countries.Add(country);
            await db.SaveChangesAsync();
            return Ok(country);
        }

        // PUT api/users/
        [HttpPost("[action]")]
        public async Task<ActionResult<Country>> UpdateCountry([FromBody] Country country)
        {
            if (country == null)
            {
                return BadRequest();
            }
            if (!db.Countries.Any(x => x.Id == country.Id))
            {
                return NotFound();
            }

            db.Update(country);
            await db.SaveChangesAsync();
            return Ok(country); 
        }
        //public async Task<ActionResult<User>> AddUser([FromBody] User user)
        //{
        //    if (user == null)
        //    {
        //        return BadRequest();
        //    }

        //    db.Users.Add(user);
        //    await db.SaveChangesAsync();
        //    return Ok(user);
        //}

        // DELETE api/users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Country>> Delete(int id)
        {
            Country country = db.Countries.FirstOrDefault(x => x.Id == id);
            if (country == null)
            {
                return NotFound();
            }
            db.Countries.Remove(country);
            await db.SaveChangesAsync();
            return Ok(country);
        }
    }
}
