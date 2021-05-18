<template>
  <div>
    <div class="dialog-box-notify"></div>
    <div class="dialog-notify-content">
      <div class="content-box">
        <div class="notify-icon" :class="typeOfDialog ==IS_REQUIRED ? 'icon-required':typeOfDialog==IS_CODE_EXIST?'icon-danger':typeOfDialog==IS_CONFIRM_DELETE?'icon-danger':typeOfDialog ==IS_DATA_CHANGE?'icon-question':null"></div>
        <div class="content-text">
          {{messageOfDialog}}
        </div>
      </div>
      <div class="line"></div>

      <div v-if="typeOfDialog == IS_REQUIRED">
          <div class="btn-close-alert btn-green">Đóng</div>
      </div>

      <div v-if="typeOfDialog == IS_CODE_EXIST">
          <div class="btn-accept btn-green">Đồng ý</div>
      </div>

      <div v-if="typeOfDialog == IS_CONFIRM_DELETE">
        <div class="btn-no btn-white" @click="closeAlertDialog">Không</div>
        <div class="btn-yes btn-green" @click="deleteEmployee">Có</div>
      </div>
      <div v-if="typeOfDialog == IS_DATA_CHANGE">
        <div class="btn-cancel btn-white">Hủy</div>
        <div class="btn-yes btn-green">Có</div>
        <div class="btn-no-2 btn-white">Không</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState } from "vuex";
import { DialogConstant } from '../../configs/Constants'

export default {
  data(){
      return{
        IS_CODE_EXIST : DialogConstant.IS_CODE_EXIST,
        IS_REQUIRED : DialogConstant.IS_REQUIRED,
        IS_CONFIRM_DELETE : DialogConstant.IS_CONFIRM_DELETE,
        IS_DATA_CHANGE : DialogConstant.IS_DATA_CHANGE,
      }
  },
  computed:{
    ...mapState({
      typeOfDialog:(state)=>state.typeOfDialog,
      messageOfDialog:(state)=>state.messageOfDialog,
    })
  },
  methods:{
    ...mapActions([
      'deleteEmployee',
      'closeAlertDialog'
    ]),
    // //Sự kiện khi click btnAccept
    // btnAccept(){
    //     if(this.isDelete){
    //       let employeeId = this.employeeId
    //       //Nếu là delete thì gửi action deleteEmployee đi với employeeId
    //       this.deleteEmployee({employeeId,callback:()=>{
    //           //Delete thành công sẽ gọi 2 hàm callback
    //           //Load lại employee
    //           this.loadEmployee();
    //           //show notification
    //           this.openNotificationWithIcon()
    //       }})
    //       //Đóng dialog
    //       this.closeDialogNotify()
    //     }else{
    //       //Nếu là mã trùng thì sẽ thực hiện lấy mã mới
    //       this.getNewEmployeeCode()
    //       //và đóng dialog đi
    //       this.closeDialogNotify()
    //     }
    // },
    // //Show ra notification
    // openNotificationWithIcon() {
    //   this.$notification['success']({
    //     message: 'Thành công!',
    //     description:
    //       'Xoá thành công!',
    //     duration:2
    //   });
    // },
  }
};
</script>

<style>
@import "../../assets/css/dialogs/alertdialog.css";
</style>
