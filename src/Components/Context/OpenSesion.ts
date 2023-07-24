import UserI from "../../../Interfaces/User"

function openSesion(data: UserI) {
	window.localStorage.setItem("sesion", JSON.stringify(data))
	window.location.assign("/admin")
}

export default openSesion
