using MISA.Core.Entities;
using MISA.Core.Interface.Repository;
using MISA.Core.Interface.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Service
{
    public class SupplierService : BaseService<supplier>, ISupplierService
    {
        ISupplierRepository _supplierRepository;
        public SupplierService(ISupplierRepository supplierRepository) : base(supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        public string GetNewSupplierCode()
        {
            var maxSupplierCode = _supplierRepository.GetMaxSupplierCode();
            if (maxSupplierCode == null)
            {
                //Nếu chưa có ncc nào thì khở tạo luôn
                return "NCC0001";
            }
            var res = maxSupplierCode.Substring(0, 3);//res = NCC

            var numStr = maxSupplierCode.Substring(3);//numStr chỉ còn lại toàn số

            var numInt = Int32.Parse(numStr) + 1;//Ép kiểu r thêm 1 đơn vị
            var numNew = Convert.ToString(numInt);
            var lengthNumNew = numNew.Length;
            for (int i = 0; i < 4 - lengthNumNew; i++)
            {
                numNew = "0" + numNew;
            }//Thêm các số 0 còn thiếu sao cho có dạng NCC-xxxx
            res = res + numNew;

            return res;
        }
        /// <summary>
        /// Lấy danh sách nhà cung cấp theo các tiêu chí
        /// </summary>
        /// <param name="employeeFilter">
        /// Page - Trang cần lấy
        /// PageSize - Số bản ghi trong trang
        /// Search
        /// </param>
        /// <returns>
        /// PageSize
        /// </returns>
        /// CreatedBy KDLong 07/05/2021
        public Pagging<supplier> GetSuppliers(Filter filter)
        {
            var pagging = _supplierRepository.GetSuppliers(filter);
            return pagging;
        }
    }
}
