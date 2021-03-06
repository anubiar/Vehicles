﻿using System.Collections.Generic;
using System.Threading.Tasks;

namespace Vehicles.Data
{
    public interface IDataAccess
    {
        Task<List<T>> LoadData<T, U>(string query, U parameters, string connectionStringName);
        Task<List<T>> LoadDataFunction<T, U>(string functionName, U parameters, string connectionStringName);
        Task<int> SaveData<U>(string query, U parameters, string connectionStringName);
    }
}