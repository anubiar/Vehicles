using System.Collections.Generic;
using System.Threading.Tasks;
using Vehicles.Models;

namespace Vehicles.Service
{
    public interface IPersoanaData
    {
        Task<int> CreatePersoana(Persoana persoana);
        Task<int> DeletePersoana(int Id);
        Task<List<Persoana>> GetPersoane();
        Task<bool> IsExist(long cnp);
        Task<int> UpdatePersoana(Persoana persoana);
    }
}