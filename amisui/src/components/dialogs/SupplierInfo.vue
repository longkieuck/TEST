<template>
  <div>
    <supplier-info-box>
      <div class="option-supplier-box" slot="type-supplier">
        <input
          type="radio"
          name="type-supplier"
          value="0"
          v-model="typeSupplier"
        />Tổ chức<br />
        <input
          type="radio"
          name="type-supplier"
          value="1"
          v-model="typeSupplier"
        />Cá nhân<br />
      </div>
      <div class="is-customer" slot="is-customer">
        <input type="checkbox" v-model="isCustomer" />Là khách hàng<br />
      </div>

      <div v-show="typeSupplier == 0" slot="base-info" class="base-info">
        <div class="left-base-info">
          <div class="row-input">
            <Input
              style="width:170px;padding-right:12px"
              inputName="Mã số thuế"
              lWidth="158"
            />
            <Input inputName="Mã nhà cung cấp" isRequired="true" lWidth="235" />
          </div>
          <div class="row-input">
            <Input
              inputName="Tên nhà cung cấp"
              isRequired="true"
              lWidth="405"
            />
          </div>
          <TextArea
            textareaName="Địa chỉ"
            lWidth="405"
            lHeight="60"
            placeholder="VD: Số 82 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội"
          />
        </div>
        <div class="right-base-info">
          <div class="row-input">
            <Input
              style="width:170px;padding-right:12px"
              inputName="Điện thoại"
              lWidth="158"
            />
            <Input inputName="Website" lWidth="235" />
          </div>
          <div class="row-input">
            <ComboboxMultiple
              :dataOptions="dataOptions"
              @setItemSelected="setItemSelected"
              :fieldDisplay="'Name'"
              :fieldSearch="'Name'"
              :titleOptions="titleOptions"
              comboboxName="Nhóm nhà cung cấp"
              lWidth="405"
            />
          </div>
          <div class="row-input" style="margin-top:2px">
            <Combobox
              isMultiple="true"
              comboboxName="Nhân viên mua hàng"
              lWidth="405"
            />
          </div>
        </div>
      </div>
      <div v-show="typeSupplier == 1" slot="base-info" class="base-info">
        <div class="left-base-info">
          <div class="row-input">
            <Input
              style="width:247px;padding-right:12px"
              inputName="Mã nhà cung cấp"
              isRequired="true"
              lWidth="235"
            />
            <Input inputName="Mã số thuế" lWidth="158" />
          </div>
          <div
            class="row-input"
            style="display:flex;justify-content:space-between;align-items: flex-end;"
          >
            <Combobox
              comboboxName="Tên nhà cung cấp"
              lWidth="120"
              placeHolder="Xưng hô"
            />
            <Input lWidth="272" placeholder="Họ và tên" />
          </div>
          <TextArea
            textareaName="Địa chỉ"
            lWidth="405"
            lHeight="60"
            placeholder="VD: Số 82 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội"
          />
        </div>
        <div class="right-base-info">
          <div class="row-input">
            <ComboboxMultiple
              :dataOptions="dataOptions"
              @setItemSelected="setItemSelected"
              :fieldDisplay="'Name'"
              :fieldSearch="'Name'"
              :titleOptions="titleOptions"
              comboboxName="Nhóm nhà cung cấp"
              lWidth="405"
            />
          </div>
          <div class="row-input" style="margin-top:2px">
            <Combobox
              isMultiple="true"
              comboboxName="Nhân viên mua hàng"
              lWidth="405"
            />
          </div>
        </div>
      </div>
      <div class="tabs-option" slot="tabs-option">
        <div
          class="tab-option"
          :class="tabSelected == index ? 'tab-selected' : null"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="handleTabs(index)"
        >
          {{ tab }}
        </div>
      </div>
      <div slot="tab-content">
        <div v-show="tabSelected == 0" class="contact">
          <div class="organization" v-show="typeSupplier == 0">
            <div class="left-contact-organization">
              <div class="label-input" style="text-align:left">
                Người liên hệ
              </div>
              <div class="location-line">
                <Combobox placeHolder="Xưng hô" lWidth="125" />
                <Input
                  style="margin-top:-2px"
                  lWidth="260"
                  placeholder="Họ và tên"
                />
              </div>
              <div class="location-line">
                <Input
                  style="margin-top:4px"
                  lWidth="396"
                  placeholder="Email"
                />
              </div>
              <div class="location-line">
                <Input
                  style="margin-top:4px"
                  lWidth="190"
                  placeholder="Số điện thoại"
                />
              </div>
              <div v-show="isCustomer">
                <div class="label-input" style="text-align:left;margin-top:6px">
                  Đại diện theo PL
                </div>
                <div class="location-line">
                  <Input lWidth="396" placeholder="Đại diện theo PL" />
                </div>
              </div>
            </div>
            <div class="right-contact-organization">
              <div v-show="!isCustomer">
                <div class="label-input" style="text-align:left">
                  Đại diện theo PL
                </div>
                <div class="location-line">
                  <Input
                    style="margin-top:-2px"
                    lWidth="396"
                    placeholder="Đại diện theo PL"
                  />
                </div>
              </div>
              <div v-show="isCustomer">
                <div class="label-input" style="text-align:left">
                  Người nhận hoá đơn điện tử
                </div>
                <div class="location-line">
                  <Input
                    style="margin-top:-2px"
                    lWidth="396"
                    placeholder="Người nhận hoá đơn điện tử"
                  />
                </div>
                <div class="location-line">
                <Input
                  style="margin-top:4px"
                  lWidth="396"
                  placeholder="Email, ngăn cách nhiều email bởi dấu chấm phẩy '';''"
                />
              </div>
              <div class="location-line">
                <Input
                  style="margin-top:4px"
                  lWidth="190"
                  placeholder="Số điện thoại"
                />
              </div>
              </div>
            </div>
          </div>
          <div class="personal" v-show="typeSupplier == 1">
            <div class="left-contact">
              <Input
                inputName="Thông tin liên hệ"
                lWidth="396"
                placeholder="Email"
              />
              <Input
                style="display:block;margin-top:4px;"
                lWidth="190"
                placeholder="Điện thoại di động"
              />
              <Input
                style="display:block;margin-top:4px;"
                lWidth="190"
                placeholder="Điện thoại cố định"
              />
              <Input
                inputName="Đại diện theo PL"
                lWidth="396"
                placeholder="Đại diện theo PL"
              />
            </div>
            <div class="right-contact">
              <Input
                style="display:block"
                inputName="Thông tin CMND/Thẻ căn cước"
                lWidth="190"
                placeholder="Số CMND/Thẻ căn cước"
              />
              <Input
                style="display:block;margin-top:4px;"
                lWidth="190"
                placeholder="Ngày cấp"
              />
              <Input
                style="display:block;margin-top:4px;"
                lWidth="396"
                placeholder="Nơi cấp"
              />
            </div>
          </div>
        </div>
        <div v-show="tabSelected == 1" class="term-payment">
          <div class="term-payment-line1">
            <Combobox
              comboboxName="Điều khoản thanh toán"
              isMultiple="true"
              lWidth="190"
            />
            <Input inputName="Số ngày nợ cước" isMultiple="true" lWidth="190" />
            <Input inputName="Số nợ tối đa" isMultiple="true" lWidth="190" />
          </div>
          <div class="term-payment-line2">
            <Combobox
              v-show="isCustomer"
              comboboxName="Tài khoản công nợ phải thu"
              lWidth="190"
            />
            <Combobox comboboxName="Tài khoản công nợ phải trả" lWidth="190" />
          </div>
        </div>
        <div v-show="tabSelected == 2" class="bank-account">
          <div class="table-bank-account-box">
            <table>
              <thead>
                <th style="min-width:150px;border-left:none">
                  Số tài khoản
                </th>
                <th style="min-width:200px">
                  Tên ngân hàng
                </th>
                <th style="min-width:180px">
                  Chi nhánh
                </th>
                <th style="min-width:235px">
                  Tỉnh/TP của ngân hàng
                </th>
                <th style="min-width:40px"></th>
              </thead>
              <tbody>
                <tr v-for="account in bankAccountCount" :key="account">
                  <td>
                    <input type="text" class="input" style="width:130px" />
                  </td>
                  <td>
                    <input type="text" class="input" style="width:180px" />
                  </td>
                  <td>
                    <input type="text" class="input" style="width:160px" />
                  </td>
                  <td>
                    <input type="text" class="input" style="width:215px" />
                  </td>
                  <td>
                    <div
                      class="delete-icon"
                      @click="deleteCurrentLineBankAccount"
                    ></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="delivery-address-footer">
            <div class="btn-tabs-options" @click="addLineBankAccount">
              Thêm dòng
            </div>
            <div class="btn-tabs-options" @click="removeAllLineBankAccount">
              Xoá hết dòng
            </div>
          </div>
        </div>
        <div v-show="tabSelected == 3" class="other-address-tab">
          <div class="location">
            <div class="label-input">
              Vị trí địa lý
            </div>
            <div class="location-line">
              <Combobox lWidth="190" />
              <Combobox placeHolder="Tỉnh/Thành phố" lWidth="190" />
            </div>
            <div class="location-line" style="margin-top:10px">
              <Combobox placeHolder="Quận/Huyện" lWidth="190" />
              <Combobox placeHolder="Xã/Phường" lWidth="190" />
            </div>
          </div>
          <div class="delivery-address">
            <div class="delivery-address-title">
              <div class="label-input">
                Địa chỉ giao hàng
              </div>
              <div class="cover-checkbox-delivery">
                <input type="checkbox" />Giống địa chỉ nhà cung cấp<br />
              </div>
            </div>
            <div class="delivery-address-content">
              <div
                class="delivery-address-line"
                v-for="num in addressCount"
                :key="num"
              >
                <div class="delivery-input">
                  <Input style="margin-top:-5px" lWidth="325" />
                </div>
                <div class="delete-icon-box">
                  <div
                    class="delete-icon"
                    @click="deleteCurrentLineAddress"
                  ></div>
                </div>
              </div>
            </div>
            <div class="delivery-address-footer">
              <div class="btn-tabs-options" @click="addLineAddress">
                Thêm dòng
              </div>
              <div class="btn-tabs-options" @click="removeAllLineAddress">
                Xoá hết dòng
              </div>
            </div>
          </div>
        </div>
        <div v-show="tabSelected == 4" class="note-tab">
          <TextArea lWidth="815" lHeight="190" />
        </div>
      </div>
    </supplier-info-box>
  </div>
