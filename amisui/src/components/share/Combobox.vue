<template>
  <div>
    <a-select
      @inputKeydown="inputKeydown"
      :open="isShowDropdown"
      :style="{width: lWidth+'px'}"
      show-search
      :filter-option="filterOption"
      @change="handleChangeSelect"
      :placeholder="placeHolder"
    >
      <div slot="suffixIcon" class="cover-suffix">
        <div v-show="isMultiple" class="cover-add-icon">
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
            v-for="(title,index) in titleOptions" 
            :key="index"
            :style="{width: title.Width+'px'}"
            >
            {{title.Title}}
          </div>

      </a-select-option>

      <a-select-option
        v-for="(data, index) in dataOptions"
        :key="index"
        :value="index"
      >
        <div
          v-for="(value,key,index) in data"
          :title="value"
          :key="index"
          class="text-overflow" 
          :style="{width: titleOptions[index].Width+'px'}"
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
    dataOptions: Array,//Dữ liệu hiển thị
    titleOptions:Array,//Tiêu đề hiển thị và kích thước
    fieldDisplay:String,//Trường hiển thị khi đã chọn
    fieldSearch:String,//Trường tìm kiếm
    isMultiple:Boolean,//Hiển thị nhiều dữ liệu hay không
    placeHolder:String,//Place holder
    lWidth:Number// Độ rộng
  },
  data() {
    return {
      isShowDropdown: false,
      optionSelected: {},
    };
  },
  created() {
    window.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.isShowDropdown = false;
      }
    });
  },
  updated() {
    let el = this.$el.getElementsByClassName(
      "ant-select-selection-selected-value"
    );
    if (el[0] != undefined)
      el[0].innerHTML = `<div>${this.optionSelected[`${this.fieldDisplay}`]}</div>`;
  },
  methods: {
    /**
     * Hàm thực hiện lọc data cho auto complete
     * CreatedBy KDLong 18/05/2021
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
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
    handleChangeSelect(index) {
      this.$emit("setItemSelected", index);//Event pass from parent
      this.optionSelected = this.dataOptions[index];
    },
    showDropdown() {
      this.isShowDropdown = !this.isShowDropdown;
    },
    inputKeydown(event) {
      if (event.key == "Enter") {
        this.isShowDropdown = false;
      } else this.isShowDropdown = true;
    },
  },
};
</script>
<style scoped>
.cover-option {
  display: flex !important;
  justify-content: space-between !important;
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
.text-overflow{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
