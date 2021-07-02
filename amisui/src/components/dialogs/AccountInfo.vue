<template>
  <div>
    <div class="account-dialog-box"></div>
    <div class="account-dialog-content" :class="isFullScreen ? 'is-full-screen' : null">
      <div class="account-resize" @click="handleResizeScreen">
        <div
          class="account-resize-icon"
          :class="isFullScreen ? 'rotate-resize' : null"
        ></div>
      </div>
      <div class="account-header-dialog-box">
        <div class="account-dialog-title">Thêm Tài khoản</div>
        <div class="account-top-right-option">
          <div class="account-btn-help"></div>
          <div class="account-btn-close" title="Đóng (ESC)"></div>
        </div>
      </div>
      <div class="account-content-dialog-box">
        <div class="account-basic-information">
          <div class="account-row-input-add-account">
            <Input
              style="width:25%;padding-right:12px"
              :isRequired="true"
              inputName="Số tài khoản"
              v-model="account.account_code"
              ref="accountCode"
            />
          </div>
          <div class="account-row-input-add-account">
            <Input
              style="width:50%"
              :isRequired="true"
              inputName="Tên tài khoản"
              v-model="account.account_name"
              ref="accountName"
            />
            <Input
              style="width:50%;padding-left:12px"
              inputName="Tên tiếng Anh"
              v-model="account.english_name"
            />
          </div>
          <div class="account-row-input-add-account">
            <div style="width:25%;padding-right:12px">
              <Combobox 
                comboboxName="Tài khoản tổng hợp" 
                :isMultiple="true"
                :titleOptions="titleParentAccount"
                :dataOptions="parentAccount"
                :fieldDisplay="'account_code'"
                :fieldSearch="'account_name'"
                :fieldValue="'account_id'"
                :value="account.parent_account_id"
                @handleChangeSelect="handleChangeParentAccount"
              />
            </div>
            <div style="width:25%">
              <Combobox 
                :isRequired="true" 
                comboboxName="Tính chất" 
                :isMultiple="false"
                :titleOptions="[{Title:'',Width:100}]"
                :dataOptions="nature"
                :fieldDisplay="'name'"
                :fieldSearch="'name'"
                :fieldValue="'name'"
                :value="account.nature"
                @handleChangeSelect="handleChangeNature"
              />
            </div>
          </div>
          <TextArea 
            textareaName="Điễn giải" 
            style="width:100%;" 
            lHeight=60 
            v-model="account.description"  
          />
          <div class="account-exception-accounting">
            <input
              v-model="account.is_exception_accounting"
              type="checkbox" />Có hạch toán ngoại lệ<br />
          </div>
        </div>

        <div class="account-collapse-information">
          <div class="account-header-item" @click="handleShowDetail">
            <div
              class="account-header-icon"
              :class="isShowDetail ? 'rotate-header-icon' : null"
            ></div>
            <div>Theo dõi chi tiết theo</div>
          </div>
          <div class="account-content" v-show="isShowDetail">
            <div class="account-row-input-add-account">
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail1" />
                  <div class="account-title-checkbox">Đối tượng</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox 
                    :isDisabled="!isCheckedDetail1" 
                    :isMultiple="false"
                    :titleOptions="[{Title:'',Width:100}]"
                    :dataOptions="objectType"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.object_type"
                    @handleChangeSelect="handleChangeObjectType"
                    />
                </div>
              </div>
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding" style="width:100%">
                  <input type="checkbox" v-model="account.is_bank_account" />
                  <div class="account-title-checkbox">Tài khoản ngân hàng</div>
                </div>
              </div>
            </div>
            <div class="account-row-input-add-account">
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail3" />
                  <div class="account-title-checkbox">Đối tượng THCP</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox 
                    :isDisabled="!isCheckedDetail3" 
                    :isMultiple="false"
                    :titleOptions="[{Title:'',Width:100}]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.object_type_thcp"
                    @handleChangeSelect="handleChangeObjectTypeThcp"
                  />
                </div>
              </div>
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail4" />
                  <div class="account-title-checkbox">Công trình</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox 
                    :isDisabled="!isCheckedDetail4" 
                    :isMultiple="false"
                    :titleOptions="[{Title:'',Width:100}]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.construction"
                    @handleChangeSelect="handleChangeConstruction"
                    />
                </div>
              </div>
            </div>
            <div class="account-row-input-add-account">
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail5" />
                  <div class="account-title-checkbox">Đơn đặt hàng</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox 
                    :isDisabled="!isCheckedDetail5" 
                    :isMultiple="false"
                    :titleOptions="[{Title:'',Width:100}]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.order"
                    @handleChangeSelect="handleChangeOrder"
                    />
                </div>
              </div>
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail6" />
                  <div class="account-title-checkbox">Hợp đồng bán</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox 
                    :isDisabled="!isCheckedDetail6" 
                    :isMultiple="false"
                    :titleOptions="[{Title:'',Width:100}]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.sale_contract"
                    @handleChangeSelect="handleChangeSaleContract"
                  />
                </div>
              </div>
            </div>
            <div class="account-row-input-add-account">
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail7" />
                  <div class="account-title-checkbox">Hợp đồng mua</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox 
                    :isDisabled="!isCheckedDetail7" 
                    :isMultiple="false"
                    :titleOptions="[{Title:'',Width:100}]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.purchase_contract"
                    @handleChangeSelect="handleChangePuchaseContract"
                  />
                </div>
              </div>
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail8" />
                  <div class="account-title-checkbox">Khoản mục CP</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox 
                    :isDisabled="!isCheckedDetail8" 
                    :isMultiple="false"
                    :titleOptions="[{Title:'',Width:100}]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.expense_item"
                    @handleChangeSelect="handleChangeExpenseItem"
                  />
                </div>
              </div>
            </div>
            <div class="account-row-input-add-account">
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail9" />
                  <div class="account-title-checkbox">Đơn vị</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox 
                    :isDisabled="!isCheckedDetail9" 
                    :isMultiple="false"
                    :titleOptions="[{Title:'',Width:100}]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.department"
                    @handleChangeSelect="handleChangeDepartment"  
                  />
                </div>
              </div>
              <div class="account-w-1div2-padding">
                <div class="account-w-1div2-none-padding">
                  <input type="checkbox" v-model="isCheckedDetail10" />
                  <div class="account-title-checkbox">Mã thống kê</div>
                </div>
                <div class="account-w-1div2-none-padding">
                  <Combobox 
                    :isDisabled="!isCheckedDetail10" 
                    :isMultiple="false"
                    :titleOptions="[{Title:'',Width:100}]"
                    :dataOptions="other"
                    :fieldDisplay="'name'"
                    :fieldSearch="'name'"
                    :fieldValue="'name'"
                    :value="account.stats_code"
                    @handleChangeSelect="handleChangeStartsCode"  
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="account-divide"></div>
      <div class="account-footer-dialog-box">
        <div>
          <div class="white-button" @click="closeForm">Huỷ</div>
        </div>
        <div class="account-right-bottom-button">
          <div 
            class="white-button" 
            title="Cất (Ctrl + S)"
            @click="btnSave"
          >
            Cất
          </div>
          <div 
            class="green-button" 
            title="Cất và thêm (Ctrl + Shift + S)"
            @click="btnSaveAndAdd"
          >
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
import {mapActions,mapState} from 'vuex';
import {
  ObjectType,
  Other,
  Nature,
  AccountConstant
} from "../../configs/constants";
export default {
  components: {
    Input,
    Combobox,
    TextArea,
  },
  created(){
    this.getParentAccount()
  },
  computed:{
    ...mapState({
      account:state =>state.account.account,
      parentAccount:state =>state.account.parentAccount,
      accountFormMode:state =>state.account.accountFormMode
    })
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
      objectType:[...ObjectType],
      other:[...Other],
      nature:[...Nature],
      titleParentAccount:[
        {
          Title:"",
          Width:0
        },
        {
          Title:"Số tài khoản",
          Width:150
        },
        {
          Title:"Tên tài khoản",
          Width:200
        }
      ]
    };
  },
  methods: {
    ...mapActions(
      'account',
      [
        'closeForm',
        'getParentAccount',
        'postAccount',
        'putAccount',
        'deleteAccount'
      ]
    ),
    handleChangeObjectType(value){
      this.account.object_type = value
    },
    handleChangeObjectTypeThcp(value){
      this.account.object_type_thcp = value
    },
    handleChangeConstruction(value){
      this.account.construction = value
    },
    handleChangeOrder(value){
      this.account.order = value
    },
    handleChangeSaleContract(value){
      this.account.sale_contract = value
    },
    handleChangePuchaseContract(value){
      this.account.purchase_contract = value
    },
    handleChangeExpenseItem(value){
      this.account.expense_item = value
    },
    handleChangeDepartment(value){
      this.account.department = value
    },
    handleChangeStartsCode(value){
      this.account.stats_code = value
    },
    handleChangeNature(value){
      this.account.nature = value
    },
    handleChangeParentAccount(value){
      this.account.parent_account_id = value
    },
    handleResizeScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    handleShowDetail() {
      this.isShowDetail = !this.isShowDetail;
    },
    closeAccountInfo(){
      this.$emit('closeAccountInfo')
    },
    btnSave(){
      if(
        this.account.account_code == null || this.account.account_name == null
      ){
        if(this.account.account_code == null){
          this.$refs.accountCode.setValidateState(false)
        }
        if(this.account.account_name == null){
          this.$refs.accountName.setValidateState(false)
        }
      }else{
        if(this.accountFormMode == AccountConstant.IS_ADD){
          this.postAccount({
            callbackSuccess:()=>{
              this.showNotification("Thêm thành công!")
            },
            callbackFail:()=>{
              this.showNotification("Thêm thất bại!")
            }
          })
        }else{
          this.putAccount(
            {
            callbackSuccess:()=>{
              this.showNotification("Sửa thành công!")
            },
            callbackFail:()=>{
              this.showNotification("Sửa thất bại!")
            }
          }
          );
        }
      }
    },
    btnSaveAndAdd(){
      alert('save and add')
    },
    showNotification(message){
      this.$notification['success']({
        message,
        duration:2
      });
    }
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
