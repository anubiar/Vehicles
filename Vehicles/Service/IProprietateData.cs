using System.Collections.Generic;
using System.Threading.Tasks;
using Vehicles.Models;

namespace Vehicles.Service
{
    public interface IProprietateData
    {
        Task<int> CreateProprietate(Proprietate proprietate);
        Task<int> DeleteProprietate(int Id);
        Task<List<Proprietate>> GetProprietati();
        Task<int> UpdateProprietate(Proprietate proprietate);
    }
}