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
    public class FeedbackController : ControllerBase
    {
        TravelUsersContext db;
        public FeedbackController(TravelUsersContext context)
        {
            db = context;
            if (!db.Feedbacks.Any())
            {
                db.Feedbacks.Add(new Feedback { UserId = 1, CountryId = 1, FeedbackText = "Some feedback" });
                db.SaveChanges();
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<dynamic>>> Get()
        {
            //return await db.Feedbacks.ToListAsync();
            var result = await db.Feedbacks.Join(db.Users, 
        f => f.UserId,
        u => u.Id,
        (f, u) => new
        {
            Name = u.Name,
            Email = u.Email,
            FeedbackText = f.FeedbackText,
            CountryId = f.CountryId,
        }).Join(db.Countries,
        f => f.CountryId,
        c => c.Id,
        (f, c) => new
        {
            Name = f.Name,
            Email = f.Email,
            Country = c.Countryname,
            FeedbackText = f.FeedbackText,
        }).ToListAsync();
            return result;
        }

        // GET api/Feedbacks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Feedback>> Get(int id)
        {
            Feedback Feedback = await db.Feedbacks.FirstOrDefaultAsync(x => x.Id == id);
            List<Feedback> Feedbacks = await db.Feedbacks.ToListAsync();
            if (Feedback == null)
                return NotFound();
            return new ObjectResult(Feedback);
        }


        [HttpPost("[action]")]
        public async Task<ActionResult<Feedback>> AddFeedback([FromBody] Feedback Feedback)
        {
            if (Feedback == null)
            {
                return BadRequest();
            }

            db.Feedbacks.Add(Feedback);
            await db.SaveChangesAsync();
            return Ok(Feedback);
        }


        // PUT api/Feedbacks/
        [HttpPut]
        public async Task<ActionResult<Feedback>> Put(Feedback Feedback)
        {
            if (Feedback == null)
            {
                return BadRequest();
            }
            if (!db.Feedbacks.Any(x => x.Id == Feedback.Id))
            {
                return NotFound();
            }

            db.Update(Feedback);
            await db.SaveChangesAsync();
            return Ok(Feedback);
        }

        // DELETE api/Feedbacks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Feedback>> Delete(int id)
        {
            Feedback Feedback = db.Feedbacks.FirstOrDefault(x => x.Id == id);
            if (Feedback == null)
            {
                return NotFound();
            }
            db.Feedbacks.Remove(Feedback);
            await db.SaveChangesAsync();
            return Ok(Feedback);
        }
    }
}
