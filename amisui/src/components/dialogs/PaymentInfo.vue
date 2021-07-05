<template>
  <div class="payment-info-container">
    <div class="payment-header">
      <div class="left-payment-header">
        <div class="history-icon icon"></div>
        <div class="payment-number">
          Phiếu chi {{payment.payment_code}}
        </div>
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
        <router-link class="close-icon icon" to="/payment">
        </router-link>
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
                v-model="paymentDateHandle" />
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
          <div class="total-amount">{{ payment.currency == "VND" ? amountTotal:exchangeTotal}}</div>
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
              :disabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
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
            <th></th>
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
            <!-- <th style="min-width:220px">
              TK ngân hàng
            </th> -->
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
                      
                      :isDisabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
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
                      :isDisabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
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
                      :isDisabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
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
                <input
                  :disabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                  @change="handleChangeAmount"
                  v-model="accounting.amount"
                  type="number"
                  min="0"
                  class="input"
                  style="width:190px"
                  maxlength="20"
                />
              </td>
              <td class="money" v-show="payment.currency == 'USD'">
                <input
                  :disabled="paymentFormMode == PaymentConstant.IS_READ_ONLY"
                  @change="handleChangeExchange"
                  v-model="accounting.exchange"
                  type="number"
                  min="0"
                  class="input"
                  style="width:190px"
                />
              </td>

              <!-- <td style="border-right:0 !important">
                <div class="cell-table">
                  <div style="width:200px"><Combobox /></div>
                </div>
              </td> -->
              <td class="th-td-last td-last">
                <div class="center">
                  <div
                    class="delete-icon"
                    @click="deleteCurrentLineBankAccount(index)"
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
        <router-link style="color:white" class="black-btn" to="/payment">
          Hủy
        </router-link>
      </div>
      <div v-show="paymentFormMode != PaymentConstant.IS_READ_ONLY" class="right-payment-footer">
        <div class="black-btn save" @click="btnSave">
          Cất
        </div>
        <div class="save-and-print-btn">
          <div class="save-and-print">
            Cất và in
          </div>
          <div class="line1"></div>

          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link">
              <div class="option">
                <div class="dropdown-icon"></div>
              </div>
            </a>
            <a-menu slot="overlay" class="cover-option">
              <a-menu-item key="0">
                <a @click="btnSaveAndAdd" class="option-dropdown">Cất và thêm</a>
              </a-menu-item>
              <a-menu-item key="1">
                <a @click="btnSave" class="option-dropdown">Cất và đóng</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
      <div v-show="paymentFormMode == PaymentConstant.IS_READ_ONLY" class="right-payment-footer">
        <div class="black-btn save" @click="changeFormMode">
          Sửa
        </div>
        <div class="save-and-print-btn">
          <router-link style="color:white" to="/payment" class="save-and-print">
            Đóng
          </router-link>
          <div class="line1"></div>

          <div class="option">
            <div class="dropdown-icon"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import Combobox from "../share/Combobox.vue";
import Input from "../share/Input.vue";
import { Employees, InitAccounting,PaymentConstant } from "../../configs/constants";

