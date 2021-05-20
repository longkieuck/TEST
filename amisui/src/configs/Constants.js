//Hằng số form mode của Alert dialog
export const AlertDialogConstant = {
    IS_CLOSE_DIALOG: 0,
    IS_CODE_EXIST: 1, //Alertdialog trùng mã
    IS_REQUIRED: 2, //Không được bỏ trống
    IS_CONFIRM_DELETE: 3, //Xác nhận xoá
    IS_DATA_CHANGE: 4 //Dữ liệu thay đổi
}
//Hằng số form mode của infodialog
export const InfoDialogConstant = {
    IS_CLOSE_DIALOG: 0,
    IS_ADD: 1, //Dialog Thêm
    IS_EDIT: 2, //Sửa
    IS_CLONE: 3 //Nhân bản
}
//Server
export const BASE_URL = 'https://localhost:44378/api/v1/';
//Time of debouncing
export const TIME_OF_DEBOUNCE = 500;//ms
//Time of show notificaiton
export const TIME_OF_NOTIFICATION = 2; //s
// Option pagesize
export const PageSizes =[
    {text:"10 bản ghi trên 1 trang",value: 10},
    {text:"20 bản ghi trên 1 trang",value: 20},
    {text:"30 bản ghi trên 1 trang",value: 30},
    {text:"50 bản ghi trên 1 trang",value: 50},
    {text:"100 bản ghi trên 1 trang",value: 100},
]
//Khởi tạo nhân viên
export const InitEmployee = {
    "employeeCode": "",
    "gender": -1,
    "genderName": "",
    "dateOfBirth": null,
    "identifyNumber": "",
    "positionName": "",
    "departmentName": "",
    "bankAccount": "",
    "bankName": "",
    "bankBranch": "",
    "fullName": "",
    "identifyDate": null,
    "identifyPlace": "",
    "address": "",
    "phoneNumber": "",
    "constantPhoneNumber": "",
    "email": "",
}