using System.Collections.Generic;
using System.Threading.Tasks;
using Vehicles.Models;

namespace Vehicles.Service
{
    public interface INrVehicoleData
    {
        //Task<List<MarcaResponse>> GetMarciByCursor();
        //Task<dynamic> GetMarciByCursor();
        Task<List<MarcaResponse>> GetMarciByCursor();
        Task<List<NrVehicoleResponse>> PunctC();
        Task<int> SumaTotalaVehicole();
    }
}