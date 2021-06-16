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
    }
}
