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
    public class FeedbacksController : ControllerBase
    {
        TravelUsersContext db;
        public FeedbacksController(TravelUsersContext context)
        {
            db = context;
            if (!db.Feedbacks.Any())
            {
                db.Feedbacks.Add(new Feedback { ParentId = 1, UserId = 1, CountryId = 1, FeedbackText = "Some feedback", Date = new System.DateTime() });
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
        public async Task<ActionResult<Feedback>> AddFeedback([FromBody] Feedback feedback)
        {
            if (feedback == null)
            {
                return BadRequest();
            }

            db.Feedbacks.Add(feedback);
            await db.SaveChangesAsync();

            int id = (int)feedback.Id;

            var dBFeedback = await db.Feedbacks.FirstOrDefaultAsync(x => x.Id == id);
            User user = await db.Users.FirstOrDefaultAsync(x => x.Id == dBFeedback.UserId);

            dynamic resultFeedback = new ExpandoObject();
            resultFeedback.id = dBFeedback.Id;
            resultFeedback.parentId = dBFeedback.ParentId;
            resultFeedback.userId = dBFeedback.UserId;
            resultFeedback.countryId = dBFeedback.CountryId;
            resultFeedback.feedbackText = dBFeedback.FeedbackText;
            resultFeedback.date = dBFeedback.Date;
            resultFeedback.userName = user.Name;

            return new ObjectResult(resultFeedback);
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<Feedback>> GetFeedbacks([FromQuery(Name = "countryId")] int countryId)
        {
            var rootFeedbacks = db.Feedbacks.Where(x => x.ParentId == null && x.CountryId == countryId).OrderByDescending(x => x.Date).ToList();

            dynamic resultFeedbacks = new List<ExpandoObject>();

            foreach (Feedback feedback in rootFeedbacks)
            {
                User user = await db.Users.FirstOrDefaultAsync(x => x.Id == feedback.UserId);

                dynamic resultFeedback = new ExpandoObject();

                resultFeedback.id = feedback.Id;
                resultFeedback.parentId = feedback.ParentId;
                resultFeedback.userId = feedback.UserId;
                resultFeedback.countryId = feedback.CountryId;
                resultFeedback.feedbackText = feedback.FeedbackText;
                resultFeedback.date = feedback.Date;
                resultFeedback.userName = user.Name;

                var replies = db.Feedbacks.Where(x => x.ParentId == feedback.Id).OrderBy(x => x.Date).ToList();

                dynamic repliesWithUserName = new List<ExpandoObject>();

                if (replies != null)
                {
                    foreach (Feedback replyFeedback in replies)
                    {
                        User replyUser = await db.Users.FirstOrDefaultAsync(x => x.Id == replyFeedback.UserId);

                        dynamic resultReplyFeedback = new ExpandoObject();

                        resultReplyFeedback.id = replyFeedback.Id;
                        resultReplyFeedback.parentId = replyFeedback.ParentId;
                        resultReplyFeedback.userId = replyFeedback.UserId;
                        resultReplyFeedback.countryId = replyFeedback.CountryId;
                        resultReplyFeedback.feedbackText = replyFeedback.FeedbackText;
                        resultReplyFeedback.date = replyFeedback.Date;
                        resultReplyFeedback.userName = replyUser.Name;

                        repliesWithUserName.Add(resultReplyFeedback);
                    }

                    resultFeedback.replies = repliesWithUserName;
                }
                else resultFeedback.replies = null;

                resultFeedbacks.Add(resultFeedback);

            }

            return new ObjectResult(resultFeedbacks);
        }


        [HttpGet("[action]")]
        public async Task<ActionResult<Feedback>> UpdateFeedback([FromQuery(Name = "commentId")] int id, [FromQuery(Name = "text")] string text)
        {
            Feedback feedback = db.Feedbacks.FirstOrDefault(x => x.Id == id);
            if (feedback == null)
            {
                return NotFound();
            }

            feedback.FeedbackText = text;

            await db.SaveChangesAsync();
            return Ok(feedback);
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
            Feedback feedback = db.Feedbacks.FirstOrDefault(x => x.Id == id);
            if (feedback == null)
            {
                return NotFound();
            }

            var replies = db.Feedbacks.Where(x => x.ParentId == id);

            db.Feedbacks.Remove(feedback);

            if (replies != null)
            {
                db.Feedbacks.RemoveRange(replies);
            }

            await db.SaveChangesAsync();
            return Ok(feedback);
        }
    }
}
