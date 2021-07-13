using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interface.Repository
{
    public interface IAccountRepository : IBaseRepository<account>
    {
        /// <summary>
        /// Lấy Id theo code phục vụ cho việc check xem code đã tồn tại hay chưa(Sửa)
        /// </summary>
        /// <param name="code">
        /// Số tài khoản
        /// </param>
        /// <returns>
        /// ID của tài khoản có Code
        /// </returns>
        /// CreatedBy KDLong 01/07/2021
        public Guid? GetAccountIdByCode(string code);
        /// <summary>
        /// Kiểm tra xem số tài khoản đã tồn tại hay chưa
        /// </summary>
        /// <param name="code">
        /// Số tài khoản
        /// </param>
        /// <returns>
        /// true - mã đã tồn tại
        /// false - mã chưa tồn tại
        /// </returns>
        /// CreatedBy KDLong 01/07/2021
        bool CheckAccountCodeExist(string code);
    }
}
