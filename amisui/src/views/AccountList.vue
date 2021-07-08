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

import {AccountConstant,AlertDialogConstant} from "../configs/constants"
import {mapActions,mapState} from 'vuex'
import AccountInfo from '../components/dialogs/AccountInfo.vue'
import AlertDialog from '../components/dialogs/AlertDialog.vue'
import ClickOutside from 'vue-click-outside'
import InputSearch from "../components/share/InputSearch.vue";
const columns = [
  {
    title: "Số tài khoản",
    dataIndex: "account_code",
    key: "account_code",
    width: 240,
    scopedSlots: { customRender: "account_code" },
  },
  {
    title: "Tên tài khoản",
    dataIndex: "account_name",
    key: "account_name",
    width: 230,
    scopedSlots: { customRender: "account_name" },
  },
  {
    title: "Tính chất",
    dataIndex: "nature",
    width: 135,
    key: "nature",
    scopedSlots: { customRender: "nature" },
  },
  {
    title: "Tên tiếng Anh",
    dataIndex: "english_name",
    width: 230,
    key: "english_name",
    scopedSlots: { customRender: "english_name" },
  },
  {
    title: "Diễn giải",
    dataIndex: "explain",
    key: "explain",
    width: 240,
    scopedSlots: { customRender: "explain" },
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    width: 135,
    key: "status",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "Chức năng",
    dataIndex: "action",
    width: 120,
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

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
      AccountConstant,
      isExpand:false,
      accountIdSelected:"",
      columns,
      expandedRowKeys: [],
      isShowAccountInfo:false,
      AlertDialogConstant,
      isShowDialogConfirmDelete:false,
      messageOfDialog:"",
      acceptDelete:false
    };
  },
  methods: {
    ...mapActions(
      'account',
      [
        'getAccounts',
        'showFormAdd',
        'showFormEdit',
        'deleteAccount'
      ]
    ),
    showAccountInfo(){
      this.isShowAccountInfo = true      
    },
    closeAccountInfo(){
      this.isShowAccountInfo = false
    },
    handleExpandAllRows(){
      this.isExpand = !this.isExpand
      if(this.isExpand == false){
        this.expandedRowKeys=[]
      }else{
        this.expandedRowKeys=this.parentIdList
      }
    },
    customRow(record) {
      return {
        on: {
          click: () => {
            // alert(this.expandedRowKeys)
          },
          dblclick: () => {
            this.showFormEdit(record)
          },
        },
      };
    },
    btnDelete(record){
      this.isShowDialogConfirmDelete = true
      if(record.children != null){
        this.acceptDelete = false
        this.messageOfDialog = "Không thể xoá danh mục cha nếu chưa xoá tất cả các danh mục con."
      }else{
        this.accountIdSelected = record.account_id
        this.acceptDelete = true
        this.messageOfDialog = "Bạn có thực sự muốn xoá Tài khoản <"+record.account_code+"> không?"
      }
    },
    closeAlertDialog(){
      this.isShowDialogConfirmDelete = false
    },
    confirmDelete(){
      this.deleteAccount({
        account_id:this.accountIdSelected,
        callbackSuccess:()=>{
          this.showNotification("Xoá thành công!")
        },
        callbackFail:()=>{
          this.showNotification("Xoá thất bại!")
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
    showNotification(message){
      this.$notification['success']({
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
