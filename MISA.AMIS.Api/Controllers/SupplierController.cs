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
    }
}
