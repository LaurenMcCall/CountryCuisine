using System;

namespace CountryCuisine.Models
{
    public class Music
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
        public string Artist { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }


        public int CountryId { get; set; }

        public Country Country { get; set; }

    }
}