<template>
  <div
  @keydown.esc.prevent.stop="btnClose" 
  @keydown.ctrl.83.prevent.stop.exact="btnSave" 
  @keydown.ctrl.shift.83.prevent.stop="btnSaveAndAdd"
  tabindex="0"
  >
    <div class="dialog-box"></div>
    <div class="dialog-content">
      <div class="header-dialog-box">
        <div class="dialog-title">Thông tin nhà cung cấp</div>
        <slot name="type-supplier"></slot>
        <slot name="is-customer"></slot>
        <div class="top-right-option">
          <div class="btn-help"></div>
          <div class="btn-close" title="Đóng (ESC)"></div>
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
      <div class="footer-dialog-box">
        <div>
          <div class="white-button">Huỷ</div>
        </div>
        <div class="right-bottom-button">
          <div class="white-button" title="Cất (Ctrl + S)">Cất</div>
          <div class="green-button" title="Cất và thêm (Ctrl + Shift + S)">Cất và Thêm</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
    };
  },
  methods:{

  }
  
};
</script>

<style>
@import "../../assets/css/components/radiobutton.css";
@import "../../assets/css/dialogs/supplierinfo.css";
</style>
