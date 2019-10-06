function PercentString(props, propName, componentName) {
  if(!/\d+%/.test(props[propName])) {
    return new Error(`
      Invalid prop ${propName} supplied to ${componentName}. Vaidation failed
    `)
  }
}

export { PercentString  }