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
    public class SupplierRepository:BaseRepository<supplier>,ISupplierRepository
    {
        /// <summary>
        /// Lấy mã nhân viên mới nhất trong hệ thống
        /// </summary>
        /// <returns>Mã nhân viên mới nhất để xử lý</returns>
        /// CreatedBy KDLong 07/05/2021
        public string GetMaxSupplierCode()
        {
            using (dbConnection = new NpgsqlConnection(connectionString))
            {
                var res = dbConnection.QueryFirstOrDefault<string>("proc_get_max_supplier_code", commandType: CommandType.StoredProcedure);
                return res;
            }
        }

        public Pagging<supplier> GetSuppliers(Filter filter)
        {
            using (dbConnection = new NpgsqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@fil", filter.fil);

                var totalRecords = dbConnection.QueryFirstOrDefault<int>("proc_get_total_supplier", param: parameters, commandType: CommandType.StoredProcedure);

                var totalPages = Math.Ceiling((decimal)totalRecords / filter.page_size);

                var suppliers = dbConnection.Query<supplier>("proc_get_suppliers_filter", param: filter, commandType: CommandType.StoredProcedure);

                // Dữ liệu pagging 
                var paging = new Pagging<supplier>()
                {
                    TotalRecords = totalRecords,
                    TotalPages = (int)totalPages,
                    Data = suppliers,
                    PageIndex = filter.page_index,
                    PageSize = filter.page_size
                };
                return paging;
            }
        }
    }
}
