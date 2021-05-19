﻿using Microsoft.AspNetCore.Mvc;
using MISA.Core.Entities;
using MISA.Core.Interface.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Api.Controllers
{
    /// <summary>
    /// Department Controller
    /// </summary>
    /// CreatedBy KDLong 07/05/2021
    [Route("api/v1/[controller]s")]
    [ApiController]
    public class DepartmentController :BaseController<Department>
    {
        IDepartmentService _departmentService;
        public DepartmentController(IDepartmentService departmentService):base(departmentService)
        {
            _departmentService = departmentService;
        }
    }
}
