using Dapper;
using Microsoft.Extensions.Configuration;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vehicles.Data
{
    public class OraclDb : IDataAccess
    {
        private readonly IConfiguration configuration;

        public OraclDb(IConfiguration configuration)
        {
            this.configuration = configuration;
        }


        public async Task<List<T>> LoadData<T, U>(string query, U parameters, string connectionStringName)
        {
            string connectionString = configuration.GetConnectionString(connectionStringName);

            using (IDbConnection connection = new OracleConnection(connectionString))
            {
                var rows = await connection.QueryAsync<T>(query, parameters, commandType: CommandType.Text);

                return rows.ToList();
            }
        }
        public async Task<List<T>> LoadDataFunction<T, U>(string functionName, U parameters, string connectionStringName)
        {
            string connectionString = configuration.GetConnectionString(connectionStringName);

            using (IDbConnection connection = new OracleConnection(connectionString))
            {
                var rows = await connection.QueryAsync<T>(functionName, parameters, commandType: CommandType.StoredProcedure);

                return rows.ToList();
            }
        }

        public async Task<int> SaveData<U>(string query, U parameters, string connectionStringName)
        {
            string connectionString = configuration.GetConnectionString(connectionStringName);

            using (IDbConnection connection = new OracleConnection(connectionString))
            {
                
                var result = await connection.ExecuteAsync(query, parameters, commandType: CommandType.Text);

                return result;
                
                
            }
        }
    }
}
