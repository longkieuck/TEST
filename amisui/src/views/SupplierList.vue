<template>
  <div class="container">
    <!-- <SupplierInfo/> -->
    <div class="header">
      <div class="left-header">
        <div class="header-title">
          Danh sách nhà cung cấp
        </div>
        <router-link class="back-box" to="/">
          <div class="back-icon"></div>
          <div class="back-text">
            Tất cả danh mục
          </div>
        </router-link>
      </div>
      <div class="right-header">
        <div class="tutorial-box">
          <div class="tutorial-icon"></div>
          <div class="tutorial-text">
            Hướng dẫn
          </div>
        </div>
        <div class="utility-box white-btn">
          <div class="white-btn-text">
            Tiện ích
          </div>
          <div class="white-btn-icon"></div>
        </div>
        <div class="add-box" @click="showFormAdd">
          <div class="add-text">
            Thêm
          </div>
          <div class="add-icon"></div>
        </div>
      </div>
    </div>
    <div class="top-grid-data" v-show="isShowTopGridData">
      <div class="box first">
        <div class="cover-amount">
          <div class="amount">
            0,00
          </div>
          <div class="filter-icon"></div>
        </div>
        <div class="content-text">
          Nợ quá hạn
        </div>
      </div>
      <div class="box second">
        <div class="cover-amount">
          <div class="amount">
            0,00
          </div>
          <div class="filter-icon"></div>
        </div>
        <div class="content-text">
          Tổng nợ phải trả
        </div>
      </div>
      <div class="box third">
        <div class="cover-amount">
          <div class="amount">
            0,00
          </div>
        </div>
        <div class="content-text">
          Đã thanh toán (30 ngày gần đây)
        </div>
      </div>
    </div>
    <div class="option-grid-data">
      <div class="left-option-grid-data">
        <div class="icon-select-all"></div>
        <div class="white-btn excute-all-box">
          <div class="white-btn-text">Thực hiện hàng loạt</div>
          <div class="white-btn-icon"></div>
        </div>
        <div class="white-btn filter-box">
          <div class="white-btn-text">Lọc</div>
          <div class="white-btn-icon"></div>
        </div>
      </div>
      <div class="right-option-grid-data">
        <div class="search-box">
          <InputSearch 
            placeholder="Nhập từ khoá tìm kiếm" 
            @keyup="handleChangeFilter"
          />
        </div>
        <div class="load-icon"></div>
        <div class="export-icon"></div>
        <div class="setting-icon"></div>
        <div class="collapse-option-grid-data" @click="handleShowTopGridData">
          <div
            class="collapse-icon"
            :class="isShowTopGridData ? null : 'collapse-icon-down'"
          ></div>
        </div>
      </div>
    </div>
    <div class="cover-table-supplier">
      <table>
        <thead>
          <tr>
            <th></th>
            <th class="th-td-first th-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </th>
            <th style="min-width:180px">Mã nhà cung cấp</th>
            <th style="min-width:350px">Tên nhà cung cấp</th>
            <th style="min-width:350px">Địa chỉ</th>
            <th style="min-width:150px">Mã số thuế</th>
            <th style="min-width:150px">Số điện thoại</th>
            <th style="min-width:150px;border-right:none">Số CMND</th>
            <th class="th-td-last">
              <div class="cover-first-last">
                <div class="cover-first-last">Chức năng</div>
              </div>
            </th>
            <th class="th-td-white"></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         <tr 
          v-for="s in suppliers"
          :key="s.supplier_id"
         >
            <td></td>
            <td class="th-td-first">
              <div class="cover-first-last"><input type="checkbox" /></div>
            </td>
            <td style="min-width:180px">
              {{s.supplier_code}}
            </td>
            <td style="min-width:350px">{{s.supplier_name}}</td>
            <td style="min-width:350px">{{s.address}}</td>
            <td style="min-width:150px">{{s.tax_code}}</td>
            <td style="min-width:150px">{{s.phone_number}}</td>
            <td style="min-width:150px;border-right:none">{{s.identify_number}}</td>
            <td class="th-td-last">
              <div class="cover-first-last">
                <div class="view-option" @click="showFormReadOnly(s)">Xem</div>
                  <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link">
                    <div class="drop-down-icon" @click="activeOption($event)" v-click-outside="removeActiveOption"></div>    
                    </a>
                    <a-menu slot="overlay" class="cover-option">
                      <a-menu-item key="0">
                        <a @click="showFormEdit(s)" class="option">Sửa</a>
                      </a-menu-item>
                      <a-menu-item key="1">
                        <a @click="showDialogConfirmDelete(s)" class="option">Xóa</a>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
              </div>
            </td>
            <td class="th-td-white"></td>
            <td></td>
          </tr>
          
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <div class="left-pagination">Tổng số: <b>{{totalRecords}}</b> bản ghi</div>
      <div class="right-pagination">
        <div class="select-record-number">
          <a-select
                style="width:225px;margin-top:15px"
                show-search
                placeholder="Số bản ghi trên 1 trang"
                option-filter-prop="children"
                @change="handleChangePageSize"
                :open="isShowDropdown"
                v-click-outside="closeDropdown"
                v-model="pageSize"
            >
                <div slot="suffixIcon" class="cover-suffix-s">
                  <div @click="showDropdown" class="cover-dropdown-icon-s">
                    <div
                      class="arrow-dropdown-s"
                      :class="isShowDropdown ? 'rotate' : null"
                    />
                  </div>
                </div>
                <a-select-option 
                  v-for="page in PageSizes"
                  :key="page.value"
                  class="option-page-size" 
                  :value="page.value"
                  @change="handleChangePageSize"
                >
                {{page.text}}
                </a-select-option>
            </a-select>
        </div>
        <div class="select-page">
          <a-pagination
            size="small"
            :showLessItems="true"
            :total="totalRecords"
            :pageSize="pageSize"
            :item-render="itemRender"
            @change="handleChangePageIndex"
            v-model="pageIndex"
          />
        </div>
      </div>
    </div>
    <SupplierInfo
      v-if="supplierFormMode != SupplierConstant.IS_CLOSE"
    />
    <AlertDialog
      v-if="isShowDialogConfirmDelete"
      :alertFormMode="AlertDialogConstant.IS_CONFIRM_DELETE"
      :messageOfDialog="messageOfDialog"
      @closeAlertDialog="closeAlertDialog"
      @confirmDelete="confirmDelete"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import ClickOutside from 'vue-click-outside'
