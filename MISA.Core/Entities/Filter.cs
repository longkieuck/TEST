using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Entities
{
    /// <summary>
    /// Endpoint filter
    /// </summary>
    /// CreatedBy KDLong 07/05/2021
    public class Filter
    {
        /// <summary>
        /// Trang hiện tại
        /// </summary>
        public int page_index { get; set; } = 1;
        /// <summary>
        /// Tổng số bản ghi trên 1 trang
        /// </summary>
        public int page_size { get; set; } = 20;
        /// <summary>
        /// Dữ liệu dùng để filter
        /// </summary>
        public string fil { get; set; } = "";
    }
}
