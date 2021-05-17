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
          <div class="btn-close"></div>
        </div>
      </div>
      <div class="content-dialog-box">
        <div class="line-input">
          <div class="item-input">
            <div class="title-input">Mã <span style="color:red">*</span></div>
            <input
              type="text"
              class="input-type1"
            />
          </div>
          <div class="item-input space-type1">
            <div class="title-input">Tên <span style="color:red">*</span></div>
            <input
              id="name-input"
              type="text"
              class="input-type2"
            />
            <!-- <div class="name-error" v-show="nameError">
              Tên không được để trống .
            </div> -->
          </div>
          <div class="item-input space-type2">
            <div class="title-input">Ngày sinh</div>
            <a-date-picker :placeholder="dateFormat" class="input-type3" :format="dateFormat" />
          </div>
          <div class="item-input gender">
            <div class="title-input margin-gender-option">Giới tính</div>
            <a-radio-group>
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
          <div class="item-input">
            <div class="title-input">
              Đơn vị <span style="color:red">*</span>
            </div>
            <a-select
                class="input-type4a"
                show-search
                option-filter-prop="children"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
            >
                <a-select-option class="option-department" value="jack">
                Jack
                </a-select-option>
                <a-select-option class="option-department" value="lucy">
                Lucy
                </a-select-option>
                <a-select-option class="option-department" value="tom">
                Tom
                </a-select-option>
                <a-select-option class="option-department" value="luci">
                Luci
                </a-select-option>
            </a-select>
          </div>
          <!-- <div class="department-error" v-show="departmentError">
            Đơn vị không được phép để trống .
          </div> -->
          <div class="item-input space-type2">
            <div class="title-input">Số CMND</div>
            <input
              type="text"
              class="input-type5"
            />
          </div>
          <div class="item-input space-type1">
            <div class="title-input">Ngày cấp</div>
            <a-date-picker :placeholder="dateFormat" class="input-type3" :format="dateFormat" />
          </div>
        </div>
        <div class="line-input">
          <div class="item-input">
            <div class="title-input">Chức danh</div>
            <input
              type="text"
              class="input-type4"
            />
          </div>
          <div class="item-input space-type2">
            <div class="title-input">Nơi cấp</div>
            <input
              type="text"
              class="input-type4"
            />
          </div>
        </div>
        <div class="line-input">
          <div class="item-input">
            <div class="title-input">Địa chỉ</div>
            <input type="text" class="input-type6" />
          </div>
        </div>
        <div class="line-input">
          <div class="item-input">
            <div class="title-input">Điện thoại di động</div>
            <input
              type="text"
              class="input-type7"
            />
          </div>
          <div class="item-input space-type1">
            <div class="title-input">Điện thoại cố định</div>
            <input
              type="text"
              class="input-type7"
            />
          </div>
          <div class="item-input space-type1">
            <div class="title-input">Email</div>
            <input
              type="text"
              class="input-type7"
              placeholder="example@gmail.com"
            />
          </div>
        </div>
        <div class="line-input">
          <div class="item-input">
            <div class="title-input">Tài khoản ngân hàng</div>
            <input
              type="text"
              class="input-type7"
            />
          </div>
          <div class="item-input space-type1">
            <div class="title-input">Tên ngân hàng</div>
            <input
              type="text"
              class="input-type7"
            />
          </div>
          <div class="item-input space-type1">
            <div class="title-input">Chi nhánh</div>
            <input
              type="text"
              class="input-type7"
            />
          </div>
        </div>
      </div>
      <div class="footer-dialog-box">
        <div>
          <div class="white-button">Huỷ</div>
        </div>
        <div class="right-bottom-button">
          <div class="white-button">Cất</div>
          <div class="green-button">Cất và Thêm</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
    dateFormat: 'DD/MM/YYYY',
    //   departmentError: false,
    };
  },
  mounted:function(){
    // this.$refs.inputName.focus()
  },
  computed: {
    // ...mapState({
    //   isEdit: (state) => state.isEdit,
    //   isAdd: (state) => state.isAdd,
    //   isShow: (state) => state.isShow,
    //   employee: (state) => state.employee,
    //   departments: (state) => state.departments,
    //   newEmployeeCode: (state) => state.newEmployeeCode,
    // }),
    // employeeCode: {
      
    //   get() {
    //     //Nếu là thêm mới nhân viên thì sẽ lấy giá trị là newEmployeeCode
    //     if (this.isAdd) {
    //       return this.newEmployeeCode;
    //     }
    //     //Ngược lại sẽ lấy employeeCode của nhân viên đã được select
    //     else return this.employee.employeeCode;
    //   },
    //   set() {},
    // },
    // dateOfBirthFormat: {
    //   // Format date để display lên UI
    //   get() {
    //     if (this.employee.dateOfBirth == null) return "";
    //     return moment(this.employee.dateOfBirth).format("YYYY-MM-DD");
    //   },
    //   //Lấy giá trị của inputdate gán cho dateOfBirth
    //   set(val) {
    //     this.employee.dateOfBirth = val;
    //   },
    // },
    // identifyDateFormat: {
    //   // Format date để display lên UI
    //   get() {
    //     if (this.employee.identifyDate == null) return "";
    //     return moment(this.employee.identifyDate).format("YYYY-MM-DD");
    //   },
    //   //Lấy giá trị của inputdate gán cho identifyDate
    //   set(val) {
    //     this.employee.identifyDate = val;
    //   },
    // },
    // //Kiểm tra xem fullName và departmentName có trống hay không
    // checkError: function() {
    //   if (this.employee.fullName == "" || this.employee.departmentName == "")
    //     return true;
    //   return false;
    // },
  },
  methods: {
      moment,
      filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    // ...mapActions([
    //   "closeDialogInfo",
    //   "editOrAdd",
    //   "loadEmployee",
    //   "closeDialogInfo",
    //   "showDialogNotify",
    // ]),
    // btnEditOrAdd() {
    //   //Nếu fullName hoặc departmentName thì không cho gửi
    //   if (this.checkError) {
    //     document.querySelector("#name-input").style.borderColor = "red";
    //     document.querySelector("#department-input").style.borderColor = "red";
    //     this.$notification["error"]({
    //       message: "Thất bại!",
    //       description: "Vui lòng nhập đầy đủ thông tin (*)",
    //       duration: 2,
    //     });
    //   } else {
    //     //Nếu thỏa mãn thì gửi action editOrAdd đi
    //     let isAdd = this.isAdd;
    //     this.editOrAdd({
    //       //Khi sửa hoặc thêm thành công thì sẽ làm các công việc này
    //       callbackSuccess: () => {
    //         this.openNotificationWithIcon(isAdd);
    //         this.loadEmployee();
    //         this.closeDialogInfo();
    //       },
    //       //Khi không thành công
    //       callbackFail: () => {
    //         let employeeCode = this.newEmployeeCode;
    //         this.showDialogNotify(employeeCode);
    //       },
    //     });
    //   }
    // },
    /**
     * Show thông báo
     * nếu thêm thành công thì hiển thị Thêm thành công!
     * nếu sửa thành công thì hiển thị Sửa thành công!
     */
//     openNotificationWithIcon(isAdd) {
//       this.$notification["success"]({
//         message: "Thành công!",
//         description: isAdd ? "Thêm thành công!" : "Sửa thành công!",
//         duration: 2,
//       });
//     },
//     /**
//      * Khi blur name input
//      */
//     blurNameInput(e) {
//       //Nếu để rỗng thì set bordercolor = red
//       if (e.target.value == "" || this.employee.fullName == "") {
//         document.querySelector("#name-input").style.borderColor = "red";
//       } else {
//         //nếu không dỗ thì để bthg
//         this.nameError = false;
//         document.querySelector("#name-input").style.borderColor = "#babec5";
//       }
//     },
//     focusNameInput() {
//       //Khi focus nameinput thì sẽ không hiển thị texthelper
//       this.nameError = false;
//       document.querySelector("#name-input").style.borderColor = "#2CA01C";
//     },
//     hoverNameInput() {
//       //Nếu hover vào inputname mà đang viền đỏ thì hiển thị texthelper
//       if (document.querySelector("#name-input").style.borderColor == "red")
//         this.nameError = true;
//     },
//     // Di chuột ra khỏi thì k hiển thị texthelper
//     leaveNameInput() {
//       this.nameError = false;
//     },
//     blurDepartmentSelect() {
//       if (this.employee.departmentName == "") {
//         document.querySelector("#department-input").style.borderColor = "red";
//       } else {
//         this.departmentError = false;
//         document.querySelector("#department-input").style.borderColor =
//           "#babec5";
//       }
//     },
//     focusDepartmentSelect() {
//       this.departmentError = false;
//       document.querySelector("#department-input").style.borderColor = "#2CA01C";
//     },
//     hoverDepartmentSelect() {
//       if (
//         document.querySelector("#department-input").style.borderColor == "red"
//       )
//         this.departmentError = true;
//     },
//     leaveDepartmentSelect() {
//       this.departmentError = false;
//     },
  },
};
</script>

<style>
@import "../../assets/css/dialogs/infodialog.css";
</style>
