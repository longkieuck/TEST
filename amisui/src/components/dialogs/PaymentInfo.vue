<template>
  <div
    class="payment-info-container"
    @keydown.esc.prevent.stop="btnCloseForm" 
    @keydown.ctrl.83.prevent.stop.exact="btnSave" 
    @keydown.ctrl.shift.83.prevent.stop="btnSaveAndAdd"
    @keydown.ctrl.shift.65.prevent.stop="btnSaveAndClose"
    @keydown.ctrl.69.prevent.stop="btnEdit"
    tabindex="0"
   >
    <div class="payment-header">
      <div class="left-payment-header">
        <div class="history-icon icon"></div>
        <div class="payment-number">Phiếu chi {{ payment.payment_code }}</div>
        <div class="type-payment">
          <Combobox
            :value="'5. Chi khác'"
            lWidth="350"
            :isDisabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
          />
        </div>
      </div>
      <div class="right-payment-header">
        <div class="tutorial-icon icon"></div>
        <div class="tutorial-text">Hướng dẫn</div>
        <div class="setting-icon1 icon"></div>
        <div class="question-icon icon"></div>
        <div title="Đóng(ESC)" class="close-icon icon" @click="btnCloseForm"></div>
      </div>
    </div>
    <div class="payment-content">
      <div class="basic-info">
        <div class="w3div4">
          <div class="w4div5">
            <div class="row-input1">
              <div style="width:43%">
                <Combobox
                  :isDisabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                  :isMultiple="true"
                  :isShowAddIcon="true"
                  :comboboxName="'Đối tượng'"
                  :titleOptions="titleSuppliers"
                  :dataOptions="suppliers"
                  :fieldDisplay="'supplier_name'"
                  :fieldSearch="'supplier_name'"
                  :fieldValue="'supplier_id'"
                  :value="payment.supplier_id"
                  @handleChangeSelect="handleChangeSuppliers"
                  :autoFocus="paymentFormMode != PaymentConstant.IS_READ_ONLY"
                />
              </div>
              <Input
                :disabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                style="width: 57%;padding: 0 16px 0 12px;"
                :inputName="'Người nhận'"
                v-model="payment.receiver"
              />
            </div>
            <div class="row-input1">
              <Input
                :disabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                style="width: 100%;padding-right:16px"
                :inputName="'Địa chỉ'"
                v-model="payment.address"
              />
            </div>
            <div class="row-input1">
              <Input
                :disabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                style="width: 100%;padding-right:16px"
                :inputName="'Lý do chi'"
                v-model="payment.payment_reason"
              />
            </div>
            <div class="row-input1 include">
              <div style="width:43%">
                <Combobox
                  :isDisabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                  :isMultiple="true"
                  :comboboxName="'Nhân viên'"
                  :isShowAddIcon="true"
                  :titleOptions="titleEmployees"
                  :dataOptions="Employees"
                  :fieldDisplay="'employee_name'"
                  :fieldSearch="'employee_name'"
                  :fieldValue="'employee_name'"
                  :value="payment.employee_name"
                  @handleChangeSelect="handleChangeEmployees"
                />
              </div>
              <Input
                :disabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                style="padding-right:6px;padding-left:12px;"
                :inputName="'Kèm theo'"
                placeholder="Số lượng"
                lWidth="142"
                maxlength="20"
                v-model="attachHandle"
              />
              <div class="original-doc">chứng từ gốc</div>
            </div>
            <div class="row-input1">
              <div>
                Tham chiếu<span style="margin-left:15px;color: #0075c0;"
                  >...</span
                >
              </div>
            </div>
          </div>
          <div class="w1div5">
            <div class="row-input-right">
              <label class="date-title">Ngày hạch toán</label>
              <a-date-picker
                :disabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                :format="dateFormat"
                v-model="accountingDateHandle"
              />
            </div>
            <div class="row-input-right">
              <label class="date-title">Ngày phiếu chi</label>
              <a-date-picker
                :disabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                :format="dateFormat"
                v-model="paymentDateHandle"
              />
            </div>
            <div class="row-input-right">
              <Input
                :disabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                lWidth="168"
                :isRequired="true"
                :inputName="'Số phiếu chi'"
                v-model="payment.payment_code"
                ref="paymentCode"
              />
            </div>
          </div>
        </div>
        <div class="w1div4">
          <div class="total-text">
            Tổng tiền
          </div>
          <div class="total-amount">
            {{ payment.currency == "VND" ? amountTotal : exchangeTotal }}
          </div>
        </div>
      </div>
      <div class="top-payment-table">
        <div class="table-title">
          Hạch toán
        </div>
        <div class="currency">
          <div class="currency">
            <div class="text" style="margin-right:8px">Loại tiền</div>
            <Combobox
              :isDisabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
              @handleChangeSelect="handleChangeCurrency"
              :value="payment.currency"
              lWidth="100"
              :dataOptions="currencies"
              :fieldDisplay="'Symbol'"
              :fieldSearch="'Name'"
              :fieldValue="'Symbol'"
              :isMultiple="true"
              :titleOptions="titleCurrencies"
              :defaultValue="'VND'"
            />
          </div>
          <div v-show="payment.currency == 'USD'" class="currency">
            <div class="text">Tỷ giá</div>
            <Input
              :disabled="true"
              v-model="rateHandle"
              lWidth="90"
              maxlength="20"
            />
          </div>
        </div>
      </div>

      <div class="payment-table">
        <table>
          <thead>
            <th style="border-left:none !important"></th>
            <th class="th-td-first th-first"><div class="center">#</div></th>
            <th style="min-width:410px;border-left:0 !important">
              Diễn giải
            </th>
            <th style="min-width:185px">
              TK nợ
            </th>
            <th style="min-width:185px">
              TK có
            </th>
            <th style="min-width:195px">
              Đối tượng
            </th>
            <th style="min-width:295px">
              Tên đối tượng
            </th>
            <th style="min-width:210px;padding-left:145px">
              Số tiền
            </th>
            <th
              v-show="payment.currency == 'USD'"
              style="min-width:210px;padding-left:140px"
            >
              Quy đổi
            </th>
            <th class="th-td-last" style="min-width:40px"></th>
            <th style="border-left: 0 !important"></th>
          </thead>
          <tbody>
            <tr
              v-for="(accounting, index) in accountingHandle"
              :key="index"
              @mousedown="handleAccountingIndex(index)"
            >
              <td></td>
              <td class="th-td-first">
                <div class="center">{{ index + 1 }}</div>
              </td>
              <td>
                <input
                  :disabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                  type="text"
                  class="input"
                  style="width:390px"
                  v-model="accounting.explain"
                />
              </td>
              <td>
                <div class="cell-table">
                  <div style="width:165px">
                    <Combobox
                      :isDisabled="
                        paymentFormMode == PaymentConstant.IS_READ_ONLY
                      "
                      :isMultiple="true"
                      :titleOptions="titleAccount"
                      :dataOptions="account"
                      :fieldDisplay="'account_code'"
                      :fieldSearch="'account_name'"
                      :fieldValue="'account_id'"
                      :value="accounting.debt_account_id"
                      @handleChangeSelect="handleChangeDebtAccountId"
                    />
                  </div>
                </div>
              </td>
              <td>
                <div class="cell-table">
                  <div style="width:165px">
                    <Combobox
                      :isDisabled="
                        paymentFormMode == PaymentConstant.IS_READ_ONLY
                      "
                      :isMultiple="true"
                      :titleOptions="titleAccount"
                      :dataOptions="account"
                      :fieldDisplay="'account_code'"
                      :fieldSearch="'account_name'"
                      :fieldValue="'account_id'"
                      :value="accounting.over_account_id"
                      @handleChangeSelect="handleChangeOverAccountId"
                    />
                  </div>
                </div>
              </td>
              <td>
                <div class="cell-table">
                  <div style="width:175px">
                    <Combobox
                      :isDisabled="
                        paymentFormMode == PaymentConstant.IS_READ_ONLY
                      "
                      :isMultiple="true"
                      :titleOptions="titleSuppliers"
                      :dataOptions="suppliers"
                      :fieldDisplay="'supplier_code'"
                      :fieldSearch="'supplier_name'"
                      :fieldValue="'supplier_id'"
                      :value="accounting.supplier_id"
                      @handleChangeSelect="handleChangeSupplierId"
                    />
                  </div>
                </div>
              </td>
              <td>
                <div style="width:275px;text-align:left;margin-left:10px">
                  {{ accounting.supplier_name }}
                </div>
                <!-- <input 
                  type="text" 
                  class="input" 
                  style="width:250px" 
                  v-model="accounting.supplier_name"
                /> -->
              </td>
              <td class="money">
                <!-- <input
                  :disabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                  @change="handleChangeAmount"
                  v-model="accounting.amount"
                  type="number"
                  min="0"
                  class="input"
                  style="width:190px"
                  maxlength="20"
                /> -->
                <InputNumber
                  :isShow="true"
                  :disabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                  :value="parseFloat(accounting.amount)"
                  @onValueChange="handleChangeAmount"
                  style="width:190px"
                  class="input"
                />
              </td>
              <td class="money" v-show="payment.currency == 'USD'">
                <!-- <input
                  :disabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                  @change="handleChangeExchange"
                  v-model="accounting.exchange"
                  type="number"
                  min="0"
                  class="input"
                  
                /> -->
                <InputNumber
                  :isShow="true"
                  :disabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                  :value="parseFloat(accounting.exchange)"
                  @onValueChange="handleChangeExchange"
                  style="width:190px"
                  class="input"
                />
              </td>
              <td class="th-td-last td-last">
                <div class="center">
                  <div
                    class="delete-icon"
                    @click="deleteCurrentLineAccounting(index)"
                  ></div>
                </div>
              </td>
              <td></td>
            </tr>

            <tr>
              <td></td>
              <td class="th-td-first total-money"></td>
              <td class="total-money"></td>
              <td class="total-money"></td>
              <td class="total-money"></td>
              <td class="total-money"></td>
              <td class="total-money"></td>
              <td class="total-money">
                <div class="display-money">{{ amountTotal }}</div>
              </td>
              <td class="total-money" v-show="payment.currency == 'USD'">
                <div class="display-money">{{ exchangeTotal }}</div>
              </td>
              <!-- <td class="total-money" style="border-right:0 !important"></td> -->
              <td class="th-td-last td-last total-money"></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="add-file">
        <div class="options-table">
          <div class="btn-option-table" @click="addLineAccounting">
            Thêm dòng
          </div>
          <div class="btn-option-table" @click="removeAllLineAccounting">
            Xoá hết dòng
          </div>
        </div>
        <div class="add-file-box">
          <div class="descrip">
            <div class="attach-icon"></div>
            <div class="attach-text">
              Đính kèm
            </div>
            <div class="max-capacity">
              Dung lượng tối đa 5MB
            </div>
          </div>
          <div class="box">
            Kéo/thả tệp vào đây hoặc bấm vào đây
          </div>
        </div>
      </div>
    </div>
    <div class="payment-footer">
      <div class="left-payment-footer">
        <div style="color:white" class="black-btn" @click="btnCloseForm">
          Hủy
        </div>
      </div>
      <div
        v-show="paymentFormMode != PaymentConstant.IS_READ_ONLY"
        class="right-payment-footer"
      >
        <div title="Cất(Ctrl + S)" class="black-btn save" @click="btnSave">
          Cất
        </div>
        <div class="save-and-print-btn">
          <div
            v-if="paymentButton == PaymentButtonConstant.SAVE_AND_ADD"
            class="save-and-print"
            @click="btnSaveAndAdd"
            title="Cất và thêm(Ctrl + Shift + S)"
          >
            Cất và thêm
          </div>
          <div
            title="Cất và đóng(Ctrl + Shift + A)"
            v-if="paymentButton == PaymentButtonConstant.SAVE_AND_CLOSE"
            class="save-and-print"
            @click="btnSaveAndClose"
          >
            Cất và đóng
          </div>
          <div class="line1"></div>

          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link">
              <div class="option">
                <div class="dropdown-icon"></div>
              </div>
            </a>
            <a-menu slot="overlay" class="cover-option">
              <a-menu-item
                key="0"
                v-if="paymentButton == PaymentButtonConstant.SAVE_AND_CLOSE"
              >
                <a 
                  @click="btnSaveAndAdd" 
                  class="option-dropdown"
                  title="Cất và thêm(Ctrl + Shift + S)"
                  >
                  Cất và thêm
                </a>
              </a-menu-item>
              <a-menu-item
                v-if="paymentButton == PaymentButtonConstant.SAVE_AND_ADD"
                key="1"
              >
                <a 
                  @click="btnSaveAndClose" 
                  class="option-dropdown"
                  title="Cất và đóng(Ctrl + Shift + A)"
                  >
                  Cất và đóng
                </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
      <div
        v-show="paymentFormMode == PaymentConstant.IS_READ_ONLY"
        class="right-payment-footer"
      >
        <div title="Sửa(Ctrl + E)" class="black-btn save" @click="btnEdit">
          Sửa
        </div>
        <div class="save-and-print-btn">
          <div style="color:white" @click="btnCloseForm" class="save-and-print">
            Đóng
          </div>
          <div class="line1"></div>

          <div class="option">
            <div class="dropdown-icon"></div>
          </div>
        </div>
      </div>
    </div>
    <AlertDialog
      v-if="isShowDialogCodeExist"
      :alertFormMode="AlertDialogConstant.IS_CODE_EXIST"
      :messageOfDialog="messageOfDialog"
      @closeAlertDialog="closeAlertDialog"
      @confirmIncrement="confirmIncrement"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import Combobox from "../share/Combobox.vue";
