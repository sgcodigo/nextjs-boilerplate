export const cssvars = (vars: {}) => {
  return Object.entries(vars).reduce((vars, [name, value]) => {
    return value ? { ...vars, [`--${name}`]: value } : vars
  }, {})
}
