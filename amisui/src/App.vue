<template>
  <div id="app">
    <TheNavbar />
    <TheHeader />
    <TheContent />
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader";
import TheNavbar from "./components/layout/TheNavbar";
import TheContent from "./components/layout/TheContent";

export default {
  name: "App",
  components: {
    TheHeader,
    TheNavbar,
    TheContent,
  },
};
</script>
<style>
@import "./assets/css/components/checkbox.css";
@import "./assets/css/components/button.css";
@import "./assets/css/components/radiobutton.css";
@import "./assets/css/components/autocomplete.css";
#app {
  font-family: notosans-regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #111111;
}
label span{
  color: #111111 !important;
}::placeholder{
  font-size: 11.5px;
  font-weight: 500;
}
::-webkit-scrollbar {
  width: 5px;
  height: 7px;
}

/* Track */

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */

::-webkit-scrollbar-thumb {
  background: #b8bcc3;
}

/* Handle on hover */

::-webkit-scrollbar-thumb:hover {
  background: #6b7077;
}
input:focus {
  border: 1px solid #2ca01c;
}
select:focus {
  border: 1px solid #2ca01c;
}
input::placeholder {
  font-style: italic;
  color: #c4c4c4;
}
textarea{
  resize: none !important;
}
textarea:focus{
   border: 1px solid #2ca01c;
}
textarea::placeholder{
  font-style: italic;
  color: #c4c4c4;
}
input[type="checkbox"] {
  height: 18px;
  width: 18px;
  outline: none;
  border: 1px solid #afafaf;
}
.input {
  /* min-width: 180px; */
  border-radius: 2px;
  font-size: 13px;
  padding: 6px 10px;
  padding-right: 30px;
  outline: none;
  height: 32px;
  box-sizing: border-box;
  border: 1px solid #babec5;
}
@font-face {
  font-family: "notosans-regular";
  src: url("./assets/fonts/notosans-regular.2cb88a13.woff2") format("opentype");
}
</style>
