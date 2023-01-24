<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <div class="text-body-1 font-weight-bold mb-n1">Welcome</div>

      <div class="py-14" />

      <pre>{{ store.otp_result }}</pre>
    </v-responsive>
  </v-container>
</template>

<script setup>
import store from "@/store";
</script>
