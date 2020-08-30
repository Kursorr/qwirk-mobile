"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animate = void 0;
function amountFromTo(range) {
    return function (t) {
        return range.from + t * (range.to - range.from);
    };
}
function animate(duration, defs) {
    return new Promise(function (resolve) {
        var start = new Date();
        var timerId = setInterval(function () {
            var timePassed = new Date().valueOf() - start.valueOf();
            var progress = timePassed / duration;
            if (progress > 1)
                progress = 1;
            for (var i = 0; i < defs.length; i++) {
                var def = defs[i];
                var delta = def.curve(progress);
                var v = amountFromTo(def.getRange())(delta);
                def.step(v);
            }
            if (progress === 1) {
                clearInterval(timerId);
                resolve();
            }
        }, 17);
    });
}
exports.animate = animate;
