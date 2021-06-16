using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MISA.Core.Entities
{
    public class payment
    {
        public Guid payment_id { get; set; }
        public string payment_code { get; set; }
        public Guid supplier_id { get; set; }
        public string receiver { get; set; }
        public string address { get; set; }
        public string payment_reason { get; set; }
        public string employee_name { get; set; }
        public int? attach { get; set; }
        public DateTime? accounting_date { get; set; }
        public DateTime? payment_date { get; set; }
        [JsonPropertyName("accounting")]
        public string accounting { get; set; }
    }
}