</template>

<script>
import SupplierInfoBox from "./SupplierInfoBox";
import Input from "../share/Input";
import ComboboxMultiple from "../share/ComboboxMultiple";
import Combobox from "../share/Combobox";
import TextArea from "../share/TextArea";
export default {
  components: {
    SupplierInfoBox,
    Input,
    ComboboxMultiple,
    Combobox,
    TextArea,
  },
  data() {
    return {
      typeSupplier: 0,
      isCustomer: false,
      tabSelected: 0,
      addressCount: 0,
      bankAccountCount: 0,
      dataOptions: [
        {
          Name: "K Long Long",
          Id: 1,
          Id2: 144444444444,
        },
        {
          Name: "Long Long Longaaaaaaaaaaaaaaaaaaa",
          Id: 2,
          Id2: 24444444444,
        },
        {
          Name: "L Long Long",
          Id: 3,
          Id2: 344444444444,
        },
        {
          Name: "Le Long Long",
          Id: 4,
          Id2: 4444444444,
        },
      ],
      titleOptions: [
        {
          Title: "Họ Tên",
          Width: 150,
        },
        {
          Title: "Id",
          Width: 50,
        },
        {
          Title: "Id2",
          Width: 50,
        },
      ],
      tabs: [
        "Liên hệ",
        "Điều khoản thanh toán",
        "Tài khoản ngân hàng",
        "Địa chỉ khác",
        "Ghi chú",
      ],
    };
  },
  methods: {
    handleTabs(index) {
      this.tabSelected = index;
    },
    addLineAddress() {
      this.addressCount++;
    },
    removeAllLineAddress() {
      this.addressCount = 0;
    },
    deleteCurrentLineAddress() {
      this.addressCount--;
    },
    addLineBankAccount() {
      this.bankAccountCount++;
    },
    removeAllLineBankAccount() {
      this.bankAccountCount = 0;
    },
    deleteCurrentLineBankAccount() {
      this.bankAccountCount--;
    },
  },
};
</script>

