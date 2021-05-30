<template>
  <div class="input-box">
    <label class="title">
      {{inputName}}
      <div v-show="isRequired" class="required">*</div>
    </label>
    <input 
        v-bind="$attrs"
        v-on="inputSearchListeners"
        type="text"
        rows="3"
        class="input"
        :style="{width:lWidth +'px'}"        
    />
  </div>
</template>

<script>
export default {
  props: {
    inputName:String,//Title
    lWidth: Number, //Độ rộng
    isRequired: Boolean, //Có bắt buộc không
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
.input-box {
    display: inline-grid;
    text-align: left;
}
.input-box .title {
    display: flex;
    font-size: 12px;
    color: #212121;
    font-weight: 700;
    padding-bottom: 4px;
}
.title .required{
    color:red;
    padding-left:2px;
    font-weight: 400;
    font-size: 13px;
}
</style>
