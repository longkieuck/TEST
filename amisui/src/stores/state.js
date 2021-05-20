import {
  AlertDialogConstant,
  InfoDialogConstant,
  initEmployee,
} from "../configs/constants";
export const state = {
  employees: [], //Danh sách nhân viên được hiển thị trên UI
  departments: [], //Danh sách đơn vị
  employee: { ...initEmployee }, //Nhân viên được chọn để thêm sửa
  cloneEmployee: { ...initEmployee }, //Nhân viên nhân bản
  totalRecords: 0, //tổng số bản ghi thỏa mãn điều kiện lọc
  newEmployeeCode: "", //Mã nhân viên mới lấy về từ API
  totalPages: 0, //Tổng số trang
  pageIndex: 1, //pageIndex dùng để lấy data
  pageSize: 10, //số bản ghi trên 1 trang
  search: "", //dùng để tìm kiếm
  isLoading: false, //show svg loading
  typeOfAlertDialog: AlertDialogConstant.IS_CLOSE_DIALOG, //Loại alert dialog show ra mặc định là đóng
  typeOfInfoDialog: InfoDialogConstant.IS_CLOSE_DIALOG, //Loại info dialog show ra mặc định là đóng
  messageOfDialog: "", //Thông báo mà dialog show ra
};
