using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelAppServer.Models
{
    public class CountryInfo
    {
        public int Id { get; set; }
        public int CountryId { get; set; }
        public double Rating { get; set; }
        public int NumberOfVoters { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
    }
}
