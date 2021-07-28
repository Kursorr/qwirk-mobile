/**
 * File: App Entry
 *
 * Date Created: 06192021
 * Date Modified: 06192021
**/

<template>
  <Navigator :defaultRoute="isLoggedIn ? '/home' : '/home'" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { isAndroid } from '@nativescript/core'

/* Utilities */
import  getStatusBarHeight  from './utils/statusbar'
import getNavigationBarHeight from './utils/statusbar'

import { registerSoftKeyboardCallback } from '@codesthings/nativescript-soft-keyboard'

@Component
export default class Root extends Vue {
  private isLoggedIn: boolean = true

  mounted() {

      if(isAndroid) {
      /* Get the system statusbar height */
        this.$store.commit("statusBar", getStatusBarHeight());

      /* Get the system soft navigation bar if present */
        this.$store.commit("navBar", getNavigationBarHeight());
      }

      /* Fix Keyboard Hidden */
      registerSoftKeyboardCallback((h) => {
      if (h <= 400) {
        this.$store.commit("keyBoard", h);
      }
    })

  }
}
</script>
