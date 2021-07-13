<template>
  <div>
    <div class="dialog-box-notify"></div>
    <div class="dialog-notify-content">
      <div class="content-box">
        <div
          class="notify-icon"
          :class="[
            alertFormMode == AlertDialogConstant.IS_CODE_EXIST ? 'icon-danger' :'icon-required']"
        ></div>
        <div class="content-text">
          {{ messageOfDialog }}
        </div>
      </div>
      <div class="line"></div>

      <div v-if="alertFormMode == AlertDialogConstant.DELETE_FAILURE">
        <div class="btn-close-alert btn-green" @click="closeAlertDialog">
          Đóng
        </div>
      </div>

      <div v-if="alertFormMode == AlertDialogConstant.IS_CONFIRM_DELETE">
        <div class="btn-no btn-white" @click="closeAlertDialog">Không</div>
        <div class="btn-yes btn-green" @click="confirmDelete">Có</div>
      </div>
      <div v-if="alertFormMode == AlertDialogConstant.IS_CODE_EXIST">
        <div class="btn-no btn-white" @click="closeAlertDialog">Không</div>
        <div class="btn-yes btn-green" @click="confirmIncrement">Có</div>
      </div>
    </div>
  </div>
</template>

<script>
import { AlertDialogConstant } from "../../configs/constants";

export default {
  props:{

    alertFormMode:{//Loại của dialog
      type:Number,
      default:AlertDialogConstant.IS_CLOSE
    },
    messageOfDialog:{//Câu thông báo của dialog
      type:String,
      default:""
    }
  },
  data() {
    return {
      AlertDialogConstant//Hằng số
    };
  },
  methods: {
    //Đồng ý tăng mã
    confirmIncrement(){
      this.$emit("closeAlertDialog")
      this.$emit("confirmIncrement")
    },
    //Đồng ý xoá
    confirmDelete(){
      this.$emit("confirmDelete")
      this.$emit("closeAlertDialog")
    },
    //Đóng form
    closeAlertDialog(){
      this.$emit("closeAlertDialog")
    }
  },
};
</script>

<style scoped>
@import "../../assets/css/dialogs/alertdialog.css";
</style>
