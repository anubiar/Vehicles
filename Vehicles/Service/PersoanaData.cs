using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicles.Data;
using Vehicles.Models;

namespace Vehicles.Service
{
    public class PersoanaData : IPersoanaData
    {
        private readonly IDataAccess dataAccess;
        private readonly ConnectionStringData connectionStringData;

        public PersoanaData(IDataAccess dataAccess, ConnectionStringData connectionStringData)
        {
            this.dataAccess = dataAccess;
            this.connectionStringData = connectionStringData;
        }

        public async Task<int> CreatePersoana(Persoana persoana)
        {
            DynamicParameters p = new DynamicParameters();

            p.Add("Nume", persoana.Nume);
            p.Add("PreNume", persoana.PreNume);
            p.Add("CarteIdentitate", persoana.CarteIdentitate);
            p.Add("Adresa", persoana.Adresa);
            p.Add("Cnp", persoana.Cnp);


            var query = @"INSERT INTO persoana(nume,prenume,carteidentitate,cnp,adresa) values(:Nume,:Prenume,:CarteIdentitate,:Cnp,:Adresa)";

            var result = await dataAccess.SaveData(query, p, connectionStringData.OracleConnectionName);

            return result;
        }


        public async Task<List<Persoana>> GetPersoane()
        {
            var query = @"SELECT * FROM persoana";

            return await dataAccess.LoadData<Persoana, dynamic>(query, new { }, connectionStringData.OracleConnectionName);
        }


        public async Task<int> DeletePersoana(int Id)
        {
            DynamicParameters p = new DynamicParameters();
            p.Add("PersoanaId", Id);

            var query = @"DELETE FROM persoana WHERE persoanaid = :PersoanaId";

            var result = await dataAccess.SaveData(query, p, connectionStringData.OracleConnectionName);

            return result;
        }


        public async Task<int> UpdatePersoana(Persoana persoana)
        {
            DynamicParameters p = new DynamicParameters();

            p.Add("Nume", persoana.Nume);
            p.Add("PreNume", persoana.PreNume);
            p.Add("CarteIdentitate", persoana.CarteIdentitate);
            p.Add("Adresa", persoana.Adresa);
            p.Add("Cnp", persoana.Cnp);
            p.Add("PersoanaId", persoana.PersoanaId);

            var query = @"UPDATE persoana SET nume = :Nume,prenume = :PreNume,carteidentitate = :CarteIdentitate,adresa = :Adresa,cnp = :Cnp WHERE persoanaid = :PersoanaId";

            var result = await dataAccess.SaveData(query, p, connectionStringData.OracleConnectionName);

            return result;
        }

        public async Task<bool> IsExist(long cnp)
        {
            DynamicParameters p = new DynamicParameters();

            p.Add("Cnp", cnp);



            var query = @"SELECT * FROM persoana WHERE cnp = :Cnp";

            var result = await dataAccess.LoadData<Persoana, dynamic>(query, p, connectionStringData.OracleConnectionName);

            var exist = result.Count == 0 ? false : true;

            return exist;
        }

    }
}
