using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interface.Repository
{
    public interface IPaymentRepository : IBaseRepository<payment>
    {
        /// <summary>
        /// Lấy mã phiếu chi mới nhất
        /// </summary>
        /// <returns></returns>
        /// CreatedBy KDLong 07/05/2021
        string GetMaxPaymentCode();
        /// <summary>
        /// Lấy danh sách phiếu chi theo điều kiện
        /// </summary>
        /// <param name="filter">
        /// Page
        /// PageSize
        /// filter
        /// </param>
        /// <returns>Danh sách nv</returns>
        /// CreatedBy KDLong 07/05/2021
        public Pagging<payment> GetPayments(Filter filter);
        /// <summary>
        /// Tính tổng tiền
        /// </summary>
        /// <param name="filter">
        /// Page - Trang cần lấy
        /// PageSize - Số bản ghi trong trang
        /// Search 
        /// </param>
        /// <returns>Tổng tiền của trang hiện tại</returns>
        public float GetTotalMoney(Filter filter);
        public Guid? GetPaymentIdByCode(string code);
        bool CheckPaymentCodeExist(string code);
    }
}
