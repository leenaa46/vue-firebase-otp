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
                  Send Otp
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div id="recaptcha-container"></div>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import store from "@/store";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const appVerifier = ref("");
const form = ref(null);
const valid = ref(true);
const phone_number = ref("");
const rules = ref({
  phone_number: [
    (v) => !!v || "Phone is required",
    (v) => (v && v.length == 8) || "Phone must be 8 numbers",
  ],
});

async function validate() {
  const { valid } = await form.value.validate();

  if (valid) {
    sendOtp();
  }
}
function reset() {
  form.value.reset();
}
function resetValidation() {
  form.value.resetValidation();
}

function sendOtp() {
  const countryCode = "+85620"; //laos
  const phoneNumber = countryCode + phone_number.value.toString();

  const auth = getAuth();
  signInWithPhoneNumber(auth, phoneNumber, appVerifier.value)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
      store.phone = phone_number;
      router.push({ path: "/otp" });
    })
    .catch((error) => {
      // Error; SMS not sent
      // ...
      alert("fail");
    });
}

function initReCaptcha() {
  setTimeout(() => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      },
      auth
    );
    appVerifier.value = window.recaptchaVerifier;
  }, 1000);
}

onMounted(() => initReCaptcha());
</script>
