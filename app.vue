<script setup lang="ts">

</script>

<template>
  <NuxtLayout name="todos">
    <!-- header -->
    <Header class="fixed header" />
    <!-- end header -->

    <!-- body -->
    <Main />
    <!-- end body -->

    <!-- footer -->
    <Footer class="fixed pb-4 bottom-0 left-1/2 transform -translate-x-1/2" />
    <!-- end footer -->
  </NuxtLayout>
</template>

<style>
.header {
  width: calc(816px - (1.5em * 2));
}
</style>
