using Dapper;
using MISA.Core.Entities;
using MISA.Core.Interface.Repository;
using MySqlConnector;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Infrastructure.Repository
{
    /// <summary>
    /// Employee Repository
    /// </summary>
    /// CreatedBy KDLong 07/05/2021
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        #region Method
        /// <summary>
        /// Check trùng mã
        /// </summary>
        /// <param name="employeeCode">Mã nhân viên</param>
        /// <returns>bool</returns>
        /// CreatedBy KDLong 07/05/2021
        public bool CheckEmployeeCodeExist(string employeeCode)
        {
            using (dbConnection = new MySqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeCode", employeeCode);
                var res = dbConnection.QueryFirstOrDefault<bool>($"Proc_CheckEmployeeCodeExist", param: parameters, commandType: CommandType.StoredProcedure);
                return res;
            }
        }

        /// <summary>
        /// Lấy mã nhân viên mới nhất trong hệ thống
        /// </summary>
        /// <returns>Mã nhân viên mới nhất để xử lý</returns>
        /// CreatedBy KDLong 07/05/2021
        public string GetMaxEmployeeCode()
        {
            using (dbConnection = new MySqlConnection(connectionString))
            {
                var res = dbConnection.QueryFirstOrDefault<string>($"Proc_GetMaxEmployeeCode", commandType: CommandType.StoredProcedure);
                return res;
            }
        }

        /// <summary>
        /// Lấy nhanh sách nhân viên theo điều kiện
        /// </summary>
        /// <param name="employeeFilter">
        /// Page
        /// PageSize
        /// Search
        /// </param>
        /// <returns>Danh sách nv</returns>
        /// CreatedBy KDLong 07/05/2021
        public Pagging<Employee> GetEmployees(Filter employeeFilter)
        {
            using (dbConnection = new MySqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Search", employeeFilter.fil);

                var totalRecords = dbConnection.QueryFirstOrDefault<int>("Proc_GetTotalEmployees", param: parameters, commandType: CommandType.StoredProcedure);

                var totalPages = Math.Ceiling((decimal)totalRecords / employeeFilter.page_size);

                var employees = dbConnection.Query<Employee>("Proc_GetEmployeesFilter", param: employeeFilter, commandType: CommandType.StoredProcedure);

                // Dữ liệu pagging 
                var paging = new Pagging<Employee>()
                {
                    TotalRecords = totalRecords,
                    TotalPages = (int)totalPages,
                    Data = employees,
                    PageIndex = employeeFilter.page_index,
                    PageSize = employeeFilter.page_size
                };
                return paging;
            }
        }
        /// <summary>
        /// Lấy id của nhân viên theo mã nhân viên(dùng để kiểm tra mã nhân viên đã tồn tại chưa)
        /// </summary>
        /// <param name="employeeCode">Mã nhân viên dùng để lấy id</param>
        /// <returns>Id theo mã</returns>
        public Guid GetEmployeeIdByEmployeeCode(string employeeCode)
        {
            using (dbConnection = new MySqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeCode", employeeCode);
                var res = dbConnection.QueryFirstOrDefault<Guid>($"Proc_GetEmployeeIdByEmployeeCode", param: parameters, commandType: CommandType.StoredProcedure);
                return res;
            }
        }

        //public async Task<IEnumerable<MISAEntity>> GetAll()
        //{
        //    //Kết nối DB 
        //    using (dbConnection = new NpgsqlConnection(connectionString))
        //    {

        //        //Thực thi với DB 
        //        var sqlCommand = string.Format(Properties.DatabaseResources.ProcedureGetAll, tableName);
        //        var objects = await dbConnection.QueryAsync<MISAEntity>(sqlCommand, commandType: CommandType.StoredProcedure);
        //        return objects;
        //    }
        //}
        #endregion
    }
}
