using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicles.Data;
using Vehicles.Models;

namespace Vehicles.Service
{
    public class ProprietateData : IProprietateData
    {
        private readonly IDataAccess dataAccess;
        private readonly ConnectionStringData connectionString;

        public ProprietateData(IDataAccess dataAccess, ConnectionStringData connectionString)
        {
            this.dataAccess = dataAccess;
            this.connectionString = connectionString;
        }


        public async Task<List<Proprietate>> GetProprietati()
        {
            var query = @"SELECT * FROM proprietate";

            return await dataAccess.LoadData<Proprietate, dynamic>(query, new { }, connectionString.OracleConnectionName);
        }

        public async Task<int> CreateProprietate(Proprietate proprietate)
        {
            DynamicParameters p = new DynamicParameters();


            p.Add("Cnp", proprietate.Cnp);
            p.Add("NrVehicol", proprietate.NrVehicol);
            p.Add("DataCumpararii", proprietate.DataCumpararii);
            p.Add("Pret", proprietate.Pret);


            var query = @"INSERT INTO proprietate(cnp,nrvehicol,datacumpararii,pret) values(:Cnp,:NrVehicol,Cast(:DataCumpararii as DATE),:Pret)";

            var result = await dataAccess.SaveData(query, p, connectionString.OracleConnectionName);

            return result;
        }

        public async Task<int> DeleteProprietate(int Id)
        {
            DynamicParameters p = new DynamicParameters();
            p.Add("PropId", Id);

            var query = @"DELETE FROM proprietate WHERE propid = :PropId";

            var result = await dataAccess.SaveData(query, p, connectionString.OracleConnectionName);

            return result;
        }


        public async Task<int> UpdateProprietate(Proprietate proprietate)
        {
            DynamicParameters p = new DynamicParameters();

            p.Add("Cnp", proprietate.Cnp);
            p.Add("NrVehicol", proprietate.NrVehicol);
            p.Add("DataCumpararii", proprietate.DataCumpararii);
            p.Add("Pret", proprietate.Pret);
            p.Add("PropId", proprietate.PropId);

            var query = @"UPDATE proprietate SET cnp = :Cnp, nrvehicol = :NrVehicol, datacumpararii = :DataCumpararii, pret = :Pret";

            var result = await dataAccess.SaveData(query, p, connectionString.OracleConnectionName);

            return result;
        }
    }
}
