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
    public class AdditionalController : ControllerBase
    {
        private readonly INrVehicoleData nrVehicoleData;

        public AdditionalController(INrVehicoleData nrVehicoleData)
        {
            this.nrVehicoleData = nrVehicoleData;
        }


        [HttpGet]
        public ActionResult<List<NrVehicoleResponse>> GetNrVehicole()
        {
            return Ok(nrVehicoleData.PunctC());
        }
    }
}
