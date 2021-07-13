<template>
  <div
    @keydown.esc.prevent.stop="closeForm" 
    @keydown.ctrl.83.prevent.stop.exact="btnSave" 
    @keydown.ctrl.shift.83.prevent.stop="btnSaveAndAdd"
    tabindex="0"
  >
    <supplier-info-box>
      <div class="option-supplier-box" slot="type-supplier">
        <input
          type="radio"
          name="type-supplier"
          value="0"
          v-model="supplier.supplier_type"
          :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
        />Tổ chức<br />
        <input
          type="radio"
          name="type-supplier"
          value="1"
          v-model="supplier.supplier_type"
          :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
        />Cá nhân<br />
      </div>
      <div class="is-customer" slot="is-customer">
        <input
          :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
          type="checkbox"
          v-model="supplier.is_customer"
        />Là khách hàng<br />
      </div>

      <div
        v-show="supplier.supplier_type == 0"
        slot="base-info"
        class="base-info"
      >
        <div class="left-base-info">
          <div class="row-input">
            <Input
              style="width:170px;padding-right:12px"
              inputName="Mã số thuế"
              lWidth="158"
              ref="taxCode"
              v-model="supplier.tax_code"
              :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
            />
            <Input
              inputName="Mã nhà cung cấp"
              :isRequired="true"
              lWidth="235"
              v-model="supplier.supplier_code"
              ref="supplierCode1"
              :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
            />
          </div>
          <div class="row-input">
            <Input
              inputName="Tên nhà cung cấp"
              :isRequired="true"
              lWidth="405"
              v-model="supplier.supplier_name"
              ref="supplierName"
              :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
            />
          </div>
          <TextArea
            textareaName="Địa chỉ"
            lWidth="405"
            lHeight="60"
            placeholder="VD: Số 82 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội"
            v-model="supplier.address"
            @keyup="handleChangeAddress"
            :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
          />
        </div>
        <div class="right-base-info">
          <div class="row-input">
            <Input
              style="width:170px;padding-right:12px"
              inputName="Điện thoại"
              lWidth="158"
              v-model="supplier.phone_number"
              :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
            />
            <Input
              inputName="Website"
              lWidth="235"
              v-model="supplier.website"
              :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
            />
          </div>
          <div class="row-input">
            <ComboboxMultiple
              :isDisabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
              :dataOptions="supplierGroup"
              :fieldDisplay="'code'"
              :fieldSearch="'name'"
              :titleOptions="titleSupplierGroup"
              comboboxName="Nhóm nhà cung cấp"
              lWidth="405"
              :value="supplierGroupSelected"
              @handleChangeSelect="handleChangeSupplierGroup"
            />
          </div>
          <div class="row-input" style="margin-top:2px">
            <Combobox
              :isDisabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
              :isShowAddIcon="true"
              :isMultiple="true"
              :titleOptions="titlePuchasingEmployee"
              :dataOptions="puchasingEmployee"
              :fieldDisplay="'name'"
              :fieldSearch="'name'"
              :fieldValue="'name'"
              comboboxName="Nhân viên mua hàng"
              lWidth="405"
              :value="supplier.puchasing_employee"
              @handleChangeSelect="handleChangePuchasingEmployee"
            />
          </div>
        </div>
      </div>
      <div
        v-show="supplier.supplier_type == 1"
        slot="base-info"
        class="base-info"
      >
        <div class="left-base-info">
          <div class="row-input">
            <Input
              style="width:247px;padding-right:12px"
              inputName="Mã nhà cung cấp"
              :isRequired="true"
              lWidth="235"
              v-model="supplier.supplier_code"
              ref="supplierCode2"
              :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
            />
            <Input
              inputName="Mã số thuế"
              lWidth="158"
              v-model="supplier.tax_code"
              :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
            />
          </div>
          <div
            class="row-input"
            style="display:flex;justify-content:space-between;align-items: flex-end;"
          >
            <Combobox
              comboboxName="Tên nhà cung cấp"
              :isMultiple="true"
              :titleOptions="titleVocative"
              :dataOptions="vocative"
              :fieldDisplay="'name'"
              :fieldSearch="'name'"
              :fieldValue="'name'"
              lWidth="125"
              :value="supplier.vocative"
              @handleChangeSelect="handleChangeVocative"
              :isDisabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
            />
            <Input
              :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
              lWidth="272"
              placeholder="Họ và tên"
              v-model="supplier.supplier_name"
            />
          </div>
          <TextArea
            :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
            textareaName="Địa chỉ"
            lWidth="405"
            lHeight="60"
            placeholder="VD: Số 82 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội"
            v-model="supplier.address"
          />
        </div>
        <div class="right-base-info">
          <div class="row-input">
            <ComboboxMultiple
              :isDisabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
              :dataOptions="supplierGroup"
              :fieldDisplay="'code'"
              :fieldSearch="'name'"
              :titleOptions="titleSupplierGroup"
              comboboxName="Nhóm nhà cung cấp"
              lWidth="405"
              :value="supplierGroupSelected"
              @handleChangeSelect="handleChangeSupplierGroup"
            />
          </div>
          <div class="row-input" style="margin-top:2px">
            <Combobox
              :isDisabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
              :isShowAddIcon="true"
              :isMultiple="true"
              :titleOptions="titlePuchasingEmployee"
              :dataOptions="puchasingEmployee"
              :fieldDisplay="'name'"
              :fieldSearch="'name'"
              :fieldValue="'name'"
              comboboxName="Nhân viên mua hàng"
              lWidth="405"
              :value="supplier.puchasing_employee"
              @handleChangeSelect="handleChangePuchasingEmployee"
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
          <div class="organization" v-show="supplier.supplier_type == 0">
            <div class="left-contact-organization">
              <div class="label-input" style="text-align:left">
                Người liên hệ
              </div>
              <div class="location-line">
                <Combobox
                  :isDisabled="
                    supplierFormMode == SupplierConstant.IS_READ_ONLY
                  "
                  :isMultiple="true"
                  :titleOptions="titleVocative"
                  :dataOptions="vocative"
                  :fieldDisplay="'name'"
                  :fieldSearch="'name'"
                  :fieldValue="'name'"
                  lWidth="125"
                  :value="supplier.vocative"
                  @handleChangeSelect="handleChangeVocative"
                />
                <Input
                  :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
                  style="margin-top:-2px"
                  lWidth="260"
                  placeholder="Họ và tên"
                  v-model="supplier.contact_name"
                />
              </div>
              <div class="location-line">
                <Input
                  :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
                  style="margin-top:4px"
                  lWidth="396"
                  placeholder="Email"
                  v-model="supplier.contact_email"
                />
              </div>
              <div class="location-line">
                <Input
                  :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
                  style="margin-top:4px"
                  lWidth="190"
                  placeholder="Số điện thoại"
                  v-model="supplier.contact_phone_number"
                />
              </div>
              <div v-show="supplier.is_customer">
                <div class="label-input" style="text-align:left;margin-top:6px">
                  Đại diện theo PL
                </div>
                <div class="location-line">
                  <Input
                    :disabled="
                      supplierFormMode == SupplierConstant.IS_READ_ONLY
                    "
                    lWidth="396"
                    placeholder="Đại diện theo PL"
                    v-model="supplier.legal_representative"
                  />
                </div>
              </div>
            </div>
            <div class="right-contact-organization">
              <div v-show="!supplier.is_customer">
                <div class="label-input" style="text-align:left">
                  Đại diện theo PL
                </div>
                <div class="location-line">
                  <Input
                    :disabled="
                      supplierFormMode == SupplierConstant.IS_READ_ONLY
                    "
                    style="margin-top:-2px"
                    lWidth="396"
                    placeholder="Đại diện theo PL"
                    v-model="supplier.legal_representative"
                  />
                </div>
              </div>
              <div v-show="supplier.is_customer">
                <div class="label-input" style="text-align:left">
                  Người nhận hoá đơn điện tử
                </div>
                <div class="location-line">
                  <Input
                    :disabled="
                      supplierFormMode == SupplierConstant.IS_READ_ONLY
                    "
                    style="margin-top:-2px"
                    lWidth="396"
                    placeholder="Người nhận hoá đơn điện tử"
                    v-model="supplier.invoice_recipient_name"
                  />
                </div>
                <div class="location-line">
                  <Input
                    :disabled="
                      supplierFormMode == SupplierConstant.IS_READ_ONLY
                    "
                    style="margin-top:4px"
                    lWidth="396"
                    placeholder="Email, ngăn cách nhiều email bởi dấu chấm phẩy '';''"
                    v-model="supplier.invoice_recipient_email"
                  />
                </div>
                <div class="location-line">
                  <Input
                    :disabled="
                      supplierFormMode == SupplierConstant.IS_READ_ONLY
                    "
                    style="margin-top:4px"
                    lWidth="190"
                    placeholder="Số điện thoại"
                    v-model="supplier.invoice_recipient_phone"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="personal" v-show="supplier.supplier_type == 1">
            <div class="left-contact">
              <Input
                :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
                inputName="Thông tin liên hệ"
                lWidth="396"
                placeholder="Email"
                v-model="supplier.contact_email"
              />
              <Input
                :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
                style="display:block;margin-top:4px;"
                lWidth="190"
                placeholder="Điện thoại di động"
                v-model="supplier.contact_phone_number"
              />
              <Input
                :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
                style="display:block;margin-top:4px;"
                lWidth="190"
                placeholder="Điện thoại cố định"
                v-model="supplier.contact_telephone"
              />
              <Input
                :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
                inputName="Đại diện theo PL"
                lWidth="396"
                placeholder="Đại diện theo PL"
              />
            </div>
            <div class="right-contact">
              <Input
                :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
                style="display:block"
                inputName="Thông tin CMND/Thẻ căn cước"
                lWidth="190"
                placeholder="Số CMND/Thẻ căn cước"
                v-model="supplier.identify_number"
              />
              <!-- <Input
                style="display:block;margin-top:4px;"
                lWidth=190
                placeholder="Ngày cấp"
              /> -->
              <a-date-picker
                :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
                placeholder="Ngày cấp"
                style="margin-top:4px;width:190px;display:flex"
                :format="dateFormat"
                v-model="supplier.identify_date"
              />
              <Input
                :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
                style="display:block;margin-top:4px;"
                lWidth="396"
                placeholder="Nơi cấp"
                v-model="supplier.identify_place"
              />
            </div>
          </div>
        </div>
        <div v-show="tabSelected == 1" class="term-payment">
          <div class="term-payment-line1">
            <Combobox
              :isDisabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
              comboboxName="Điều khoản thanh toán"
              :titleOptions="titleAccountPay"
              :dataOptions="termOfPayment"
              :fieldDisplay="'name'"
              :fieldSearch="'name'"
              :fieldValue="'name'"
              :isMultiple="false"
              :isShowAddIcon="true"
              lWidth="190"
              :value="supplier.term_of_payment"
              @handleChangeSelect="handleChangeTermOfPayment"
            />
            <Input
              :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
              maxlength="14"
              inputName="Số ngày nợ cước"
              :isMultiple="true"
              lWidth="190"
              v-model="numberDayOwedHandle"
            />
            <Input
              :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
              maxlength="14"
              inputName="Số nợ tối đa"
              :isMultiple="true"
              lWidth="190"
              v-model="maxAmountDebtHandle"
            />
          </div>
          <div class="term-payment-line2">
            <Combobox
              :isDisabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
              v-show="supplier.is_customer"
              comboboxName="Tài khoản công nợ phải thu"
              lWidth="190"
              :isMultiple="true"
              :titleOptions="titleAccountReceive"
              :dataOptions="accountReceive"
              :fieldDisplay="'code'"
              :fieldSearch="'code'"
              :fieldValue="'code'"
              :value="supplier.account_receive"
              @handleChangeSelect="handleChangeAccountReceive"
            />
            <Combobox
              :isDisabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
              comboboxName="Tài khoản công nợ phải trả"
              lWidth="190"
              :isMultiple="true"
              :titleOptions="titleAccountPay"
              :dataOptions="accountPay"
              :fieldDisplay="'code'"
              :fieldSearch="'code'"
              :fieldValue="'code'"
              :value="supplier.account_pay"
              @handleChangeSelect="handleChangeAccountPay"
            />
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
                <tr v-for="(account, index) in bankAccountHandle" :key="index">
                  <td>
                    <input
                      :disabled="
                        supplierFormMode == SupplierConstant.IS_READ_ONLY
                      "
                      type="text"
                      class="input"
                      style="width:130px"
                      v-model="account.account_number"
                    />
                  </td>
                  <td>
                    <input
                      :disabled="
                        supplierFormMode == SupplierConstant.IS_READ_ONLY
                      "
                      type="text"
                      class="input"
                      style="width:180px"
                      v-model="account.bank_name"
                    />
                  </td>
                  <td>
                    <input
                      :disabled="
                        supplierFormMode == SupplierConstant.IS_READ_ONLY
                      "
                      type="text"
                      class="input"
                      style="width:160px"
                      v-model="account.bank_branch"
                    />
                  </td>
                  <td>
                    <input
                      :disabled="
                        supplierFormMode == SupplierConstant.IS_READ_ONLY
                      "
                      type="text"
                      class="input"
                      style="width:215px"
                      v-model="account.bank_city"
                    />
                  </td>
                  <td>
                    <div
                      class="delete-icon"
                      @click="deleteCurrentLineBankAccount(index)"
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
              <Combobox
                :isDisabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
                :isMultiple="true"
                :titleOptions="titleCountry"
                :dataOptions="country"
                :fieldDisplay="'name'"
                :fieldSearch="'name'"
                :fieldValue="'name'"
                lWidth="190"
                :value="supplier.country"
                @handleChangeSelect="handleChangeCountry"
              />
              <Combobox
                :isDisabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
                :isMultiple="true"
                :titleOptions="titleCity"
                :dataOptions="city"
                :fieldDisplay="'name'"
                :fieldSearch="'name'"
                :fieldValue="'name'"
                lWidth="190"
                :value="supplier.city"
                @handleChangeSelect="handleChangeCity"
              />
            </div>
            <div class="location-line" style="margin-top:10px">
              <Combobox
                :isDisabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
                :isMultiple="true"
                :titleOptions="titleDistrict"
                :dataOptions="district"
                :fieldDisplay="'name'"
                :fieldSearch="'name'"
                :fieldValue="'name'"
                lWidth="190"
                :value="supplier.district"
                @handleChangeSelect="handleChangeDistrict"
              />
              <Combobox
                :isDisabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
                :isMultiple="true"
                :titleOptions="titleCommune"
                :dataOptions="commune"
                :fieldDisplay="'name'"
                :fieldSearch="'name'"
                :fieldValue="'name'"
                lWidth="190"
                :value="supplier.commune"
                @handleChangeSelect="handleChangeCommune"
              />
            </div>
          </div>
          <div class="delivery-address">
            <div class="delivery-address-title">
              <div class="label-input">
                Địa chỉ giao hàng
              </div>
              <div class="cover-checkbox-delivery">
                <input
                  :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
                  @click="handleDeliveryAddress"
                  type="checkbox"
                  v-model="isSameSupplierAddress"
                />Giống địa chỉ nhà cung cấp<br />
              </div>
            </div>
            <div class="delivery-address-content">
              <div
                class="delivery-address-line"
                v-for="(delivery_address, index) in deliveryAddressHandle"
                :key="index"
              >
                <div class="delivery-input">
                  <Input
                    :disabled="
                      supplierFormMode == SupplierConstant.IS_READ_ONLY
                    "
                    style="margin-top:-5px"
                    lWidth="325"
                    v-model="delivery_address.address"
                  />
                </div>
                <div class="delete-icon-box">
                  <div
                    class="delete-icon"
                    @click="deleteCurrentLineAddress(index)"
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
          <TextArea
            v-model="supplier.note"
            lWidth="815"
            lHeight="190"
            :disabled="supplierFormMode == SupplierConstant.IS_READ_ONLY"
          />
        </div>
      </div>
      <div slot="footer-dialog-box" class="footer-dialog-box">
        <div>
          <div class="white-button" @click="closeForm">Huỷ</div>
        </div>
        <div class="right-bottom-button">
          <div
            v-if="supplierFormMode != SupplierConstant.IS_READ_ONLY"
            class="white-button"
            title="Cất (Ctrl + S)"
            @click="btnSave"
          >
            Cất
          </div>
          <div
            v-if="supplierFormMode != SupplierConstant.IS_READ_ONLY"
            class="green-button"
            title="Cất và thêm (Ctrl + Shift + S)"
            @click="btnSaveAndAdd"
          >
            Cất và Thêm
          </div>

          <div
            v-if="supplierFormMode == SupplierConstant.IS_READ_ONLY"
            class="white-button"
            @click="btnEdit"
          >
            Sửa
          </div>
          <!-- <div
            v-if="supplierFormMode == SupplierConstant.IS_READ_ONLY"
            class="green-button"
            @click="closeForm"
          >
            Đóng
          </div> -->
        </div>
      </div>
    </supplier-info-box>
    <AlertDialog
      v-if="isShowDialogCodeExist"
      :alertFormMode="AlertDialogConstant.DELETE_FAILURE"
      :messageOfDialog="messageOfDialog"
      @closeAlertDialog="closeAlertDialog"
    />
  </div>
