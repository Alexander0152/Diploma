using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelAppServer.Models
{
    public class Feedback
    {
        public Nullable<int> Id { get; set; }
        public Nullable<int> ParentId { get; set; }
        public int UserId { get; set; }
        public int CountryId { get; set; }
        public string FeedbackText { get; set; }
        public DateTime Date { get; set; }
    }
}
