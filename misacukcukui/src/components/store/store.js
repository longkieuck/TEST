import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const initEmployee = {
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
export const store = new Vuex.Store({
    state: {
        employees: [],//Lưu mảng nhân viên đang hiển thị trên UI
        departments: [],//Lấy tất cả các phòng ban trên API
        employee: {...initEmployee },//Nhân viên được chon để sửa hoặc nhân viên dùng để thêm
        newEmployeeCode: "",//Mã nhân viên mới
        isAdd: false,//Có phải dialog để add hay không
        isEdit: false,//có phải dialog để edit hay ko
        isShow: false,//có show dialog infoDialog không
        isShowNotifyDialog: false,//show notifyDialog
        isDelete: false,//có phải dialog xóa không
        messageContent: "",//thông báo hiển thị ở nitifydialog
        totalRecords: 0,//tổng số bản ghi thỏa mãn điều kiện lọc
        totalPages: 0,//Tổng số trang
        pageIndex: 1,//pageIndex dùng để lấy data
        pageSize: 10,//số bản ghi trên 1 trang
        search: "",//dùng để tìm kiếm
        isLoading: false,//có show loading hay không
    },
    actions: {
        //Lấy data về mảng employees từ API
        loadEmployee: (context) => {
            axios
                .get('https://localhost:44378/api/v1/Employees/Filter?Page=' + context.state.pageIndex + '&PageSize=' + context.state.pageSize + '&Search=' + context.state.search)
                .then(res => {
                    context.commit('loadEmployee', res.data)
                })
                .catch(e => console.log(e.response, "err loading employee"))

        },
        //load department từ API
        loadDepartment: (context) => {
            axios
                .get('https://localhost:44378/api/v1/Departments')
                .then(res => {
                    context.commit('loadDepartment', res.data)
                })
                .catch(e => console.log(e.response, "err loading department"))

        },
        //làm mới biến employee
        refreshEmployee: (context) => {
            context.commit('refreshEmployee')
        },
        //show dialog cho sự kiện sửa
        showDialogForEdit: (context, employee) => {
            context.commit('showDialogForEdit', employee)
        },
        //show dialog cho sự kiện thêm
        showDialogForAdd: (context) => {
            context.commit('showDialogForAdd')
        },
        //đóng dialog info
        closeDialogInfo: (context) => {
            context.commit('closeDialogInfo')
        },
        //sự kiện edit or add gọi API
        editOrAdd: (context, payload) => {
            if (context.state.isAdd) {
                context.state.employee.employeeCode = context.state.newEmployeeCode
                axios.post('https://localhost:44378/api/v1/Employees', context.state.employee).then(() => payload.callbackSuccess())
                    .catch(() => payload.callbackFail())
            } else {
                axios
                    .put('https://localhost:44378/api/v1/Employees', context.state.employee).then(() => payload.callbackSuccess())
            }
        },
        //Lấy mã nhân viên mới về
        getNewEmployeeCode: (context) => {
            axios
                .get('https://localhost:44378/api/v1/Employees/NewEmployeeCode')
                .then(res => {
                    context.commit('getNewEmployeeCode', res.data)
                })
                .catch(e => console.log(e.response, "err loading new employee code"))
        },
        // xóa nhân viên có mã là payload
        deleteEmployee: (context, payload) => {
            if (context.state.employees.length == 1) {
                context.commit('changePage', context.state.pageIndex - 1)
            }
            axios
                .delete('https://localhost:44378/api/v1/Employees/' + payload.employeeId).then(() => payload.callback())
        },
        //đóng dialog thông báo
        closeDialogNotify: (context) => {
            context.commit('closeDialogNotify')
        },
        //show dialog xác nhận xóa
        showDialogConfirmDelete: (context, employee) => {
            context.commit('showDialogConfirmDelete', employee)
        },
        //show dialog thông báo trùng mã
        showDialogNotify: (context, employeeCode) => {
            context.commit('showDialogNotify', employeeCode)
        },
        //thay đổi pagesize
        changePageSize: (context, value) => {
            context.commit('changePageSize', value)
        },
        //thay đổi search text
        changeSearchText: (context, value) => {
            context.commit('changeSearchText', value)
        },
        //thay đổi trang
        changePage: (context, value) => {
            context.commit('changePage', value)
        },
        //hiện loading
        showLoading: (context) => {
            context.commit('showLoading')
        },
        //đóng loading
        closeLoading: (context) => {
            context.commit('closeLoading')
        },
        //export data ra excel
        exportData: (context) => {
            window.open('https://localhost:44378/api/v1/Employees/Export?Page=' + context.state.pageIndex + '&PageSize=' + context.state.pageSize + '&Search=' + context.state.search)
        }
    },
    mutations: {
        loadEmployee(state, response) {
            state.employees = response.data
            state.totalPages = response.totalPages
            state.totalRecords = response.totalRecords
        },
        loadDepartment(state, departments) {
            state.departments = departments
            console.log(departments)
        },
        refreshEmployee(state) {
            state.employee = {}
        },
        showDialogForEdit(state, employee) {
            state.employee = employee
            state.isShow = true
            state.isEdit = true
        },
        showDialogForAdd(state) {
            state.isShow = true,
                state.isAdd = true
        },
        closeDialogInfo(state) {
            state.isShow = false
            state.isAdd = false
            state.isEdit = false
            state.employee = {...initEmployee }
        },
        getNewEmployeeCode(state, newEmployeeCode) {
            state.newEmployeeCode = newEmployeeCode
            state.employee.employeeCode = newEmployeeCode
        },
        closeDialogNotify(state) {
            state.isShowNotifyDialog = false
            state.employee = {...initEmployee }
            state.messageContent = ""
        },
        showDialogConfirmDelete(state, employee) {
            state.employee = employee
            state.isShowNotifyDialog = true
            state.isDelete = true
            state.messageContent = "Bạn có chắc chắn muốn xoá nhân viên có mã là " + employee.employeeCode
        },
        showDialogNotify(state, employeeCode) {
            state.isShowNotifyDialog = true
            state.isDelete = false
            state.messageContent = "Mã nhân viên " + employeeCode + " đã tồn tại trong hệ thống, vui lòng kiểm tra lại!"
        },
        changePageSize(state, value) {
            state.pageSize = value
        },
        changeSearchText(state, value) {
            state.search = value
        },
        changePage(state, value) {
            state.pageIndex = value
        },
        showLoading(state) {
            state.isLoading = true
        },
        closeLoading(state) {
            state.isLoading = false
        }

    }
});