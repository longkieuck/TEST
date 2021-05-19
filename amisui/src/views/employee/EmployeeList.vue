<template>
  <div>
    <div class="no-data" v-if="totalRecords==0">
      <img src="https://actappg1.misacdn.net/img/bg_report_nodata.76e50bd8.svg">
      <div>Không có dữ liệu</div>
    </div>
    <div class="icon-loader" v-show="isLoading"></div>
    <div class="container">
      <div class="header">
        <div class="header-name">Nhân viên</div>
        <div class="btn-add" @click="btnAdd">Thêm mới nhân viên</div>
      </div>
      <div class="content">
        <div class="top-content">
          <div class="input-search">
            <input
              v-model="search"
              @keyup="handleChageSearchText"
              placeholder="Tìm theo mã, tên nhân viên"
              type="text"
              class="input"
            />
            <div class="icon-search"></div>
          </div>
          <div class="refresh" @click="btnRefresh"></div>
          <div class="export" @click="exportData"></div>
          
        </div>
        <div class="grid-data">
          <table>
            <thead>
              <tr>
                <div class="th-first" style="min-width:40px"><a-checkbox></a-checkbox></div>
                <th style="min-width:120px">Mã nhân viên</th>
                <th style="min-width:200px">Tên nhân viên</th>
                <th style="min-width:120px">Giới tính</th>
                <th style="min-width:150px;text-align:center;padding-left:0px">Ngày sinh</th>
                <th style="min-width:200px">Số CMND</th>
                <th style="min-width:200px">Chức danh</th>
                <th style="min-width:250px">Tên đơn vị</th>
                <th style="min-width:150px">Số tài khoản</th>
                <th style="min-width:200px">Tên ngân hàng</th>
                <th style="min-width:200px;border-right:none">Chi nhánh TK ngân hàng</th>
                <div class="th-last">Chức năng</div>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr
                @dblclick="showDialogEdit(e)"
               v-for="e in employees"
               :key="e.employeeId"
              >
                <div class="td-first" style="min-width:40px"><a-checkbox></a-checkbox></div>
                <td style="min-width:120px">{{ e.employeeCode }}</td>
                <td style="min-width:200px">{{ e.fullName }}</td>
                <td style="min-width:120px">{{ e.genderName }}</td>
                <td style="min-width:150px;text-align:center;padding-left:0px">{{ e.dateOfBirth | formatDate }}</td>
                <td style="min-width:200px">{{ e.identifyNumber }}</td>
                <td style="min-width:200px">{{ e.positionName }}</td>
                <td style="min-width:250px">{{ e.departmentName }}</td>
                <td style="min-width:150px">{{ e.bankAccount }}</td>
                <td style="min-width:200px">{{ e.bankName }}</td>
                <td style="min-width:200px;border-right:none">{{ e.bankBranch }}</td>
                <div class="td-last">
                  <div class="edit-option" @click="showDialogEdit(e)">Sửa</div>
                  <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link">
                    <div class="drop-down-icon" @click="activeOption($event)" v-click-outside="removeActiveOption"></div>    
                    </a>
                    <a-menu slot="overlay" class="cover-option">
                      <a-menu-item key="0">
                        <a href="#" class="option" @click="btnClone(e)">Nhân bản</a>
                      </a-menu-item>
                      <a-menu-item key="1" @click="showDialogConfirmDelete(e)">
                        <a href="#" class="option">Xóa</a>
                      </a-menu-item>
                      <a-menu-item key="2">
                        <a href="#" class="option">Ngưng sử dụng</a>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
                </div>
              </tr>
           
            </tbody>
          </table>
        </div>
        <div class="pagging">
          <div class="total-record">Tổng số: <b>{{totalRecords}}</b> bản ghi</div>
          <div class="right-pagging">
            <div class="select-record-number">
              <a-select
                style="width:200px"
                show-search
                placeholder="Số bản ghi trên 1 trang"
                option-filter-prop="children"
                :filter-option="filterOption"
                @change="handleChangePageSize"
            >
                <a-select-option class="option-page-size" value="10">
                10 bản ghi trên 1 trang
                </a-select-option>
                <a-select-option class="option-page-size" value="20">
                20 bản ghi trên 1 trang
                </a-select-option>
                <a-select-option class="option-page-size" value="30">
                30 bản ghi trên 1 trang
                </a-select-option>
                <a-select-option class="option-page-size" value="50">
                50 bản ghi trên 1 trang
                </a-select-option>
                <a-select-option class="option-page-size" value="100">
                100 bản ghi trên 1 trang
                </a-select-option>
            </a-select>
            </div>
            <div class="select-page">
              <a-pagination
                v-model="pageIndex"
                size="small"
                class="pagging-item"
                showLessItems="true" 
                :total="totalRecords" 
                :pageSize="pageSize" 
                :item-render="itemRender"
                @change="handleChangePageIndex"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <InfoDialog v-if="typeOfInfoDialog != IS_CLOSE_DIALOG" @btnAdd="btnAdd"/>
    <AlertDialog v-if="typeOfAlertDialog != IS_CLOSE_DIALOG && typeOfAlertDialog != IS_DATA_CHANGE"/>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import moment from "moment";

import _ from 'lodash'
import {TIME_OF_DEBOUNCE,AlertDialogConstant } from '../../configs/constants'

