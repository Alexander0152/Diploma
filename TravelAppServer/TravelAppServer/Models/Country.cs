using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelAppServer.Models
{
    public class Country
    {
        public int Id { get; set; }
        public int PhoneCode { get; set; }
        public string CountryCode { get; set; }
        public string Countryname { get; set; }
    }
}
