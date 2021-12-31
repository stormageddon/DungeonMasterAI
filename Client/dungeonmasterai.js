const URL='http://localhost:3000/item?n=10'

fetch(URL)
.then(data => { return data.json() })
.then(res=> {
	console.log(res)
	//this.setState
})
.catch(error => { console.error(error) })