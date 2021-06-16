//Hằng số form mode của infodialog và những câu thông báo dùng trong infodialog,
export const SupplierConstant = {
    IS_CLOSE: 0,
    IS_ADD: 1, //Dialog Thêm
    IS_EDIT: 2, //Sửa
    INSERT_SUCCESS: "Thêm thành công!", //Thông báo khi thêm thành công
    EDIT_SUCCESS: "Sửa thành công!", //Thông báo khi sửa thành công
    NOTICE_CODE_EXIST_FRONT: "Mã nhân viên <",
    NOTICE_CODE_EXIST_BACK: "> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.",
    NAME_CANNOT_BLANK: "Tên không được để trống!", //Tooltip khi để trống name
    CODE_CANNOT_BLANK: "Mã không được để trống!", //Tooltip khi để trống code
    DEPARTMENT_CANNOT_BLANK: "Đơn vị không được để trống!", //Tooltip khi để trống code
};
//Hằng số trong mutations
export const MutationsConstant = {
    DATA_CHANGE_QUESTION: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
    DELETE_QUESTION_FRONT: "Bạn có thực sự muốn xóa nhân viên <",
    DELETE_QUESTION_BACK: "> không?",
};
//Server
export const BASE_URL = 'https://localhost:44378/api/v1/';
//Time of debouncing
export const TIME_OF_DEBOUNCE = 500; //ms
//Time of show notificaiton
export const TIME_OF_NOTIFICATION = 1; //s
// Option pagesize
export const PageSizes = [
    { text: "10 bản ghi trên 1 trang", value: 10 },
    { text: "20 bản ghi trên 1 trang", value: 20 },
    { text: "30 bản ghi trên 1 trang", value: 30 },
    { text: "50 bản ghi trên 1 trang", value: 50 },
    { text: "100 bản ghi trên 1 trang", value: 100 },
]

//Khởi tạo nhân viên
export const InitSupplier = {
    "supplier_id": "00000000-0000-0000-0000-000000000000",
    "supplier_code": null,
    "supplier_name": null,
    "supplier_type": 0,
    "is_customer": null,
    "tax_code": null,
    "phone_number": null,
    "website": null,
    "address": null,
    "supplier_group": null,
    "puchasing_employee": null,
    "vocative": null,
    "contact_vocative": null,
    "contact_name": null,
    "contact_email": null,
    "contact_phone_number": null,
    "legal_representative": null,
    "contact_telephone": null,
    "identify_number": null,
    "identify_date": null,
    "identify_place": null,
    "term_of_payment": null,
    "number_day_owed": null,
    "max_amount_debt": null,
    "account_receive": null,
    "account_pay": null,
    "bank_account": "[{\"account_number\":\"\",\"bank_name\":\"\",\"bank_branch\":\"\",\"bank_city\":\"\"}]",
    "note": null,
    "country": null,
    "city": null,
    "district": null,
    "commune": null,
    "delivery_address": "[{\"address\":\"abc\"}]",
    "invoice_recipient_name": null,
    "invoice_recipient_email": null,
    "invoice_recipient_phone": null
}
export const InitBankAccount = {
    account_number: "",
    bank_name: "",
    bank_branch: "",
    bank_city: ""
}
export const InitDeliveryAddress = {
    address: ""
}