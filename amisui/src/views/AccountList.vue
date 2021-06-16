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
        <div class="add-account-button" @click="showAccountInfo">
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
          Thu gọn
        </div>
        <div class="load-icon"></div>
        <div class="export-icon"></div>
      </div>
    </div>
    <div class="cover-table-account">
      <a-table
        :columns="columns"
        :data-source="data"
        :expanded-row-keys.sync="expandedRowKeys"
        :customRow="customRow"
        :pagination="false"
      >
        <template slot="action" slot-scope="text,record">
            <div class="cover-action">
              <div class="edit-option" @click="handleEdit(record)">Sửa</div>
                  <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link">
                    <div class="drop-down-icon" @click="activeOption($event)" v-click-outside="removeActiveOption"></div>    
                    </a>
                    <a-menu slot="overlay" class="cover-option">
                      <a-menu-item key="1">
                        <a href="#" class="option" @click="handleDelete(record)">Xóa</a>
                      </a-menu-item>
                      <a-menu-item key="2">
                        <a href="#" class="option">Ngưng sử dụng</a>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
            </div>
        </template>
        <template slot="status" slot-scope="text,record">
            <div v-if="record.hasChild == true"><b>{{text}}</b></div>
            <div v-else>{{text}}</div>
        </template>
        <template slot="explain" slot-scope="text,record">
            <div v-if="record.hasChild == true"><b>{{text}}</b></div>
            <div v-else>{{text}}</div>
        </template>
        <template slot="englishName" slot-scope="text,record">
            <div v-if="record.hasChild == true"><b>{{text}}</b></div>
            <div v-else>{{text}}</div>
        </template>
        <template slot="nature" slot-scope="text,record">
            <div v-if="record.hasChild == true"><b>{{text}}</b></div>
            <div v-else>{{text}}</div>
        </template>
        <template slot="accountName" slot-scope="text,record">
            <div v-if="record.hasChild == true"><b>{{text}}</b></div>
            <div v-else>{{text}}</div>
        </template>
        <template slot="accountNumber" slot-scope="text,record">
            <div v-if="record.hasChild == true" style="display:contents"><b>{{text}}</b></div>
            <div v-else style="display:contents">{{text}}</div>
        </template>
      </a-table>
    </div>
    <div class="footer-table-account">
      <div style="font-size:13px">Tổng số: <b>20</b> bản ghi</div>
    </div>
    <AccountInfo
      v-if="isShowAccountInfo"
      @closeAccountInfo="closeAccountInfo"
    />
  </div>
</template>

