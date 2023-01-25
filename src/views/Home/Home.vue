<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <div class="text-body-1 font-weight-bold mb-n1">
        Your _tokenResponse.idToken:
      </div>

      <div class="py-14" />

      <span>{{ store.otp_result._tokenResponse.idToken }}</span>
    </v-responsive>
  </v-container>
</template>

<script setup>
import store from "@/store";
console.log(store.otp_result);
</script>
