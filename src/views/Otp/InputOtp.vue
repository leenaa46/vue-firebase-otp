<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <div class="text-body-1 font-weight-normal mb-n1">
        Otp code has sended to <strong>xxxxxxxx</strong>, please input code you
        got to below section
      </div>

      <div class="py-14" />
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
import { ref } from "vue";

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

  if (valid) alert("Form is valid");
}
function reset() {
  form.value.reset();
}
function resetValidation() {
  form.value.resetValidation();
}
</script>
