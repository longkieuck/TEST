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
    public class PaymentService : BaseService<payment>, IPaymentService
    {
        IPaymentRepository _paymentRepository;
        public PaymentService(IPaymentRepository paymentRepository) : base(paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }
    }
}