import Input from "../share/Input.vue";
import InputNumber from "../share/InputNumber.vue";
import AlertDialog from "./AlertDialog.vue";
import {
  Employees,
  InitAccounting,
  InitPayment,
  PaymentConstant,
  AlertDialogConstant,
  PaymentButtonConstant,
  titleSuppliers,
  titleEmployees,
  titleAccount,
  currencies,
  titleCurrencies,
  NotifiactionConstant
} from "../../configs/constants";

export default {
  components: {
    Combobox,
    Input,
    InputNumber,
    AlertDialog,
  },
  created() {
    this.getSuppliers();
    this.getAccount();
    if (this.$route.params.id == null) {
      //Nếu là form add thì lấy mã mới
      if (this.paymentFormMode == PaymentConstant.IS_ADD)
        this.getNewPaymentCode();
    } else {
      // Lấy data theo id đối tượng
      this.getPaymentById({
        payment_id: this.$route.params.id,
        callbackSuccess: () => {
          this.$refs.paymentCode.setValidateState(true);
          this.accountingHandle = [...JSON.parse(this.payment.accounting)];
          //Nếu là clone thì đi tới form thêm
          if(this.paymentFormMode == PaymentConstant.IS_CLONE){
            this.$router.replace('/payment/paymentinfo')
            this.getNewPaymentCodeForClone()
          }
        },
      });
    }
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
    //Lưu vết lại chức năng vừa sử dụng
    this.paymentButton = localStorage.PaymentButton;
    if (this.paymentFormMode == PaymentConstant.IS_ADD) {
      this.accountingHandle = [...JSON.parse(InitPayment.accounting)];
    }
  },
  watch: {
    //Khi thay đổi lý do chi
    "payment.payment_reason": function(newValue, oldValue) {
      //Lý do chi bên dưới nếu trước đó trùng với lý do chi cũ thì cập nhật theo
      this.accountingHandle.forEach((e) => {
        if (e.explain == oldValue || e.explain == "") {
          e.explain = newValue;
        }
      });
    },
    //Khi thay đổi đối tượng
    "payment.supplier_id": function(newValue, oldValue) {
      //Tìm đối tượng mới
      let supplier = this.suppliers.find((e) => e.supplier_id == newValue);
      if (supplier != null) {
        //Nếu đối tượng bên dưới trùng vs đối tượng cũ 
        //hoặc rỗng thì cập nhật đối tượng bên dưới theo master
        this.accountingHandle.forEach((e) => {
          if (e.supplier_id == oldValue || e.supplier_id == "") {
            e.supplier_id = newValue;
            e.supplier_name = supplier.supplier_name;
          }
        });
      }
    },
    //Thay đổi giá trị paymentbutton cập nhật cho localstorage
    paymentButton(newValue) {
      localStorage.PaymentButton = newValue;
    },
  },
  data() {
    return {
      dateFormat: "DD/MM/YYYY",//Định dạng ngày
      currencies,//Loại tiền tệ
      titleCurrencies,//Title của tiền tệ
      Employees,//Danh sách nhân viên
      titleEmployees,//Title nhân viên
      PaymentConstant,//Hằng số của form
      accountingHandle: [],//Mảng hoạch toán convert về array
      accountingIndex: 0,//vị trí đang tương tác
      AlertDialogConstant,//Hằng số dialog 
      PaymentButtonConstant,//Hằng số button footer
      paymentButton: 0,//mode của button footer
      justClickButton: 0,//Lưu vết lại click trước đấy cho sự kiện callback mã trùng
      isShowDialogCodeExist: false,//Show form mã trùng
      titleSuppliers,//Title của đối tượng
      titleAccount//Title của tài khoản nợ tài khoản có
    };
  },
  computed: {
    ...mapState({
      payment: (state) => state.payment.payment,
      suppliers: (state) => state.payment.suppliers,
      account: (state) => state.payment.account,
      paymentFormMode: (state) => state.payment.paymentFormMode,
    }),
    //Câu thông báo show ra trong dialog
    messageOfDialog: {
      get() {
        return (
          PaymentConstant.MESS_FRONT +
          this.payment.payment_code +
          PaymentConstant.MESS_BACK
        );
      },
    },
    // Sử lý số trong form kèm theo
    attachHandle: {
      set(val) {
        this.payment.attach = val.replaceAll(".", "");
      },
      get() {
        if (isNaN(this.payment.attach)) {
          return 0;
        } else
          return new Intl.NumberFormat()
            .format(this.payment.attach)
            .replaceAll(",", ".");
      },
    },
    //Sử lý số trong form tỉ lệ
    rateHandle: {
      set(val) {
        this.payment.rate = val.replaceAll(".", "");
      },
      get() {
        return (
          new Intl.NumberFormat()
            .format(this.payment.rate)
            .replaceAll(",", ".") + ",0"
        );
      },
    },
    //Format ngày phiếu chi
    paymentDateHandle: {
      get() {
        if (this.payment.payment_date == null || this.payment.payment_date == "Invalid date")
          return moment(Date.now()).format("YYYY-MM-DD");
        return moment(this.payment.payment_date).format("YYYY-MM-DD");
      },
      set(val) {
        this.payment.payment_date = moment(val).format("YYYY-MM-DDT00:00:00");
        // if (this.payment.payment_date > this.payment.accounting_date)
        //   this.payment.accounting_date = moment(val).format("YYYY-MM-DDT00:00:00");
      },
    },
    //Format ngày hạch toán
    accountingDateHandle: {
      get() {
        if (this.payment.accounting_date == null || this.payment.accounting_date == "Invalid date")
          return moment(Date.now()).format("YYYY-MM-DD");
        return moment(this.payment.accounting_date).format("YYYY-MM-DD");
      },
      set(val) {
        if (
          this.payment.payment_date == this.payment.accounting_date ||
          this.payment.payment_date == null
        ) {
          this.payment.accounting_date = moment(val).format(
            "YYYY-MM-DDT00:00:00"
          );
          this.payment.payment_date = moment(val).format("YYYY-MM-DDT00:00:00");
        } else {
          this.payment.accounting_date = moment(val).format(
            "YYYY-MM-DDT00:00:00"
          );
        }
      },
    },
    //Tổng số tiền
    amountTotal: {
      get() {
        // this.al()
        let total = 0;
        this.accountingHandle.forEach((e) => {
          if (e.amount == null || e.amount == "" || isNaN(e.amount)) {
            total += 0;
          } else {
            total += parseInt(e.amount);
          }
        });
        if (this.payment.currency != "USD") {
          this.setMoney(total);
        }
        return (
          new Intl.NumberFormat().format(total).replaceAll(",", ".") + ",0"
        );
      },
    },
    //Tổng quy đổi
    exchangeTotal: {
      get() {
        let total = 0;
        this.accountingHandle.forEach((e) => {
          if (e.exchange == null || e.exchange == "" || isNaN(e.exchange)) {
            total += 0;
          } else {
            total += parseInt(e.exchange);
          }
        });
        if (this.payment.currency == "USD") {
          this.setMoney(total);
        }
        return (
          new Intl.NumberFormat().format(total).replaceAll(",", ".") + ",0"
        );
      },
    },
  },
  methods: {
    moment,
    ...mapActions("payment", [
      "getSuppliers",
      "getAccount",
      "getNewPaymentCode",
      "postPayment",
      "putPayment",
      "getPaymentById",
      "changeFormMode",
      "showFormAdd",
      "getNewPaymentCodeForCodeExist",
      "showFormReadOnly",
      "getNewPaymentCodeForClone",
      "getPaymentIdByCode"
    ]),
    /**
     * Sự kiện thay đổi loại tiền tệ
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeCurrency(value) {
      this.payment.currency = value;
    },
    /**
     * Sự kiện đóng dialog trùng mã
     * CreatedBy KDLong 01/07/2021
     */
    closeAlertDialog() {
      this.isShowDialogCodeExist = false;
      //Sau khi đóng dialog trùng mã
    },
    /**
     * Sự kiện mở dialog trùng mã
     * CreatedBy KDLong 01/07/2021
     */
    showAlertDialog() {
      this.isShowDialogCodeExist = true;
    },
    /**
     * Sự kiện đồng ý tăng mã rồi thực hiện chức năng luôn
     * CreatedBy KDLong 01/07/2021
     */
    confirmIncrement() {
      this.getNewPaymentCodeForCodeExist(() => {
        if (this.justClickButton == PaymentButtonConstant.SAVE_AND_ADD) {
          this.btnSaveAndAdd();
        } else if (
          this.justClickButton == PaymentButtonConstant.SAVE_AND_CLOSE
        ) {
          this.btnSaveAndClose();
        } else {
          this.btnSave();
        }
      });
    },
    /**
     * Sự kiện thay đổi đối tượng cập nhật người nhận và địa chỉ
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeSuppliers(value) {
      this.payment.supplier_id = value;
      let supplier = this.suppliers.find((e) => e.supplier_id == value);
      this.payment.payment_reason = PaymentConstant.PAYMENT_FOR + supplier.supplier_name;
      this.payment.address = supplier.address;
      if (supplier.supplier_type == 0) {
        //Tổ chức
        this.payment.receiver = supplier.legal_representative;
      } else {
        this.payment.receiver = supplier.supplier_name;
      }
    },
    /**
     * Sự kiện thay đổi nhân viên
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeEmployees(value) {
      this.payment.employee_name = value;
    },
    /**
     * Sự kiện thay đổi tài khoản nợ
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeDebtAccountId(value) {
      this.accountingHandle[this.accountingIndex].debt_account_id = value;
    },
    /**
     * Sự kiện thay đổi tài khoản có
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeOverAccountId(value) {
      this.accountingHandle[this.accountingIndex].over_account_id = value;
    },
    /**
     * Sự kiện thay đổi đối tượng grid thì thay đổi tên đối tượng luôn
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeSupplierId(value) {
      this.accountingHandle[this.accountingIndex].supplier_id = value;
      let supplier = this.suppliers.find((e) => e.supplier_id == value);
      this.accountingHandle[this.accountingIndex].supplier_name =
        supplier.supplier_name;
    },
    /**
     * Sự kiện thay đổi số tiền thì thay đổi quy đổi
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeAmount(value) {
      this.accountingHandle[this.accountingIndex].amount = value;

      this.accountingHandle[this.accountingIndex].exchange =
        value * this.payment.rate;
    },
    /**
     * Sự kiện thay đổi quy đổi trong grid
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeExchange(value) {
      this.accountingHandle[this.accountingIndex].exchange = value;
    },
    /**
     * Sự kiện thêm dòng
     * CreatedBy KDLong 01/07/2021
     */
    addLineAccounting() {
      this.accountingHandle.push({
        ...this.accountingHandle[this.accountingHandle.length - 1],
      });
    },
    /**
     * Sự kiện xoá hết dòng
     * CreatedBy KDLong 01/07/2021
     */
    removeAllLineAccounting() {
      this.accountingHandle = [{ ...InitAccounting }];
    },
    /**
     * Sự kiện xoá dòng hiện tại
     * CreatedBy KDLong 01/07/2021
     */
    deleteCurrentLineAccounting(index) {
      if (this.accountingHandle.length != 1)
        this.accountingHandle = this.accountingHandle.filter(
          (item, i) => i != index
        );
    },
    /**
     * Sự kiện thay đổi index thành dòng đang focus
     * CreatedBy KDLong 01/07/2021
     */
    handleAccountingIndex(index) {
      this.accountingIndex = index;
    },
    /**
     * Sự kiện set tổng tiền khi cập nhật vào grid
     * CreatedBy KDLong 01/07/2021
     */
    setMoney(value) {
      this.payment.money = value;
    },
    /**
     * Sự kiện thay đổi form mode từ xem thành sửa
     * CreatedBy KDLong 01/07/2021
     */
    btnEdit() {
      this.changeFormMode()
    },
    /**
     * Sự kiện cất
     * CreatedBy KDLong 01/07/2021
     */
    btnSave() {
      this.justClickButton = PaymentButtonConstant.SAVE;
      //validate ngày
      this.checkDate();
      //validate trống
      if (this.payment.payment_code == "" || this.payment.payment_code == null) {
        this.$refs.paymentCode.setValidateState(false);
        this.showNotification(NotifiactionConstant.PAYMENT_CODE_NOT_EMPTY, NotifiactionConstant.ERROR);
      } else {
        //Lọc các hạch toán rỗng trước khi cất
        if (this.checkAccounting()) {
          this.payment.accounting = JSON.stringify(this.accountingHandle);
          if (this.paymentFormMode == PaymentConstant.IS_EDIT) {
            this.putPayment({
              callbackSuccess: () => {
                this.showNotification(NotifiactionConstant.EDIT_SUCCESS, NotifiactionConstant.SUCCESS);
                this.showFormReadOnly();
              },
              callbackFail: () => {
                this.showAlertDialog();
              },
            });
          } else {
            this.postPayment({
              callbackSuccess: () => {
                this.showNotification(NotifiactionConstant.ADD_SUCCESS, NotifiactionConstant.SUCCESS);
                this.getPaymentIdByCode((id)=>{
                   this.$router.replace(`/payment/paymentinfo/${id}`)
                })
                this.showFormReadOnly();
              },
              callbackFail: () => {
                this.showAlertDialog();
              },
            });
          }
        }
      }
    },
    /**
     * Sự kiện cất và thêm
     * CreatedBy KDLong 01/07/2021
     */
    btnSaveAndAdd() {
      this.justClickButton = PaymentButtonConstant.SAVE_AND_ADD;
      this.paymentButton = PaymentButtonConstant.SAVE_AND_ADD;
      //Nếu ngày null thì set bằng ngày hiện tại
      this.checkDate();
      //validate
      if (this.payment.payment_code == "") {
        this.$refs.paymentCode.setValidateState(false);
        this.showNotification(NotifiactionConstant.PAYMENT_CODE_NOT_EMPTY, NotifiactionConstant.ERROR);
      } else {
        //Lọc các hạch toán rỗng trước khi cất

        if (this.checkAccounting()) {
          this.payment.accounting = JSON.stringify(this.accountingHandle);

          if (this.paymentFormMode == PaymentConstant.IS_EDIT) {
            this.putPayment({
              callbackSuccess: () => {
                this.showNotification(NotifiactionConstant.EDIT_SUCCESS, NotifiactionConstant.SUCCESS);
                this.getNewPaymentCode();
                this.showFormAdd();
                this.$router.replace("/payment/paymentinfo/");
                this.accountingHandle = [...JSON.parse(InitPayment.accounting)];
                // this.$refs.paymentCode.focus()
              },
              callbackFail: () => {
                this.showAlertDialog();
              },
            });
          } else {
            this.postPayment({
              callbackSuccess: () => {
                this.showNotification(NotifiactionConstant.ADD_SUCCESS, NotifiactionConstant.SUCCESS);
                this.getNewPaymentCode();
                this.accountingHandle = [...JSON.parse(InitPayment.accounting)];
                // this.$refs.paymentCode.focus()
              },
              callbackFail: () => {
                this.showAlertDialog();
              },
            });
          }
        }
      }
    },
    /**
     * Sự kiện cất và đóng
     * CreatedBy KDLong 01/07/2021
     */
    btnSaveAndClose() {
      this.justClickButton = PaymentButtonConstant.SAVE_AND_CLOSE;
      this.paymentButton = PaymentButtonConstant.SAVE_AND_CLOSE;
      //Nếu ngày null thì set bằng ngày hiện tại
      this.checkDate();
      //validate
      if (this.payment.payment_code == "") {
        this.$refs.paymentCode.setValidateState(false);
        this.showNotification(NotifiactionConstant.PAYMENT_CODE_NOT_EMPTY, NotifiactionConstant.ERROR);
      } else {
        //Lọc các hạch toán rỗng trước khi cất
        if (this.checkAccounting()) {
          this.payment.accounting = JSON.stringify(this.accountingHandle);
          if (this.paymentFormMode == PaymentConstant.IS_EDIT) {
            this.putPayment({
              callbackSuccess: () => {
                this.showNotification(NotifiactionConstant.EDIT_SUCCESS, NotifiactionConstant.SUCCESS);
                this.$router.go(-1);
              },
              callbackFail: () => {
                this.showAlertDialog();
              },
            });
          } else {
            this.postPayment({
              callbackSuccess: () => {
                this.showNotification(NotifiactionConstant.ADD_SUCCESS, NotifiactionConstant.SUCCESS);
                this.$router.go(-1);
              },
              callbackFail: () => {
                this.showAlertDialog();
              },
            });
          }
        }
      }
    },
    /**
     * Kiểm tra ngày đã thoả mãn hay chưa và cập nhật lại nếu chưa thoả mãn
     */
    checkDate() {
      if (this.payment.payment_date == null || this.payment.payment_date == "Invalid date") {
        this.payment.payment_date = moment(Date.now()).format(
          "YYYY-MM-DDT00:00:00"
        );
      }
      if (this.payment.accounting_date == null || this.payment.accounting_date == "Invalid date") {
        this.payment.accounting_date = moment(Date.now()).format(
          "YYYY-MM-DDT00:00:00"
        );
      }
    },
    /**
     * Validate tài khoản có tài khoản nợ
     */
    checkAccounting() {
      let res = true;
      this.accountingHandle.forEach((e) => {
        if (e.debt_account_id == "") {
          this.showNotification(NotifiactionConstant.ACCOUNT1_NOT_EMPTY, NotifiactionConstant.ERROR);
          res = false;
          return;
        }
        if (e.over_account_id == "") {
          this.showNotification(NotifiactionConstant.ACCOUNT2_NOT_EMPTY, NotifiactionConstant.ERROR);
          res = false;
          return;
        }
      });
      return res;
    },
    /**
     * Sự kiện đóng form
     * CreatedBy KDLong 01/07/2021
     */
    btnCloseForm() {
      this.$router.go(-1);
    },
    /**
     * Sự thông báo
     * CreatedBy KDLong 01/07/2021
     */
    showNotification(message, type) {
      this.$notification[type]({
        message,
        duration: 2,
      });
    },
  },
};
</script>

<style>
.payment-content .ant-select {
  width: 100% !important;
}
.payment-content .input {
  min-width: 90px !important;
}
.currency .input,
.include .input,
.money .input {
  padding-right: 10px !important;
  text-align: right;
}
@import "../../assets/css/dialogs/paymentinfo.css";
</style>
