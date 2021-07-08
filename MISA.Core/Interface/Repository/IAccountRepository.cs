﻿using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interface.Repository
{
    public interface IAccountRepository : IBaseRepository<account>
    {
        public Guid? GetAccountIdByCode(string code);
        bool CheckAccountCodeExist(string code);
    }
}
