using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TravelAppServer.Models;
using System.Dynamic;

namespace TravelAppServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SiteFeedbacksController : ControllerBase
    {
        TravelUsersContext db;
        public SiteFeedbacksController(TravelUsersContext context)
        {
            db = context;
            if (!db.SiteFeedbacks.Any())
            {
                db.SiteFeedbacks.Add(new SiteFeedback { Name = "some name", Email = "some email", Text = "some text", Date = new System.DateTime() });
                db.SaveChanges();
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<SiteFeedback>> AddFeedback([FromBody] SiteFeedback feedback)
        {
            if (feedback == null)
            {
                return BadRequest();
            }

            db.SiteFeedbacks.Add(feedback);
            await db.SaveChangesAsync();

            return Ok(feedback);
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<SiteFeedback>>> GetFeedbacks()
        {
            return await db.SiteFeedbacks.ToListAsync();
        }
    }
}
