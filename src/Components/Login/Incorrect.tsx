import {Alert, Snackbar} from "@mui/material"
import React, {useEffect} from "react"

interface Props {
	openIncorrect: any
	inputRef: React.MutableRefObject<HTMLDivElement>
}

function Incorrect(props: Props) {
	const {openIncorrect, inputRef} = props

	useEffect(() => {
		Array.from(inputRef?.current.querySelectorAll("input")).forEach(
			(x) => (x.value = "")
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [openIncorrect])

	return (
		<Snackbar open={openIncorrect} autoHideDuration={5000}>
			<Alert severity="info">Las credenciales no coinciden</Alert>
		</Snackbar>
	)
}

export default Incorrect
