import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {BASE_URL} from '../configs/Constants'
import {DialogConstant} from '../configs/Constants'
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
    state:{
        employees:[],//Danh sách nhân viên được hiển thị trên UI
        employee:{...initEmployee},//Nhân viên được chọn để thêm sửa
        totalRecords: 0,//tổng số bản ghi thỏa mãn điều kiện lọc
        totalPages: 0,//Tổng số trang
        pageIndex: 1,//pageIndex dùng để lấy data
        pageSize: 10,//số bản ghi trên 1 trang
        search: "",//dùng để tìm kiếm
        isLoading:false,//show svg loading
        typeOfDialog:0,//Loại alertdialog show ra
        messageOfDialog:""//Thông báo mà dialog show ra
    },
    actions:{
        /**
         * Hàm thực hiện lấy danh sách nhân viên theo
         * pageIndex : vị trí trang
         * pageSize : tổng số bản ghi trên 1 trang
         * search : dữ liệu dùng để tìm kiếm
         * CreatedBy KDLong 18/05/2021
         */
        loadEmployee: (context,callback) => {
            axios
                .get(BASE_URL + 'Employees/Filter?Page=' + context.state.pageIndex + '&PageSize=' + context.state.pageSize + '&Search=' + context.state.search)
                .then(res => {
                    context.commit('loadEmployee', res.data)
                    callback()
                })
                .catch(()=>callback())

        },
        refreshData:(context,callback)=>{
            axios
                .get(BASE_URL + 'Employees/Filter?Page=1&PageSize=10&Search=')
                .then(res => {
                    context.commit('refreshData', res.data)
                    callback()
                })
                .catch(()=>callback())
        },
        /**
         * Hàm thực hiện để show loading
         * CreatedBy KDLong 18/05/2021
         */
        showLoading:(context)=>{
            context.commit('showLoading')
        },
        /**
         * Hàm thực hiện để hide loading
         * CreatedBy KDLong 18/05/2021
         */
        hideLoading:(context)=>{
            context.commit('hideLoading')
        },
        /**
         * Hàm thực hiện thay đổi page size theo value truyền vào
         * CreatedBy KDLong 18/05/2021
         */
        changePageSize: (context, value) => {
            context.commit('changePageSize', value)
        },
        /**
         * Hàm thực hiện thay đổi search theo value truyền vào
         * CreatedBy KDLong 18/05/2021
         */
        changeSearchText: (context, value) => {
            context.commit('changeSearchText', value)
        },
        /**
         * Hàm thực hiện thay đổi page index theo value truyền vào
         * CreatedBy KDLong 18/05/2021
         */
        changePageIndex: (context, value) => {
            context.commit('changePageIndex', value)
        },
        /**
         * Hàm thực hiện export dữ liệu ra file excel
         * CreatedBy KDLong 18/05/2021
         */
        exportData:()=>{
            // Lấy toàn bộ dữ liệu
            window.open(BASE_URL+'Employees/ExportAll')
            //Lấy dữ liệu của trang hiện thời trên UI
            // window.open(BASE_URL+'Employees/Export?Page=' + context.state.pageIndex + '&PageSize=' + context.state.pageSize + '&Search=' + context.state.search)
        },
        /**
         * Hàm thực hiện việc show dialog để xác nhận xóa nhân viên
         * CreatedBy KDLong 18/05/2021
         */
        showDialogConfirmDelete:(context,employee)=>{
            context.commit('showDialogConfirmDelete',employee)
        },
        /**
         * Hàm thực close dialog alert
         * CreatedBy KDLong 18/05/2021
         */
        closeAlertDialog:(context)=>{
            context.commit('closeAlertDialog')
        },


    },
    mutations:{
        /**
         * Sử lý gán dữ liệu cho employees,totalPages,totalRecords
         * @param {} state 
         * @param {dữ liệu trả về từ API} response 
         * CreatedBy KDLong 18/05/2021
         */
        loadEmployee(state, response) {
            state.employees = response.data
            state.totalPages = response.totalPages
            state.totalRecords = response.totalRecords
        },
        refreshData(state,response){
            state.employees = response.data
            state.totalPages = response.totalPages
            state.totalRecords = response.totalRecords
            state.employee={...initEmployee}
            state.pageIndex=1
            state.pageSize=10
            state.search=""
        },
        /**
         * Hiển thị loading
         * CreatedBy KDLong 18/05/2021
         */
        showLoading(state){
            state.isLoading = true
        },
        /**
         * Ẩn thị loading
         * CreatedBy KDLong 18/05/2021
         */
        hideLoading(state){
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
        showDialogConfirmDelete(state,employee){
            state.messageOfDialog="Bạn có thực sự muốn xóa nhân viên <"+ employee.employeeCode +"> không?"
            state.typeOfDialog = DialogConstant.IS_CONFIRM_DELETE
        },
        closeAlertDialog(state){
            state.typeOfDialog = 0
        }
    }
})
