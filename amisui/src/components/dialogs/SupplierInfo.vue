<template>
  <div>
      <supplier-info-box>
          <div class="option-supplier-box" slot="type-supplier">
              <input type="radio" name="type-supplier" value="0" v-model="test">Tổ chức<br>
              <input type="radio" name="type-supplier" value="1" v-model="test">Cá nhân<br>
          </div>
          <div class="is-customer" slot="is-customer">
              <input type="checkbox" v-model="isCustomer">Là khách hàng<br>
          </div>
          <div slot="left-base-info">left</div>
          <div slot="right-base-info">right</div>
          <div slot="tabs-option">tabs option</div>
          <div slot="tab-content">tab content</div>
      </supplier-info-box>
  </div>
</template>

<script>
import SupplierInfoBox from "./SupplierInfoBox";
export default {
  components: {
    SupplierInfoBox
  },
  data(){
      return{
          typeSupplier:0,
          isCustomer:false
      }
  },
  updated(){
    //   alert(this.isCustomer)
  }
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
</style>
