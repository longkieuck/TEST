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
    public class PaymentRepository:BaseRepository<payment>,IPaymentRepository
    {
        public bool CheckPaymentCodeExist(string code)
        {
            using (dbConnection = new NpgsqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@_payment_code", code);
                var res = dbConnection.QueryFirstOrDefault<int>("proc_check_payment_code_exist", param: parameters, commandType: CommandType.StoredProcedure);
                return (res > 0);
            }
        }
        public Guid? GetPaymentIdByCode(string code)
        {
            using (dbConnection = new NpgsqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@_payment_code", code);
                var res = dbConnection.QueryFirstOrDefault<Guid?>("proc_get_payment_id_by_code", param: parameters, commandType: CommandType.StoredProcedure);
                return res;
            }
        }


        /// <summary>
        /// Lấy mã phiếu chi mới nhất trong hệ thống
        /// </summary>
        /// <returns>Mã nhân viên mới nhất để xử lý</returns>
        /// CreatedBy KDLong 07/05/2021
        public string GetMaxPaymentCode()
        {
            using (dbConnection = new NpgsqlConnection(connectionString))
            {
                var res = dbConnection.QueryFirstOrDefault<string>("proc_get_max_payment_code", commandType: CommandType.StoredProcedure);
                return res;
            }
        }

        

        public Pagging<payment> GetPayments(Filter filter)
        {
            using (dbConnection = new NpgsqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@fil", filter.fil);

                var totalRecords = dbConnection.QueryFirstOrDefault<int>("proc_get_total_payment", param: parameters, commandType: CommandType.StoredProcedure);

                var totalPages = Math.Ceiling((decimal)totalRecords / filter.page_size);

                var payments = dbConnection.Query<payment>("proc_get_payments_filter", param: filter, commandType: CommandType.StoredProcedure);

                // Dữ liệu pagging 
                var paging = new Pagging<payment>()
                {
                    TotalRecords = totalRecords,
                    TotalPages = (int)totalPages,
                    Data = payments,
                    PageIndex = filter.page_index,
                    PageSize = filter.page_size
                };
                return paging;
            }
        }

        public float GetTotalMoney(Filter filter)
        {
            using (dbConnection = new NpgsqlConnection(connectionString))
            {
                var payments = dbConnection.Query<payment>("proc_get_payments_filter", param: filter, commandType: CommandType.StoredProcedure);

                float result = 0;
                foreach(var payment in payments)
                {
                    result += payment.money;
                }
                return result;
                
            }
        }
    }
}
