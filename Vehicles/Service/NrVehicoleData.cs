using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Vehicles.Data;
using Vehicles.Models;

namespace Vehicles.Service
{
    public class NrVehicoleData : INrVehicoleData
    {
        private readonly IDataAccess dataAccess;
        private readonly ConnectionStringData connectionStringData;

        public NrVehicoleData(IDataAccess dataAccess, ConnectionStringData connectionStringData)
        {
            this.dataAccess = dataAccess;
            this.connectionStringData = connectionStringData;
        }


        public async Task<List<NrVehicoleResponse>> PunctC()
        {
            var result = await dataAccess.LoadData<NrVehicoleResponse, dynamic>(@"select marca, count( distinct marca) marci,count(nrvehicol) as nrvehicole from vehicol group by rollup(marca)",
                                                                                new { },
                                                                                connectionStringData.OracleConnectionName);
            return result;

        }

        public async Task<int> SumaTotalaVehicole()
        {

            DynamicParameters p = new DynamicParameters();

            p.Add("TOTALSUMA", DbType.VarNumeric, direction: ParameterDirection.ReturnValue);
            var result = await dataAccess.LoadDataFunction<int, dynamic>("SUMAVEHICOLE", p, connectionStringData.OracleConnectionName);

            return p.Get<int>("TOTALSUMA");
        }
    }
}
