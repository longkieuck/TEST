using MISA.Core.AttributeCustom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MISA.Core.Entities
{
    /// <summary>
    /// Phiếu chi
    /// CreatedBy KDLong 01/07/2021
    /// </summary>
    public class payment
    {
        /// <summary>
        /// ID phiếu chi
        /// </summary>
        public Guid payment_id { get; set; }
        /// <summary>
        /// Mã Phiếu chi
        /// </summary>
        public string payment_code { get; set; }
        /// <summary>
        /// Mã đối tượng
        /// </summary>
        public Guid? supplier_id { get; set; }
        /// <summary>
        /// Người nhận
        /// </summary>
        public string receiver { get; set; }
        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string address { get; set; }
        /// <summary>
        /// Lý do chi
        /// </summary>
        public string payment_reason { get; set; }
        /// <summary>
        /// Tên nhân viên
        /// </summary>
        public string employee_name { get; set; }
        /// <summary>
        /// Kèm theo
        /// </summary>
        public int? attach { get; set; }
        /// <summary>
        /// Ngày hạch toán
        /// </summary>
        public DateTime? accounting_date { get; set; }
        /// <summary>
        /// Ngày phiếu chi
        /// </summary>
        public DateTime? payment_date { get; set; }
        /// <summary>
        /// Hạch toán
        /// </summary>
        [JsonPropertyName("accounting")]
        public string accounting { get; set; }
        /// <summary>
        /// Tổng tiền
        /// </summary>
        public float money { get; set; }
        /// <summary>
        /// Mã đối tượng
        /// </summary>
        [MISAIgnore]
        public string supplier_code { get; set; }
        /// <summary>
        /// Tên đối tượng
        /// </summary>
        [MISAIgnore]
        public string supplier_name { get; set; }
        /// <summary>
        /// Tiền tệ
        /// </summary>
        public string currency { get; set; }
        /// <summary>
        /// Tỉ lệ
        /// </summary>
        public float rate { get; set; }
    }
}
