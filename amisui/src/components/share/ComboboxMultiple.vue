<template>
  <div class="combobox-box">
    <label v-show="comboboxName !=''" :style="{ width: lWidth + 'px' }" class="title">
      {{comboboxName}}
    </label>
    <div class="combobox-multiple" :style="{ width: lWidth + 'px' }">
      <a-select
        @inputKeydown="inputKeydown"
        mode="multiple"
        :open="isShowDropdown"
        :style="{ width: lWidth + 'px' }"
        :filter-option="filterOption"
        :placeholder="placeHolder"
        @change="handleChangeSelect"
        option-label-prop="label"
      >
        <a-select-option value="title" :disabled="true">
          <div
            v-for="(title, index) in titleOptions"
            :key="index"
            :style="{ width: title.Width + 'px' }"
          >
            {{ title.Title }}
          </div>
        </a-select-option>
        <a-select-option
          v-for="(data, index) in dataOptions"
          :key="index"
          :value="index"
          :label="data[`${fieldDisplay}`]"
        >
          <div
            v-for="(value, key, index) in data"
            :title="value"
            :key="index"
            class="text-overflow"
            :style="{ width: titleOptions[index].Width + 'px' }"
          >
            {{ value }}
          </div>
        </a-select-option>
      </a-select>
      <div class="suffix-box">
        <div class="cover-add-icon cover-ver2">
          <div class="add-icon icon-ver2" />
        </div>
        <div
          @click="showDropdown"
          id="dropdown-icon"
          class="cover-dropdown-icon cover-ver2"
        >
          <div
            class="arrow-dropdown icon-ver2"
            :class="isShowDropdown ? 'rotate' : null"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataOptions: Array, //Dữ liệu hiển thị
    titleOptions: Array, //Tiêu đề hiển thị và kích thước
    fieldDisplay: String, //Trường hiển thị khi đã chọn
    fieldSearch: String, //Trường tìm kiếm
    isMultiple: Boolean, //Hiển thị nhiều dữ liệu hay không
    placeHolder: String, //Place holder
    lWidth: Number, // Độ rộng
    comboboxName:{
      type:String,
      default:""
    }
  },
  data() {
    return {
      isShowDropdown: false,
    };
  },
  created() {
    window.addEventListener("click", (e) => {
      if (this.isShowDropdown == true) {
        let elDropdownIcon = document.getElementById("dropdown-icon");
        let elDropdown = document.getElementsByClassName(
          "ant-select-dropdown--multiple"
        );
        //Nếu là click vào icon-dropdown thì bỏ qua do đã có chỗ sử lý sự kiện này
        if (elDropdownIcon.contains(e.target)) {
          return;
        }
        //Click vào khu vực cpn hiện tại
        let isClickInsideCombobox = this.$el.contains(e.target);
        //Click trong khu vực dropdown
        elDropdown.forEach((eli) => {
          let isClickInsideDropdown = eli.contains(e.target);
          if (!isClickInsideDropdown && !isClickInsideCombobox) {
            //Nếu k phải click trong khu vực hiện tại
            //hoặc dropdown thì ẩn dropdown
            this.isShowDropdown = false;
            return;
          } else if (isClickInsideDropdown) {
            //Vẫn trong khu vực thì hiện dropdown
            this.isShowDropdown = true;
            return;
          }
        });
      }
    });
  },
  methods: {
    /**
     * Khi có sự thay đổi lựa chọn
     * CreatedBy KDLong 30/05/2021
     */
    handleChangeSelect(value) {
      this.$emit("setItemSelected", value); //Event pass from parent
    },
    /**
     * Khi click vào icon-dropdown
     * CreatedBy KDLong 30/05/2021
     */
    showDropdown() {
      this.isShowDropdown = !this.isShowDropdown;
    },
    /**
     * Khi dùng phím
     * CreatedBy KDLong 30/05/2021
     */
    inputKeydown() {
      this.isShowDropdown = true;
    },
    /**
     * Hàm thực hiện lọc data cho auto complete
     * CreatedBy KDLong 30/05/2021
     */
    filterOption(input, option) {
      for (let i = 0; i < this.dataOptions.length; i++) {
        if (option.key == undefined) {
          option.componentOptions.children[0].text = input;
        }
        if (option.key == i) {
          option.componentOptions.children[0].text = this.dataOptions[i][
            `${this.fieldSearch}`
          ].toString();
        }
      }
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
  },
};
</script>

<style scoped>
.cover-suffix {
  display: flex !important;
  margin-right: -11px;
  margin-top: -9px;
  cursor: pointer !important;
}
.cover-add-icon {
  width: 30px;
  height: 30px;
  border-right: 1px solid #babec5;
}
.add-icon {
  position: relative;
  top: 6px;
  right: -7px;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  background-position: -32px -312px;
  transition: 0.2s;
}
.cover-dropdown-icon {
  /* margin-top: -9px; */
  /* margin-right: -11px; */
  width: 30px;
  height: 30px;
}
.cover-add-icon:hover,
.cover-dropdown-icon:hover {
  background-color: #e0e0e0;
}
.arrow-dropdown {
  position: relative;
  top: 6px;
  right: -7px;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  background-position: -560px -359px;
  transition: 0.2s;
}
.rotate {
  transform: rotate(180deg);
}
.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.combobox-multiple {
  display: flex;
  position: relative;
}
.cover-suffix {
  display: flex !important;
  margin-right: -11px;
  margin-top: -9px;
  cursor: pointer !important;
}
.cover-add-icon {
  width: 30px;
  height: 30px;
  border-right: 1px solid #babec5;
}
.add-icon {
  position: relative;
  top: 6px;
  right: -7px;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  background-position: -32px -312px;
  transition: 0.2s;
}
.cover-dropdown-icon {
  /* margin-top: -9px; */
  /* margin-right: -11px; */
  width: 30px;
  height: 30px;
}
.cover-add-icon:hover,
.cover-dropdown-icon:hover {
  background-color: #e0e0e0;
}
.arrow-dropdown {
  position: relative;
  top: 6px;
  right: -7px;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  background-position: -560px -359px;
  transition: 0.2s;
}
.rotate {
  transform: rotate(180deg);
}
.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.suffix-box {
  display: flex;
  margin-left: -61px;
  position: relative;
  margin-top: 1px;
  cursor: pointer;
}
.cover-ver2 {
  height: calc(100% - 1px);
}
.icon-ver2 {
  top: calc(50% - 8px);
}
.selected-multiple {
  background-color: #fff !important;
  color: #111111 !important;
}
.combobox-box {
  display: inline-grid;
  text-align: left;
  margin-top: 2px;
}
.combobox-box .title {
  display: flex;
  font-size: 12px;
  color: #111111;
  font-weight: 700;
  padding-bottom: 4px;
}
</style>
