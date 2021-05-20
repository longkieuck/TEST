<template>
  <div>
    <div class="dialog-box"></div>
    <div class="dialog-content">
      <div class="header-dialog-box">
        <div class="dialog-title">Thông tin nhân viên</div>
        <div class="option-user-box">
          <a-checkbox>
            Là khách hàng
          </a-checkbox>
          <a-checkbox>
            Là nhà cung cấp
          </a-checkbox>
        </div>
        <div class="top-right-option">
          <div class="btn-help"></div>
          <div class="btn-close" @click="btnClose"></div>
        </div>
      </div>
      <div class="content-dialog-box">
        <div class="line-input">
          <div class="item-input">
            <div class="title-input">Mã <span style="color:red">*</span></div>
            <input
              maxlength="20"
              @mouseover="showCodeRequired"
              @mouseleave="hideCodeRequired"
              @focus="focusValidate"
              @blur="handleValidate"
              ref="employeeCode"
              v-model="employee.employeeCode"
              type="text"
              class="input-type1"
            />
            <div class="code-error" v-show="showCodeTooltip">
              Mã không được để trống .
            </div>
          </div>
          <div class="item-input space-type1">
            <div class="title-input">Tên <span style="color:red">*</span></div>
            <input
              @mouseover="showNameRequired"
              @mouseleave="hideNameRequired"
              @focus="focusValidate"
              @blur="handleValidate"
              ref="fullName"
              v-model="employee.fullName"
              type="text"
              class="input-type2"
            />
            <div class="name-error" v-show="showNameTooltip">
              Tên không được để trống .
            </div>
          </div>
          <div class="item-input space-type2">
            <div class="title-input">Ngày sinh</div>
            <a-date-picker
              :placeholder="dateFormat"
              class="input-type3"
              v-model="dateOfBirthFormat"
              :format="dateFormat"
            />
          </div>
          <div class="item-input gender">
            <div class="title-input margin-gender-option">Giới tính</div>
            <a-radio-group v-model="employee.gender">
              <a-radio :value="0">
                Nam
              </a-radio>
              <a-radio :value="1">
                Nữ
              </a-radio>
              <a-radio :value="2">
                Khác
              </a-radio>
            </a-radio-group>
          </div>
        </div>
        <div class="line-input">
          <div
            class="item-input"
            @mouseover="showDepartmentRequired"
            @mouseleave="hideDepartmentRequired"
          >
            <div class="title-input">
              Đơn vị <span style="color:red">*</span>
            </div>
            <a-select
              @mouseleave="hideDepartmentRequired"
              @focus="hoverValidate"
              @blur="handleValidate"
              v-model="employee.departmentName"
              ref="departmentName"
              class="input-type4a"
              show-search
              option-filter-prop="children"
              :filter-option="filterOption"
            >
              <a-select-option
                v-for="d in departments"
                :key="d.departmentId"
                class="option-department"
                :value="d.departmentName"
              >
                {{ d.departmentName }}
              </a-select-option>
            </a-select>
          </div>
          <div class="department-error" v-show="showDepartmentTooltip">
            Đơn vị không được phép để trống .
          </div>
          <div class="item-input space-type2">
            <div class="title-input">Số CMND</div>
            <input
              v-model="employee.identifyNumber"
              type="text"
              class="input-type5"
            />
          </div>
          <div class="item-input space-type1">
            <div class="title-input">Ngày cấp</div>
            <a-date-picker
              :placeholder="dateFormat"
              class="input-type3"
              v-model="identifyDateFormat"
              :format="dateFormat"
            />
          </div>
        </div>
        <div class="line-input">
          <div class="item-input">
            <div class="title-input">Chức danh</div>
            <input
              v-model="employee.positionName"
              type="text"
              class="input-type4"
            />
          </div>
          <div class="item-input space-type2">
            <div class="title-input">Nơi cấp</div>
            <input
              v-model="employee.identifyPlace"
              type="text"
              class="input-type4"
            />
          </div>
        </div>
        <div class="line-input">
          <div class="item-input">
            <div class="title-input">Địa chỉ</div>
            <input v-model="employee.address" type="text" class="input-type6" />
          </div>
        </div>
        <div class="line-input">
          <div class="item-input">
            <div class="title-input">Điện thoại di động</div>
            <input
              v-model="employee.phoneNumber"
              type="text"
              class="input-type7"
            />
          </div>
          <div class="item-input space-type1">
            <div class="title-input">Điện thoại cố định</div>
            <input
              v-model="employee.constantPhoneNumber"
              type="text"
              class="input-type7"
            />
          </div>
          <div class="item-input space-type1">
            <div class="title-input">Email</div>
            <input
              v-model="employee.email"
              type="text"
              class="input-type7"
              placeholder="example@gmail.com"
            />
          </div>
        </div>
        <div class="line-input">
          <div class="item-input">
            <div class="title-input">Tài khiản ngân hàng</div>
            <input
              v-model="employee.bankAccount"
              type="text"
              class="input-type7"
            />
          </div>
          <div class="item-input space-type1">
            <div class="title-input">Tên ngân hàng</div>
            <input
              v-model="employee.bankName"
              type="text"
              class="input-type7"
            />
          </div>
          <div class="item-input space-type1">
            <div class="title-input">Chi nhánh</div>
            <input
              v-model="employee.bankBranch"
              type="text"
              class="input-type7"
            />
          </div>
        </div>
      </div>
      <div class="footer-dialog-box">
        <div>
          <div class="white-button" @click="closeInfoDialog">Huỷ</div>
        </div>
        <div class="right-bottom-button">
          <div class="white-button" @click="btnSave">Cất</div>
          <div class="green-button" @click="btnSaveAndAdd">Cất và Thêm</div>
        </div>
      </div>
    </div>
    <AlertDialog
      v-if="typeOfAlertDialog == IS_DATA_CHANGE"
      @btnSave="btnSave"
    />
  </div>
