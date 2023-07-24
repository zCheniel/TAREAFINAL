import admin from "./default"

function ValidateSesion(): boolean {
	return window.localStorage.getItem("sesion") === JSON.stringify(admin)
}

export default ValidateSesion
