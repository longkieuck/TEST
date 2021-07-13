<template>
  <div class="container">
    <div class="header">
      <div class="left-header">
        <div class="header-title">
          Hệ thống tài khoản
        </div>
        <router-link class="back-box" to="/">
          <div class="back-icon"></div>
          <div class="back-text">
            Tất cả danh mục
          </div>
        </router-link>
      </div>
      <div class="right-header">
        <div class="switch-account-button">
          Chuyển tài khoản hạch toán
        </div>
        <div class="add-account-button" @click="showFormAdd">
          Thêm
        </div>
      </div>
    </div>
    <div class="top-table-content">
      <div class="left-top-table-content">
        <InputSearch
          placeholder="Tìm kiếm theo số, tên tài khoản"
          lWidth=250
        />
      </div>
      <div class="right-top-table-content">
        <div class="display-option" @click="handleExpandAllRows">
          <div v-show="isExpand">
            Thu gọn
          </div>
          <div v-show="!isExpand">
            Mở rộng
          </div>
        </div>
        <div class="load-icon"></div>
        <div class="export-icon"></div>
      </div>
    </div>
    <div class="cover-table-account">
      <a-table
        :columns="columns"
        :data-source="accounts"
        :expanded-row-keys.sync="expandedRowKeys"
        :customRow="customRow"
        :pagination="false"
      >
        <template slot="action" slot-scope="text,record">
            <div class="cover-action">
              <div class="edit-option" @click="showFormEdit(record)">Sửa</div>
                  <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link">
                    <div class="drop-down-icon" @click="activeOption($event)" v-click-outside="removeActiveOption"></div>    
                    </a>
                    <a-menu slot="overlay" class="cover-option">
                      <a-menu-item key="1">
                        <a href="#" class="option" @click="btnDelete(record)">Xóa</a>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
            </div>
        </template>
        <template slot="status" slot-scope="text,record">
            <div v-if="record.children != null"><b>Đang hoạt động</b></div>
            <div v-else>Đang hoạt động</div>
        </template>
        <template slot="explain" slot-scope="text,record">
            <div v-if="record.children != null"><b>{{text}}</b></div>
            <div v-else>{{text}}</div>
        </template>
        <template slot="english_name" slot-scope="text,record">
            <div v-if="record.children != null"><b>{{text}}</b></div>
            <div v-else>{{text}}</div>
        </template>
        <template slot="nature" slot-scope="text,record">
            <div v-if="record.children != null"><b>{{text}}</b></div>
            <div v-else>{{text}}</div>
        </template>
        <template slot="account_name" slot-scope="text,record">
            <div v-if="record.children != null"><b>{{text}}</b></div>
            <div v-else>{{text}}</div>
        </template>
        <template slot="account_code" slot-scope="text,record">
            <div v-if="record.children != null" style="display:contents"><b>{{text}}</b></div>
            <div v-else style="display:contents">{{text}}</div>
        </template>
      </a-table>
    </div>
    <div class="footer-table-account">
      <div style="font-size:13px">Tổng số: <b>{{totalRecords}}</b> bản ghi</div>
    </div>
    <AccountInfo
      v-if="accountFormMode != AccountConstant.IS_CLOSE"
    />
    <AlertDialog
      v-if="isShowDialogConfirmDelete"
      :alertFormMode="acceptDelete ? AlertDialogConstant.IS_CONFIRM_DELETE : AlertDialogConstant.DELETE_FAILURE"
      :messageOfDialog="messageOfDialog"
      @closeAlertDialog="closeAlertDialog"
      @confirmDelete="confirmDelete"
    />
  </div>
</template>

<script>

