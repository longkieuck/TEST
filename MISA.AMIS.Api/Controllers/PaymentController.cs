﻿using Microsoft.AspNetCore.Http;
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
    public class PaymentController : BaseController<payment>
    {
        IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService) :base(paymentService)
        {
            _paymentService = paymentService;
        }
        /// <summary>
        /// Lấy mã phiếu chi mới
        /// </summary>
        /// <returns>
        /// HttpStatus code 200 - Lấy dữ liệu thành công
        /// Mã nhân viên mới
        /// </returns>
        /// CreatedBy: KDLong 07/05/2021
        [HttpGet("NewPaymentCode")]
        public IActionResult GetNewPaymentCode()
        {
            var res = _paymentService.GetNewPaymentCode();
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
        public IActionResult GetPayments([FromQuery] Filter filter)
        {
            var pagging = _paymentService.GetPayments(filter);

            // Xử lý kết quả trả về cho client.
            if (pagging.Data.Any() && filter.page_index >= 0 && filter.page_size >= 0)
            {
                return Ok(pagging);
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
        [HttpGet("TotalMoney")]
        public IActionResult GetTotalMoney([FromQuery] Filter filter)
        {
            var result = _paymentService.GetTotalMoney(filter);

            return Ok(result);
        }
    }
}
