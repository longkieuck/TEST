<template>
  <div class="combobox-box">
    <label v-show="comboboxName !=''" :style="{ width: lWidth + 'px' }" class="title">
      {{comboboxName}}
      <div v-if="isRequired" class="required">*</div>
    </label>
    <a-select
      @inputKeydown="inputKeydown"
      :open="isShowDropdown"
      :style="{ width: lWidth + 'px' }"
      show-search
      :filter-option="filterOption"
      option-label-prop="label"
      :disabled="isDisabled"
      :dropdownMatchSelectWidth="!isMultiple"
      :default-value="defaultValue"
      :placeholder="placeHolder"
      @change="handleChangeSelect"
      :value="value"
    >
      <div slot="suffixIcon" class="cover-suffix">
        <div v-show="isShowAddIcon" class="cover-add-icon">
          <div class="add-icon" />
        </div>
        <div @click="showDropdown" class="cover-dropdown-icon">
          <div
            class="arrow-dropdown"
            :class="isShowDropdown ? 'rotate' : null"
          />
        </div>
      </div>
      <a-select-option v-if="isMultiple" value="title" :disabled="true">
        <div
          v-for="(title, index) in titleOptions"
          :key="index"
          :style="{ width: title.Width + 'px' }"
        >
          {{ title.Title }}
        </div>
      </a-select-option>

      <a-select-option
        v-show="false"
        v-for="(data, index) in dataOptions"
        :key="index"
        :value="data[`${fieldValue}`]"
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
  </div>
</template>

<script>
export default {
  props: {
    dataOptions: Array, //Dữ liệu hiển thị
    titleOptions: Array,
    fieldDisplay: String, //Trường hiển thị khi đã chọn
    fieldSearch: String, //Trường tìm kiếm
    fieldValue:String,//Trường giá trị
    isMultiple: {
      typeof:Boolean,
      default:false
    }, //Hiển thị nhiều dữ liệu hay không
    isShowAddIcon: {
      typeof:Boolean,
      default:false
    }, //Hiển thị icon add hay không
    placeHolder: String, //Place holder
    lWidth: String, // Độ rộng
    isRequired:{
      type:Boolean,
      default:false
    },
    isDisabled:Boolean,
    comboboxName:String,
    defaultValue:String,
    value:[String, Number]
  },
  data() {
    return {
      isShowDropdown: false,

    };
  },
  created() {
    /**
     * Khi click ra bên ngoài sẽ đóng dropdown
     * CreatedBy KDLong 30/05/2021
     */
    window.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.isShowDropdown = false;
      }
    });
  },
  methods: {
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
    /**
     * Khi thay đổi lựa chọn sẽ thực hiện gọi qua cpn cha
     * CreatedBy KDLong 30/05/2021
     */
    handleChangeSelect(value) {
      this.$emit("handleChangeSelect", value); //Event pass from parent
    },
    /**
     * Khi click vào icon sẽ show dropdown
     * CreatedBy KDLong 30/05/2021
     */
    showDropdown() {
      if(!this.isDisabled)
      this.isShowDropdown = !this.isShowDropdown;
    },
    /**
     * Khi sử dụng phím
     * CreatedBy KDLong 30/05/2021
     */
    inputKeydown(event) {
      if (event.key == "Enter") {
        this.isShowDropdown = false;
      } else this.isShowDropdown = true;
    },
  },
};
</script>
<style>
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
.combobox-box{
  display: inline-grid;
  text-align: left;
  margin-top: 2px;
  width: 100%;
}
.combobox-box .title {
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
</style>
