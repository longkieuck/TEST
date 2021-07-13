using MISA.Core.AttributeCustom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Entities
{
    /// <summary>
    /// Class Tài khoản
    /// CreatedBy: KDLong 01/07/2021
    /// </summary>
    public class account
    {
        /// <summary>
        /// ID tài khoản
        /// </summary>
        public Guid account_id { get; set; }
        /// <summary>
        /// Trường này phục vụ cho table
        /// </summary>
        [MISAIgnore]
        public Guid? key {
            get
            {
                return account_id;
            }
        }
        /// <summary>
        /// Số tài khoản
        /// </summary>
        public string account_code { get; set; }
        /// <summary>
        /// Tính chất
        /// </summary>
        public string nature { get; set; }
        /// <summary>
        /// Tên tài khoản
        /// </summary>
        public string account_name { get; set; }
        
        /// <summary>
        /// Tên Tiếng Anh
        /// </summary>
        public string english_name { get; set; }
        /// <summary>
        /// Diễn giải
        /// </summary>
        public string description { get; set; }
        /// <summary>
        /// Có hạch toán ngại lệ
        /// </summary>
        public bool is_exception_accounting { get; set; }
        /// <summary>
        /// Tài khoản ngân hàng
        /// </summary>
        public bool is_bank_account { get; set; }
        /// <summary>
        /// Đối tượng
        /// </summary>
        public string object_type { get; set; }
        /// <summary>
        /// Đối tượng tập hợp chi phí
        /// </summary>
        public string object_type_thcp { get; set; }
        /// <summary>
        /// Đơn đặt hàng
        /// </summary>
        public string order { get; set; }
        /// <summary>
        /// Hợp đồng mua
        /// </summary>
        public string sale_contract { get; set; }
        /// <summary>
        /// Đơn vị
        /// </summary>
        public string department { get; set; }
        /// <summary>
        /// Công trình
        /// </summary>
        public string construction { get; set; }
        /// <summary>
        /// Hợp đồng bán
        /// </summary>
        public string purchase_contract { get; set; }
        /// <summary>
        /// Khoản mục chi phí
        /// </summary>
        public string expense_item { get; set; }
        /// <summary>
        /// Mã thống kê
        /// </summary>
        public string stats_code { get; set; }
        /// <summary>
        /// ID tài khoản tổng hợp
        /// </summary>
        public Guid? parent_account_id { get; set; }
        [MISAIgnore]
        public int level { get; set; }
        /// <summary>
        /// Danh sách con
        /// </summary>
        [MISAIgnore]
        public List<account> children { get; set; }
    }
}
