using Dapper;
using MISA.Core.Entities;
using MISA.Core.Interface.Repository;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Infrastructure.Repository
{
    public class AccountRepository:BaseRepository<account>,IAccountRepository
    {
        public bool CheckAccountCodeExist(string code)
        {
            using (dbConnection = new NpgsqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@_account_code", code);
                var res = dbConnection.QueryFirstOrDefault<int>("proc_check_account_code_exist", param: parameters, commandType: CommandType.StoredProcedure);
                return (res > 0);
            }
        }
        public Guid? GetAccountIdByCode(string code)
        {
            using (dbConnection = new NpgsqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@_account_code", code);
                var res = dbConnection.QueryFirstOrDefault<Guid?>("proc_get_account_id_by_code", param: parameters, commandType: CommandType.StoredProcedure);
                return res;
            }
        }
    }
}
