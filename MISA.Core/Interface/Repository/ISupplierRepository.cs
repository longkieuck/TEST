using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interface.Repository
{
    public interface ISupplierRepository :IBaseRepository<supplier>
    {
        /// <summary>
        /// Lấy mã nhà cung cấp mới nhất
        /// </summary>
        /// <returns></returns>
        /// CreatedBy KDLong 07/05/2021
        string GetMaxSupplierCode();
        /// <summary>
        /// Lấy danh sách nhà cung theo điều kiện
        /// </summary>
        /// <param name="filter">
        /// Page
        /// PageSize
        /// Search
        /// </param>
        /// <returns>Danh sách nhà cung cấp</returns>
        /// CreatedBy KDLong 07/05/2021
        public Pagging<supplier> GetSuppliers(Filter filter);
        /// <summary>
        /// Lấy Id theo code phục vụ cho việc check xem code đã tồn tại hay chưa(Sửa)
        /// </summary>
        /// <param name="code">
        /// Mã nhà cung cấp
        /// </param>
        /// <returns>
        /// ID của tài khoản có Code
        /// </returns>
        /// CreatedBy KDLong 01/07/2021
        public Guid? GetSupplierIdByCode(string code);
        /// <summary>
        /// Kiểm tra xem số phiếu chi đã tồn tại hay chưa
        /// </summary>
        /// <param name="code">
        /// Mã nhà cung cấp
        /// </param>
        /// <returns>
        /// true - mã đã tồn tại
        /// false - mã chưa tồn tại
        /// </returns>
        /// CreatedBy KDLong 01/07/2021
        bool CheckSupplierCodeExist(string code);
    }
}
