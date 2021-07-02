using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.Core.Entities;
using MISA.Core.Interface.Service;
using MISA.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.AMIS.Api.Controllers
{
    [Route("api/v1/[controller]s")]
    [ApiController]
    public class SupplierController : BaseController<supplier>
    {
        ISupplierService _supplierService;
        #region Constructor
        public SupplierController(ISupplierService supplierService) : base(supplierService)
        {
            _supplierService = supplierService;
        }
        #endregion
        /// <summary>
        /// Lấy mã nhà cung cấp mới
        /// </summary>
        /// <returns>
        /// HttpStatus code 200 - Lấy dữ liệu thành công
        /// Mã nhân viên mới
        /// </returns>
        /// CreatedBy: KDLong 07/05/2021
        [HttpGet("NewSupplierCode")]
        public IActionResult GetNewSupplierCode()
        {
            var res = _supplierService.GetNewSupplierCode();
            if (res != null)
            {
                return Ok(res);
            }
            return NoContent();
        }
        /// <summary>
        /// Filter
        /// </summary>
        /// <param name="filter"></param>
        /// <returns>
        /// HttpStatus code 200 - Lấy dữ liệu thành công
        /// HttpStatus code 204 - Không có dữ liệu
        /// </returns>
        /// CreatedBy: KDLong 07/05/2021
        [HttpGet("Filter")]
        public IActionResult GetSuppliers([FromQuery] Filter filter)
        {
            var pagging = _supplierService.GetSuppliers(filter);

            // Xử lý kết quả trả về cho client.
            if (pagging.Data.Any() && filter.page_index >= 0 && filter.page_size >= 0)
            {
                return Ok(pagging);
            }

            return NoContent();
        }
    }
}
