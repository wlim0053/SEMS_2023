import axios from "axios"

export default axios.create({
	baseURL: "http://localhost:5173/api",
	responseType: "json",
	withCredentials: true,
	
})
