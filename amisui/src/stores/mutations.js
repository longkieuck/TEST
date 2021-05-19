import { AlertDialogConstant, InfoDialogConstant, initEmployee } from '../configs/constants'

export const mutations = {
    /**
     * Sử lý gán dữ liệu cho employees,totalPages,totalRecords
     * @param {dữ liệu trả về từ API} response 
     * CreatedBy KDLong 18/05/2021
     */
    loadEmployee(state, response) {
        if (response.status == 204) {
            state.employees = []
            state.totalPages = 0
            state.totalRecords = 0
        } else {
            state.employees = response.data.data
            state.totalPages = response.data.totalPages
            state.totalRecords = response.data.totalRecords
        }

    },
    /**
     * Thực hiện gán data cho departments
     * CreatedBy KDLong 18/05/2021
     */
    loadDepartment(state, departments) {
        state.departments = departments
    },
    /**
     * Thực hiện refresh lại data
     * CreatedBy KDLong 18/05/2021
     */
    refreshData(state, response) {
        state.employees = response.data
        state.totalPages = response.totalPages
        state.totalRecords = response.totalRecords
        state.employee = {...initEmployee }
        state.pageIndex = 1
        state.pageSize = 10
        state.search = ""
    },
    /**
     * Hiển thị loading
     * CreatedBy KDLong 18/05/2021
     */
    showLoading(state) {
        state.isLoading = true
    },
    /**
     * Ẩn loading
     * CreatedBy KDLong 18/05/2021
     */
    hideLoading(state) {
        state.isLoading = false
    },
    /**
     * Thay đổi page size theo value
     * CreatedBy KDLong 18/05/2021
     */
    changePageSize(state, value) {
        state.pageSize = value
    },
    /**
     * Thay đổi search theo value
     * CreatedBy KDLong 18/05/2021
     */
    changeSearchText(state, value) {
        state.search = value
    },
    /**
     * Thay đổi page index theo value
     * CreatedBy KDLong 18/05/2021
     */
    changePageIndex(state, value) {
        state.pageIndex = value
    },
    /**
     * Thay đổi mess trong dialog và set type cho dialog
     * CreatedBy KDLong 18/05/2021
     */
    showDialogConfirmDelete(state, employee) {
        state.employee = employee
        state.messageOfDialog = "Bạn có thực sự muốn xóa nhân viên <" + employee.employeeCode + "> không?"
        state.typeOfAlertDialog = AlertDialogConstant.IS_CONFIRM_DELETE
    },
    /**
     * Thay đổi type của dialog để show thông tin không được để trống
     * CreatedBy KDLong 18/05/2021
     */
    showDialogRequired(state) {
        state.typeOfAlertDialog = AlertDialogConstant.IS_REQUIRED
    },
    /**
     * Thay đổi type của dialog và gán mess mới cho dialog
     * CreatedBy KDLong 18/05/2021
     */
    showDialogCodeExist(state, message) {
        state.typeOfAlertDialog = AlertDialogConstant.IS_CODE_EXIST
        state.messageOfDialog = message
    },
    /**
     * Show dialog thông báo dữ liệu đã có sự thay đổi 
     * CreatedBy KDLong 19/05/2021
     */
    showDialogDataChange(state) {
        state.typeOfAlertDialog = AlertDialogConstant.IS_DATA_CHANGE
        state.messageOfDialog = "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?"
    },
    /**
     * Đóng dialog và reset lại mess
     * CreatedBy KDLong 18/05/2021
     */
    closeAlertDialog(state) {
        state.typeOfAlertDialog = AlertDialogConstant.IS_CLOSE_DIALOG
        state.messageOfDialog = ""
    },
    /**
     * Gán mã nhân viên mới nhất cho employee
     * CreatedBy KDLong 18/05/2021
     */
    getNewEmployeeCode(state, newEmployeeCode) {
        state.newEmployeeCode = newEmployeeCode
            // state.employee.employeeCode = newEmployeeCode
        state.cloneEmployee = {...state.employee }
        state.cloneEmployee.employeeCode = newEmployeeCode
        state.employee = {...state.cloneEmployee }
    },
    /**
     * Thay đổi giá trị của typeOfInfoDialog để show dialog add ra
     * CreatedBy KDLong 18/05/2021
     */
    showDialogAdd(state) {
        state.employee.employeeCode = state.newEmployeeCode
        state.cloneEmployee = {...state.employee }
        state.typeOfInfoDialog = InfoDialogConstant.IS_ADD
    },
    /**
     * Thay đổi giá trị của typeOfInfoDialog để show dialog edit ra
     * CreatedBy KDLong 18/05/2021
     */
    showDialogEdit(state, employee) {
        state.cloneEmployee = {...employee }
        state.employee = employee
        state.typeOfInfoDialog = InfoDialogConstant.IS_EDIT
    },
    /**
     * Thay đổi giá trị của typeOfInfoDialog để show dialog clone
     * gán mã nhân viên mới, còn giữ lại các thuộc tính còn lại
     * CreatedBy KDLong 18/05/2021
     */
    showDialogClone(state, employee) {
        // copy nhân viên cần nhân bản
        state.cloneEmployee = {...employee }
            // Cập nhật mã = mã mới
        state.cloneEmployee.employeeCode = state.newEmployeeCode
            // gán nhân viên hệ thống để sau check thay đổi dữ liệu
        state.employee = employee
        state.typeOfInfoDialog = InfoDialogConstant.IS_CLONE
    },
    /**
     * Thay đổi message trong dialog
     * CreatedBy KDLong 19/05/2021
     */
    changeMessageOfDialog(state, message) {
        state.messageOfDialog = message
    },
    /**
     * Đóng dialog thêm/sửa nhân viên và reset lại state.employee
     * CreatedBy KDLong 19/05/2021
     */
    closeInfoDialog(state) {
        state.employee = {...initEmployee }
        state.typeOfInfoDialog = InfoDialogConstant.IS_CLOSE_DIALOG
    }
}