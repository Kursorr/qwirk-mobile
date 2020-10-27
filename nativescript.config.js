"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'com.kursorr.qwirk',
    appResourcesPath: 'app/App_Resources',
    android: {
        discardUncaughtJsExceptions: true,
        v8Flags: '--nolazy --expose_gc',
        markingMode: 'none',
        suppressCallJSMethodExceptions: false,
    },
    appPath: 'app',
};
