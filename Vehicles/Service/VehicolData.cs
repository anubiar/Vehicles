using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicles.Data;
using Vehicles.Models;

namespace Vehicles.Service
{
    public class VehicolData : IVehicolData
    {
        private readonly IDataAccess dataAccess;
        private readonly ConnectionStringData connectionString;

        public VehicolData(IDataAccess dataAccess, ConnectionStringData connectionString)
        {
            this.dataAccess = dataAccess;
            this.connectionString = connectionString;
        }


        public Task<List<Vehicle>> getVehicole()
        {
            return dataAccess.LoadData<Vehicle, dynamic>("select * from vehicol", new { }, connectionString.OracleConnectionName);
        }
    }
}
