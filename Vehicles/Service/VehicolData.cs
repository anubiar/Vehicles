using Dapper;
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

        public async Task createVehicol(Vehicle vehicle)
        {
            DynamicParameters p = new DynamicParameters();

            p.Add("Marca", vehicle.Marca);
            p.Add("Tip", vehicle.Tip);
            p.Add("SerieMotor", vehicle.SerieMotor);
            p.Add("SerieCaroserie", vehicle.SerieCaroserie);
            p.Add("Carburant", vehicle.Carburant);
            p.Add("Culoare", vehicle.Culoare);
            p.Add("CappacitateCil", vehicle.CappacitateCil);

            try
            {
                var query = @"INSERT INTO vehicol(marca,tip,seriemotor,seriecaroserie,carburant,culoare,cappacitatecil) values(@Marca,@Tip,@SerieMotor,@SerieCaroserie,@Carburant,@Culoare,@CappacitateCil)";
                await dataAccess.SaveData(query, p, connectionString.OracleConnectionName);
            }
            catch (Exception  e)
            {

                Console.WriteLine(e.StackTrace);
            }
            

        }
    }
}
