<template>
  <div>
    <Header />
    <SiderMenu />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Fooder";
import SiderMenu from "./SiderMenu";
export default {
  components: {
    Header,
    Footer,
    SiderMenu
  }
};
</script>

<style lang="" scoped></style>
