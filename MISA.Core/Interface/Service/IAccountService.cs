using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interface.Service
{
    public interface IAccountService:IBaseService<account>
    {
        /// <summary>
        /// Lấy tài khoản theo ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// CreatedBy KDLong 01/07/2021
        public account GetAccountInList(Guid? id);
        /// <summary>
        /// Lấy cấp của tài khoản
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// CreatedBy KDLong 01/07/2021
        public int GetLevelAccount(Guid? id);
        /// <summary>
        /// Lấy danh sách tài khoản đã sử lý thành cây
        /// </summary>
        /// <returns></returns>
        /// /// CreatedBy KDLong 01/07/2021
        public IEnumerable<account> GetAccounts();
        /// <summary>
        /// Lấy danh sách các tài khoản có con phục vụ cho mở rộng
        /// </summary>
        /// <returns></returns>
        /// CreatedBy KDLong 01/07/2021
        public IEnumerable<Guid> GetParentList();
        /// <summary>
        /// Lấy tổng số bản ghi
        /// </summary>
        /// <returns></returns>
        /// CreatedBy KDLong 01/07/2021
        public int GetTotalRecord();

    }
}
