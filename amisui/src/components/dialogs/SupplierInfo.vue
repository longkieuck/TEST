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

      <div slot="base-info" class="base-info">
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
            <Input inputName="Tên cung cấp" isRequired="true" lWidth="405" />
          </div>
          <div class="row-input"></div>
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
          <div class="row-input">
            <Combobox
              isMultiple="true"
              comboboxName="Nhân viên mua hàng"
              lWidth="405"
            />
          </div>
        </div>
      </div>
      <div slot="tabs-option">tabs option</div>
      <div slot="tab-content">tab content</div>
    </supplier-info-box>
  </div>
</template>

<script>
import SupplierInfoBox from "./SupplierInfoBox";
import Input from "../share/Input";
import ComboboxMultiple from "../share/ComboboxMultiple";
import Combobox from "../share/Combobox";

export default {
  components: {
    SupplierInfoBox,
    Input,
    ComboboxMultiple,
    Combobox,
  },
  data() {
    return {
      typeSupplier: 0,
      isCustomer: false,
      dataOptions: [
        {
          Name: "K Long Long",
          Id: 1,
          Id2:144444444444
          
        },
        {
          Name: "Long Long Longaaaaaaaaaaaaaaaaaaa",
          Id: 2,
          Id2:24444444444
        },
        {
          Name: "L Long Long",
          Id: 3,
          Id2:344444444444
        },
        {
          Name: "Le Long Long",
          Id: 4,
          Id2:4444444444
        }
      ],
      titleOptions:[
        {
          Title:"Họ Tên",
          Width:150
        },
        {
          Title:"Id",
          Width:50
        },
        {
          Title:"Id2",
          Width:50
        }
      ]
    };
  },
  updated() {
    //   alert(this.isCustomer)
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
  width: 125px;
  justify-content: space-between;
}
.row-input {
  min-height: 70px;
  width: 405px;
  /* background-color: red; */
  padding-bottom: 12px;
}
</style>
