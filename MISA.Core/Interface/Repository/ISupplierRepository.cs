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
        /// <returns>Danh sách nv</returns>
        /// CreatedBy KDLong 07/05/2021
        public Pagging<supplier> GetSuppliers(Filter filter);
        public Guid? GetSupplierIdByCode(string code);
        bool CheckSupplierCodeExist(string code);
    }
}
