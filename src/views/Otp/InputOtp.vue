<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Login</h1>

      <div class="py-14" />

      <div class="text-body-1 font-weight-normal mb-n1">
        Otp code has sended to <strong>{{ store.phone }}</strong
        >, please input code you got to below section
      </div>

      <div class="py-4" />
      <v-row>
        <v-col>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col>
                <v-text-field
                  label="Otp Code"
                  hint="xxxxxx"
                  persistent-hint
                  variant="outlined"
                  v-model="otp"
                  :rules="rules.otp"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-btn
                  block
                  text
                  color="primary"
                  class="me-4"
                  @click="validate"
                >
                  Login
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import store from "@/store";

const form = ref(null);
const otp = ref("");
const rules = ref({
  otp: [
    (v) => !!v || "Otp is required",
    (v) => (v && v.length != 6) || "Otp Code must be 6 numbers",
  ],
});

async function validate() {
  const { valid } = await form.value.validate();

  if (valid) router.push({ path: "/home" });
}
function reset() {
  form.value.reset();
}
function resetValidation() {
  form.value.resetValidation();
}

onBeforeMount(() => {
  if (!store.phone) router.push({ path: "/" });
});
</script>
