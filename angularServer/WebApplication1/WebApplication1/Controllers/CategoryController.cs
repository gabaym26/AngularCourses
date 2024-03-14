using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        // Mock data for demonstration
        private static List<Category> categories= new List<Category>
        {
            new Category{Id=0,Name="hard",IconRouting="\\assets\\categories-icons/01.png"},
            new Category{Id=1, Name="first",IconRouting="\\assets\\categories-icons/02.png"}
        };

        // GET: api/User
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(categories);
        }

        // GET: api/User/5
        //[HttpGet("{id}")]
        //public IActionResult Get(int id)
        //{
        //    var user = users.Find(u => u.Id == id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(user);
        //}

        //// POST: api/User
        //[HttpPost]
        //public bool Post([FromBody] User user)
        //{
        //    if (user == null)
        //    {
        //        return false;
        //    }

        //    users.Add(user);
        //    return true;
        //}

        //// PUT: api/User/5
        //[HttpPut("{id}")]
        //public IActionResult Put(int id, [FromBody] User user)
        //{
        //    var index = users.FindIndex(u => u.Id == id);
        //    if (index == -1)
        //    {
        //        return NotFound();
        //    }

        //    users[index] = user;
        //    return NoContent();
        //}

        //// DELETE: api/User/5
        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    var user = users.Find(u => u.Id == id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    users.Remove(user);
        //    return NoContent();
        //}
    }
}


