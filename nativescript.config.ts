import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.kursorr.qwirk',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;
