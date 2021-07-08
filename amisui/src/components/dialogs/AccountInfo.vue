<template>
  <div
    @keydown.esc.prevent.stop="closeForm" 
    @keydown.ctrl.83.prevent.stop.exact="btnSave" 
    @keydown.ctrl.shift.83.prevent.stop="btnSaveAndAdd"
    tabindex="0"
  >
    <div class="account-dialog-box"></div>
    <div
      class="account-dialog-content"
      :class="isFullScreen ? 'is-full-screen' : null"
    >
      <div class="account-resize" @click="handleResizeScreen">
        <div
          class="account-resize-icon"
          :class="isFullScreen ? 'rotate-resize' : null"
        ></div>
      </div>
      <div class="account-header-dialog-box">
        <div class="account-dialog-title">Tài khoản</div>
        <div class="account-top-right-option">
          <div class="account-btn-help"></div>
          <div title="Đóng (ESC)" class="account-btn-close" @click="closeForm"></div>
        </div>
      </div>
      <div class="account-content-dialog-box">
        <div class="account-basic-information">
          <div class="account-row-input-add-account">
            <Input
              style="width:25%;padding-right:12px"
              :isRequired="true"
              inputName="Số tài khoản"
              v-model="account.account_code"
              ref="accountCode"
            />
          </div>
          <div class="account-row-input-add-account">
            <Input
              style="width:50%"
              :isRequired="true"
              inputName="Tên tài khoản"
              v-model="account.account_name"
              ref="accountName"
            />
            <Input
              style="width:50%;padding-left:12px"
              inputName="Tên tiếng Anh"
              v-model="account.english_name"
            />
          </div>
          <div class="account-row-input-add-account">
            <div style="width:25%;padding-right:12px">
              <Combobox
                comboboxName="Tài khoản tổng hợp"
                :isMultiple="true"
                :titleOptions="titleParentAccount"
                :dataOptions="parentAccount"
                :fieldDisplay="'account_code'"
                :fieldSearch="'account_name'"
                :fieldValue="'account_id'"
                :value="account.parent_account_id"
                @handleChangeSelect="handleChangeParentAccount"
              />
            </div>
            <div style="width:25%">
              <Combobox
                :isRequired="true"
                comboboxName="Tính chất"
                :isMultiple="false"
                :titleOptions="[{ Title: '', Width: 100 }]"
                :dataOptions="nature"
                :fieldDisplay="'name'"
                :fieldSearch="'name'"
                :fieldValue="'name'"
                :value="account.nature"
                @handleChangeSelect="handleChangeNature"
              />
            </div>
          </div>
          <TextArea
            textareaName="Diễn giải"
            style="width:100%;"
            lHeight="60"
            v-model="account.description"
          />
          <div class="account-exception-accounting">
            <input
              v-model="account.is_exception_accounting"
              type="checkbox"
            />Có hạch toán ngoại lệ<br />
          </div>
        </div>

        <div class="account-collapse-information">
          <div class="account-header-item" @click="handleShowDetail">
            <div
              class="account-header-icon"
              :class="isShowDetail ? 'rotate-header-icon' : null"
            ></div>
            <div>Theo dõi chi tiết theo</div>
          </div>
          <div class="account-content" v-show="isShowDetail">
            <div class="account-row-input-add-account">
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedObjectType" />
                  <div class="account-title-checkbox">Đối tượng</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox
                    :isDisabled="account.object_type == null"
                    :isMultiple="false"
                    :titleOptions="[{ Title: '', Width: 100 }]"
                    :dataOptions="objectType"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.object_type"
                    @handleChangeSelect="handleChangeObjectType"
                  />
                </div>
              </div>
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding" style="width:100%">
                  <input type="checkbox" v-model="account.is_bank_account" />
                  <div class="account-title-checkbox">Tài khoản ngân hàng</div>
                </div>
              </div>
            </div>
            <div class="account-row-input-add-account">
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedObjectTypeThcp" />
                  <div class="account-title-checkbox">Đối tượng THCP</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox
                    :isDisabled="account.object_type_thcp == null"
                    :isMultiple="false"
                    :titleOptions="[{ Title: '', Width: 100 }]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.object_type_thcp"
                    @handleChangeSelect="handleChangeObjectTypeThcp"
                  />
                </div>
              </div>
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedConstruction" />
                  <div class="account-title-checkbox">Công trình</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox
                    :isDisabled="account.construction == null"
                    :isMultiple="false"
                    :titleOptions="[{ Title: '', Width: 100 }]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.construction"
                    @handleChangeSelect="handleChangeConstruction"
                  />
                </div>
              </div>
            </div>
            <div class="account-row-input-add-account">
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedOrder" />
                  <div class="account-title-checkbox">Đơn đặt hàng</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox
                    :isDisabled="account.order == null"
                    :isMultiple="false"
                    :titleOptions="[{ Title: '', Width: 100 }]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.order"
                    @handleChangeSelect="handleChangeOrder"
                  />
                </div>
              </div>
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedSaleContract" />
                  <div class="account-title-checkbox">Hợp đồng bán</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox
                    :isDisabled="account.sale_contract == null"
                    :isMultiple="false"
                    :titleOptions="[{ Title: '', Width: 100 }]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.sale_contract"
                    @handleChangeSelect="handleChangeSaleContract"
                  />
                </div>
              </div>
            </div>
            <div class="account-row-input-add-account">
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedPurchaseContract" />
                  <div class="account-title-checkbox">Hợp đồng mua</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox
                    :isDisabled="account.purchase_contract == null"
                    :isMultiple="false"
                    :titleOptions="[{ Title: '', Width: 100 }]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.purchase_contract"
                    @handleChangeSelect="handleChangePuchaseContract"
                  />
                </div>
              </div>
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedExpenseItem" />
                  <div class="account-title-checkbox">Khoản mục CP</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox
                    :isDisabled="account.expense_item == null"
                    :isMultiple="false"
                    :titleOptions="[{ Title: '', Width: 100 }]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.expense_item"
                    @handleChangeSelect="handleChangeExpenseItem"
                  />
                </div>
              </div>
            </div>
            <div class="account-row-input-add-account">
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDepartment" />
                  <div class="account-title-checkbox">Đơn vị</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox
                    :isDisabled="account.department == null"
                    :isMultiple="false"
                    :titleOptions="[{ Title: '', Width: 100 }]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.department"
                    @handleChangeSelect="handleChangeDepartment"
                  />
                </div>
              </div>
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedStatsCode" />
                  <div class="account-title-checkbox">Mã thống kê</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox
                    :isDisabled="account.stats_code == null"
                    :isMultiple="false"
                    :titleOptions="[{ Title: '', Width: 100 }]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.stats_code"
                    @handleChangeSelect="handleChangeStartsCode"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="account-divide"></div>
      <div class="account-footer-dialog-box">
        <div>
          <div class="white-button" @click="closeForm">Huỷ</div>
        </div>
        <div class="account-right-bottom-button">
          <div class="white-button" title="Cất (Ctrl + S)" @click="btnSave">
            Cất
          </div>
          <div
            class="green-button"
            title="Cất và thêm (Ctrl + Shift + S)"
            @click="btnSaveAndAdd"
          >
            Cất và Thêm
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "../share/Input";
import Combobox from "../share/Combobox";
import TextArea from "../share/TextArea";
import { mapActions, mapState } from "vuex";
import {
  ObjectType,
  Other,
  Nature,
  AccountConstant,
} from "../../configs/constants";
export default {
  components: {
    Input,
    Combobox,
    TextArea,
  },
  created() {
    this.getParentAccount();
    document.addEventListener("keydown", function(e) {
      e = e || window.event; //Get event
      if (e.ctrlKey) {
        var c = e.which || e.keyCode; //Get key code
        switch (c) {
          case 83: //Block Ctrl+S
            e.preventDefault();
            e.stopPropagation();
            break;
        }
      }
    });
  },
  mounted() {
    this.$refs.accountCode.focus();
  },
  computed: {
    ...mapState({
      account: (state) => state.account.account,
      parentAccount: (state) => state.account.parentAccount,
      accountFormMode: (state) => state.account.accountFormMode,
    }),
    isCheckedObjectType: {
      set(val) {
        if (val == false) {
          this.account.object_type = null;
        } else {
          this.account.object_type = "Nhà cung cấp";
        }
      },
      get() {
        if (this.account.object_type != null) {
          return true;
        } else return false;
      },
    },
    isCheckedObjectTypeThcp: {
      set(val) {
        if (val == false) {
          this.account.object_type_thcp = null;
        } else {
          this.account.object_type_thcp = "Chỉ cảnh báo";
        }
      },
      get() {
        if (this.account.object_type_thcp != null) {
          return true;
        } else return false;
      },
    },
    isCheckedConstruction: {
      set(val) {
        if (val == false) {
          this.account.construction = null;
        } else {
          this.account.construction = "Chỉ cảnh báo";
        }
      },
      get() {
        if (this.account.construction != null) {
          return true;
        } else return false;
      },
    },
    isCheckedOrder: {
      set(val) {
        if (val == false) {
          this.account.order = null;
        } else {
          this.account.order = "Chỉ cảnh báo";
        }
      },
      get() {
        if (this.account.order != null) {
          return true;
        } else return false;
      },
    },
    isCheckedSaleContract: {
      set(val) {
        if (val == false) {
          this.account.sale_contract = null;
        } else {
          this.account.sale_contract = "Chỉ cảnh báo";
        }
      },
      get() {
        if (this.account.sale_contract != null) {
          return true;
        } else return false;
      },
    },
    isCheckedPurchaseContract: {
      set(val) {
        if (val == false) {
          this.account.purchase_contract = null;
        } else {
          this.account.purchase_contract = "Chỉ cảnh báo";
        }
      },
      get() {
        if (this.account.purchase_contract != null) {
          return true;
        } else return false;
      },
    },
    isCheckedExpenseItem: {
      set(val) {
        if (val == false) {
          this.account.expense_item = null;
        } else {
          this.account.expense_item = "Chỉ cảnh báo";
        }
      },
      get() {
        if (this.account.expense_item != null) {
          return true;
        } else return false;
      },
    },
    isCheckedDepartment: {
      set(val) {
        if (val == false) {
          this.account.department = null;
        } else {
          this.account.department = "Chỉ cảnh báo";
        }
      },
      get() {
        if (this.account.department != null) {
          return true;
        } else return false;
      },
    },
    isCheckedStatsCode: {
      set(val) {
        if (val == false) {
          this.account.stats_code = null;
        } else {
          this.account.stats_code = "Chỉ cảnh báo";
        }
      },
      get() {
        if (this.account.stats_code != null) {
          return true;
        } else return false;
      },
    },
  },
  data() {
    return {
      isFullScreen: false,
      isShowDetail: true,
      objectType: [...ObjectType],
      other: [...Other],
      nature: [...Nature],
      titleParentAccount: [
        {
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
      ],
    };
  },
  methods: {
    ...mapActions("account", [
      "closeForm",
      "getParentAccount",
      "postAccount",
      "putAccount",
      "deleteAccount",
      "showFormAdd",
    ]),
    handleChangeObjectType(value) {
      this.account.object_type = value;
    },
    handleChangeObjectTypeThcp(value) {
      this.account.object_type_thcp = value;
    },
    handleChangeConstruction(value) {
      this.account.construction = value;
    },
    handleChangeOrder(value) {
      this.account.order = value;
    },
    handleChangeSaleContract(value) {
      this.account.sale_contract = value;
    },
    handleChangePuchaseContract(value) {
      this.account.purchase_contract = value;
    },
    handleChangeExpenseItem(value) {
      this.account.expense_item = value;
    },
    handleChangeDepartment(value) {
      this.account.department = value;
    },
    handleChangeStartsCode(value) {
      this.account.stats_code = value;
    },
    handleChangeNature(value) {
      this.account.nature = value;
    },
    handleChangeParentAccount(value) {
      this.account.parent_account_id = value;
    },
    handleResizeScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    handleShowDetail() {
      this.isShowDetail = !this.isShowDetail;
    },
    closeAccountInfo() {
      this.$emit("closeAccountInfo");
    },
    btnSave() {
      if (
        this.account.account_code == null ||
        this.account.account_name == null ||
        this.account.account_code == "" ||
        this.account.account_name == ""
      ) {
        this.validateNotEmpty();
      } else {
        let parent = this.parentAccount.find(
          (e) => e.account_id == this.account.parent_account_id
        );
        if (parent == undefined || this.account.account_code.trim().startsWith(parent.account_code)) {
          if (this.accountFormMode == AccountConstant.IS_ADD) {
            this.postAccount({
              callbackSuccess: () => {
                this.showNotification("Thêm thành công!", "success");
              },
              callbackFail: () => {
                this.showNotification(
                  "Số tài khoản đã tồn tại, vui lòng nhập lại!",
                  "error"
                );
              },
            });
          } else {
            this.putAccount({
              callbackSuccess: () => {
                this.showNotification("Sửa thành công!", "success");
              },
              callbackFail: () => {
                this.showNotification(
                  "Số tài khoản đã tồn tại, vui lòng nhập lại!",
                  "error"
                );
              },
            });
          }
        }else{
          this.showNotification("Số tài khoản không hợp lệ. Số tài khoản chi tiết phải bắt đầu bằng số của Tài khoản tổng hợp!","error")
        }
      }
    },
    btnSaveAndAdd() {
      if (
        this.account.account_code == null ||
        this.account.account_name == null ||
        this.account.account_code == "" ||
        this.account.account_name == ""
      ) {
        this.validateNotEmpty();
      } else {
        let parent = this.parentAccount.find(
          (e) => e.account_id == this.account.parent_account_id
        );
        if (parent == undefined || this.account.account_code.trim().startsWith(parent.account_code)) {
          if (this.accountFormMode == AccountConstant.IS_ADD) {
          this.postAccount({
            callbackSuccess: () => {
              this.showNotification("Thêm thành công!", "success");
              this.showFormAdd();
              this.$refs.accountCode.focus();
            },
            callbackFail: () => {
              this.showNotification(
                "Số tài khoản đã tồn tại, vui lòng nhập lại!",
                "error"
              );
            },
          });
        } else {
          this.putAccount({
            callbackSuccess: () => {
              this.showNotification("Sửa thành công!", "success");
              this.showFormAdd();
              this.$refs.accountCode.focus();
            },
            callbackFail: () => {
              this.showNotification(
                "Số tài khoản đã tồn tại, vui lòng nhập lại!",
                "error"
              );
            },
          });
        }

        }else{
          this.showNotification("Số tài khoản không hợp lệ. Số tài khoản chi tiết phải bắt đầu bằng số của Tài khoản tổng hợp!","error")
        }
        
      }
    },
    validateNotEmpty() {
      if (
        this.account.account_code == null ||
        this.account.account_code == ""
      ) {
        this.$refs.accountCode.setValidateState(false);
      }
      if (
        this.account.account_name == null ||
        this.account.account_name == ""
      ) {
        this.$refs.accountName.setValidateState(false);
      }
      if (
        this.account.account_code == null ||
        this.account.account_code == ""
      ) {
        this.showNotification("Số tài khoản không được để trống!", "error");
        return;
      }
      if (
        this.account.account_name == null ||
        this.account.account_name == ""
      ) {
        this.showNotification("Tên tài khoản không được để trống!", "error");
      }
    },
    showNotification(message, type) {
      this.$notification[type]({
        message,
        duration: 3,
      });
    },
  },
};
</script>

<style>
.row-input-add-account .ant-select {
  width: 100% !important;
}
.row-input-add-account .input {
  min-width: 150px !important;
}

@import "../../assets/css/dialogs/accountinfo.css";
</style>
