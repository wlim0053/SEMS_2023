import axios from "axios"

export default axios.create({
	baseURL: "http://localhost:3000/api",
	responseType: "json",
	withCredentials: true,
	
})
