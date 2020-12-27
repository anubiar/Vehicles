using System.Collections.Generic;
using System.Threading.Tasks;
using Vehicles.Models;

namespace Vehicles.Service
{
    public interface INrVehicoleData
    {
        Task<List<NrVehicoleResponse>> PunctC();
    }
}