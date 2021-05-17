<template>
  <div id="app">
    <TheNavbar/>
    <TheHeader/>
    <TheContent/>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader'
import TheNavbar from './components/layout/TheNavbar'
import TheContent from './components/layout/TheContent'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheNavbar,
    TheContent
  }
}
</script>

<style>
#app {
  font-family: notosans-regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
    background: #B8BCC3;
}


/* Handle on hover */

 ::-webkit-scrollbar-thumb:hover {
    background: #6b7077;
}
input:focus{
  border: 1px solid #2CA01C;
}
select:focus{
  border: 1px solid #2CA01C;
}
input::placeholder {
    font-style: italic;
    color: #c4c4c4;
}
input[type='checkbox']{
  height: 18px;
  width: 18px;
  outline: none;
  border: 1px solid #afafaf;
}
@font-face {
    font-family: 'notosans-regular';
    src: url('./assets/fonts/notosans-regular.2cb88a13.woff2') format('opentype');
}
</style>
