<template>
  <div class="LoginPage">
    <form @submit.prevent="submit" novalidate>
      <div class="left">
        <div class="title">
          {{ shouldSetup ? 'Setup' : 'Login'}}
        </div>
        <div
          class="desc"
          v-text="shouldSetup ? 'setup admin account once' : 'yet another login'"
        />
      </div>
      <div class="right">
        <div>
          <div class="form-group">
            <label
              for="email"
              class="form-label"
            >Email address</label>
            <input
              id="email"
              v-model="form.email"
              :disabled="loading"
              type="email"
              class="input"
              aria-describedby="emailHelp"
              placeholder=""

            >
            <div class="validation-error" v-text="ve.email">
            </div>
          </div>
          <div class="form-group">
            <label
              for="password"
              class="form-label"
            >Password</label>
            <input
              id="password"
              v-model="form.password"
              :disabled="loading"
              type="password"
              class="input"
              placeholder=""
            >
            <div class="validation-error" v-text="ve.password">
            </div>
          </div>
          <div class="form-group">
            <div class="validation-error" v-text="ve.server"></div>
            <button
                data-test="submit"
              type="submit"
              class="button"
              :disabled="loading"
              :class="{loading}"
            >
              {{ loading ? 'Processing ...' : 'Continue' }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import {usePageContext} from "../../../plugins/usePageContext.js";
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      loading: false,
      ve:{
      }
    };
  },
  setup(){
    const {shouldSetup,dashboardUrl} = usePageContext();
    return {shouldSetup,dashboardUrl}
  },
  methods: {
    validateInputs() {
      const {email,password} = this.form;
      this.ve = {};
      if (!email) this.ve.email = 'email is required';
      if(!password) this.ve.password = 'password is required';
      if(!email || !password) return;

      const mailMatcher = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const validEmail = mailMatcher.test(email.toLowerCase())
      if(!validEmail) this.ve.email = 'email is not valid';
      if(password.length < 6) this.ve.password = 'password is too short';
    },
    async submit() {
      this.validateInputs();
      if(this.invalidInputs) return;
      this.loading = true;
      try {
        const url = this.shouldSetup ? 'setup' : 'login'
        const { status, data } = await axios.post('/api/auth/' + url, this.form);
        if (status === 200) {
          window.location.href = this.dashboardUrl;
        } else {
          alert('oops, something is not right!');
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    }
  },
  cacheControl: 'no-cache',
  computed: {
    invalidInputs() {
      return this.ve.email || this.ve.password
    }
  }
};
</script>

<style lang="scss">
.LoginPage {
  @apply flex justify-center items-center min-h-screen;
  form {
    @apply flex flex-col sm:flex-row gap-12 items-start items-center
    border border-gray-300 px-12 py-10 rounded-xl border-dashed
    shadow-lg;
    .left{
      min-width: 200px;
      @apply  flex flex-col justify-center items-start;
      .title{
        @apply text-4xl font-extrabold text-transparent pb-4
        bg-clip-text bg-gradient-to-b from-primary-400 to-blue-600;
      }
      .desc{
        @apply opacity-50 text-sm;
      }
    }
    .form-group{
      @apply flex flex-col py-2;
      .form-label{
        @apply text-xs opacity-50 mb-2;
      }
    }
    input {
      @apply px-2 bg-gray-100 py-1 border rounded border-gray-300 ring-0 outline-primary;
    }

    .button {
      @apply border border-primary transition bg-primary text-white px-4 py-1 rounded text-lg
      font-bold;
      &:hover,&:focus{
        @apply bg-white text-primary border border-primary;
      }
      &:active{
        @apply scale-90;
      }
      &.loading{
        @apply bg-primary text-white border border-primary opacity-50;
        @apply scale-100;
      }
    }
  }
}
</style>
