//Hằng số form mode của infodialog và những câu thông báo dùng trong infodialog,
export const SupplierConstant = {
    IS_CLOSE: 0,
    IS_ADD: 1, //Dialog Thêm
    IS_EDIT: 2, //Sửa
    IS_READ_ONLY: 3, //Chỉ xem
    MESS_FRONT: "Mã nhà cung cấp <",
    MESS_BACK: "> đã tồn tại, Vui lòng nhập lại!",
    MESS_FRONT2: "Bạn có chắc chắn muốn xoá Nhà cung cấp <",
    MESS_BACK2: "> không?"
};
export const PaymentConstant = {
    IS_CLOSE: 0,
    IS_ADD: 1, //Dialog Thêm
    IS_EDIT: 2, //Sửa
    IS_READ_ONLY: 3, //Chỉ xem
    IS_CLONE: 4,
    MESS_FRONT: "Số chứng từ <",
    MESS_BACK: "> đã tồn tại. Bạn có muốn chương trình tự động tăng số chứng từ không?",
    PAYMENT_FOR: "Chi tiền cho ",
    MESS_FRONT2: "Bạn có chắc chắn muốn xoá Phiếu chi <",
    MESS_BACK2: "> không?"
};
export const AccountConstant = {
    IS_CLOSE: 0,
    IS_ADD: 1, //Dialog Thêm
    IS_EDIT: 2, //Sửa
    CAN_NOT_DELETE: "Không thể xoá danh mục cha nếu chưa xoá tất cả các danh mục con.",
    MESS_FRONT: "Bạn có thực sự muốn xoá Tài khoản <",
    MESS_BACK: "> không?"
};
//Hằng số trong Alert
export const AlertDialogConstant = {
    IS_CLOSE: 0,
    IS_CONFIRM_DELETE: 1,
    DELETE_FAILURE: 2,
    IS_CODE_EXIST: 3
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
    "delivery_address": "[{\"address\":\"\"}]",
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

export const SupplierGroup = [{
        code: "NCC001",
        name: "Công ty cổ phần 1"
    },
    {
        code: "NCC002",
        name: "Công ty cổ phần 2"
    },
    {
        code: "NCC003",
        name: "Công ty cổ phần 3"
    },
    {
        code: "NCC004",
        name: "Công ty cổ phần 4"
    }
]

export const PuchasingEmployee = [{
        code: "NV001",
        name: "Kiều Đức Long"
    },
    {
        code: "NV002",
        name: "Nguyễn Văn Hiến"
    },
    {
        code: "NV003",
        name: "Đỗ Thành Đạt"
    },
    {
        code: "NV004",
        name: "Trần Trung Thiệp"
    }
]

export const Vocative = [{
        name: "Anh"
    },
    {
        name: "Bà"
    },
    {
        name: "Bạn"
    },
    {
        name: "Chị"
    },
    {
        name: "Miss"
    },
    {
        name: "Mr"
    },
    {
        name: "Mrs"
    },
    {
        name: "Ông"
    },
]

export const TermOfPayment = [{
        name: "Điều khoản 1",
    },
    {
        name: "Điều khoản 2",
    },
    {
        name: "Điều khoản 3",
    },
    {
        name: "Điều khoản 4",
    }
]

export const AccountReceive = [{
        code: "0123456789",
        name: "Ngoại tệ"
    },
    {
        code: "1231231234",
        name: "Phải thu của khách"
    },
    {
        code: "1112223333",
        name: "Phải thu"
    }
]
export const AccountPay = [{
        code: "0123456789",
        name: "Ngoại tệ"
    },
    {
        code: "1231231234",
        name: "Phải thu của khách"
    },
    {
        code: "1112223333",
        name: "Phải thu"
    }
]

export const Country = [{
        name: "Việt Nam"
    },
    {
        name: "Thái Lan"
    },
    {
        name: "Lào"
    },
    {
        name: "Campuchia"
    },
]
export const City = [{
        name: "Hà Nội"
    },
    {
        name: "Hồ Chí Minh"
    },
    {
        name: "Cần Thơ"
    },
    {
        name: "Hải Phòng"
    },
]

export const District = [{
        name: "Cầu Giấy"
    },
    {
        name: "Đống Đa"
    },
    {
        name: "Đông Anh"
    },
    {
        name: "Thạch Thất"
    },
]
export const Commune = [{
        name: "Cần Kiệm"
    },
    {
        name: "Đồng Trúc"
    },
    {
        name: "Tân Xã"
    },
    {
        name: "Thạch Xá"
    },
]

export const InitAccount = {
    "account_id": "00000000-0000-0000-0000-000000000000",
    "account_code": null,
    "nature": "Dư nợ",
    "account_name": null,
    "english_name": null,
    "description": null,
    "is_exception_accounting": false,
    "is_bank_account": false,
    "object_type": null,
    "object_type_thcp": null,
    "order": null,
    "sale_contract": null,
    "department": null,
    "construction": null,
    "purchase_contract": null,
    "expense_item": null,
    "stats_code": null,
    "parent_account_id": null
}

export const ObjectType = [{
        name: "Nhà cung cấp"
    },
    {
        name: "Khách hàng"
    },
    {
        name: "Nhân viên"
    }
]
export const Other = [{
        name: "Chỉ cảnh báo"
    },
    {
        name: "Bắt buộc nhập"
    }
]

export const Nature = [{
        name: "Dư nợ"
    },
    {
        name: "Dư có"
    },
    {
        name: "Lưỡng tính"
    },
    {
        name: "Không có số dư"
    }
]

export const InitPayment = {
    "payment_id": "00000000-0000-0000-0000-000000000000",
    "payment_code": null,
    "supplier_id": null,
    "receiver": null,
    "address": null,
    "payment_reason": "Chi tiền cho ",
    "employee_name": null,
    "attach": null,
    "accounting_date": null,
    "payment_date": null,
    "accounting": "[{\"description\":\"Chi tiền cho \",\"debt_account_id\":\"\",\"over_account_id\":\"27430cf3-6ab8-4677-910c-cd311b7f33c9\",\"supplier_id\":\"\",\"supplier_name\":\"\",\"amount\":0,\"exchange\":0,\"bank_account\":\"\"}]",
    "money": 0,
    "supplier_code": null,
    "supplier_name": null,
    "currency": "VND",
    "rate": 23500
}
export const Employees = [{
        employee_code: "NV001",
        employee_name: "Kiều Đức Long",
        department: "Phòng kế toán",
        phone_number: "0949887410"
    },
    {
        employee_code: "NV002",
        employee_name: "Đỗ Thành Đạt",
        department: "Phòng kế toán",
        phone_number: "0949666410"
    },
    {
        employee_code: "NV003",
        employee_name: "Nguyễn Văn Hiến",
        department: "Phòng kế toán",
        phone_number: "0949777410"
    },
    {
        employee_code: "NV004",
        employee_name: "Trần Trung Thiệp",
        department: "Phòng kế toán",
        phone_number: "0949887888"
    }
]

export const InitAccounting = {
    description: "Chi tiền cho ",
    debt_account_id: "",
    over_account_id: "",
    supplier_id: "",
    supplier_name: "",
    amount: 0,
    exchange: 0,
    bank_account: ""
}
export const PaymentButtonConstant = {
    SAVE_AND_ADD: 0,
    SAVE_AND_CLOSE: 1,
    SAVE: 2
}

export const TitleParentAccount = [{
        Title: "",
        Width: 0,
    },
    {
        Title: "Số tài khoản",
        Width: 150,
    },
    {
        Title: "Tên tài khoản",
        Width: 200,
    },
]

export const titleSuppliers = [{
        Title: "",
        Width: 0,
    },
    {
        Title: "",
        Width: 0,
    },
    {
        Title: "",
        Width: 0,
    },
    {
        Title: "Đối  tượng",
        Width: 100,
    },
    {
        Title: "Tên đối tượng",
        Width: 200,
    },
    {
        Title: "Mã số thuế",
        Width: 100,
    },
    {
        Title: "Địa chỉ",
        Width: 200,
    },
    {
        Title: "Điện thoại",
        Width: 100,
    },
]

export const titleEmployees = [{
        Title: "Mã nhân viên",
        Width: 150,
    },
    {
        Title: "Tên nhân viên",
        Width: 200,
    },
    {
        Title: "Đơn vị",
        Width: 150,
    },
    {
        Title: "ĐT di động",
        Width: 100,
    },
]
export const titleAccount = [{
        Title: "",
        Width: 0,
    },
    {
        Title: "Số tài khoản",
        Width: 150,
    },
    {
        Title: "Tên tài khoản",
        Width: 200,
    },
]
export const DefaultValueAccount = {
    OBJECT_TYPE: "Nhà cung cấp",
    OTHER: "Chỉ cảnh báo"
}

export const currencies = [{
        Symbol: "VND",
        Name: "Việt Nam đồng",
    },
    {
        Symbol: "USD",
        Name: "Đô la Mỹ",
    },
]
export const titleCurrencies = [{
        Title: "Mã loại tiền",
        Width: 120,
    },
    {
        Title: "Tên loại tiền",
        Width: 120,
    },
];
export const titleCommune = [{
    Title: "Xã/Phường",
    Width: 100,
}, ]
export const titleDistrict = [{
    Title: "Quận/Huyện",
    Width: 100,
}, ]
export const titleCity = [{
    Title: "Tỉnh/Thành phố",
    Width: 100,
}, ]
export const titleCountry = [{
    Title: "Quốc gia",
    Width: 100,
}, ]
export const titleVocative = [{
    Title: "Xưng hô",
    Width: 100,
}, ]
export const titlePuchasingEmployee = [{
        Title: "Mã nhân viên",
        Width: 180,
    },
    {
        Title: "Tên nhân viên",
        Width: 180,
    },
]
export const titleSupplierGroup = [{
        Title: "Mã nhóm KH, NCC",
        Width: 200,
    },
    {
        Title: "Tên nhóm KH, NCC",
        Width: 200,
    },
]
export const titleAccountReceive = [{
        Title: "Số tài khoản",
        Width: 180,
    },
    {
        Title: "Tên tài khoản",
        Width: 180,
    },
]
export const titleAccountPay = [{
        Title: "Số tài khoản",
        Width: 180,
    },
    {
        Title: "Tên tài khoản",
        Width: 180,
    },
]
export const tabs = [
    "Liên hệ",
    "Điều khoản thanh toán",
    "Tài khoản ngân hàng",
    "Địa chỉ khác",
    "Ghi chú",
]

export const columns = [{
        title: "Số tài khoản",
        dataIndex: "account_code",
        key: "account_code",
        width: 240,
        scopedSlots: { customRender: "account_code" },
    },
    {
        title: "Tên tài khoản",
        dataIndex: "account_name",
        key: "account_name",
        width: 230,
        scopedSlots: { customRender: "account_name" },
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
        dataIndex: "english_name",
        width: 230,
        key: "english_name",
        scopedSlots: { customRender: "english_name" },
    },
    {
        title: "Diễn giải",
        dataIndex: "description",
        key: "description",
        width: 240,
        scopedSlots: { customRender: "description" },
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


export const NotifiactionConstant = {
    ADD_SUCCESS: "Thêm thành công!",
    EDIT_SUCCESS: "Sửa thành công!",
    DELETE_SUCCESS: "Xoá thành công!",
    DELETE_FAILURE: "Xoá thất bại!",
    SUCCESS: "success",
    ERROR: "error",
    //Của màn tài khoản
    ACCOUNT_EXIST: "Số tài khoản đã tồn tại, vui lòng nhập lại!",
    INVALID_ACCOUNT: "Số tài khoản không hợp lệ. Số tài khoản chi tiết phải bắt đầu bằng số của Tài khoản tổng hợp!",
    ACCOUNT_CODE_NOT_EMPTY: "Số tài khoản không được để trống!",
    ACCOUNT_NAME_NOT_EMPTY: "Tên tài khoản không được để trống!",
    //Của màn phiếu chi
    PAYMENT_CODE_NOT_EMPTY: "Số phiếu chi không được để trống!",
    ACCOUNT1_NOT_EMPTY: "Tài khoản nợ không được để trống!",
    ACCOUNT2_NOT_EMPTY: "Tài khoản có không được để trống!",
    //Của màn nhà cung cấp
    SUPPLIER_CODE_EXIST: "Mã nhà cung cấp đã tồn tại, vui lòng nhập lại!",
    SUPPLIER_CODE_NOT_EMPTY: "Mã nhà cung cấp không được để trống!",
    SUPPLIER_NAME_NOT_EMPTY: "Tên nhà cung cấp không được để trống!"
}