<template>
  <div>
    <div class="icon-loader" v-show="false"></div>
    <div class="container">
      <div class="header">
        <div class="header-name">Nhân viên</div>
        <div class="btn-add">Thêm mới nhân viên</div>
      </div>
      <div class="content">
        <div class="top-content">
          <div class="input-search">
            <input
              
              placeholder="Tìm theo mã, tên nhân viên"
              type="text"
              class="input"
            />
            <div class="icon-search"></div>
          </div>
          <div class="export"></div>
          <div class="refresh"></div>
        </div>
        <div class="grid-data">
          <table>
            <thead>
              <tr>
                <th style="min-width:40px"><a-checkbox></a-checkbox></th>
                <th style="min-width:150px">Mã nhân viên</th>
                <th style="min-width:250px">Tên nhân viên</th>
                <th style="min-width:120px">Giới tính</th>
                <th style="min-width:150px;text-align:center;padding-left:0px">Ngày sinh</th>
                <th style="min-width:200px">Số CMND</th>
                <th style="min-width:250px">Chức danh</th>
                <th style="min-width:250px">Tên đơn vị</th>
                <th style="min-width:150px">Số tài khoản</th>
                <th style="min-width:250px">Tên ngân hàng</th>
                <th style="min-width:200px">Chi nhánh TK ngân hàng</th>
                <th style="min-width:120px">Chức năng</th>
              </tr>
            </thead>
            <tbody class="table-body">
                <tr>
                <td style="min-width:40px"><a-checkbox></a-checkbox></td>
                <td style="min-width:150px">11111111</td>
                <td style="min-width:250px">11111111</td>
                <td style="min-width:120px">11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td style="min-width:200px">11111111</td>
                <td style="min-width:250px">11111111</td>
                <td style="min-width:250px">11111111</td>
                <td style="min-width:150px">11111111</td>
                <td style="min-width:250px">11111111</td>
                <td style="min-width:200px">11111111</td>
                <td style="min-width:120px">11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
              <tr>
                <td><a-checkbox></a-checkbox></td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
                <td>11111111</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagging">
          <div class="total-record">Tổng số: <b>100</b> bản ghi</div>
          <div class="right-pagging">
            <div class="select-record-number">
              <!-- <a-select default-value="10" style="width: 200px;" @change="handleChangePageSize">
                <a-select-option value="10">
                  10 bản ghi trên 1 trang
                </a-select-option>
                <a-select-option value="20">
                  20 bản ghi trên 1 trang
                </a-select-option>
                <a-select-option value="30" >
                  30 bản ghi trên 1 trang
                </a-select-option>
                <a-select-option value="50">
                  50 bản ghi trên 1 trang
                </a-select-option>
                <a-select-option value="100">
                  100 bản ghi trên 1 trang
                </a-select-option>
              </a-select> -->
            </div>
            <div class="select-page">
              <!-- <a-pagination
                showLessItems="true" 
                @change="onChangePage" 
                :total="totalRecords" 
                :pageSize="pageSize" 
                :item-render="itemRender"
              /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <InfoDialog v-if="isShow" />
    <NotifyDialog v-if="isShowNotifyDialog"/> -->
  </div>
</template>

<script>
import moment from "moment";
// import _ from 'lodash'
// import { mapActions, mapState } from "vuex";
// import NotifyDialog from '../../components/dialogs/NotifyDialog.vue'
// import InfoDialog from "../../components/dialogs/InfoDialog.vue";
//Thời gian trễ
// let TIME_OF_DEBOUNCE_LOAD = 1000
// let TIME_OF_DEBOUNCE_TYPE = 500
export default {
  components: {
    // InfoDialog,
    // NotifyDialog
  },
  created() {
    // this.loadData();
  },
  computed: {
    // ...mapState({
    //   isEdit: (state) => state.isEdit,
    //   isAdd: (state) => state.isAdd,
    //   isShow: (state) => state.isShow,
    //   isShowNotifyDialog:(state)=>state.isShowNotifyDialog,
    //   employees: (state) => state.employees,
    //   totalRecords: (state) => state.totalRecords,
    //   totalPages: (state) => state.totalPages,
    //   pageIndex: (state) => state.pageIndex,
    //   pageSize: (state) => state.pageSize,
    //   search: (state) => state.search,
    //   isLoading:(state)=>state.isLoading
    // }),
  },
  methods: {
    // ...mapActions([
    //   "loadEmployee",
    //   "loadDepartment",
    //   "showDialogForAdd",
    //   "showDialogForEdit",
    //   "getNewEmployeeCode",
    //   "deleteEmployee",
    //   "showDialogConfirmDelete",
    //   "changePageSize",
    //   "changeSearchText",
    //   "changePage",
    //   "isLoading",
    //   "showLoading",
    //   "closeLoading",
    //   "exportData",
    // ]),
    // //Hàm thực hiện load data
    // loadData:function(){
    //   this.showLoading()
    //   this.debounceLoadData()
    // } ,
    // // Sử lý độ trễ
    // debounceLoadData:_.debounce(function(){
    //   this.loadEmployee();
    //   this.loadDepartment();
    //   this.closeLoading()
    //   },TIME_OF_DEBOUNCE_LOAD),
    // //Sự kiện click vào thêm nhân viên
    // btnAdd() {
    //   //Lấy mã nhân viên mới về
    //   this.getNewEmployeeCode();
    //   //Show dialog để add
    //   this.showDialogForAdd();
    // },
    // // Sự kiện khi double click vào tr=> hiện chi tiết nhân viên
    // showDetailEmployee(e){
    //   this.showDialogForEdit(e)
    // },
    // // Sử lý sự kiện thay đổi pagesize
    // handleChangePageSize(value){
    //   //Show loading lên
    //   this.showLoading()
    //   //set lại pageIndex = 1
    //   this.changePage(1)
    //   //set pageSize = value
    //   this.changePageSize(value)
    //   //Load lại data
    //   this.debounceLoadData()
    // },
    // // Sử lý sự kiện lọc
    // handleChageSearch:_.debounce(function(e){
    //   //sau khi gõ TIME_OF_DEBOUNCE_TYPE ms sẽ thực hiện search
    //   this.showLoading()
    //   this.changeSearchText(e.target.value)
    //   this.debounceLoadData();
    // },TIME_OF_DEBOUNCE_TYPE),
    // //Sử lý icon pagging
    // itemRender(current, type, originalElement) {
    //   if (type === 'prev') {
    //     return <a>Trước</a>;
    //   } else if (type === 'next') {
    //     return <a>Sau</a>;
    //   }
    //   return originalElement;
    // },
    // //Thay đổi pageIndex
    // onChangePage(page){
    //   //show loading
    //   this.showLoading()
    //   //Thay PageIndex = page
    //   this.changePage(page)
    //   //Load data
    //   this.debounceLoadData()
    // },
  },
  mounted: function() {},
  filters: {
    //Thực hiện lọc ngày tháng năm để show lên UI
    formatDate: function(value) {
      if (value == null) return "";
      return moment(value).format("DD/MM/YYYY");
    },
  },
};
</script>

<style>
@import "../../assets/css/components/table.css";
@import "../../assets/css/views/employee.css";
</style>
