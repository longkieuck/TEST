<template>
  <div class="input-box">
    <label v-if="inputName != ''" class="title">
      {{inputName}}
      <div v-if="isRequired" class="required">*</div>
    </label>
    <input
        ref="input"
        v-bind="$attrs"
        v-on="inputSearchListeners"
        class="input"
        :style="{width:lWidth +'px'}"
        @blur="blurInput($event)"
        :class="{'input-required':!isValidated}"
        @focus="focusInput"        
    />
    <div v-if="!isValidated" class="pop-up">{{inputName}} không được để trống</div>
  </div>
</template>

<script>
export default {
  props: {
    inputName:String,//Title
    lWidth: String, //Độ rộng
    isRequired: {
      type : Boolean,
      default: false
    }, //Có bắt buộc không
  },
  data(){
    return{
      isValidated : true
    }
  },
  methods:{
    focus(){
      this.$refs.input.focus()
    },
    blurInput(event){
      if((event.target.value == null || event.target.value.trim() == "") && this.isRequired == true){
              this.isValidated = false
            }else{
              this.isValidated = true
            }
    },
    focusInput(){
      this.isValidated = true
    },
    setValidateState(state){
      this.isValidated = state
    },
    getValidateState(){
      return this.isValidated
    }
  },
  computed: {
    /**
     * Customize event(Merge)
     * CreatedBy KDLong 30/05/2021
     */
    inputSearchListeners: function() {
      var vm = this;
      return Object.assign(
        {},
        this.$listeners, //Các sự kiện có sẵn
        {
          input: function(event) {
            // Sự kiện overide
            vm.$emit("input", event.target.value);
            if((event.target.value == null || event.target.value.trim() == "") && vm.isRequired == true){
              vm.isValidated = false
            }else{
              vm.isValidated = true
            }
          },
        }
      );
    },
  },
};
</script>

<style>
.input-box {
    position: relative;
    display: inline-grid;
    text-align: left;
    margin-top: 2px;
}
.input-box .title {
    display: flex;
    font-size: 12px;
    color: #111111;
    font-weight: 700;
    padding-bottom: 4px;
}
.title .required{
    color:red;
    padding-left:2px;
    font-weight: 400;
    font-size: 12px;
}
.input-required{
  border-color: red;
}
.input-box .pop-up{
  position: absolute;
  top: 54px;
  font-size: 12px;
  background-color: #241717;
  color: white;
  padding: 0 5px;
  display: none;
}
.input-box:hover .pop-up{
  display: block;
}
</style>
