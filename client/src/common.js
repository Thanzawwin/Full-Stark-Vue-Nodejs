//Time
export const halfTime = (old) =>{
	let date = new Date(old);

	return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

export const fullTime = (old) => {
	let date = new Date(old);

	return (
		`${date.getDate()}/
					${date.getMonth()}/
					${date.getFullYear()}/
					${date.getHours()} Hour:
					${date.getMinutes()} min 
				 `
				 )
}



//file
export const fileMB = (num) =>{
	let total = num / 1000000;

	total = total.toString();
	return `${total.substring(0,4)} MB`;
}