<style>
.option-supplier-box {
  font-size: 13px;
  margin-left: 10px;
  margin-top: 10px;
  display: flex;
  width: 180px;
  justify-content: space-around;
}
.is-customer {
  margin-left: 150px;
  align-items: center;
  display: flex;
  width: 120px;
  font-size: 13px;
  justify-content: space-between;
}
.row-input {
  min-height: 70px;
  width: 405px;
  /* background-color: red; */
  padding-bottom: 12px;
}
.tab-option {
  height: 25px;
  font-size: 13px;
  margin: 0 1px;
  border: 1px solid #c9ccd2;
  border-bottom: none;
  border-radius: 2px 2px 0 0;
  padding: 0 8px 0 8px;
  display: flex;
  align-items: center;
}
.tab-option:hover {
  cursor: pointer;
  color: #2ca01c;
}
.tab-selected {
  height: 31px;
  background-color: #cce4f9;
}
.note-tab {
  height: 215px;
  width: 833px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 6px;
}
.other-address-tab {
  display: flex;
  text-align: left;
}
.location {
  height: 100px;
  width: 425px;
  padding-right: 24px;
  padding-left: 8px;
  margin-top: 8px;
}
.delivery-address {
  width: 406px;
  margin-top: 8px;
}
.label-input {
  font-size: 12px;
  font-weight: 700;
  padding-bottom: 0px;
  color: #111;
}
.location-line {
  display: flex;
  justify-content: space-between;
}
.delivery-address-title {
  width: 98%;
  display: flex;
  border-bottom: 2px solid #d3d6db;
  padding-bottom: 1px;
}
.cover-checkbox-delivery {
  margin-left: 20px;
  align-items: center;
  display: flex;
  width: 190px;
  font-size: 13px;
  justify-content: space-between;
  margin-top: -6px;
}
.delivery-address-footer {
  display: flex;
}
.btn-tabs-options {
  background: #fff;
  border: 1px solid #8d9096;
  border-radius: 3px !important;
  padding: 2px 20px !important;
  margin-right: 10px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  margin-top: 8px;
}
.delivery-address-content {
  max-height: 150px;
  width: 405px;
  overflow: auto;
}
.delivery-address-line {
  display: flex;
  align-content: center;
  justify-content: center;
  width: 98%;
  height: 40px;
  background-color: #f4f5f8;
  border-bottom: 1px solid #d3d6db;
}
.delivery-address-line:hover {
  background-color: #f3f8f8;
}
.delivery-input {
  height: 100%;
  width: 350px;
  border-right: 1px dotted #d3d6db;
  display: flex;
  justify-content: center;
  align-items: center;
}
.delete-icon-box {
  height: 100%;
  width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.delete-icon {
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  background-position: -464px -312px;
  cursor: pointer;
  background-image: url("../../assets/img/Sprites.64af8f61.svg");
}
.bank-account {
  height: 200px;
  width: 810px;
  margin-top: 12px;
  margin-left: 10px;
}
.table-bank-account-box thead th {
  background-color: #eceef1;
  height: 34px;
  text-transform: uppercase;
  text-align: left;
  padding-left: 10px;
  font-size: 12px;
  border-left: 1px solid #c7c7c7;
  border-bottom: 2px solid #c7c7c7;
}
.table-bank-account-box tbody td {
  background-color: #f4f5f8 !important;
  height: 40px;
  border-bottom: 1px solid #c7c7c7 !important;
  border-right: 1px dotted #c7c7c7 !important;
}
.table-bank-account-box tbody td:last-child {
  border-right: none !important;
  padding-left: 12px;
}
.table-bank-account-box {
  max-height: 158px;
  overflow: auto;
}
.term-payment {
  padding: 8px;
}
.term-payment-line1 {
  display: flex;
  width: 590px;
  justify-content: space-between;
}
.term-payment-line2 {
  margin-top: 8px;
  display: flex;
  width: 390px;
  justify-content: space-between;
}
.contact {
  padding: 8px;
  display: flex;
}
.organization,
.personal {
  display: flex;
}
.left-contact {
  width: 420px;
  padding-right: 24px;
}
.right-contact {
  width: 398px;
}
.left-contact-organization {
  width: 420px;
  padding-right: 24px;
  /* display: flex; */
}
.right-contact-organization {
  width: 398px;
  /* display: flex; */
}
</style>