import InputSearch from "../components/share/InputSearch";
import SupplierInfo from "../components/dialogs/SupplierInfo"
import AlertDialog from "../components/dialogs/AlertDialog"
import {mapActions, mapState} from "vuex"
import {SupplierConstant,AlertDialogConstant,PageSizes,NotifiactionConstant} from "../configs/constants"
export default {
  components: {
    InputSearch,
    SupplierInfo,
    AlertDialog
  },
  computed:{
    ...mapState({
      suppliers:state=> state.supplier.suppliers,
      supplierFormMode:state=>state.supplier.supplierFormMode,
      totalRecords:state=>state.supplier.totalRecords,
      pageSize:state=>state.supplier.pageSize,
      pageIndex:state=>state.supplier.pageIndex,
      filter:state=>state.supplier.filter
    })
  },
  created(){
    this.getSuppliers()
  },
  data() {
    return {
      supplierIdForDelete:"",//Id được chọn để xoá
      isShowTopGridData: true,//Show top grid data
      SupplierConstant,//Hằng số của module
      AlertDialogConstant,//Hằng số dialog
      PageSizes,//Hằng số pagesize
      isShowDropdown:false,//Dropdown của pagging
      isShowDialogConfirmDelete:false,//Show dialog xác nhận xoá
      messageOfDialog:""//Thông báo của diaglog
    };
  },
  methods: {
    ...mapActions(
      'supplier',
      [
        'getSuppliers',
        'showFormAdd' ,
        'showFormEdit',
        'showFormReadOnly',
        'deleteSupplier',
        'changePageIndex',
        'changePageSize',
        'changeFilter'
      ]
    ),
    /**
     * show top grid data
     * CreatedBy KDLong 01/07/2021
     */
    handleShowTopGridData() {
      this.isShowTopGridData = !this.isShowTopGridData;
    },
    /**
     * show form chi tiết
     * CreatedBy KDLong 01/07/2021
     */
    showSupplierInfo(){
      this.isShowSupplierInfo = true
    },
    /**
     * đóng form chi tiết
     * CreatedBy KDLong 01/07/2021
     */
    closeSupplierInfo(){
      this.isShowSupplierInfo = false
    },
    /**
     * show diglog confirm xoá
     * CreatedBy KDLong 01/07/2021
     */
    showDialogConfirmDelete(s){
      this.supplierIdForDelete = s.supplier_id
      this.messageOfDialog = SupplierConstant.MESS_FRONT2 +s.supplier_code+ SupplierConstant.MESS_BACK2
      this.isShowDialogConfirmDelete = true
    },
    /**
     * xác nhận xoá
     * CreatedBy KDLong 01/07/2021
     */
    confirmDelete(){
      this.deleteSupplier({
        supplier_id:this.supplierIdForDelete,
        callbackSuccess:()=>{
          this.showNotification(NotifiactionConstant.DELETE_SUCCESS,NotifiactionConstant.SUCCESS)
        },
        callbackFail:()=>{
          this.showNotification(NotifiactionConstant.DELETE_FAILURE,NotifiactionConstant.ERROR)
        }
      })
    },
    /**
     * đóng form xoá
     * CreatedBy KDLong 01/07/2021
     */
    closeAlertDialog(){
      this.isShowDialogConfirmDelete = false
    },
    /**
     * customize paging
     * CreatedBy KDLong 01/07/2021
     */
    itemRender(current, type, originalElement) {
      if (type === 'prev') {
        return <a class="btn-prev">Trước</a>;
      } else if (type === 'next') {
        return <a class="btn-next">Sau</a>;
      }
      return originalElement;
    },
    /**
     * thay đổi số bản ghi/trang
     * CreatedBy KDLong 01/07/2021
     */
    handleChangePageSize(value){
      this.changePageSize(value)
    },
    /**
     * thay đổi trang hiện tại
     * CreatedBy KDLong 01/07/2021
     */
    handleChangePageIndex(value){
      this.changePageIndex(value)
    },
    /**
     * thay đổi filter
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeFilter:_.debounce(function(e){
      this.changeFilter(e.target.value)
    },500),
    /**
     * Hàm thực hiện thêm class vào mũi tên được click
     * CreatedBy KDLong 02/06/2021
     */
    activeOption(event){
      event.currentTarget.classList.add('active');
    },
    showDropdown(){
      this.isShowDropdown=!this.isShowDropdown
    },
    closeDropdown(){
      this.isShowDropdown = false
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

@import "../assets/css/views/supplier.css";
@import "../assets/css/components/table.css";
@import "../assets/css/components/pagination.css";
</style>
