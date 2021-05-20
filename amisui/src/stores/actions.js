import axios from "axios";
import { BASE_URL } from "../configs/constants";
export const actions = {
  /**
   * Hàm thực hiện lấy danh sách nhân viên theo
   * pageIndex : vị trí trang
   * pageSize : tổng số bản ghi trên 1 trang
   * search : dữ liệu dùng để tìm kiếm
   * CreatedBy KDLong 18/05/2021
   */
  loadEmployee: (context, callback) => {
    axios
      .get(
        BASE_URL +
          "Employees/Filter?Page=" +
          context.state.pageIndex +
          "&PageSize=" +
          context.state.pageSize +
          "&Search=" +
          context.state.search
      )
      .then((res) => {
        context.commit("loadEmployee", res);
        callback();
      })
      .catch(() => callback());
  },
  /**
   * Hàm thực hiện lấy tất cả đơn vị từ API
   * CreatedBy KDLong 18/05/2021
   */
  loadDepartment: (context) => {
    axios
      .get(BASE_URL + "Departments")
      .then((res) => {
        context.commit("loadDepartment", res.data);
      })
      .catch((e) => console.log(e.response, "err loading department"));
  },
  /**
   * Hàm thực hiện refresh data xét lại toàn bộ giá trị ban đầu cho state
   * CreatedBy KDLong 18/05/2021
   */
  refreshData: (context, callback) => {
    axios
      .get(BASE_URL + "Employees/Filter?Page=1&PageSize=10&Search=")
      .then((res) => {
        context.commit("refreshData", res.data);
        callback();
      })
      .catch(() => callback());
  },
  /**
   * Hàm thực hiện để show loading
   * CreatedBy KDLong 18/05/2021
   */
  showLoading: (context) => {
    context.commit("showLoading");
  },
  /**
   * Hàm thực hiện để hide loading
   * CreatedBy KDLong 18/05/2021
   */
  hideLoading: (context) => {
    context.commit("hideLoading");
  },
  /**
   * Hàm thực hiện thay đổi page size theo value truyền vào
   * CreatedBy KDLong 18/05/2021
   */
  changePageSize: (context, value) => {
    context.commit("changePageSize", value);
  },
  /**
   * Hàm thực hiện thay đổi search theo value truyền vào
   * CreatedBy KDLong 18/05/2021
   */
  changeSearchText: (context, value) => {
    context.commit("changeSearchText", value);
  },
  /**
   * Hàm thực hiện thay đổi page index theo value truyền vào
   * CreatedBy KDLong 18/05/2021
   */
  changePageIndex: (context, value) => {
    context.commit("changePageIndex", value);
  },
  /**
   * Hàm thực hiện export dữ liệu ra file excel
   * CreatedBy KDLong 18/05/2021
   */
  exportData: () => {
    // Lấy toàn bộ dữ liệu
    window.open(BASE_URL + "Employees/ExportAll");
    //Lấy dữ liệu của trang hiện thời trên UI
    // window.open(BASE_URL+'Employees/Export?Page=' + context.state.pageIndex + '&PageSize=' + context.state.pageSize + '&Search=' + context.state.search)
  },
  /**
   * Hàm thực hiện việc show dialog để xác nhận xóa nhân viên
   * CreatedBy KDLong 18/05/2021
   */
  showDialogConfirmDelete: (context, employee) => {
    context.commit("showDialogConfirmDelete", employee);
  },
  /**
   * Hàm thực hiện việc show ra dialog thông báo không được để trống
   * CreatedBy KDLong 19/05/2021
   */
  showDialogRequired: (context) => {
    context.commit("showDialogRequired");
  },
  /**
   * Show dialog thông báo mã nhân viên trùng
   * CreatedBy KDLong 19/05/2021
   */
  showDialogCodeExist: (context, message) => {
    context.commit("showDialogCodeExist", message);
  },
  /**
   * Show dialog thông báo dữ liệu đã có sự thay đổi
   * CreatedBy KDLong 19/05/2021
   */
  showDialogDataChange: (context) => {
    context.commit("showDialogDataChange");
  },

  /**
   * Hàm thực close dialog alert
   * CreatedBy KDLong 18/05/2021
   */
  closeAlertDialog: (context) => {
    context.commit("closeAlertDialog");
  },
  /**
   * Hàm thực hiện xoá nhân viên theo Id
   * CreatedBy KDLong 18/05/2021
   */
  deleteEmployee: (context, callback) => {
    //Nếu trang hiển thị có 1 nhân viên thì giảm trang xuống 1 đơn vị sau đó thực hiện xoá
    if (context.state.employees.length == 1) {
      context.commit("changePageIndex", context.state.pageIndex - 1);
    }
    axios
      .delete(BASE_URL + "Employees/" + context.state.employee.employeeId)
      .then(() => {
        // Đóng dialog
        context.commit("closeAlertDialog");
        // load lại data
        callback();
      });
  },
  /**
   * Hàm thực hiện sửa nhân viên
   * CreatedBy KDLong 18/05/2021
   */
  editEmployee: (context, payload) => {
    axios
      .put(BASE_URL + "Employees", context.state.cloneEmployee)
      .then(() => payload.callbackSuccess())
      .catch(() => payload.callbackFail());
  },
  /**
   * Hàm thực hiện thêm mới nhân viên
   * CreatedBy KDLong 18/05/2021
   */
  addEmployee: (context, payload) => {
    axios
      .post(BASE_URL + "Employees", context.state.cloneEmployee)
      .then(() => payload.callbackSuccess())
      .catch(() => payload.callbackFail());
  },
  /**
   * Hàm thực hiện lấy mã nhân viên mới nhất từ API
   * CreatedBy KDLong 18/05/2021
   */
  getNewEmployeeCode: (context) => {
    axios.get(BASE_URL + "Employees/NewEmployeeCode").then((res) => {
      context.commit("getNewEmployeeCode", res.data);
    });
  },
  /**
   * Hàm thực hiện show dialog add
   * CreatedBy KDLong 18/05/2021
   */
  showDialogAdd: (context) => {
    context.commit("showDialogAdd");
  },
  /**
   * Hàm thực hiện chọn và show ra thông tin nhân viên cần sửa
   * CreatedBy KDLong 18/05/2021
   */
  showDialogEdit: (context, employee) => {
    axios.get(BASE_URL + "Employees/"+employee.employeeId)
    .then((res)=>context.commit("showDialogEdit", res.data))
  },
  /**
   * Hàm thực hiện chọn và show ra thông tin nhân viên cần clone và hiện mã mới
   * CreatedBy KDLong 18/05/2021
   */
  showDialogClone: (context, employee) => {
    context.commit("showDialogClone", employee);
  },
  /**
   * Hàm thực hiện thay đổi message trong dialog
   * CreatedBy KDLong 19/05/2021
   */
  changeMessageOfDialog: (context, message) => {
    context.commit("changeMessageOfDialog", message);
  },
  /**
   * Đóng dialog thêm/sửa nhân viên
   * CreatedBy KDLong 19/05/2021
   */
  closeInfoDialog: (context) => {
    context.commit("closeInfoDialog");
  },
};
