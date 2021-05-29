<template>
  <div>
    <a-select
      style="width:250px"
      show-search
      option-filter-prop="children"
      :filter-option="filterOption"
      v-model="optionSelected"
      @change="handleChange"
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
      <a-select-opt-group>
        <div slot="label" class="title-column">
          <div>
            Họ và tên
          </div>
          <div>
            Ngày sinh
          </div>
        </div>
        <a-select-option
          v-for="data in dataOptions"
          :key="data.Id"
          :value="data.Name"
        >
          <div>{{ data.Name }}</div>
          <!-- <div>{{ data.Id }}</div>
          <div>{{ data.Id }}</div> -->
        </a-select-option>
      </a-select-opt-group>
    </a-select>
  </div>
</template>

<script>
export default {
  props: {
    dataOptions: Array,
  },
  data() {
    return {
      isShowDropdown: false,
      isShowAddIcon: true,
      optionSelected: "",
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
    el[0].innerHTML = `<div>${this.optionSelected}</div>`;
  },
  methods: {
    /**
     * Hàm thực hiện lọc data cho auto complete
     * CreatedBy KDLong 18/05/2021
     */
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChange(item) {
      // this.$emit("setItemSelected", item);
      this.optionSelected = item;
    },
    showDropdown() {
      this.isShowDropdown = !this.isShowDropdown;
    },
    // inputKeydown(event) {
    //   if (event.key == "Enter") {
    //     this.isShowDropdown = false;
    //   } else this.isShowDropdown = true;
    // },
  },
};
</script>
<style scoped>
.title-column {
  justify-content: space-between;
  display: flex;
  color: #212121;
  font-size: 11px !important;
  font-weight: bold;
}
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
</style>
