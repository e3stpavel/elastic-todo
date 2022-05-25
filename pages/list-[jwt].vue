<script setup lang="ts">
import { Buffer } from 'buffer/'

const route = useRoute()
const params = route.params as { jwt: string }

const token = params.jwt

const data = Buffer.from(token, 'base64').toString('utf-8').split(',')
</script>

<template>
  <NuxtLayout name="todos">
    <Head>
      <Title>{{ data[1] }}'s Todo List</Title>
    </Head>
    <!-- header -->
    <Header class="fixed header" :username="data[1]" :self-uri="token" />
    <!-- end header -->

    <!-- body -->
    <Main :list-id="token" />
    <!-- end body -->

    <!-- footer -->
    <Footer class="fixed pb-4 bottom-0 left-1/2 transform -translate-x-1/2" />
    <!-- end footer -->
  </NuxtLayout>
</template>

<style>
.header {
  width: calc(51em - (1.5em * 2));
}
</style>
