<template>
  <div id="content">
    <Combobox
        :dataOptions="dataOptions"
        @setItemSelected="setItemSelected"
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
          Id: 1,
          Name: "K Long Long",
        },
        {
          Id: 2,
          Name: "Long Long Long",
        },
        {
          Id: 3,
          Name: "L Long Long",
        }
      ],
    };
  },
  methods:{
      setItemSelected(item){
          
          this.itemSelected = item
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
