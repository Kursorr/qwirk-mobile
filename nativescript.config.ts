import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.qwirkphone',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    maxLogcatObjectSize: 20000
  }
} as NativeScriptConfig;
