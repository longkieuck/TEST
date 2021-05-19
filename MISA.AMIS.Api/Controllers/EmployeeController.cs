using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.Core.Entities;
using MISA.Core.Interface.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Api.Controllers
{
    /// <summary>
    /// Employee Controller
    /// </summary>
    /// CreatedBy KDLong 07/05/2021
    [Route("api/v1/[controller]s")]
    [ApiController]
    public class EmployeeController : BaseController<Employee>
    {
        IEmployeeService _employeeService;
        #region Constructor
        public EmployeeController(IEmployeeService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }
        #endregion

        #region Method
        /// <summary>
        /// Filter
        /// </summary>
        /// <param name="employeeFilter"></param>
        /// <returns>
        /// HttpStatus code 200 - Lấy dữ liệu thành công
        /// HttpStatus code 204 - Không có dữ liệu
        /// </returns>
        /// CreatedBy: KDLong 07/05/2021
        [HttpGet("Filter")]
        public IActionResult GetEmployees([FromQuery] EmployeeFilter employeeFilter)
        {
            var pagging = _employeeService.GetEmployees(employeeFilter);

            // Xử lý kết quả trả về cho client.
            if (pagging.Data.Any() && employeeFilter.Page >= 0 && employeeFilter.PageSize >= 0)
            {
                return Ok(pagging);
            }

            return NoContent();
        }
        /// <summary>
        /// Lấy mã nhân viên mới
        /// </summary>
        /// <returns>
        /// HttpStatus code 200 - Lấy dữ liệu thành công
        /// Mã nhân viên mới
        /// </returns>
        /// CreatedBy: KDLong 07/05/2021
        [HttpGet("NewEmployeeCode")]
        public IActionResult GetNewEmployeeCode()
        {
            var res = _employeeService.GetNewEmployeeCode();
            if (res != null)
            {
                return Ok(res);
            }
            return NoContent();
        }
        /// <summary>
        /// Export file Excel
        /// </summary>
        /// <param name="employeeFilter">
        /// Page - Trang cần lấy
        /// PageSize - Số bản ghi trong trang
        /// Search - Mã,Tên nhân viên
        /// </param>
        /// <returns>Trang Excel Đang Hiện Trên Màn Hình</returns>
        /// CreatedBy KDLong 12/05/2021
        [HttpGet("Export")]
        public IActionResult Export([FromQuery] EmployeeFilter employeeFilter)
        {
            var stream = _employeeService.ExportExcel(employeeFilter);
            string excelName = $"Danh-sach-nhan-vien.xlsx";

            //return File(stream, "application/octet-stream", excelName);
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }
        /// <summary>
        /// Export file Excel
        /// </summary>
        /// <param name="employeeFilter">
        /// Page - Trang cần lấy
        /// PageSize - Số bản ghi trong trang
        /// Search - Mã,Tên nhân viên
        /// </param>
        /// <returns>Trang Excel Đang Hiện Trên Màn Hình</returns>
        /// CreatedBy KDLong 12/05/2021
        [HttpGet("ExportAll")]
        public IActionResult ExportAll()
        {
            var stream = _employeeService.ExportExcel();
            string excelName = $"Danh-sach-nhan-vien.xlsx";

            //return File(stream, "application/octet-stream", excelName);
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }
        #endregion
    }
}
