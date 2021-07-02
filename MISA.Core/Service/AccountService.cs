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

            for (int i = 0; i < listAccounts.Count(); i++)
            {

                if (listAccounts.ElementAt(i).parent_account_id != null)
                {
                    //Tim cha
                    var parent = GetAccountInList(listAccounts.ElementAt(i).parent_account_id);
                    if(parent.children == null)
                    {
                        parent.children = new List<account>();
                    }
                    //Them con
                    parent.children.Add(listAccounts.ElementAt(i));
                }
            }


            var result = new List<account>();

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

            //get account level
            for (int i = 0; i < listAccounts.Count(); i++)
            {

                listAccounts.ElementAt(i).level = GetLevelAccount(listAccounts.ElementAt(i).account_id);
            }
            var result = new List<Guid>();
            for (int i = 0; i < listAccounts.Count(); i++)
            {

                if (listAccounts.ElementAt(i).parent_account_id != null)
                {
                    //Tim cha
                    var parent = GetAccountInList(listAccounts.ElementAt(i).parent_account_id);
                    if (parent.children == null)
                    {
                        parent.children = new List<account>();
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
    }
}
