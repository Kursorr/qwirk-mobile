function amountFromTo(range) {
  return (t) => {
    return range.from + t * (range.to - range.from)
  }
}

export function animate(duration, defs) {
  return new Promise((resolve) => {
    const start = new Date()

    const timerId = setInterval(() => {
      const timePassed = new Date().valueOf() - start.valueOf()

      let progress = timePassed / duration
      if (progress > 1) progress = 1
      for (let i = 0; i < defs.length; i++) {
        const def = defs[i]

        const delta = def.curve(progress)
        const v = amountFromTo(def.getRange())(delta)

        def.step(v)
      }

      if (progress === 1) {
        clearInterval(timerId)
        resolve()
      }
    }, 17)
  })
}
