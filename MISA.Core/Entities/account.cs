using MISA.Core.AttributeCustom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Entities
{
    public class account
    {
        public Guid account_id { get; set; }
        [MISAIgnore]
        public Guid? key {
            get
            {
                return account_id;
            }
        }
        public string account_code { get; set; }
        public string nature { get; set; }
        public string account_name { get; set; }

        public string english_name { get; set; }
        
        public string description { get; set; }
        public bool is_exception_accounting { get; set; }
        public bool is_bank_account { get; set; }
        public string object_type { get; set; }
        public string object_type_thcp { get; set; }
        public string order { get; set; }
        public string sale_contract { get; set; }
        public string department { get; set; }
        public string construction { get; set; }
        public string purchase_contract { get; set; }
        public string expense_item { get; set; }
        public string stats_code { get; set; }
        public Guid? parent_account_id { get; set; }
        [MISAIgnore]
        public int level { get; set; }
        [MISAIgnore]
        public List<account> children { get; set; }
    }
}
