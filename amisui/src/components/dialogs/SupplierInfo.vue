<template>
  <div>
    <supplier-info-box>
      <div class="option-supplier-box" slot="type-supplier">
        <input
          type="radio"
          name="type-supplier"
          value="0"
          v-model="supplier.supplier_type"
        />Tổ chức<br />
        <input
          type="radio"
          name="type-supplier"
          value="1"
          v-model="supplier.supplier_type"
        />Cá nhân<br />
      </div>
      <div class="is-customer" slot="is-customer">
        <input type="checkbox" v-model="supplier.is_customer" />Là khách hàng<br />
      </div>

      <div v-show="supplier.supplier_type == 0" slot="base-info" class="base-info">
        <div class="left-base-info">
          <div class="row-input">
            <Input
              style="width:170px;padding-right:12px"
              inputName="Mã số thuế"
              lWidth=158
              v-model="supplier.tax_code"
            />
            <Input 
              inputName="Mã nhà cung cấp" 
              isRequired=true 
              lWidth=235 
              v-model="supplier.supplier_code"
            />
          </div>
          <div class="row-input">
            <Input
              inputName="Tên nhà cung cấp"
              isRequired=true
              lWidth=405
              v-model="supplier.supplier_name"
            />
          </div>
          <TextArea
            textareaName="Địa chỉ"
            lWidth=405
            lHeight=60
            placeholder="VD: Số 82 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội"
            v-model="supplier.address"
            @keyup="handleChangeAddress"
          />
        </div>
        <div class="right-base-info">
          <div class="row-input">
            <Input
              style="width:170px;padding-right:12px"
              inputName="Điện thoại"
              lWidth=158
              v-model="supplier.phone_number"
            />
            <Input 
              inputName="Website" 
              lWidth=235 
              v-model="supplier.website"
            />
          </div>
          <div class="row-input">
            <ComboboxMultiple
              :dataOptions="dataOptions"
              :fieldDisplay="'Name'"
              :fieldSearch="'Name'"
              :titleOptions="titleOptions"
              comboboxName="Nhóm nhà cung cấp"
              lWidth=405
            />
          </div>
          <div class="row-input" style="margin-top:2px">
            <Combobox
              isShowAddIcon=true
              :isMultiple=true
              comboboxName="Nhân viên mua hàng"
              lWidth=405
            />
          </div>
        </div>
      </div>
      <div v-show="supplier.supplier_type == 1" slot="base-info" class="base-info">
        <div class="left-base-info">
          <div class="row-input">
            <Input
              style="width:247px;padding-right:12px"
              inputName="Mã nhà cung cấp"
              isRequired=true
              lWidth=235
              v-model="supplier.supplier_code"
            />
            <Input 
              inputName="Mã số thuế" 
              lWidth=158
              v-model="supplier.tax_code"
            />
          </div>
          <div
            class="row-input"
            style="display:flex;justify-content:space-between;align-items: flex-end;"
          >
            <Combobox
              comboboxName="Tên nhà cung cấp"
              lWidth=120
              placeHolder="Xưng hô"
            />
            <Input 
              lWidth=272 
              placeholder="Họ và tên" 
              v-model="supplier.supplier_name"
            />
          </div>
          <TextArea
            textareaName="Địa chỉ"
            lWidth=405
            lHeight=60
            placeholder="VD: Số 82 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội"
            v-model="supplier.address"
          />
        </div>
        <div class="right-base-info">
          <div class="row-input">
            <ComboboxMultiple
              :dataOptions="dataOptions"
              :fieldDisplay="'Name'"
              :fieldSearch="'Name'"
              :titleOptions="titleOptions"
              comboboxName="Nhóm nhà cung cấp"
              lWidth=405
            />
          </div>
          <div class="row-input" style="margin-top:2px">
            <Combobox
              isShowAddIcon=true
              :isMultiple=true
              comboboxName="Nhân viên mua hàng"
              lWidth=405
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
                  placeHolder="Xưng hô" 
                  lWidth=125 
                />
                <Input
                  style="margin-top:-2px"
                  lWidth=260
                  placeholder="Họ và tên"
                  v-model="supplier.contact_name"
                />
              </div>
              <div class="location-line">
                <Input
                  style="margin-top:4px"
                  lWidth=396
                  placeholder="Email"
                  v-model="supplier.contact_email"
                />
              </div>
              <div class="location-line">
                <Input
                  style="margin-top:4px"
                  lWidth=190
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
                    lWidth=396 
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
                    style="margin-top:-2px"
                    lWidth=396
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
                    style="margin-top:-2px"
                    lWidth=396
                    placeholder="Người nhận hoá đơn điện tử"
                    v-model="supplier.invoice_recipient_name"
                  />
                </div>
                <div class="location-line">
                <Input
                  style="margin-top:4px"
                  lWidth=396
                  placeholder="Email, ngăn cách nhiều email bởi dấu chấm phẩy '';''"
                  v-model="supplier.invoice_recipient_email"
                />
              </div>
              <div class="location-line">
                <Input
                  style="margin-top:4px"
                  lWidth=190
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
                inputName="Thông tin liên hệ"
                lWidth=396
                placeholder="Email"
                v-model="supplier.contact_email"
              />
              <Input
                style="display:block;margin-top:4px;"
                lWidth=190
                placeholder="Điện thoại di động"
                v-model="supplier.contact_phone_number"
              />
              <Input
                style="display:block;margin-top:4px;"
                lWidth=190
                placeholder="Điện thoại cố định"
                v-model="supplier.contact_telephone"
              />
              <Input
                inputName="Đại diện theo PL"
                lWidth=396
                placeholder="Đại diện theo PL"
              />
            </div>
            <div class="right-contact">
              <Input
                style="display:block"
                inputName="Thông tin CMND/Thẻ căn cước"
                lWidth=190
                placeholder="Số CMND/Thẻ căn cước"
                v-model="supplier.identify_number"
              />
              <!-- <Input
                style="display:block;margin-top:4px;"
                lWidth=190
                placeholder="Ngày cấp"
              /> -->
              <a-date-picker 
                placeholder="Ngày cấp"
                style="margin-top:4px;width:190px;display:flex" 
                :format="dateFormat" 
                v-model="supplier.identify_date"
                />
              <Input
                style="display:block;margin-top:4px;"
                lWidth=396
                placeholder="Nơi cấp"
                v-model="supplier.identify_place"
              />
            </div>
          </div>
        </div>
        <div v-show="tabSelected == 1" class="term-payment">
          <div class="term-payment-line1">
            <Combobox
              comboboxName="Điều khoản thanh toán"
              :isMultiple=true
              lWidth=190
            />
            <Input 
              inputName="Số ngày nợ cước" 
              :isMultiple=true
              lWidth=190 
              v-model="supplier.number_day_owed"  
            />
            <Input 
              inputName="Số nợ tối đa" 
              :isMultiple=true
              lWidth=190 
              v-model="supplier.max_amount_debt"
            />
          </div>
          <div class="term-payment-line2">
            <Combobox
              v-show="supplier.is_customer"
              comboboxName="Tài khoản công nợ phải thu"
              lWidth=190
            />
            <Combobox 
              comboboxName="Tài khoản công nợ phải trả" 
              lWidth=190 
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
                <tr 
                  v-for="(account,index) in bankAccountHandle" 
                  :key="index"
                >
                  <td>
                    <input 
                      type="text" 
                      class="input" 
                      style="width:130px" 
                      v-model="account.account_number"
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      class="input" 
                      style="width:180px" 
                      v-model="account.bank_name"
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      class="input" 
                      style="width:160px" 
                      v-model="account.bank_branch"
                    />
                  </td>
                  <td>
                    <input 
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
              <Combobox lWidth=190 />
              <Combobox placeHolder="Tỉnh/Thành phố" lWidth=190 />
            </div>
            <div class="location-line" style="margin-top:10px">
              <Combobox placeHolder="Quận/Huyện" lWidth=190 />
              <Combobox placeHolder="Xã/Phường" lWidth=190 />
            </div>
          </div>
          <div class="delivery-address">
            <div class="delivery-address-title">
              <div class="label-input">
                Địa chỉ giao hàng
              </div>
              <div class="cover-checkbox-delivery">
                <input 
                  @click="handleDeliveryAddress"
                  type="checkbox"
                  v-model="isSameSupplierAddress" 
                />Giống địa chỉ nhà cung cấp<br />
              </div>
            </div>
            <div class="delivery-address-content">
              <div
                class="delivery-address-line"
                v-for="(delivery_address,index) in deliveryAddressHandle"
                :key="index"
              >
                <div class="delivery-input">
                  <Input 
                    style="margin-top:-5px" 
                    lWidth=325 
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
          <TextArea v-model="supplier.note" lWidth=815 lHeight=190 />
        </div>
      </div>
      <div slot="footer-dialog-box" class="footer-dialog-box">
        <div>
          <div class="white-button" @click="closeForm">Huỷ</div>
        </div>
        <div class="right-bottom-button">
          <div class="white-button" title="Cất (Ctrl + S)" @click="btnSave">Cất</div>
          <div class="green-button" title="Cất và thêm (Ctrl + Shift + S)">Cất và Thêm</div>
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
import moment from "moment"
import {mapActions,mapState} from  'vuex'
import { SupplierConstant,InitBankAccount,InitDeliveryAddress } from '../../configs/constants';
export default {
  components: {
    SupplierInfoBox,
    Input,
    ComboboxMultiple,
    Combobox,
    TextArea,
  },
  mounted(){
    this.bankAccountHandle = [...JSON.parse(this.supplier.bank_account)]
    this.deliveryAddressHandle = [...JSON.parse(this.supplier.delivery_address)]
  },
  computed:{
    ...mapState({
      supplier:state=> state.supplier.supplier,
      supplierFormMode:state=> state.supplier.supplierFormMode,
    }),
  },
  data() {
    return {
      //Sử lý tài khoản ngân hàng
      bankAccountHandle:[],
      //Sử lý địa chỉ giao hàng
      deliveryAddressHandle:[],
      //Giống địa chỉ nhà cung cấp không
      isSameSupplierAddress:false,
      dateFormat: 'DD/MM/YYYY',
      tabSelected: 0,
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
    ...mapActions(
      'supplier',
      [
        'closeForm',
        'postSupplier',
        'putSupplier'
      ]
    ),
    moment,
    handleTabs(index) {
      this.tabSelected = index;
    },
    addLineAddress() {
      this.deliveryAddressHandle.push({...InitDeliveryAddress})
    },
    removeAllLineAddress() {
      this.deliveryAddressHandle = [{...InitDeliveryAddress}]
    },
    deleteCurrentLineAddress(index) {
      this.deliveryAddressHandle = this.deliveryAddressHandle.filter((item,i)=>i!=index)
    },
    addLineBankAccount() {
      this.bankAccountHandle.push({...InitBankAccount});
    },
    removeAllLineBankAccount() {
      this.bankAccountHandle = [{...InitBankAccount}];
    },
    deleteCurrentLineBankAccount(index) {
      this.bankAccountHandle = this.bankAccountHandle.filter((item,i)=>i!=index)
    },
    btnSave(){
      //Lọc bỏ các tài khoản ngân hàng rỗng trước khi cất
      this.bankAccountHandle = this.bankAccountHandle.filter(item=>JSON.stringify(item) != JSON.stringify(InitBankAccount))
      this.supplier.bank_account = JSON.stringify(this.bankAccountHandle)
      //Lọc các địa chỉ giao hàng rỗng trc khi cất
      this.deliveryAddressHandle = this.deliveryAddressHandle.filter(item=>JSON.stringify(item) != JSON.stringify(InitDeliveryAddress))
      this.supplier.delivery_address = JSON.stringify(this.deliveryAddressHandle)
      if(this.supplierFormMode == SupplierConstant.IS_ADD){
        this.postSupplier()
      }else{
        this.putSupplier()
      }
    },
    handleDeliveryAddress(){
      if(this.isSameSupplierAddress == false){
        this.deliveryAddressHandle = [{address:this.supplier.address}]
      }
    },
    handleChangeAddress(e){
      if(this.isSameSupplierAddress == true && this.deliveryAddressHandle.length > 0){
        this.deliveryAddressHandle = [{address:e.target.value}]
      }
    }
  },
};
</script>

<style>

</style>
