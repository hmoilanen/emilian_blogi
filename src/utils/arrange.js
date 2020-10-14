export const dynamicSort = (key, order = 'asc') => {
	// Usage: arrayName.sort(dynamicSort('key'))
  return (a, b) => {
		// In case property doesn't exist on either object
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0
    }

    const variableA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
    const variableB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]

		let comparison = 0

    if (variableA > variableB) {
      comparison = 1
    } else if (variableA < variableB) {
      comparison = -1
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    )
  }
}