</template>

<script>
import SupplierInfoBox from "./SupplierInfoBox";
import Input from "../share/Input";
import AlertDialog from "./AlertDialog.vue";
import ComboboxMultiple from "../share/ComboboxMultiple";
import Combobox from "../share/Combobox";
import TextArea from "../share/TextArea";
import moment from "moment";
import { mapActions, mapState } from "vuex";
import {
  SupplierConstant,
  InitBankAccount,
  InitDeliveryAddress,
  SupplierGroup,
  PuchasingEmployee,
  Vocative,
  TermOfPayment,
  AccountReceive,
  AccountPay,
  Country,
  City,
  District,
  Commune,
  InitSupplier,
  AlertDialogConstant,
  titleSupplierGroup,
  titlePuchasingEmployee,
  titleVocative,
  titleCountry,
  titleCity,
  titleDistrict,
  titleCommune,
  titleAccountReceive,
  titleAccountPay,
  tabs,
  NotifiactionConstant
} from "../../configs/constants";
export default {
  components: {
    SupplierInfoBox,
    Input,
    ComboboxMultiple,
    Combobox,
    TextArea,
    AlertDialog,
  },
  created() {
    // block ctrl S de trinh duyet nhan lenh ctrl S cua dev
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
    //focus ô đầu
    if (this.supplier.supplier_type == 1) {
      setTimeout(() => this.$refs.supplierCode2.focus(), 100);
    } else {
      setTimeout(() => this.$refs.taxCode.focus(), 100);
    }
    //Khởi tạo giá trị cho mảng tài khoản ngân hàng
    this.bankAccountHandle = [...JSON.parse(this.supplier.bank_account)];
    //Khởi tạo giá trị cho địa chỉ nhận hàng
    this.deliveryAddressHandle = [
      ...JSON.parse(this.supplier.delivery_address),
    ];
    //Khởi tạo giá trị cho các nhóm nhà cung cấp đc trọn
    if (this.supplier.supplier_group != null) {
      JSON.parse(this.supplier.supplier_group).forEach((e) => {
        this.supplierGroupSelected.push(e.code);
      });
    }
  },
  computed: {
    ...mapState({
      supplier: (state) => state.supplier.supplier,
      supplierFormMode: (state) => state.supplier.supplierFormMode,
    }),
    //Format số ngày nợ cước
    numberDayOwedHandle: {
      set(val) {
        if(isNaN(val)) {
          this.supplier.number_day_owed = 0
        }else
        this.supplier.number_day_owed = val.replaceAll(".", "");
      },
      get() {
        return new Intl.NumberFormat()
          .format(this.supplier.number_day_owed)
          .replaceAll(",", ".");
      },
    },
    //format số nợ tối đa
    maxAmountDebtHandle: {
      set(val) {
        if(isNaN(val)){
          this.supplier.max_amount_debt = 0
        }
        this.supplier.max_amount_debt = val.replaceAll(".", "");
      },
      get() {
        return new Intl.NumberFormat()
          .format(this.supplier.max_amount_debt)
          .replaceAll(",", ".");
      },
    },
  },
  data() {
    return {
      SupplierConstant,//Hằng số của form
      bankAccountHandle: [],//Sử lý tài khoản ngân hàng
      deliveryAddressHandle: [],//Sử lý địa chỉ giao hàng
      isSameSupplierAddress: false,//Giống địa chỉ nhà cung cấp không
      dateFormat: "DD/MM/YYYY",//Format ngày
      tabSelected: 0,//Tab đang lựa chọn
      isShowDialogCodeExist: false,//Show dialog code exist
      messageOfDialog: "",//Thông báo khi dialog show ra
      supplierGroupSelected: [],//Sử lý nhóm nhà cung cấp được chọn
      AlertDialogConstant,//Hằng số của dialog
      supplierGroup: [...SupplierGroup],//Dữ liệu của nhóm NCC
      titleSupplierGroup,//Title Nhóm NCC
      puchasingEmployee: [...PuchasingEmployee],//Dữ liệu nhân viên mua hàng
      titlePuchasingEmployee,// Title nv mua hàng
      vocative: [...Vocative],//Xưng hô
      titleVocative,//Title xưng hô
      country: [...Country],//Quốc gia
      titleCountry,
      city: [...City],//Thành phố
      titleCity,
      district: [...District],//Huyện
      titleDistrict,
      commune: [...Commune],//Xã
      titleCommune,
      termOfPayment: [...TermOfPayment],//Điều khoản than toán
      accountReceive: [...AccountReceive],//Tài khoản công nợ
      titleAccountReceive,
      accountPay: [...AccountPay],//Tài khoản thanh toán
      titleAccountPay,
      tabs,//Các tab trong form Info
    };
  },
  methods: {
    ...mapActions("supplier", [
      "closeForm",
      "postSupplier",
      "putSupplier",
      "showFormAdd",
      "changeFormMode",
    ]),
    moment,
    /**
     * Sự kiện Thay đổi nhân viên mua hàng
     * CreatedBy KDLong 01/07/2021
     */
    handleChangePuchasingEmployee(value) {
      this.supplier.puchasing_employee = value;
    },
    /**
     * Sự thay đổi xưng hô
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeVocative(value) {
      this.supplier.vocative = value;
    },
    /**
     * Sự thay đổi điều khoản thanh toán
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeTermOfPayment(value) {
      this.supplier.term_of_payment = value;
    },
    /**
     * Sự thay đổi tài khoản công nợ phải thu
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeAccountReceive(value) {
      this.supplier.account_receive = value;
    },
    /**
     * Sự thay đổi tài khoản công nợ phải trả
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeAccountPay(value) {
      this.supplier.account_pay = value;
    },
    /**
     * Sự kiện thay đổi Quốc gia
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeCountry(value) {
      this.supplier.country = value;
    },
    /**
     * Sự kiện thay đổi Thành phố
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeCity(value) {
      this.supplier.city = value;
    },
    /**
     * Sự kiện thay đổi Huyện
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeDistrict(value) {
      this.supplier.district = value;
    },
    /**
     * Sự kiện thay đổi Xã
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeCommune(value) {
      this.supplier.commune = value;
    },
    /**
     * Sự kiện thay đổi tab
     * CreatedBy KDLong 01/07/2021
     */
    handleTabs(index) {
      this.tabSelected = index;
    },
    /**
     * Sự kiện thêm 1 dòng địa chỉ
     * CreatedBy KDLong 01/07/2021
     */
    addLineAddress() {
      this.deliveryAddressHandle.push({ ...InitDeliveryAddress });
    },
    /**
     * Sự kiện xoá tất cả dòng
     * CreatedBy KDLong 01/07/2021
     */
    removeAllLineAddress() {
      this.deliveryAddressHandle = [{ ...InitDeliveryAddress }];
    },
    /**
     * Sự kiện xoá dòng hiện tại
     * CreatedBy KDLong 01/07/2021
     */
    deleteCurrentLineAddress(index) {
      if(this.deliveryAddressHandle !=1)
      this.deliveryAddressHandle = this.deliveryAddressHandle.filter(
        (item, i) => i != index
      );
    },
    /**
     * Sự kiện thêm dòng tàik khoản ngân hàng
     * CreatedBy KDLong 01/07/2021
     */
    addLineBankAccount() {
      this.bankAccountHandle.push({ ...InitBankAccount });
    },
    /**
     * Sự kiện xoá tất cả dòng
     * CreatedBy KDLong 01/07/2021
     */
    removeAllLineBankAccount() {
      this.bankAccountHandle = [{ ...InitBankAccount }];
    },
    /**
     * Sự kiện xoá dòng hiện tại
     * CreatedBy KDLong 01/07/2021
     */
    deleteCurrentLineBankAccount(index) {
      if(this.bankAccountHandle.length != 1)
      this.bankAccountHandle = this.bankAccountHandle.filter(
        (item, i) => i != index
      );
    },
    /**
     * Sự kiện thay đổi form mode readonly => edit
     * CreatedBy KDLong 01/07/2021
     */
    btnEdit() {
      this.changeFormMode(() => {
        if (this.supplier.supplier_type == 1) {
          this.$nextTick(function() {
            this.$refs.supplierCode2.focus();
          });
        } else {
          this.$nextTick(function() {
            this.$refs.supplierCode1.focus();
          });
        }
      });
    },
    /**
     * Sự kiện cất
     * CreatedBy KDLong 01/07/2021
     */
    btnSave() {
      if (
        this.supplier.supplier_code == null ||
        this.supplier.supplier_name == null ||
        this.supplier.supplier_code == "" ||
        this.supplier.supplier_name == ""
      ) {
        this.validateNotEmpty();
      } else {
        this.removeEmptyData();
        if (this.supplierFormMode == SupplierConstant.IS_ADD) {
          this.postSupplier({
            callbackSuccess: () => {
              this.showNotification(NotifiactionConstant.ADD_SUCCESS, NotifiactionConstant.SUCCESS);
            },
            callbackFail: () => {
              // this.showNotification(
              //   NotifiactionConstant.SUPPLIER_CODE_EXIST,
              //   NotifiactionConstant.ERROR
              // );
              this.showDialogCodeExist();
            },
          });
        } else {
          this.putSupplier({
            callbackSuccess: () => {
              this.showNotification(NotifiactionConstant.EDIT_SUCCESS, NotifiactionConstant.SUCCESS);
            },
            callbackFail: () => {
              // this.showNotification(
              //   NotifiactionConstant.SUPPLIER_CODE_EXIST,
              //   NotifiactionConstant.ERROR
              // );
              this.showDialogCodeExist();
            },
          });
        }
      }
    },
    /**
     * Sự kiện cất và thêm
     * CreatedBy KDLong 01/07/2021
     */
    btnSaveAndAdd() {
      if (
        this.supplier.supplier_code == null ||
        this.supplier.supplier_name == null ||
        this.supplier.supplier_code == "" ||
        this.supplier.supplier_name == ""
      ) {
        this.validateNotEmpty();
      } else {
        this.removeEmptyData();
        if (this.supplierFormMode == SupplierConstant.IS_ADD) {
          this.postSupplier({
            callbackSuccess: () => {
              this.showNotification(NotifiactionConstant.ADD_SUCCESS, NotifiactionConstant.SUCCESS);
              this.initData();
            },
            callbackFail: () => {
              this.showNotification(
                NotifiactionConstant.SUPPLIER_CODE_EXIST,
                NotifiactionConstant.ERROR
              );
            },
          });
        } else {
          this.putSupplier({
            callbackSuccess: () => {
              this.showNotification(NotifiactionConstant.EDIT_SUCCESS, NotifiactionConstant.SUCCESS);
              //Khởi tạo lại dữ liệu ban đầu cho các trường json
              this.initData();
            },
            callbackFail: () => {
              this.showNotification(
                NotifiactionConstant.SUPPLIER_CODE_EXIST,
                NotifiactionConstant.ERROR
              );
            },
          });
        }
      }
    },
    /**
     * validate k để trống
     * CreatedBy KDLong 01/07/2021
     */
    validateNotEmpty() {
      if (
        this.supplier.supplier_code == null ||
        this.supplier.supplier_code == ""
      ) {
        this.$refs.supplierCode1.setValidateState(false);
        this.$refs.supplierCode2.setValidateState(false);
      }
      if (
        this.supplier.supplier_name == null ||
        this.supplier.supplier_name == ""
      ) {
        this.$refs.supplierName.setValidateState(false);
      }

      if (
        this.supplier.supplier_code == null ||
        this.supplier.supplier_code == ""
      ) {
        this.showNotification(NotifiactionConstant.SUPPLIER_CODE_NOT_EMPTY, NotifiactionConstant.ERROR);
        return;
      }
      if (
        this.supplier.supplier_name == null ||
        this.supplier.supplier_name == ""
      ) {
        this.showNotification(NotifiactionConstant.SUPPLIER_NAME_NOT_EMPTY, NotifiactionConstant.ERROR);
        return;
      }
    },
    //Click vào giống địa chỉ nhà cung cấp
    handleDeliveryAddress() {
      if (this.isSameSupplierAddress == false) {
        this.deliveryAddressHandle = [{ address: this.supplier.address }];
      }
    },
    //Thay đổi địa chỉ và cập nhật địa chỉ giao hàng
    handleChangeAddress(e) {
      if (
        this.isSameSupplierAddress == true &&
        this.deliveryAddressHandle.length > 0
      ) {
        this.deliveryAddressHandle = [{ address: e.target.value }];
      }
    },
    /**
     * Sự kiện thay đổi nhóm nhà cung cấp
     * CreatedBy KDLong 01/07/2021
     */
    handleChangeSupplierGroup(value) {
      this.supplierGroupSelected = [...value];
      let arrSupplierGroupSelected = this.supplierGroup.filter((e) =>
        value.includes(e.code)
      );
      this.supplier.supplier_group = JSON.stringify(arrSupplierGroupSelected);
    },
    /**
     * Lọc bỏ dữ liệu rỗng
     * CreatedBy KDLong 01/07/2021
     */
    removeEmptyData() {
      //Lọc bỏ các tài khoản ngân hàng rỗng trước khi cất
      this.bankAccountHandle = this.bankAccountHandle.filter(
        (item) => JSON.stringify(item) != JSON.stringify(InitBankAccount)
      );
      if (this.bankAccountHandle.length == 0) {
        this.bankAccountHandle = [...JSON.parse(InitSupplier.bank_account)];
      }
      this.supplier.bank_account = JSON.stringify(this.bankAccountHandle);
      //Lọc các địa chỉ giao hàng rỗng trc khi cất
      this.deliveryAddressHandle = this.deliveryAddressHandle.filter(
        (item) => JSON.stringify(item) != JSON.stringify(InitDeliveryAddress)
      );
      if (this.deliveryAddressHandle.length == 0) {
        this.deliveryAddressHandle = [
          ...JSON.parse(InitSupplier.delivery_address),
        ];
      }
      this.supplier.delivery_address = JSON.stringify(
        this.deliveryAddressHandle
      );
    },
    /**
     * Khởi tạo data cho sự kiện cất và thêm
     * CreatedBy KDLong 01/07/2021
     */
    initData() {
      this.showFormAdd();
      this.$nextTick(function() {
        this.$refs.taxCode.focus();
      });
      this.bankAccountHandle = [...JSON.parse(InitSupplier.bank_account)];
      this.deliveryAddressHandle = [
        ...JSON.parse(InitSupplier.delivery_address),
      ];
      this.supplierGroupSelected = [];
    },
    /**
     * Sự kiện show form trùng mã
     * CreatedBy KDLong 01/07/2021
     */
    showDialogCodeExist() {
      this.isShowDialogCodeExist = true;
      this.messageOfDialog =
        SupplierConstant.MESS_FRONT +
        this.supplier.supplier_code +
        SupplierConstant.MESS_BACK;
    },
    /**
     * Sự kiện đóng form trùng mã
     * CreatedBy KDLong 01/07/2021
     */
    closeAlertDialog() {
      this.isShowDialogCodeExist = false;
    },
    /**
     * Show thông báo
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
.term-payment-line1 .input {
  padding-right: 10px !important;
  text-align: right;
}
</style>
