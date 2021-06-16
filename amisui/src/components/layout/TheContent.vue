<template>
  <div id="content">
    <!-- <Combobox
      :dataOptions="dataOptions"
      @setItemSelected="setItemSelected"
      :fieldDisplay="'Id'"
      :fieldSearch="'Name'"
      :titleOptions="titleOptions"
      :isMultiple="false"
      :placeHolder="'Họ và tên'"
      :lWidth=250
    /> -->
    <!-- <ComboboxMultiple
      :dataOptions="dataOptions"
      @setItemSelected="setItemSelected"
      :fieldDisplay="'Id'"
      :fieldSearch="'Name'"
      :titleOptions="titleOptions"
      :isMultiple="true"
      :placeHolder="'Họ và tên'"
      :lWidth=250
    /> -->
    <!-- <Input
      v-model="searchText"
      :inputName="'Name'"
      :lWidth=250
      :isRequired="true"
    /> -->
    <!-- <PaymentList/> -->
    <!-- <SupplierList/> -->
    <!-- <AccountList/> -->
    <!-- <AccountInfo/> -->
    <!-- <SupplierInfo/> -->
    <!-- <PaymentInfo/> -->
    <!-- <Home/> -->
    <router-view></router-view>
  </div>
  
</template>

<script>
// import Combobox from "../share/Combobox";
// import ComboboxMultiple from "../share/ComboboxMultiple";
// import Input from "../share/Input";
// import SupplierList from "../../views/SupplierList"
// import AccountList from "../../views/AccountList"
// import PaymentList from "../../views/PaymentList"
// import SupplierInfo from "../dialogs/SupplierInfo"
// import AccountInfo from "../dialogs/AccountInfo"
// import PaymentInfo from "../dialogs/PaymentInfo"
// import Home from "../../views/Home"
export default {
  components: {
    // Combobox,
    // ComboboxMultiple,
    // Input
    // SupplierList
    // AccountList
    // PaymentList
    // AccountInfo
    // SupplierInfo
    // PaymentInfo
    // Home
  },
  data() {
    return {
      searchText:"",
      itemSelected:0,
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
  methods:{
      setItemSelected(){
          // alert(value)
          // this.itemSelected = indexvalue
      },
  },
  
};
</script>

<style scoped>
@import "../../assets/css/layout/content.css";
</style>
