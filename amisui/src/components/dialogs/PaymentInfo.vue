<template>
  <div class="payment-info-container">
    <div class="payment-header">
      <div class="left-payment-header">
        <div class="history-icon icon"></div>
        <div class="payment-number">
          Phiếu chi PC00131
        </div>
        <div class="type-payment">
          <Combobox lWidth="350" />
        </div>
      </div>
      <div class="right-payment-header">
        <div class="tutorial-icon icon"></div>
        <div class="tutorial-text">Hướng dẫn</div>
        <div class="setting-icon1 icon"></div>
        <div class="question-icon icon"></div>
        <div class="close-icon icon"></div>
      </div>
    </div>
    <div class="payment-content">
      <div class="basic-info">
        <div class="w3div4">
          <div class="w4div5">
            <div class="row-input1">
              <div style="width:43%">
                <Combobox 
                  :isMultiple="true" 
                  :comboboxName="'Đối tượng'" 
                />
              </div>
              <Input
                style="width: 57%;padding: 0 16px 0 12px;"
                :inputName="'Người nhận'"
                v-model="payment.receiver"
              />
            </div>
            <div class="row-input1">
              <Input
                style="width: 100%;padding-right:16px"
                :inputName="'Địa chỉ'"
                v-model="payment.address"
              />
            </div>
            <div class="row-input1">
              <Input
                style="width: 100%;padding-right:16px"
                :inputName="'Lý do chi'"
                v-model="payment.payment_reason"
              />
            </div>
            <div class="row-input1 include">
              <div style="width:43%">
                <Combobox :isMultiple="true" :comboboxName="'Nhân viên'" />
              </div>
              <Input
                style="padding-right:6px;padding-left:12px;"
                :inputName="'Kèm theo'"
                placeholder="Số lượng"
                lWidth="142"
                maxlength="20"
                v-model="payment.attach"
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
                :format="dateFormat"
                v-model="payment.accounting_date"
              />
            </div>
            <div class="row-input-right">
              <label class="date-title">Ngày phiếu chi</label>
              <a-date-picker
                :format="dateFormat"
                v-model="payment.payment_date"
              />
            </div>
            <div class="row-input-right">
              <Input lWidth="168" :inputName="'Số phiếu chi'" />
            </div>
          </div>
        </div>
        <div class="w1div4">
          <div class="total-text">
            Tổng tiền
          </div>
          <div class="total-amount">0,0</div>
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
              @setItemSelected="handleChangeCurrency"
              lWidth="100"
              :dataOptions="currencies"
              :fieldDisplay="'Symbol'"
              :fieldSearch="'Name'"
              :isMultiple="true"
              :titleOptions="titleCurrencies"
              :defaultValue="'VND'"
            />
          </div>
          <div v-show="currency=='VND'" class="currency">
            <div class="text">Tỷ giá</div>
            <Input lWidth="90" type="number" maxlength="20" />
          </div>
        </div>
      </div>

      <div class="payment-table">
        <table>
          <thead>
            <th></th>
            <th class="th-td-first th-first"><div class="center">#</div></th>
            <th style="min-width:330px;border-left:0 !important">
              Diễn giải
            </th>
            <th style="min-width:160px">
              TK nợ
            </th>
            <th style="min-width:160px">
              TK có
            </th>
            <th style="min-width:150px;padding-left:92px">
              Số tiền
            </th>
            <th v-show="currency == 'VND'" style="min-width:150px;padding-left:87px">
              Quy đổi
            </th>
            <th style="min-width:170px">
              Đối tượng
            </th>
            <th style="min-width:270px">
              Tên đối tượng
            </th>
            <th style="min-width:220px">
              TK ngân hàng
            </th>
            <th class="th-td-last" style="min-width:40px"></th>
            <th style="border-left: 0 !important"></th>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td class="th-td-first">
                <div class="center">{{ lineDataTable }}</div>
              </td>
              <td>
                <input type="text" class="input" style="width:310px" />
              </td>
              <td>
                <div class="cell-table">
                  <div style="width:140px"><Combobox /></div>
                </div>
              </td>
              <td>
                <div class="cell-table">
                  <div style="width:140px"><Combobox /></div>
                </div>
              </td>
              <td class="money">
                <input
                  type="number"
                  min="0"
                  class="input"
                  style="width:130px"
                  maxlength="20"
                />
              </td>
              <td class="money" v-show="currency == 'VND'">
                <input
                  type="number"
                  min="0"
                  class="input"
                  style="width:130px"
                />
              </td>
              <td>
                <div class="cell-table">
                  <div style="width:150px"><Combobox /></div>
                </div>
              </td>
              <td>
                <input type="text" class="input" style="width:250px" />
              </td>
              <td style="border-right:0 !important">
                <div class="cell-table">
                  <div style="width:200px"><Combobox /></div>
                </div>
              </td>
              <td class="th-td-last td-last">
                <div class="center">
                  <div class="delete-icon"></div>
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
              <td class="total-money"><div class="display-money">0</div></td>
              <td class="total-money" v-show="currency == 'VND'"><div class="display-money">0</div></td>
              <td class="total-money"></td>
              <td class="total-money"></td>
              <td class="total-money" style="border-right:0 !important"></td>
              <td class="th-td-last td-last total-money"></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="add-file">
        <div class="options-table">
          <div class="btn-option-table">
            Thêm dòng
          </div>
          <div class="btn-option-table">
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
      <div class="right-payment-footer">
        <div class="black-btn save">
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
                <a href="#" class="option-dropdown">Cất và thêm</a>
              </a-menu-item>
              <a-menu-item key="1">
                <a href="#" class="option-dropdown">Cất và đóng</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
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
  created(){
    // alert(this.$route.params.id)
  },
  data() {
    return {
      lineDataTable: 1,
      dateFormat: "DD/MM/YYYY",
      currencies,
      currency:'VND',
      titleCurrencies,
    };
  },
  computed:{
    ...mapState({
      payment:(state)=>state.payment.payment
    })
  },
  components: {
    Combobox,
    Input,
  },
  methods: {
    moment,
    ...mapActions("payment", [
    ]),
    handleChangeCurrency(index) {
      this.currency= this.currencies[index].Symbol
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
