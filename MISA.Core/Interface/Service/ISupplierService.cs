using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interface.Service
{
    public interface ISupplierService:IBaseService<supplier>
    {
        /// <summary>
        /// Tạo ra mã nhà cung cấp mới
        /// </summary>
        /// <returns></returns>
        /// CreatedBy KDLong 07/07/2021
        public string GetNewSupplierCode();
        /// <summary>
        /// Lấy danh sách nhà cung cấp theo các tiêu chí
        /// </summary>
        /// <param name="employeeFilter">
        /// Page - Trang cần lấy
        /// PageSize - Số bản ghi trong trang
        /// Search 
        /// </param>
        /// <returns>
        /// PageSize nhân viên trong trang Page theo tiêu chí Search 
        /// </returns>
        /// CreatedBy KDLong 07/07/2021
        public Pagging<supplier> GetSuppliers(Filter filter);
    }
}
