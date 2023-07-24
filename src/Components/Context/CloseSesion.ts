function CloseSesion() {
	window.localStorage.setItem("sesion", "")
	window.location.assign("/")
}

export default CloseSesion
