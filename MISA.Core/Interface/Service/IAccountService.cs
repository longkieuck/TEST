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
        public account GetAccountInList(Guid? id);
        public int GetLevelAccount(Guid? id);
        public IEnumerable<account> GetAccounts();

        public IEnumerable<Guid> GetParentList();
        public int GetTotalRecord();
        //private account GetAccountInList(Guid? id)
        //{
        //    for (int i = 0; i < listAccounts.Count(); i++)
        //    {
        //        if (listAccounts.ElementAt(i).account_id == id)
        //        {
        //            return listAccounts.ElementAt(i);
        //        }
        //    }

        //    return null;
        //}

        //private int GetLevelAccount(Guid? id)
        //{
        //    account temp = GetAccountInList(id);
        //    int level = 0;

        //    while (temp.parent_account != null)
        //    {
        //        level++;
        //        temp = GetAccountInList(temp.parent_account);
        //    }

        //    return level;
        //}

        //public override IEnumerable<account> GetAll()
        //{
        //    listAccounts = base.GetAll();

        //    //get account level
        //    for (int i = 0; i < listAccounts.Count(); i++)
        //    {
        //        listAccounts.ElementAt(i).Level = GetLevelAccount(listAccounts.ElementAt(i).account_id);
        //    }

        //    for (int i = 0; i < listAccounts.Count(); i++)
        //    {
        //        if (listAccounts.ElementAt(i).parent_account != null)
        //        {
        //            var parent = GetAccountInList(listAccounts.ElementAt(i).parent_account);

        //            parent.Children.Add(listAccounts.ElementAt(i));
        //        }
        //    }


        //    var result = new List<account>();

        //    for (int i = 0; i < listAccounts.Count(); i++)
        //    {
        //        if (listAccounts.ElementAt(i).parent_account == null)
        //        {
        //            result.Add(listAccounts.ElementAt(i));
        //        }
        //    }

        //    return result;
        //}
    }
}
