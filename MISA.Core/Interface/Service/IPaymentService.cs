using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interface.Service
{
    public interface IPaymentService:IBaseService<payment>
    {
        /// <summary>
        /// Tạo ra mã phiếu chi mới
        /// </summary>
        /// <returns></returns>
        /// CreatedBy KDLong 07/05/2021
        public string GetNewPaymentCode();
        /// <summary>
        /// Lấy danh sách nhà cung cấp theo các tiêu chí
        /// </summary>
        /// <param name="filter">
        /// Page - Trang cần lấy
        /// PageSize - Số bản ghi trong trang
        /// Search 
        /// </param>
        /// <returns>
        /// PageSize nhân viên trong trang Page theo tiêu chí Search 
        /// </returns>
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
    }
}