const currencies = [
  {
    Symbol: "VND",
    Name: "Việt Nam đồng",
  },
  {
    Symbol: "USD",
    Name: "Đô la Mỹ",
  },
];
const titleCurrencies = [
  {
    Title: "Mã loại tiền",
    Width: 120,
  },
  {
    Title: "Tên loại tiền",
    Width: 120,
  },
];
export default {
  created() {
    this.getSuppliers();
    this.getAccount();
    if(this.$route.params.id == null){
      this.getNewPaymentCode()
    }else{
      this.getPaymentById(this.$route.params.id)
      this.$refs.paymentCode.setValidateState(true);
    }
  },
  mounted() {
    this.$refs.paymentCode.focus()
    this.accountingHandle = [...JSON.parse(this.payment.accounting)];
  },
  watch:{
    // "paymentVoucher.voucher_object.object_code": function(newCode, oldCode) {
    //         if(oldCode != newCode){
    //             // bind dữ liệu dưới grid phù hợp đối tượng master 
    //             for (let i = 0; i < this.paymentVoucher.category_payment_voucher.length; i++) {
    //                 //Đối trên grid giống trên master
    //                 if(oldCode == this.paymentVoucher.category_payment_voucher[i].object_code 
    //                     || this.paymentVoucher.category_payment_voucher[i].object_code == ""){
                        
    //                     // Bind dữ liệu đối tượng trên grid là đối tượng trên master
    //                     this.paymentVoucher.category_payment_voucher[i].object_code = this.paymentVoucher.voucher_object.object_code
    //                     this.paymentVoucher.category_payment_voucher[i].object_name = this.paymentVoucher.voucher_object.object_name
    //                     this.paymentVoucher.category_payment_voucher[i].explaining = this.paymentVoucher.payment_reason
    //                 }
    //             }
    //         }
    //     },
    "payment.payment_reason" :function(newValue,oldValue){
      this.accountingHandle.forEach(e => {
        if(e.explain == oldValue || e.explain == ""){
          e.explain = newValue
        }
      });
    },
    "payment.supplier_id" :function(newValue,oldValue){
      let supplier = this.suppliers.find((e) => e.supplier_id == newValue);
      this.accountingHandle.forEach(e => {
        if(e.supplier_id == oldValue || e.supplier_id == ""){
          e.supplier_id = newValue
          e.supplier_name = supplier.supplier_name
        }
      });
    }
  },
  data() {
    return {
      dateFormat: "DD/MM/YYYY",
      currencies,
      titleCurrencies,
      Employees,
      PaymentConstant,
      accountingHandle: [],
      accountingIndex: 0,
      titleSuppliers: [
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
      ],
      titleEmployees: [
        {
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
      ],
      titleAccount: [
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
  computed: {
    ...mapState({
      payment: (state) => state.payment.payment,
      suppliers: (state) => state.payment.suppliers,
      account: (state) => state.payment.account,
      paymentFormMode:(state)=>state.payment.paymentFormMode
    }),
    attachHandle: {
      set(val) {
        this.payment.attach = val.replaceAll(".", "");
      },
      get() {
        return new Intl.NumberFormat()
          .format(this.payment.attach)
          .replaceAll(",", ".");
      },
    },
    rateHandle: {
      set(val) {
        this.payment.rate = val.replaceAll(".", "");
      },
      get() {
        return new Intl.NumberFormat()
          .format(this.payment.rate)
          .replaceAll(",", ".") +",0";
      },
    },
    paymentDateHandle: {
      get() {
        if (this.payment.payment_date == null)
          return moment(Date.now()).format("YYYY-MM-DD");
        return moment(this.payment.payment_date).format("YYYY-MM-DD");
      },
      set(val) {
        this.payment.payment_date = moment(val).format("YYYY-MM-DDT00:00:00");
        if (this.payment.payment_date > this.payment.accounting_date)
          this.payment.accounting_date = moment(val).format("YYYY-MM-DDT00:00:00");
      },
    },
    accountingDateHandle: {
      get() {
        if (this.payment.accounting_date == null)
          return moment(Date.now()).format("YYYY-MM-DD");
        return moment(this.payment.accounting_date).format("YYYY-MM-DD");
      },
      set(val) {
        this.payment.accounting_date = moment(val).format("YYYY-MM-DDT00:00:00");
        if (this.payment.payment_date > this.payment.accounting_date)
          this.payment.payment_date = moment(val).format("YYYY-MM-DDT00:00:00");
      },
    },
    amountTotal: {
      get() {
          let total = 0;
          this.accountingHandle.forEach((e) => {
            if(e.amount == null || e.amount ==""){
              total += 0
            }else{
              total += parseInt(e.amount);
            }
          });
          if(this.payment.currency != "USD"){
            this.setMoney(total)
          }
          return new Intl.NumberFormat()
          .format(total)
          .replaceAll(",", ".")+",0";
          
      },
    },
    exchangeTotal: {
      get() {
          let total = 0;
          this.accountingHandle.forEach((e) => {
            if(e.amount == null || e.exchange ==""){
              total += 0
            }else{
              total += parseInt(e.exchange);
            }
          });
          if(this.payment.currency == "USD"){
            this.setMoney(total)
          }
          return new Intl.NumberFormat()
          .format(total)
          .replaceAll(",", ".")+",0";
      },
    },
  },
  components: {
    Combobox,
    Input,
  },
  methods: {
    moment,
    ...mapActions("payment",
     [
       "getSuppliers", 
       "getAccount",
       "getNewPaymentCode",
       "postPayment",
       "putPayment",
       "getPaymentById",
       "changeFormMode"
       ]),
    handleChangeCurrency(value) {
      this.payment.currency = value;
    },
    handleChangeSuppliers(value) {
      this.payment.supplier_id = value;
      let supplier = this.suppliers.find((e) => e.supplier_id == value);
      this.payment.payment_reason = "Chi tiền cho " + supplier.supplier_name
      this.payment.address = supplier.address
    },
    handleChangeEmployees(value) {
      this.payment.employee_name = value;
    },
    handleChangeDebtAccountId(value) {
      this.accountingHandle[this.accountingIndex].debt_account_id = value;
    },
    handleChangeOverAccountId(value) {
      this.accountingHandle[this.accountingIndex].over_account_id = value;
    },
    handleChangeSupplierId(value) {
      this.accountingHandle[this.accountingIndex].supplier_id = value;
      let supplier = this.suppliers.find((e) => e.supplier_id == value);
      this.accountingHandle[this.accountingIndex].supplier_name =
        supplier.supplier_name;
    },
    handleChangeAmount(e) {
      this.accountingHandle[this.accountingIndex].exchange =
          e.target.value * this.payment.rate;
    },
    handleChangeExchange(e) {
      this.accountingHandle[this.accountingIndex].amount =
        e.target.value / this.payment.rate;
    },
    addLineAccounting() {
      this.accountingHandle.push({ ...InitAccounting });
    },
    removeAllLineAccounting() {
      this.accountingHandle = [{ ...InitAccounting }];
    },
    deleteCurrentLineBankAccount(index) {
      this.accountingHandle = this.accountingHandle.filter(
        (item, i) => i != index
      );
    },
    handleAccountingIndex(index) {
      this.accountingIndex = index;
    },
    setMoney(value){
      this.payment.money = value
    },
    btnSave() {
      //Nếu ngày null thì set bằng ngày hiện tại
      if (this.payment.payment_date == null) {
        this.payment.payment_date = moment(Date.now()).format("YYYY-MM-DDT00:00:00");
      }
      if (this.payment.accounting_date == null) {
        this.payment.accounting_date = moment(Date.now()).format("YYYY-MM-DDT00:00:00");
      }
      //validate
      if(this.payment.payment_code == null){
        this.$refs.paymentCode.setValidateState(false);
      }else{
        //Lọc các hạch toán rỗng trước khi cất
        this.accountingHandle = this.accountingHandle.filter(
          (item) => JSON.stringify(item) != JSON.stringify(InitAccounting)
        );
        this.payment.accounting = JSON.stringify(this.accountingHandle);
        
        if(this.paymentFormMode == PaymentConstant.IS_ADD){
          this.postPayment({
            callbackSuccess:()=>{
              this.showNotification("Thêm thành công!")
              this.$router.go(-1)
            },
            callbackFail:()=>{
              this.showNotification("Thêm thất bại!")
            }
          });
        }else{
          this.putPayment({
            callbackSuccess:()=>{
              this.showNotification("Sửa thành công!")
              this.$router.go(-1)
            },
            callbackFail:()=>{
              this.showNotification("Sửa thất bại!")
            }
          });
        }
      }
      
    },
    btnSaveAndAdd(){
      //Nếu ngày null thì set bằng ngày hiện tại
      if (this.payment.payment_date == null) {
        this.payment.payment_date = moment(Date.now()).format("YYYY-MM-DDT00:00:00");
      }
      if (this.payment.accounting_date == null) {
        this.payment.accounting_date = moment(Date.now()).format("YYYY-MM-DDT00:00:00");
      }
      //validate
      if(this.payment.payment_code == null){
        this.$refs.paymentCode.setValidateState(false);
      }else{
        //Lọc các hạch toán rỗng trước khi cất
        this.accountingHandle = this.accountingHandle.filter(
          (item) => JSON.stringify(item) != JSON.stringify(InitAccounting)
        );
        this.payment.accounting = JSON.stringify(this.accountingHandle);
        
        if(this.paymentFormMode == PaymentConstant.IS_ADD){
          this.postPayment({
            callbackSuccess:()=>{
              this.showNotification("Thêm thành công!")
              this.getNewPaymentCode()
              this.$refs.paymentCode.focus()
            },
            callbackFail:()=>{
              this.showNotification("Thêm thất bại!")
            }
          });
        }else{
          this.putPayment({
            callbackSuccess:()=>{
              this.showNotification("Sửa thành công!")
              this.getNewPaymentCode()
              this.$refs.paymentCode.focus()
            },
            callbackFail:()=>{
              this.showNotification("Sửa thất bại!")
            }
          });
        }
      }
    },
    showNotification(message){
      this.$notification['success']({
        message,
        duration:2
      });
    }
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
