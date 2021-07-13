using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.Core.Entities;
using MISA.Core.Interface.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.AMIS.Api.Controllers
{
    [Route("api/v1/[controller]s")]
    [ApiController]
    public class AccountController : BaseController<account>
    {
        IAccountService _accountService;
        public AccountController(IAccountService accountService):base(accountService)
        {
            _accountService = accountService;
        }
        /// <summary>
        /// Lấy danh sách tài khoản đã convert dạng cây
        /// </summary>
        /// <returns>
        /// HttpStatus code 200 - Lấy dữ liệu thành công
        /// HttpStatus code 204 - Không có dữ liệu
        /// </returns>
        /// CreatedBy: KDLong 01/07/2021
        [HttpGet("All")]
        public IActionResult GetAccounts()
        {
            var entities = _accountService.GetAccounts();
            if (entities.Count() > 0)
            {
                return Ok(entities);
            }
            return NoContent();
        }
        /// <summary>
        /// Lấy danh sách các tài khoản có con phục vụ cho việc mở rộng
        /// </summary>
        /// <returns>
        /// HttpStatus code 200 - Lấy dữ liệu thành công
        /// HttpStatus code 204 - Không có dữ liệu
        /// </returns>
        /// CreatedBy: KDLong 01/07/2021
        [HttpGet("ParentIdList")]
        public IActionResult GetParentList()
        {
            var entities = _accountService.GetParentList();
            if (entities.Count() > 0)
            {
                return Ok(entities);
            }
            return NoContent();
        }
        /// <summary>
        /// Lấy tổng số tài khoản
        /// </summary>
        /// <returns>
        /// HttpStatus code 200 - Lấy dữ liệu thành công
        /// HttpStatus code 204 - Không có dữ liệu
        /// </returns>
        /// CreatedBy: KDLong 01/07/2021
        [HttpGet("TotalRecord")]
        public IActionResult GetTotalRecord()
        {
            var res = _accountService.GetTotalRecord();
            return Ok(res);
        }
    }
}
