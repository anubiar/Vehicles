﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicles.Models;
using Vehicles.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Vehicles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicolController : ControllerBase
    {
        private readonly IVehicolData vehicolData;

        public VehicolController(IVehicolData vehicolData)
        {
            this.vehicolData = vehicolData;
        }



        // GET: api/<VehicolController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await vehicolData.getVehicole();
            return Ok(result);
        }

        // GET api/<VehicolController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<VehicolController>
        [HttpPost]
        public ActionResult Post([FromBody] Vehicle vehicle)
        {
            vehicolData.createVehicol(vehicle);
            return Ok();
        }

        // PUT api/<VehicolController>/5
        [HttpPut]
        public ActionResult Put([FromBody] Vehicle vehicle)
        {
            vehicolData.updateVehicol(vehicle);
            return Ok();
        }

        // DELETE api/<VehicolController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            vehicolData.deleteVehicol(id);
            return Ok();
        }
    }
}
