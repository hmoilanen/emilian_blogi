export const timestampToDate = (created) => {
	let time = created

	// If timestamp
	if (!(Object.prototype.toString.call(created) === '[object Date]')) {
		time = created.toDate()
	}

	const date = String(time.getDate()).padStart(2, '0')
	const month = String((time.getMonth() + 1)).padStart(2, '0') // Note: January is 0
	const year = String(time.getFullYear())

	return `${date}/${month}/${year}`
}