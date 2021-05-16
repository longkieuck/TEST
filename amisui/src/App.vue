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
  margin-top: 60px;
}
@font-face {
    font-family: 'notosans-regular';
    src: url('./assets/fonts/notosans-regular.2cb88a13.woff2') format('opentype');
}
</style>
