using System.Collections.Generic;
using System.Threading.Tasks;
using Vehicles.Models;

namespace Vehicles.Service
{
    public interface IVehicolData
    {
        Task<List<Vehicle>> getVehicole();
    }
}