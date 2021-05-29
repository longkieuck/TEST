<template>
  <div id="content">
    <Combobox
        :dataOptions="dataOptions"
        @setItemSelected="setItemSelected"
        :fieldDisplay="'Name'"
        :fieldSearch="'Name'"
        :titleOptions="titleOptions"
        :isMultiple="false"
        :placeHolder="'Họ và tên'"
        :lWidth="500"
    />
  </div>
</template>

<script>
import Combobox from "../share/Combobox";
export default {
  data() {
    return {
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
      setItemSelected(index){
          alert(index)
          // this.itemSelected = index
      }
  },
  components: {
    Combobox,
  },
};
</script>

<style>
@import "../../assets/css/layout/content.css";
</style>
