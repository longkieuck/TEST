using MISA.Core.Entities;
using MISA.Core.Exceptions;
using MISA.Core.Interface.Repository;
using MISA.Core.Interface.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Service
{
    public class AccountService : BaseService<account>, IAccountService
    {
        IAccountRepository _accountRepository;
        IEnumerable<account> listAccounts;
        public AccountService(IAccountRepository accountRepository) : base(accountRepository)
        {
            _accountRepository = accountRepository;
            listAccounts = _accountRepository.GetAll();
            
        }
        public account GetAccountInList(Guid? id)
        {
            for (int i = 0; i < listAccounts.Count(); i++)
            {
                if (listAccounts.ElementAt(i).account_id == id)
                {
                    return listAccounts.ElementAt(i);
                }
            }

            return null;
        }

        public int GetLevelAccount(Guid? id)
        {
            account temp = GetAccountInList(id);
            int level = 0;

            while (temp.parent_account_id != null)
            {
                level++;
                temp = GetAccountInList(temp.parent_account_id);
            }

            return level;
        }

        public IEnumerable<account> GetAccounts()
        {
            listAccounts = base.GetAll();

            //get account level
            for (int i = 0; i < listAccounts.Count(); i++)
            {
                
                listAccounts.ElementAt(i).level = GetLevelAccount(listAccounts.ElementAt(i).account_id);
            }
            // Thêm con cho tất cả tài khoản có con
            for (int i = 0; i < listAccounts.Count(); i++)
            {
                //Nếu tài khoản i có cha
                if (listAccounts.ElementAt(i).parent_account_id != null)
                {
                    //Tim cha
                    var parent = GetAccountInList(listAccounts.ElementAt(i).parent_account_id);
                    //Nếu tài khoản cha chưa khởi tạo children thì thực hiện khở tạo
                    if(parent.children == null)
                    {
                        parent.children = new List<account>();
                    }
                    //Them con
                    parent.children.Add(listAccounts.ElementAt(i));
                }
            }


            var result = new List<account>();
            // Duyệt 1 lần nữa để tìm các tài khoản root
            for (int i = 0; i < listAccounts.Count(); i++)
            {
                if (listAccounts.ElementAt(i).parent_account_id == null)
                {
                    result.Add(listAccounts.ElementAt(i));
                }
            }

            return result;
        }

        public IEnumerable<Guid> GetParentList()
        {
            listAccounts = base.GetAll();

            var result = new List<Guid>();
            for (int i = 0; i < listAccounts.Count(); i++)
            {
                //Tài khoản có cha
                if (listAccounts.ElementAt(i).parent_account_id != null)
                {
                    //Tim cha đấy
                    var parent = GetAccountInList(listAccounts.ElementAt(i).parent_account_id);
                    //Nếu chưa duyệt cha đấy
                    if (parent.children == null)
                    {
                        parent.children = new List<account>();
                        //add id vào result
                        result.Add(parent.account_id);
                    }
                    //Them con
                }
            }
            return result;
        }
        public int GetTotalRecord()
        {
            return base.GetAll().Count();
        }

        protected override void CustomValidate(account entity, bool isInsert)
        {
            if (isInsert)
            {
                //Kiểm tra xem mã đã trùng chưa
                var isAccountCodeExist = _accountRepository.CheckAccountCodeExist(entity.account_code);
                if (isAccountCodeExist) throw new BaseException("Số tài khoản đã tồn tại!");
            }
            else
            {
                //Kiểm tra xem mã định sửa đã có trong hệ thống hay chưa mà không phải của chính bản thân đối tượng đó
                var guidDefault = new Guid();
                var account_id = _accountRepository.GetAccountIdByCode(entity.account_code);
                // !guidDefault là có mã trong hệ thống=> kiểm tra xem có phải chính mình không
                //Nếu k phải chính mình => đã có trong hệ thống
                if (account_id != guidDefault && account_id != entity.account_id && account_id!=null)
                    throw new BaseException("Số tài khoản đã tồn tại!");
            }
        }
    }
}
