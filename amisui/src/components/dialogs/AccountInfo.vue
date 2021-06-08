<template>
  <div>
    <div class="dialog-box"></div>
    <div class="dialog-content" :class="isFullScreen ? 'is-full-screen' : null">
      <div class="resize" @click="handleResizeScreen">
        <div
          class="resize-icon"
          :class="isFullScreen ? 'rotate-resize' : null"
        ></div>
      </div>
      <div class="header-dialog-box">
        <div class="dialog-title">Thêm Tài khoản</div>
        <div class="top-right-option">
          <div class="btn-help"></div>
          <div class="btn-close" title="Đóng (ESC)"></div>
        </div>
      </div>
      <div class="content-dialog-box">
        <div class="basic-information">
          <div class="row-input-add-account">
            <Input
              style="width:25%;padding-right:12px"
              isRequired="true"
              inputName="Số tài khoản"
            />
          </div>
          <div class="row-input-add-account">
            <Input
              style="width:50%"
              isRequired="true"
              inputName="Tên tài khoản"
            />
            <Input
              style="width:50%;padding-left:12px"
              inputName="Tên tiếng Anh"
            />
          </div>
          <div class="row-input-add-account">
            <div style="width:25%;padding-right:12px">
              <Combobox comboboxName="Tài khoản tổng hợp" />
            </div>
            <div style="width:25%">
              <Combobox isRequired="true" comboboxName="Tính chất" />
            </div>
          </div>
          <TextArea textareaName="Điễn giải" style="width:100%;" lHeight="60" />
          <div class="exception-accounting">
            <input type="checkbox" />Có hạch toán ngoại lệ<br />
          </div>
        </div>

        <div class="collapse-information">
          <div class="header-item" @click="handleShowDetail">
            <div
              class="header-icon"
              :class="isShowDetail ? 'rotate-header-icon' : null"
            ></div>
            <div>Theo dõi chi tiết theo</div>
          </div>
          <div class="content" v-show="isShowDetail">
            <div class="row-input-add-account">
              <div class="w-1div2-padding">
                <div class="w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail1" />
                  <div class="title-checkbox">Đối tượng</div>
                </div>
                <div class="w-1div2-none-padding">
                  <Combobox :isDisabled="!isCheckedDetail1" />
                </div>
              </div>
              <div class="w-1div2-padding">
                <div class="w-1div2-none-padding" style="width:100%">
                  <input type="checkbox" v-model="isCheckedDetail2" />
                  <div class="title-checkbox">Tài khoản ngân hàng</div>
                </div>
              </div>
            </div>
            <div class="row-input-add-account">
              <div class="w-1div2-padding">
                <div class="w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail3" />
                  <div class="title-checkbox">Đối tượng THCP</div>
                </div>
                <div class="w-1div2-none-padding">
                  <Combobox :isDisabled="!isCheckedDetail3" />
                </div>
              </div>
              <div class="w-1div2-padding">
                <div class="w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail4" />
                  <div class="title-checkbox">Công trình</div>
                </div>
                <div class="w-1div2-none-padding">
                  <Combobox :isDisabled="!isCheckedDetail4" />
                </div>
              </div>
            </div>
            <div class="row-input-add-account">
              <div class="w-1div2-padding">
                <div class="w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail5" />
                  <div class="title-checkbox">Đơn đặt hàng</div>
                </div>
                <div class="w-1div2-none-padding">
                  <Combobox :isDisabled="!isCheckedDetail5" />
                </div>
              </div>
              <div class="w-1div2-padding">
                <div class="w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail6" />
                  <div class="title-checkbox">Hợp đồng bán</div>
                </div>
                <div class="w-1div2-none-padding">
                  <Combobox :isDisabled="!isCheckedDetail6" />
                </div>
              </div>
            </div>
            <div class="row-input-add-account">
              <div class="w-1div2-padding">
                <div class="w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail7" />
                  <div class="title-checkbox">Hợp đồng mua</div>
                </div>
                <div class="w-1div2-none-padding">
                  <Combobox :isDisabled="!isCheckedDetail7" />
                </div>
              </div>
              <div class="w-1div2-padding">
                <div class="w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail8" />
                  <div class="title-checkbox">Khoản mục CP</div>
                </div>
                <div class="w-1div2-none-padding">
                  <Combobox :isDisabled="!isCheckedDetail8" />
                </div>
              </div>
            </div>
            <div class="row-input-add-account">
              <div class="w-1div2-padding">
                <div class="w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail9" />
                  <div class="title-checkbox">Đơn vị</div>
                </div>
                <div class="w-1div2-none-padding">
                  <Combobox :isDisabled="!isCheckedDetail9" />
                </div>
              </div>
              <div class="w-1div2-padding">
                <div class="w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail10" />
                  <div class="title-checkbox">Mã thống kê</div>
                </div>
                <div class="w-1div2-none-padding">
                  <Combobox :isDisabled="!isCheckedDetail10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="divide"></div>
      <div class="footer-dialog-box">
        <div>
          <div class="white-button">Huỷ</div>
        </div>
        <div class="right-bottom-button">
          <div class="white-button" title="Cất (Ctrl + S)">Cất</div>
          <div class="green-button" title="Cất và thêm (Ctrl + Shift + S)">
            Cất và Thêm
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "../share/Input";
import Combobox from "../share/Combobox";
import TextArea from "../share/TextArea";
export default {
  components: {
    Input,
    Combobox,
    TextArea,
  },
  data() {
    return {
      isFullScreen: false,
      isShowDetail: true,
      isCheckedDetail1: false,
      isCheckedDetail2: false,
      isCheckedDetail3: false,
      isCheckedDetail4: false,
      isCheckedDetail5: false,
      isCheckedDetail6: false,
      isCheckedDetail7: false,
      isCheckedDetail8: false,
      isCheckedDetail9: false,
      isCheckedDetail10: false,
    };
  },
  methods: {
    handleResizeScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    handleShowDetail() {
      this.isShowDetail = !this.isShowDetail;
    },
  },
};
</script>

<style>
.row-input-add-account .ant-select {
  width: 100% !important;
}
.row-input-add-account .input {
  min-width: 150px !important;
}

@import "../../assets/css/dialogs/accountinfo.css";
</style>
