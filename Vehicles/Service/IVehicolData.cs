using System.Collections.Generic;
using System.Threading.Tasks;
using Vehicles.Models;

namespace Vehicles.Service
{
    public interface IVehicolData
    {
        Task createVehicol(Vehicle vehicle);
        Task<List<Vehicle>> getVehicole();
        Task deleteVehicol(int id);
        Task updateVehicol(Vehicle vehicle);
    }
}