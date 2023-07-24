import {Button, Paper, SxProps} from "@mui/material"
import React, {useContext} from "react"
import {DataContext} from "../Context/ContextProvider"

interface headerStyle {
	typography_h1: SxProps
	container: SxProps
}

const style: headerStyle = {
	typography_h1: {fontFamily: "Ramabhadra", fontSize: "2.5rem"},
	container: {
		display: "flex",
		padding: "0 2rem",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
	},
}

export default function HeaderGlo() {
	const {closeSesion} = useContext(DataContext)

	const handleClick = () => {
		closeSesion()
	}

	return (
		<Paper component={"header"} sx={{...style.container}}>
			<img
				src={"https://th.bing.com/th/id/R.cf525cd69ab3d6f37fb498b62767e8c2?rik=mZ2a%2fh0kWpJGyg&riu=http%3a%2f%2f1.bp.blogspot.com%2f-5_N0EoBywqg%2fUIaq168lfMI%2fAAAAAAAAAD8%2fn6tywzhvUYY%2fs1600%2fFarmacia%2bSAAS.jpg&ehk=ROHW3v82ITOiRdlK6YpC0xkL2ayWAjvy4cP4F9El8yY%3d&risl=&pid=ImgRaw&r=0"}
				style={{height: "4rem"}}
				alt="logo"
			/>
			<Button onClick={handleClick}>Cerrar sesión</Button>
		</Paper>
	)
}
