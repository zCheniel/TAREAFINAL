import {Grid, SxProps, Typography} from "@mui/material"
import React, {useEffect} from "react"

interface notAllowedStyles {
	container: SxProps
}

const style: notAllowedStyles = {
	container: {
		height: "100vh",
		width: "100%",
		backgroundColor: "#FA403A",
		color: "white",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
}

function NotAllowed() {
	useEffect(() => {
		setTimeout(() => {
			window.location.assign("./")
		}, 10000)
	}, [])

	return (
		<Grid container sx={{...style.container}}>
			<Grid
				item
				component={Typography}
				fontFamily={"Libre Franklin,sans-serif"}
				fontSize={"3rem"}
				paddingX={"1rem"}
			>
				No tienes permisos para acceder
			</Grid>
		</Grid>
	)
}

export default NotAllowed
