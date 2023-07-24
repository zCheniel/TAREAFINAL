import {Alert, Snackbar} from "@mui/material"
import React from "react"

function Warning(props: any) {
	const {openWarning} = props

	return (
		<Snackbar open={openWarning} autoHideDuration={5000}>
			<Alert severity="error">Faltan información para ingresar sesión</Alert>
		</Snackbar>
	)
}

export default Warning
