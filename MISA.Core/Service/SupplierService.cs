using MISA.Core.Entities;
using MISA.Core.Interface.Repository;
using MISA.Core.Interface.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Service
{
    public class SupplierService : BaseService<supplier>, ISupplierService
    {
        ISupplierRepository _supplierRepository;
        public SupplierService(ISupplierRepository supplierRepository) : base(supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }
    }
}
