<template>
    <div>
        <div class="input-search">
            <input
              :placeholder=placeHolder
              type="text"
              class="input"
            />
            <div class="icon-search"></div>
          </div>
    </div>
</template>

<script>
    export default {
        created(){
        },
        props:{
            placeHolder:String
        },
        methods:{
            // changeTextSearch(){
            //     this.$emit("changeTextSearch")
            // }
        }
    }
</script>

<style scoped>
.input-search {
    display: flex;
}
.input {
    font-size: 13px;
    padding: 6px 10px;
    padding-right: 30px;
    outline: none;
    height: 32px;
    width: auto;
    box-sizing: border-box;
    border: 1px solid #babec5;
}
.icon-search {
    background-image: url('../../assets/img/Sprites.64af8f61.svg');
    background-position: -992px -360px;
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
    margin-right: -10px;
    position: relative;
    top: 8px;
    right: 25px;
}
input:focus {
  border: 1px solid #2ca01c;
}
</style>