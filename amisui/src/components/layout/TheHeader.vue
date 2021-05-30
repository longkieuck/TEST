<template>
    <div id="header">
        <div class="branch">
            <div class="toggle-icon"></div>
            <div class="branch-name">CÔNG TY CỔ PHẦN MISA</div>
            <div class="left-down-arrow"></div>
            <div class="current-db">
                <div class="icon-active-db"></div>
                <div class="name-current-db">DC-02</div>
            </div>
        </div>
        <div class="right-header">
            <InputSearch
                @changeTextSearch="changeTextSearch"
                :placeholder="'Nhập từ khoá tìm kiếm'"
            />
            <div class="cover-icon-active" style="margin-left:20px">
                <div class="icon icon-category"></div>
            </div>
            <div class="cover-icon">
                <div class="icon icon-setting"></div>
            </div>
            <div class="cover-icon">
                <div class="icon icon-chat"></div>
            </div>
            <div class="cover-icon">
                <div class="icon icon-question-header"></div>
            </div>
            <div class="cover-icon" style="margin-right:20px">
                <div class="icon icon-notify"></div>
            </div>
            <div class="user-avatar"></div>
            <div class="username">Kiều Đức Long</div>
            <div class="right-down-arrow"></div>
        </div>
    </div>
</template>

<script>
import InputSearch from "../share/InputSearch"
export default {
    components:{
        InputSearch
    },
    methods:{
        changeTextSearch(){
            // alert("ok")
        }
    }
}
</script>

<style>
@import '../../assets/css/layout/header.css';
</style>