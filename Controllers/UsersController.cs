using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CountryCuisine.Models;


namespace CountryCuisine.Controllers
{
    // All of these routes will be at the base URL:     /api/Users
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case UsersController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that receives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public UsersController(DatabaseContext context)
        {
            _context = context;
        }
        // POST: api/Users
        //
        // Creates a new user in the database.
        //
        // The `body` of the request is parsed and then made available to us as a User
        // variable named user. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our User POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            try
            {
            // Indicate to the database context we want to add this new record
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
            }
            catch (Microsoft.EntityFrameworkCore.DbUpdateException)
             {
                var response = new
                {
                    status = 400,
                    errors = new List<string>(){ "This account already exists!" }
                };
                return BadRequest(response);
            }
 
        }

        [HttpPost("{id}/Countries/{countryId}")]
        public async Task<ActionResult<Country>> PostCountryToUserPage(int id, int countryId)
        {
            {
                var userCountry = await _context.Countries.FindAsync(countryId);
                var currentUser = await _context.Users.FindAsync(id);
                Console.WriteLine("**********", userCountry);
                if (userCountry == null)
                {
                    return NotFound();
                }
                // country.Id = userCountry.Id;

                currentUser.Countries.Add(userCountry);
                // _context.Users.Countries.Add(country);
                await _context.SaveChangesAsync();
                return Ok(currentUser);
            }
        }

    }
}
