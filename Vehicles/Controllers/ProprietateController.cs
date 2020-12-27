using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicles.Data;
using Vehicles.Models;
using Vehicles.Service;

namespace Vehicles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProprietateController : ControllerBase
    {
        private readonly IProprietateData proprietateData;

        public ProprietateController(IProprietateData proprietateData)
        {
            this.proprietateData = proprietateData;
        }



        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await proprietateData.GetProprietati();
            return Ok(result);
        }

        // POST api/<VehicolController>
        [HttpPost]
        public ActionResult Post([FromBody] Proprietate proprietate)
        {
            proprietateData.CreateProprietate(proprietate);
            return Ok();
        }
        // PUT api/<VehicolController>/5
        [HttpPut]
        public ActionResult Put([FromBody] Proprietate proprietate)
        {
            proprietateData.UpdateProprietate(proprietate);
            return Ok();
        }

        // DELETE api/<VehicolController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            proprietateData.DeleteProprietate(id);
            return Ok();
        }


    }
}
