<template>
  <div>
    <div class="dialog-box"></div>
    <div class="dialog-content">
      <div class="header-dialog-box">
        <div class="dialog-title">Thông tin nhà cung cấp</div>
        <slot name="type-supplier"></slot>
        <slot name="is-customer"></slot>
        <div class="top-right-option">
          <div class="btn-help"></div>
          <div @click="closeForm" class="btn-close" title="Đóng (ESC)"></div>
        </div>
      </div>
      <div class="content-dialog-box">
        <slot name="base-info"></slot>
        <div class="tabs-info">
          <slot name="tabs-option"></slot>
          <div class="tab-content">
            <slot name="tab-content"></slot>
          </div>
        </div>
      </div>
      <slot name="footer-dialog-box">
      </slot>
    </div>
  </div>
</template>

<script>
import {mapActions} from  'vuex'
export default {
  components: {
  },

  data() {
    return {
      // id:this.$route.params.id
    };
  },
  methods:{
  ...mapActions(
        'supplier',
        [
          'closeForm',
        ]
      ),
  }
  
};
</script>

<style scoped>
@import "../../assets/css/components/radiobutton.css";
@import "../../assets/css/dialogs/supplierinfo.css";
</style>