import { mapState, mapActions } from "vuex";


import InfoDialog from '../../components/dialogs/InfoDialog.vue'
import AlertDialog from "../../components/dialogs/AlertDialog.vue";

export default {
  components: {
    InfoDialog,
    AlertDialog
  },
  data(){
    return{
      IS_CLOSE_DIALOG : AlertDialogConstant.IS_CLOSE_DIALOG,
      IS_DATA_CHANGE : AlertDialogConstant.IS_DATA_CHANGE
    }
  },
  created() {
    this.loadData()
  },
  computed: {
    ...mapState({
      employees: (state) => state.employees,
      typeOfInfoDialog: (state) => state.typeOfInfoDialog,
      // isShowNotifyDialog:(state)=>state.isShowNotifyDialog,
      typeOfAlertDialog: (state) => state.typeOfAlertDialog,
      totalRecords: (state) => state.totalRecords,
      totalPages: (state) => state.totalPages,
      pageIndex: (state) => state.pageIndex,
      pageSize: (state) => state.pageSize,
      search: (state) => state.search,
      isLoading:(state)=>state.isLoading
    }),
  },
  methods: {
    ...mapActions([
      "loadEmployee",
      "loadDepartment",
      "refreshData",
      "showLoading",
      "hideLoading",
      "changePageSize",
      "changeSearchText",
      "changePageIndex",
      "exportData",
      "showDialogConfirmDelete",
      "getNewEmployeeCode",
      "showDialogAdd",
      "showDialogEdit",
      "showDialogClone"
    ]),
    /**
     * Hàm thực hiện thêm class vào mũi tên được click
     * CreatedBy KDLong 18/05/2021
     */
    activeOption(event){
      event.currentTarget.classList.add('active');
    },
    /**
     * Hàm thực hiện loại bỏ border cho mũi tên khi click ra ngoài
     * CreatedBy KDLong 18/05/2021
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
     * Hàm thực lọc data cho combobox
     * CreatedBy KDLong 18/05/2021
     */
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    /**
     * Hàm xử lý độ trễ load sau thời gian TIME_OF_DEBOUNCE sẽ gọi các hàm ở trong nó
     * CreatedBy KDLong 18/05/2021
     */
    debounceLoad:_.debounce(function(functionLoad){
      functionLoad()
      },TIME_OF_DEBOUNCE),
    /**
     * Hàm thực hiện load data
     * CreatedBy KDLong 18/05/2021
     */
    loadData:function(){
      this.showLoading()
      this.loadDepartment()
      this.debounceLoad(()=>this.loadEmployee(()=>this.hideLoading()))
    },
    /**
     * Hàm thực hiện refresh data
     * CreatedBy KDLong 18/05/2021
     */
    btnRefresh:function(){
      this.showLoading();
      this.debounceLoad(()=>this.refreshData(()=>this.hideLoading()))
    },
    /**
     * Hàm thực hiện load data sau khi thay đổi page size
     * CreatedBy KDLong 18/05/2021
     */
    handleChangePageSize(value){
      this.showLoading();
      this.changePageIndex(1);
      this.changePageSize(value);
      this.debounceLoad(()=>this.loadEmployee(()=>this.hideLoading()))
    },
    /**
     * Hàm thực hiện load data sau khi thay đổi page index
     * CreatedBy KDLong 18/05/2021
     */
    handleChangePageIndex(value){
      this.showLoading();
      this.changePageIndex(value)
      this.debounceLoad(()=>this.loadEmployee(()=>this.hideLoading()))
    },
    /**
     * Hàm thực hiện load data sau khi thay đổi text trong input text
     * CreatedBy KDLong 18/05/2021
     */
    handleChageSearchText:_.debounce(function(e){
      //sau khi gõ TIME_OF_DEBOUNCE_TYPE ms sẽ thực hiện search
      this.showLoading()
      this.changePageIndex(1);
      this.changeSearchText(e.target.value)
      this.debounceLoad(()=>this.loadEmployee(()=>this.hideLoading()))
    },TIME_OF_DEBOUNCE),
    /**
     * Hàm thực hiện show dialog Add và lấy mã nhân viên mới sau khi click
     * CreatedBy KDLong 18/05/2021
     */
    btnAdd() {
      //Lấy mã nhân viên mới về
      this.getNewEmployeeCode()
      //Show dialog để add
      this.showDialogAdd()
    },
    btnClone(employee){
      this.getNewEmployeeCode()
      this.showDialogClone(employee)
    },
    /**
     * Xử lý pre và next cho pagging
     * CreatedBy KDLong 18/05/2021
     */
    itemRender(current, type, originalElement) {
      if (type === 'prev') {
        return <a class="btn-prev">Trước</a>;
      } else if (type === 'next') {
        return <a class="btn-next">Sau</a>;
      }
      return originalElement;
    },
  },
  mounted: function() {},
  filters: {
    //Thực hiện lọc ngày tháng năm để show lên UI
    formatDate: function(value) {
      if (value == null) return "";
      return moment(value).format("DD/MM/YYYY");
    },
  },
  directives: {
    ClickOutside
  }
};
</script>

<style>
@import "../../assets/css/components/table.css";
@import "../../assets/css/components/pagination.css";
@import "../../assets/css/views/employee.css";
</style>
