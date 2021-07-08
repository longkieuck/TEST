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
    public class PaymentService : BaseService<payment>, IPaymentService
    {
        IPaymentRepository _paymentRepository;
        public PaymentService(IPaymentRepository paymentRepository) : base(paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }
        public string GetNewPaymentCode()
        {
            var maxPaymentCode = _paymentRepository.GetMaxPaymentCode();
            if (maxPaymentCode == null)
            {
                //Nếu chưa có ncc nào thì khở tạo luôn
                return "PC0001";
            }
            var res = maxPaymentCode.Substring(0, 2);//res = PC

            var numStr = maxPaymentCode.Substring(2);//numStr chỉ còn lại toàn số

            var numInt = Int32.Parse(numStr) + 1;//Ép kiểu r thêm 1 đơn vị
            var numNew = Convert.ToString(numInt);
            var lengthNumNew = numNew.Length;
            for (int i = 0; i < 4 - lengthNumNew; i++)
            {
                numNew = "0" + numNew;
            }//Thêm các số 0 còn thiếu sao cho có dạng PCxxxx
            res = res + numNew;

            return res;
        }
        /// <summary>
        /// Lấy danh sách phiếu chi theo các tiêu chí
        /// </summary>
        /// <param name="filter">
        /// Page - Trang cần lấy
        /// PageSize - Số bản ghi trong trang
        /// Search
        /// </param>
        /// <returns>
        /// PageSize
        /// </returns>
        /// CreatedBy KDLong 07/05/2021
        public Pagging<payment> GetPayments(Filter filter)
        {
            var pagging = _paymentRepository.GetPayments(filter);
            return pagging;
        }
        /// <summary>
        /// Tính tổng tiền
        /// </summary>
        /// <param name="filter">
        /// Page - Trang cần lấy
        /// PageSize - Số bản ghi trong trang
        /// Search 
        /// </param>
        /// <returns>Tổng tiền của trang hiện tại</returns>
        public float GetTotalMoney(Filter filter)
        {
            return _paymentRepository.GetTotalMoney(filter);
        }
        protected override void CustomValidate(payment entity, bool isInsert)
        {
            if (isInsert)
            {
                //Kiểm tra xem mã đã trùng chưa
                var isPaymentCodeExist = _paymentRepository.CheckPaymentCodeExist(entity.payment_code);
                if (isPaymentCodeExist) throw new BaseException("Số phiếu chi đã tồn tại!");
            }
            else
            {
                //Kiểm tra xem mã định sửa đã có trong hệ thống hay chưa mà không phải của chính bản thân đối tượng đó
                var guidDefault = new Guid();
                var payment_id = _paymentRepository.GetPaymentIdByCode(entity.payment_code);
                // !guidDefault là có mã trong hệ thống=> kiểm tra xem có phải chính mình không
                //Nếu k phải chính mình => đã có trong hệ thống
                if (payment_id != guidDefault && payment_id != entity.payment_id && payment_id != null)
                    throw new BaseException("Số phiếu chi đã tồn tại!");
            }
        }
    }
}
