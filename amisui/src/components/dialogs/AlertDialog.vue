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

      <div v-if="typeOfAlertDialog == IS_REQUIRED">
        <div class="btn-close-alert btn-green" @click="btnCloseDialogRequired">
          Đóng
        </div>
      </div>

      <div v-if="typeOfAlertDialog == IS_CODE_EXIST">
        <div class="btn-accept btn-green" @click="closeAlertDialog">Đồng ý</div>
      </div>

      <div v-if="typeOfAlertDialog == IS_CONFIRM_DELETE">
        <div class="btn-no btn-white" @click="closeAlertDialog">Không</div>
        <div class="btn-yes btn-green" @click="btnDelete">Có</div>
      </div>
      <div v-if="typeOfAlertDialog == IS_DATA_CHANGE">
        <div class="btn-cancel btn-white" @click="closeAlertDialog">Hủy</div>
        <div class="btn-yes btn-green" @click="btnSave">Có</div>
        <div class="btn-no-2 btn-white" @click="btnCloseInfoDialog">Không</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { AlertDialogConstant } from "../../configs/constants";
import _ from "lodash";
import { TIME_OF_DEBOUNCE } from "../../configs/constants";

export default {
  data() {
    return {
      IS_CODE_EXIST: AlertDialogConstant.IS_CODE_EXIST,
      IS_REQUIRED: AlertDialogConstant.IS_REQUIRED,
      IS_CONFIRM_DELETE: AlertDialogConstant.IS_CONFIRM_DELETE,
      IS_DATA_CHANGE: AlertDialogConstant.IS_DATA_CHANGE,
    };
  },
  computed: {
    ...mapState({
      typeOfAlertDialog: (state) => state.typeOfAlertDialog,
      messageOfDialog: (state) => state.messageOfDialog,
    }),
  },
  methods: {
    ...mapActions([
      "deleteEmployee",
      "closeAlertDialog",
      "showLoading",
      "hideLoading",
      "loadEmployee",
      "closeInfoDialog",
    ]),
    /**
     * Hàm sử lý độ trễ load sau thời gian TIME_OF_DEBOUNCE sẽ gọi các hàm ở trong nó
     * CreatedBy KDLong 18/05/2021
     */
    debounceLoad: _.debounce(function(functionLoad) {
      functionLoad();
    }, TIME_OF_DEBOUNCE),
    /**
     * Hàm thực hiện sau khi click vào btn có của dialog delete
     * CreatedBy KDLong 18/05/2021
     */
    btnDelete() {
      this.showLoading();
      this.deleteEmployee(() =>
        this.$emit("showNotification", AlertDialogConstant.DELETE_SUCCESS)
      );
      this.debounceLoad(() => this.loadEmployee(() => this.hideLoading()));
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
    }
  },
};
</script>

<style scoped>
@import "../../assets/css/dialogs/alertdialog.css";
</style>
