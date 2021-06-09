<template>
  <div class="textarea-box">
    <label v-if="textareaName != ''" class="title">
      {{textareaName}}
    </label>
    <textarea 
        v-bind="$attrs"
        v-on="inputSearchListeners"
        class="input text-area"

        :style="{width:lWidth +'px',height:lHeight+'px'}"        
    >
    </textarea>
  </div>
</template>

<script>
export default {
  props: {
    textareaName:String,//Title
    lWidth: Number, //Độ rộng
    lHeight:Number,//Độ cao
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
          },
        }
      );
    },
  },
};
</script>

<style>
.textarea-box {
    display: inline-grid;
    text-align: left;
}
.textarea-box .title {
    display: flex;
    font-size: 12px;
    color: #111111;
    font-weight: 700;
    padding-bottom: 4px;
}
.text-area{
  border-radius: 3px !important;
  padding: 9px !important;
}
</style>
