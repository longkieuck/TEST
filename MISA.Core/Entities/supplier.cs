using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MISA.Core.Entities
{
    /// <summary>
    /// Đối tượng nhà cung cấp
    /// CreatedBy KDLong 16/06/2021
    /// </summary>
    public class supplier
    {
        /// <summary>
        /// Id nhà cung cấp
        /// </summary>
        public Guid supplier_id { get; set; }
        /// <summary>
        /// Mã nhà cung cấp
        /// </summary>
        public string supplier_code { get; set; }
        /// <summary>
        /// Tên nhà cung cấp
        /// </summary>
        public string supplier_name { get; set; }
        /// <summary>
        /// Loại nhà cung cấp(0 tổ chức,1 cá nhân)
        /// </summary>
        public int supplier_type { get; set; }
        /// <summary>
        /// Là khách hàng hay không
        /// </summary>
        public bool? is_customer { get; set; }
        /// <summary>
        /// Mã số thuế
        /// </summary>
        public string tax_code { get; set; }
        /// <summary>
        /// Số điện thoại
        /// </summary>
        public string phone_number { get; set; }
        /// <summary>
        /// Website
        /// </summary>
        public string website { get; set; }
        /// <summary>
        /// Địa chỉ
        /// </summary>

        public string address { get; set; }
        /// <summary>
        /// Nhóm nhà cung cấp
        /// </summary>
        [JsonPropertyName("supplier_group")]
        public string supplier_group { get; set; }
        /// <summary>
        /// Nhân viên mua hàng
        /// </summary>
        public string puchasing_employee { get; set; }
        /// <summary>
        /// Xưng hô
        /// </summary>
        public string vocative { get; set; }
        /// <summary>
        /// Xưng hô với người liên hệ
        /// </summary>
        public string contact_vocative { get; set; }
        /// <summary>
        /// Họ và tên người liên hệ
        /// </summary>
        public string contact_name { get; set; }
        /// <summary>
        /// Email người liên hệ
        /// </summary>
        public string contact_email { get; set; }
        /// <summary>
        /// Số điện thoại người liên hệ
        /// </summary>
        public string contact_phone_number { get; set; }
        /// <summary>
        /// Đại diện theo pháp luật
        /// </summary>
        public string legal_representative { get; set; }
        /// <summary>
        /// Điện thoại cố định
        /// </summary>
        public string contact_telephone { get; set; }
        /// <summary>
        /// Số cmt
        /// </summary>
        public string identify_number { get; set; }
        /// <summary>
        /// Ngày cấp cmt
        /// </summary>
        public DateTime? identify_date { get; set; }
        /// <summary>
        /// Nơi cấp cmt
        /// </summary>
        public string identify_place { get; set; }
        /// <summary>
        /// Điều khoản thanh toán
        /// </summary>
        public string term_of_payment { get; set; }
        /// <summary>
        /// Số ngày nợ cước
        /// </summary>
        public int? number_day_owed { get; set; }
        /// <summary>
        /// Số nợ tối đa
        /// </summary>
        public float? max_amount_debt { get; set; }
        /// <summary>
        /// Tài khoản nợ phải thu
        /// </summary>
        public string account_receive { get; set; }
        /// <summary>
        /// Tài khoản nợ phải trả
        /// </summary>
        public string account_pay { get; set; }
        /// <summary>
        /// Tài khoản ngân hàng
        /// </summary>
        [JsonPropertyName("bank_account")]
        public string bank_account { get; set; }
        /// <summary>
        /// Ghi chú
        /// </summary>
        public string note { get; set; }
        /// <summary>
        /// Quốc gia
        /// </summary>
        public string country { get; set; }
        /// <summary>
        /// Thành phố
        /// </summary>
        public string city { get; set; }
        /// <summary>
        /// Quận huyện
        /// </summary>
        public string district { get; set; }
        /// <summary>
        /// Xã
        /// </summary>
        public string commune { get; set; }
        /// <summary>
        /// Địa chỉ giao hàng
        /// </summary>
        [JsonPropertyName("delivery_address")]
        public string delivery_address { get; set; }

        public string invoice_recipient_name { get; set; }
        public string invoice_recipient_email { get; set; }
        public string invoice_recipient_phone { get; set; }

    }
}
