using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicles.Models;
using Vehicles.Service;

namespace Vehicles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersoanaController : ControllerBase
    {
        private readonly IPersoanaData persoanaData;

        public PersoanaController(IPersoanaData persoanaData)
        {
            this.persoanaData = persoanaData;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await persoanaData.GetPersoane();
            return Ok(result);
        }

        // POST api/<VehicolController>
        [HttpPost]
        public ActionResult Post([FromBody] Persoana persoana)
        {
            persoanaData.CreatePersoana(persoana);
            return Ok();
        }
        // PUT api/<VehicolController>/5
        [HttpPut]
        public ActionResult Put([FromBody] Persoana persoana)
        {
            persoanaData.UpdatePersoana(persoana);
            return Ok();
        }

        // DELETE api/<VehicolController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            persoanaData.DeletePersoana(id);
            return Ok();
        }

        [HttpGet("{cnp}")]
        public ActionResult IsCnpExist(long cnp)
        {
            var exist = persoanaData.IsExist(cnp);

            return Ok(new {exista = exist.Result });
        }
    }
}