</template>

<script>
import _ from "lodash";
import {
  TIME_OF_DEBOUNCE,
  TIME_OF_NOTIFICATION,
  InfoDialogConstant,
  AlertDialogConstant,
} from "../../configs/constants";
import moment from "moment";
import { mapState, mapActions } from "vuex";
import AlertDialog from "./AlertDialog.vue";
export default {
  components: {
    AlertDialog,
  },
  data() {
    return {
      dateFormat: "DD/MM/YYYY",
      showDepartmentTooltip: false,
      showCodeTooltip: false,
      showNameTooltip: false,
      IS_DATA_CHANGE: AlertDialogConstant.IS_DATA_CHANGE,
    };
  },
  mounted: function() {
    this.$refs.employeeCode.focus();
  },
  computed: {
    ...mapState({
      departments: (state) => state.departments,
      typeOfInfoDialog: (state) => state.typeOfInfoDialog,
      messageOfDialog: (state) => state.messageOfDialog,
      cloneEmployee: (state) => state.employee,
      employee: (state) => state.cloneEmployee,
      typeOfAlertDialog: (state) => state.typeOfAlertDialog,
    }),
    /**
     * set-get cho employee.dateOfBirth
     * CreatedBy KDLong 18/05/2021
     */
    dateOfBirthFormat: {
      // Format date để display lên UI
      get() {
        if (this.employee.dateOfBirth == null) return "";
        return moment(this.employee.dateOfBirth).format("YYYY-MM-DD");
      },
      //Lấy giá trị của inputdate gán cho dateOfBirth
      set(val) {
        this.employee.dateOfBirth = val;
      },
    },
    /**
     * set-get cho employee.identifyDate
     * CreatedBy KDLong 18/05/2021
     */
    identifyDateFormat: {
      // Format date để display lên UI
      get() {
        if (this.employee.identifyDate == null) return "";
        return moment(this.employee.identifyDate).format("YYYY-MM-DD");
      },
      //Lấy giá trị của inputdate gán cho identifyDate
      set(val) {
        this.employee.identifyDate = val;
      },
    },
  },
  methods: {
    ...mapActions([
      "changeMessageOfDialog",
      "showDialogRequired",
      "editEmployee",
      "addEmployee",
      "showLoading",
      "hideLoading",
      "loadEmployee",
      "closeInfoDialog",
      "showDialogCodeExist",
      "cloneEmployee",
      "showDialogDataChange",
    ]),
    moment,
    /**
     * Hàm thực hiện lọc data cho auto complete
     * CreatedBy KDLong 18/05/2021
     */
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    /**
     * Hàm thực hiện check validate sau khi blur khỏi ô cần validate
     * CreatedBy KDLong 18/05/2021
     */
    handleValidate(e) {
      if (typeof e == "string") {
        if (e == "") {
          let element = document.getElementsByClassName(
            "ant-select-selection"
          )[1];
          element.classList.add("not-validation");
        } else {
          let element = document.getElementsByClassName(
            "ant-select-selection"
          )[1];
          element.classList.remove("not-validation");
        }
      } else {
        if (e.target.value == "") {
          e.target.classList.add("not-validation");
        } else {
          e.target.classList.remove("not-validation");
        }
      }
    },
    /**
     * Hàm thực hiện thay đổi border cho trường validate từ đỏ => xanh sau khi focus
     * CreatedBy KDLong 18/05/2021
     */
    focusValidate(e) {
      e.target.classList.remove("not-validation");
    },
    /**
     * Hàm thực hiện show ra tooltip khi hover vào department
     * CreatedBy KDLong 18/05/2021
     */
    showDepartmentRequired() {
      //Nếu đơn vị đang có border đỏ và hover lên nó thì sẽ show tooltips
      let element = document.getElementsByClassName("ant-select-selection")[1];
      if (element.classList.contains("not-validation")) {
        this.showDepartmentTooltip = true;
      }
    },
    /**
     * Hàm thực hiện ẩn tooltips khi mouseleave ra khỏi đơn vị
     * CreatedBy KDLong 18/05/2021
     */
    hideDepartmentRequired() {
      this.showDepartmentTooltip = false;
    },
    /**
     * Hàm thực hiện show tooltip khi hover vào mã nhân viên
     * CreatedBy KDLong 18/05/2021
     */
    showCodeRequired(e) {
      if (e.target.classList.contains("not-validation"))
        this.showCodeTooltip = true;
    },
    /**
     * Hàm thực hiện ẩn tooltip khi mouseleave ra khỏi mã nhân viên
     * CreatedBy KDLong 18/05/2021
     */
    hideCodeRequired() {
      this.showCodeTooltip = false;
    },
    /**
     * Hàm thực hiện show tooltip khi hover vào tên nhân viên
     * CreatedBy KDLong 18/05/2021
     */
    showNameRequired(e) {
      if (e.target.classList.contains("not-validation"))
        this.showNameTooltip = true;
    },
    /**
     * Hàm thực hiện ẩn tooltip khi mouseleave ra khỏi tên nhân viên
     * CreatedBy KDLong 18/05/2021
     */
    hideNameRequired() {
      this.showNameTooltip = false;
    },
    /**
     * Kiểm tra và changeMessageOfDialog trước khi cất
     * Trả về true nếu 1 trong 3 trường * để trống
     * Ngược lại trả về false
     * CreatedBy KDLong 18/05/2021
     */
    checkIsEmptyRequired() {
      let flag = false;
      if (this.employee.employeeCode.trim() == "") {
        this.changeMessageOfDialog("Mã không được để trống.");
        this.$refs.employeeCode.classList.add("not-validation");
        flag = true;
      }
      if (this.employee.fullName.trim() == "") {
        if (this.messageOfDialog == "")
          this.changeMessageOfDialog("Tên không được để trống.");
        this.$refs.fullName.classList.add("not-validation");
        flag = true;
      }
      if (this.employee.departmentName == "") {
        if (this.messageOfDialog == "")
          this.changeMessageOfDialog("Đơn vị không được để trống.");
        let element = document.getElementsByClassName(
          "ant-select-selection"
        )[1];
        element.classList.add("not-validation");
        flag = true;
      }
      return flag;
    },
    /**
     * Hàm xử lý độ trễ load sau thời gian TIME_OF_DEBOUNCE sẽ gọi các hàm ở trong nó
     * CreatedBy KDLong 18/05/2021
     */
    debounceLoad: _.debounce(function(functionLoad) {
      functionLoad();
    }, TIME_OF_DEBOUNCE),
    /**
     * Hàm thực hiện load data
     * CreatedBy KDLong 18/05/2021
     */
    loadData: function() {
      this.showLoading();
      this.debounceLoad(() => this.loadEmployee(() => this.hideLoading()));
    },
    /**
     * Sự kiện sau khi click vào btnSave(Cất)
     * CreatedBy KDLong 18/05/2021
     */
    btnSave() {
      // Check xem có trường nào bỏ trống không và show ra dialog tương ứng
      if (this.checkIsEmptyRequired()) {
        this.showDialogRequired();
      } else {
        let employeeStr = JSON.stringify(this.employee);
        let cloneEmployeeStr = JSON.stringify(this.cloneEmployee);
        if(employeeStr == cloneEmployeeStr){
          this.closeInfoDialog();
        }
        else{
          //Nếu là dialog add thì thực hiện thêm nhân viên
        if (
          this.typeOfInfoDialog == InfoDialogConstant.IS_ADD ||
          this.typeOfInfoDialog == InfoDialogConstant.IS_CLONE
        ) {
          this.addEmployee({
            //nếu thêm thành công thì sẽ vào đây
            callbackSuccess: () => {
              this.closeInfoDialog();
              this.showNotification("Thêm thành công!");
              this.loadData();
            },
            //Nếu thêm thất bại thì sẽ vào đây
            callbackFail: () => {
              this.showDialogCodeExist(
                "Mã nhân viên <" +
                  this.employee.employeeCode +
                  "> đã tồn tại trong hệ thống, vui lòng kiểm tra lại."
              );
            },
          });
        } else {
          //Nếu là edit thì thực hiện sửa nhân viên
          this.editEmployee({
            //thành công
            callbackSuccess: () => {
              this.closeInfoDialog();
              this.showNotification("Sửa thành công!");
              this.loadData();
            },
            //Thất bại
            callbackFail: () => {
              this.showDialogCodeExist(
                "Mã nhân viên <" +
                  this.employee.employeeCode +
                  "> đã tồn tại trong hệ thống, vui lòng kiểm tra lại."
              );
            },
          });
        }
        }
      }
    },
    /**
     * Sự kiện sau khi click vào btnSaveAndAdd(Cất và thêm)
     * CreatedBy KDLong 18/05/2021
     */
    btnSaveAndAdd() {
      if (this.checkIsEmptyRequired()) {
        this.showDialogRequired();
      } else {
        //Nếu là dialog add thì thực hiện thêm nhân viên
        if (this.typeOfInfoDialog == InfoDialogConstant.IS_ADD) {
          this.addEmployee({
            //nếu thêm thành công thì sẽ vào đây
            callbackSuccess: () => {
              this.closeInfoDialog();
              this.showNotification("Thêm thành công!");
              this.loadData();
              this.$emit("btnAdd");
            },
            //Nếu thêm thất bại thì sẽ vào đây
            callbackFail: () => {
              this.showDialogCodeExist(
                "Mã nhân viên <" +
                  this.employee.employeeCode +
                  "> đã tồn tại trong hệ thống, vui lòng kiểm tra lại."
              );
            },
          });
        } else {
          //Nếu là edit thì thực hiện sửa nhân viên
          this.editEmployee({
            //thành công
            callbackSuccess: () => {
              this.closeInfoDialog();
              this.showNotification("Sửa thành công!");
              this.loadData();
              this.$emit("btnAdd");
            },
            //Thất bại
            callbackFail: () => {
              this.showDialogCodeExist(
                "Mã nhân viên <" +
                  this.employee.employeeCode +
                  "> đã tồn tại trong hệ thống, vui lòng kiểm tra lại."
              );
            },
          });
        }
      }
    },
    /**
     * Sử lý sự kiện sau khi click vào btnClose
     * CreatedBy KDLong 18/05/2021
     */
    btnClose() {
      // Convert 2 object thành string để so sánh
      let employeeStr = JSON.stringify(this.employee);
      let cloneEmployeeStr = JSON.stringify(this.cloneEmployee);
      //Nếu dữ liệu trên dialog chưa có gì thay đổi thì cho phép đóng
      if (employeeStr == cloneEmployeeStr) this.closeInfoDialog();
      else {
        //Ngược lại
        this.showDialogDataChange();
      }
    },
    /**
     * Hàm thực hiện show thông báo thành công
     * CreatedBy KDLong 18/05/2021
     */
    showNotification(message) {
      this.$notification["success"]({
        message,
        duration: TIME_OF_NOTIFICATION,
      });
    },
  },
};
</script>

<style>
@import "../../assets/css/components/radiobutton.css";
@import "../../assets/css/dialogs/infodialog.css";
</style>
