<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Login</h1>

      <div class="py-14" />
      <v-row>
        <v-col>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col>
                <v-text-field
                  label="Phone Number"
                  hint="+85620xxxxxxxx"
                  persistent-hint
                  variant="outlined"
                  v-model="phone_number"
                  :rules="rules.phone_number"
                  type="number"
                  block
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-btn text color="primary" class="me-4" @click="validate">
                  Send Otp
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
import { ref } from "vue";

const form = ref(null);
const valid = ref(true);
const phone_number = ref("");
const rules = ref({
  phone_number: [
    (v) => !!v || "Phone is required",
    (v) => (v && v.length != 10) || "Name must be 8 numbers",
  ],
});

async function validate() {
  const { valid } = await form.value.validate();

  if (valid) alert("Form is valid");
}
function reset() {
  form.value.reset();
}
function resetValidation() {
  form.value.resetValidation();
}
</script>