import {AccountConstant,AlertDialogConstant,NotifiactionConstant,columns} from "../configs/constants"
import {mapActions,mapState} from 'vuex'
import AccountInfo from '../components/dialogs/AccountInfo.vue'
import AlertDialog from '../components/dialogs/AlertDialog.vue'
import ClickOutside from 'vue-click-outside'
import InputSearch from "../components/share/InputSearch.vue";
export default {
  components: {
    InputSearch,
    AccountInfo,
    AlertDialog
  },
  computed:{
    ...mapState({
      accounts:state =>state.account.accounts,
      accountFormMode:state =>state.account.accountFormMode,
      parentIdList:state =>state.account.parentIdList,
      totalRecords:state =>state.account.totalRecords
    })
  },
  created(){
    this.getAccounts()
  },
  data() {
    return {
      AccountConstant,//Hằng số
      isExpand:false,//Mở rộng
      accountIdSelected:"",//Id được chọn để xoá
      columns,//columns của table
      expandedRowKeys: [],//Danh sách các tài khoản đã được mở rộng
      isShowAccountInfo:false,//Show form info
      AlertDialogConstant,//Hằng số của dialog
      isShowDialogConfirmDelete:false,//Show form confirm delete
      messageOfDialog:"",//Thông báo trên dialog
      acceptDelete:false// cho phép xoá hay không
    };
  },
  methods: {
    ...mapActions(
      'account',
      [
        'getAccounts',
        'showFormAdd',
        'showFormEdit',
        'deleteAccount',
        'selectParentId'
      ]
    ),
    /**
     * Show form chi tiết tài khoản
     * CreatedBy KDLong 01/07/2021
     */
    showAccountInfo(){
      this.isShowAccountInfo = true      
    },
    /**
     * Đóng form chi tiết tài khoản
     * CreatedBy KDLong 01/07/2021
     */
    closeAccountInfo(){
      this.isShowAccountInfo = false
    },
    /**
     * Sử lí sự kiện thu gọn và mở rộng
     * CreatedBy KDLong 01/07/2021
     */
    handleExpandAllRows(){
      this.isExpand = !this.isExpand
      if(this.isExpand == false){
        this.expandedRowKeys=[]
      }else{
        this.expandedRowKeys=this.parentIdList
      }
    },
    /**
     * Sự kiện dblclick vào table
     * CreatedBy KDLong 01/07/2021
     */
    customRow(record) {
      return {
        on: {
          click: () => {
            this.selectParentId(record.account_id)
            // alert(this.expandedRowKeys)
          },
          dblclick: () => {
            // this.showFormEdit(record)
          },
        },
      };
    },
    /**
     * Sự kiện click vào btn xoá
     * CreatedBy KDLong 01/07/2021
     */
    btnDelete(record){
      this.isShowDialogConfirmDelete = true
      if(record.children != null){
        this.acceptDelete = false
        this.messageOfDialog = AccountConstant.CAN_NOT_DELETE
      }else{
        this.accountIdSelected = record.account_id
        this.acceptDelete = true
        this.messageOfDialog = AccountConstant.MESS_FRONT + record.account_code + AccountConstant.MESS_BACK
      }
    },
    /**
     * Đóng form cf delete
     * CreatedBy KDLong 01/07/2021
     */
    closeAlertDialog(){
      this.isShowDialogConfirmDelete = false
    },
    /**
     * Sự kiện xoá
     * CreatedBy KDLong 01/07/2021
     */
    confirmDelete(){
      this.deleteAccount({
        account_id:this.accountIdSelected,
        callbackSuccess:()=>{
          this.showNotification(NotifiactionConstant.DELETE_SUCCESS,NotifiactionConstant.SUCCESS)
        },
        callbackFail:()=>{
          this.showNotification(NotifiactionConstant.DELETE_FAILURE,NotifiactionConstant.ERROR)
        }
      })
    },
    /**
     * Hàm thực hiện thêm class vào mũi tên được click
     * CreatedBy KDLong 02/06/2021
     */
    activeOption(event){
      event.currentTarget.classList.add('active');
    },
    /**
     * Hàm thực hiện loại bỏ border cho mũi tên khi click ra ngoài
     * CreatedBy KDLong 02/06/2021
     */
    removeActiveOption(event){
      //Kiểm tra vị trí click xem có phải mũi tên hay không
      if(event.target.classList.contains("drop-down-icon") ||event.target.classList.contains("cover-drop-down-icon") ){
        //Nếu có phải thì loại bỏ hết các border của các mũi tên khác
        let activeIcon = document.querySelectorAll('.active');
        activeIcon.forEach((activeElement) => {
                    activeElement.classList.remove('active');
                });
        //Sau đó border cho mũi tên vừa click
        event.target.classList.add('active')
      }else{
        //Nếu chỗ click ko phải mũi tên thì loại bỏ border cho mũi tên
        let activeIcon = document.querySelectorAll('.active');
        activeIcon.forEach((activeElement) => {
                    activeElement.classList.remove('active');
                });
      }
      
    },
    /**
     * show thông báo
     * CreatedBy KDLong 01/07/2021
     */
    showNotification(message,type){
      this.$notification[type]({
        message,
        duration:2
      });
    }
  },
  directives: {
    ClickOutside
  }
};
</script>
<style scoped>
@import "../assets/css/views/account.css";
</style>
