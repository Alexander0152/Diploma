using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelAppServer.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public int CountryId { get; set; }
        public string Name { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public int Rating { get; set; }
        public string Image { get; set; }
        public string Link { get; set; }
    }
}