<script>
import AccountInfo from '../components/dialogs/AccountInfo.vue'
import ClickOutside from 'vue-click-outside'
import InputSearch from "../components/share/InputSearch.vue";
const columns = [
  {
    title: "Số tài khoản",
    dataIndex: "accountNumber",
    key: "accountNumber",
    width: 240,
    scopedSlots: { customRender: "accountNumber" },
  },
  {
    title: "Tên tài khoản",
    dataIndex: "accountName",
    key: "accountName",
    width: 230,
    scopedSlots: { customRender: "accountName" },
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
    dataIndex: "englishName",
    width: 230,
    key: "englishName",
    scopedSlots: { customRender: "englishName" },
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

const data = [
  {
    key: 1,
    accountNumber: "Kiều Đức Long",
    accountName: "Kiều Đức Long",
    nature: "Kiều Đức Long",
    englishName: "11111",
    explain: "11111",
    status: "11111",
    hasChild:true,
    children: [
      {
        key: 2,
        accountNumber: "Kiều Đức Long",
        accountName: "Kiều Đức Long",
        nature: "Kiều Đức Long",
        englishName: "11111",
        explain: "11111",
        status: "11111",
        hasChild:false,
      },
      {
        key: 3,
        accountNumber: "Kiều Đức Long",
        accountName: "Kiều Đức Long",
        nature: "Kiều Đức Long",
        englishName: "11111",
        explain: "11111",
        status: "11111",
        hasChild:true,
        children: [
          {
            key: 4,
            accountNumber: "Kiều Đức Long",
            accountName: "Kiều Đức Long",
            nature: "Kiều Đức Long",
            englishName: "11111",
            explain: "11111",
            status: "11111",
            hasChild:false,
          },
        ],
      },
      {
        key: 5,
        accountNumber: "Kiều Đức Long",
        accountName: "Kiều Đức Long",
        nature: "Kiều Đức Long",
        englishName: "11111",
        explain: "11111",
        status: "11111",
        hasChild:true,
        children: [
          {
            key: 6,
            accountNumber: "Kiều Đức Long",
            accountName: "Kiều Đức Long",
            nature: "Kiều Đức Long",
            englishName: "11111",
            explain: "11111",
            status: "11111",
            hasChild:true,
            children: [
              {
                key: 7,
                accountNumber: "Kiều Đức Long",
                accountName: "Kiều Đức Long",
                nature: "Kiều Đức Long",
                englishName: "11111",
                explain: "11111",
                status: "11111",
                hasChild:false,
              },
              {
                key: 8,
                accountNumber: "Kiều Đức Long",
                accountName: "Kiều Đức Long",
                nature: "Kiều Đức Long",
                englishName: "11111",
                explain: "11111",
                status: "11111",
                hasChild:false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 1,
    accountNumber: "Kiều Đức Long",
    accountName: "Kiều Đức Long",
    nature: "Kiều Đức Long",
    englishName: "11111",
    explain: "11111",
    status: "11111",
    hasChild:false,
  },
  {
    key: 1,
    accountNumber: "Kiều Đức Long",
    accountName: "Kiều Đức Long",
    nature: "Kiều Đức Long",
    englishName: "11111",
    explain: "11111",
    status: "11111",
    hasChild:false,
  },
  {
    key: 1,
    accountNumber: "Kiều Đức Long",
    accountName: "Kiều Đức Long",
    nature: "Kiều Đức Long",
    englishName: "11111",
    explain: "11111",
    status: "11111",
    hasChild:false,
  },
  {
    key: 1,
    accountNumber: "Kiều Đức Long",
    accountName: "Kiều Đức Long",
    nature: "Kiều Đức Long",
    englishName: "11111",
    explain: "11111",
    status: "11111",
    hasChild:false,
  },
  {
    key: 1,
    accountNumber: "Kiều Đức Long",
    accountName: "Kiều Đức Long",
    nature: "Kiều Đức Long",
    englishName: "11111",
    explain: "11111",
    status: "11111",
    hasChild:false,
  },
  {
    key: 1,
    accountNumber: "Kiều Đức Long",
    accountName: "Kiều Đức Long",
    nature: "Kiều Đức Long",
    englishName: "11111",
    explain: "11111",
    status: "11111",
    hasChild:false,
  },
  {
    key: 1,
    accountNumber: "Kiều Đức Long",
    accountName: "Kiều Đức Long",
    nature: "Kiều Đức Long",
    englishName: "11111",
    explain: "11111",
    status: "11111",
    hasChild:false,
  },
  {
    key: 1,
    accountNumber: "Kiều Đức Long",
    accountName: "Kiều Đức Long",
    nature: "Kiều Đức Long",
    englishName: "11111",
    explain: "11111",
    status: "11111",
    hasChild:false,
  },
  {
    key: 1,
    accountNumber: "Kiều Đức Long",
    accountName: "Kiều Đức Long",
    nature: "Kiều Đức Long",
    englishName: "11111",
    explain: "11111",
    status: "11111",
    hasChild:false,
  },
  {
    key: 1,
    accountNumber: "Kiều Đức Long",
    accountName: "Kiều Đức Long",
    nature: "Kiều Đức Long",
    englishName: "11111",
    explain: "11111",
    status: "11111",
    hasChild:false,
  },
  {
    key: 1,
    accountNumber: "Kiều Đức Long",
    accountName: "Kiều Đức Long",
    nature: "Kiều Đức Long",
    englishName: "11111",
    explain: "11111",
    status: "11111",
    hasChild:false,
  },
  {
    key: 1,
    accountNumber: "Kiều Đức Long",
    accountName: "Kiều Đức Long",
    nature: "Kiều Đức Long",
    englishName: "11111",
    explain: "11111",
    status: "11111",
    hasChild:false,
  },
  {
    key: 1,
    accountNumber: "Kiều Đức Long",
    accountName: "Kiều Đức Long",
    nature: "Kiều Đức Long",
    englishName: "11111",
    explain: "11111",
    status: "11111",
    hasChild:false,
  },
  {
    key: 1,
    accountNumber: "Kiều Đức Long",
    accountName: "Kiều Đức Long",
    nature: "Kiều Đức Long",
    englishName: "11111",
    explain: "11111",
    status: "11111",
    hasChild:false,
  },
];

export default {
  components: {
    InputSearch,
    AccountInfo
  },
  data() {
    return {
      data,
      columns,
      expandedRowKeys: [],
      isShowAccountInfo:false
    };
  },
  methods: {
    showAccountInfo(){
      this.isShowAccountInfo = true      
    },
    closeAccountInfo(){
      this.isShowAccountInfo = false
    },
    handleExpandAllRows(){
      this.expandedRowKeys=[]
    },
    customRow(record) {
      return {
        on: {
          click: () => {
            alert(this.expandedRowKeys)
          },
          dblclick: () => {
            this.handleEdit(record)
          },
        },
      };
    },
    handleEdit(record){
      alert(record.accountNumber)      
    },
    handleDelete(record){
      alert(record.accountNumber)
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
  },
  directives: {
    ClickOutside
  }
};
</script>
<style scoped>
@import "../assets/css/views/account.css";
</style>
