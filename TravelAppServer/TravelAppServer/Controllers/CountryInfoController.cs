using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TravelAppServer.Models;

using System.IO;
using TravelAppServer.Entities;
using System.Text.Json;
using Newtonsoft.Json;

namespace TravelAppServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountryInfoController : ControllerBase
    {
        TravelUsersContext db;
        public CountryInfoController(TravelUsersContext context)
        {
            db = context;
            if (!db.CountryInfo.Any())
            {
                db.CountryInfo.Add(new CountryInfo { CountryId = 1, Rating = 9.5, NumberOfVoters = 234, Longitude = 45.34355, Latitude = 34.2324 });
                db.SaveChanges();
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<dynamic>>> Get()
        {
            var result = await db.CountryInfo.Join(db.Countries,
        p => p.CountryId,
        c => c.Id,
        (p, c) => new
        {
            CountryName = c.Countryname,
            CountryId = p.CountryId,
            Rating = p.Rating,
            NumberOfVoters = p.NumberOfVoters,
            Longitude = p.Longitude
        }).ToListAsync();
            return result;
        }

        [HttpGet("pageinfo/{countryName}")]
        public async Task<ActionResult<CountryPageInfo>> Get(string countryName)
        {
            StreamReader openStream = new StreamReader(@"c:\Diploma\TravelAppServer\TravelAppServer\data\countryInfo.json");
            string json = openStream.ReadToEnd();
            CountryPageInfo pageInfo = JsonConvert.DeserializeObject<CountryPageInfo>(json);
            //var result = JsonConvert.SerializeObject(pageInfo);

           // if (result == null)
           //     return NotFound();

            return new ObjectResult(pageInfo);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CountryInfo>> Get(int id)
        {
            CountryInfo countryInfo = await db.CountryInfo.FirstOrDefaultAsync(x => x.CountryId == id);
            List<CountryInfo> countries = await db.CountryInfo.ToListAsync();
            if (countryInfo == null)
                return NotFound();
            return new ObjectResult(countryInfo);
        }


        // POST api/users
        [HttpPost]
        public async Task<ActionResult<CountryInfo>> Post(CountryInfo countryInfo)
        {
            if (countryInfo == null)
            {
                return BadRequest();
            }

            db.CountryInfo.Add(countryInfo);
            await db.SaveChangesAsync();
            return Ok(countryInfo);
        }


        [HttpPost("[action]")]
        public async Task<ActionResult<CountryInfo>> UpdateCountry([FromBody] CountryInfo newCountryInfo)
        {
            if (newCountryInfo == null)
            {
                return BadRequest();
            }
            if (!db.CountryInfo.Any(x => x.CountryId == newCountryInfo.CountryId))
            {
                return NotFound();
            }

            var oldCountryInfo = await db.CountryInfo.FirstOrDefaultAsync(x => x.CountryId == newCountryInfo.CountryId);
            oldCountryInfo.Rating = newCountryInfo.Rating;
            oldCountryInfo.NumberOfVoters = newCountryInfo.NumberOfVoters;

            db.Update(oldCountryInfo);
            await db.SaveChangesAsync();
            return Ok(oldCountryInfo);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<CountryInfo>> Delete(int id)
        {
            CountryInfo countryInfo = db.CountryInfo.FirstOrDefault(x => x.Id == id);
            if (countryInfo == null)
            {
                return NotFound();
            }
            db.CountryInfo.Remove(countryInfo);
            await db.SaveChangesAsync();
            return Ok(countryInfo);
        }
    }
}
