using MISA.Core.Entities;
using MISA.Core.Exceptions;
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
        protected override void CustomValidate(supplier entity, bool isInsert)
        {
            if (isInsert)
            {
                //Kiểm tra xem mã đã trùng chưa
                var isPaymentCodeExist = _supplierRepository.CheckSupplierCodeExist(entity.supplier_code);
                if (isPaymentCodeExist) throw new BaseException("Mã nhà cung cấp đã tồn tại!");
            }
            else
            {
                //Kiểm tra xem mã định sửa đã có trong hệ thống hay chưa mà không phải của chính bản thân đối tượng đó
                var guidDefault = new Guid();
                var supplier_id = _supplierRepository.GetSupplierIdByCode(entity.supplier_code);
                // !guidDefault là có mã trong hệ thống=> kiểm tra xem có phải chính mình không
                //Nếu k phải chính mình => đã có trong hệ thống
                if (supplier_id != guidDefault && supplier_id != entity.supplier_id && supplier_id != null)
                    throw new BaseException("Mã nhà cung cấp đã tồn tại!");
            }
        }
    }
}
