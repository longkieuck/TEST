<template>
  <div>
    <div class="dialog-box-notify"></div>
    <div class="dialog-notify-content">
      <div class="content-box">
        <div
          class="notify-icon"
          :class="[
            typeOfAlertDialog == IS_REQUIRED ? 'icon-required' : null,
            typeOfAlertDialog == IS_CODE_EXIST ? 'icon-danger' : null,
            typeOfAlertDialog == IS_CONFIRM_DELETE ? 'icon-danger' : null,
            typeOfAlertDialog == IS_DATA_CHANGE ? 'icon-question' : null,
          ]"
        ></div>
        <div class="content-text">
          {{ messageOfDialog }}
        </div>
      </div>
      <div class="line"></div>

      <div v-if="alertFormMode == AlertDialogConstant.DELETE_FAILURE">
        <div class="btn-close-alert btn-green" @click="btnCloseDialogRequired">
          Đóng
        </div>
      </div>

      <div v-if="alertFormMode == IS_CODE_EXIST">
        <div class="btn-accept btn-green" @click="closeAlertDialog">Đồng ý</div>
      </div>

      <div v-if="alertFormMode == AlertDialogConstant.IS_CONFIRM_DELETE">
        <div class="btn-no btn-white" @click="closeAlertDialog">Không</div>
        <div class="btn-yes btn-green" @click="confirmDelete">Có</div>
      </div>
      <div v-if="alertFormMode == IS_DATA_CHANGE">
        <div class="btn-cancel btn-white" @click="closeAlertDialog">Hủy</div>
        <div class="btn-yes btn-green" @click="btnSave">Có</div>
        <div class="btn-no-2 btn-white" @click="btnCloseInfoDialog">Không</div>
      </div>
    </div>
  </div>
</template>

<script>
import { AlertDialogConstant } from "../../configs/constants";

export default {
  props:{

    alertFormMode:{
      type:Number,
      default:AlertDialogConstant.IS_CLOSE
    },
    messageOfDialog:{
      type:String,
      default:""
    }
  },
  data() {
    return {
      AlertDialogConstant
    };
  },
  methods: {
    /**
     * Hàm sử lý độ trễ load sau thời gian TIME_OF_DEBOUNCE sẽ gọi các hàm ở trong nó
     * CreatedBy KDLong 18/05/2021
     */
    // debounceLoad: _.debounce(function(functionLoad) {
    //   functionLoad();
    // }, TIME_OF_DEBOUNCE),
    confirmDelete(){
      this.$emit("confirmDelete")
      this.$emit("closeAlertDialog")
    },
    /**
    *Hàm thực hiện đóng dialog
    *CreatedBy KDLong 18/05/2021 
    */
    btnCloseInfoDialog() {
      this.closeAlertDialog();
      this.closeInfoDialog();
    },
    /**
     * Hàm thực hiện close dialog và lưu dữ liệu
     * CreatedBy KDLong 18/05/2021 
     */
    btnSave() {
      this.closeAlertDialog();
      this.$emit("btnSave");
    },
    /**
     * Thực hiện đóng dialog và focus vào ô validate
     * CreatedBy KDLong 18/05/2021
     */
    btnCloseDialogRequired(){
      this.closeAlertDialog();
      // this.$emit("focusInputRequired")
    },
    closeAlertDialog(){
      this.$emit("closeAlertDialog")
    }
  },
};
</script>

<style scoped>
@import "../../assets/css/dialogs/alertdialog.css";
</style>
