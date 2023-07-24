import {
	Box,
	SxProps,
	TextField,
	Paper,
	Grid,
	FormControl,
	Button,
} from "@mui/material"

import React, {MouseEvent, useRef, useState, useContext, useEffect} from "react"
import {DataContext} from "../Context/ContextProvider"
import Incorrect from "./Incorrect"
import Warning from "./Warning"

interface loginStyle {
	container: SxProps
	gridItem: SxProps
	responsive: SxProps
}
const style: loginStyle = {
	container: {
		height: "100%",
		display: "flex",
		backgroundImage: "url(https://enerbit.co/img/mainLogo.bea5a270.svg)",
		justifyContent: "center",
		alignItems: "center",
		margin: 0,
		width: "100%",
		backgroundRepeat: "no-repeat",
		backgroundSize: "100% 25%",
	},
	gridItem: {
		width: "100%",
		gap: "1rem",
		display: "flex",
		flexDirection: "column",
	},
	responsive: {
		display: "flex",
		width: "90%",
		flexDirection: "column",
		padding: "1rem",
		"@media (min-width:960px)": {width: "50%"},
	},
}
export default function Login() {
	const {verify, openSesion, ValidateSesion} = useContext(DataContext)

	const refForm = useRef() as React.MutableRefObject<HTMLDivElement>

	const [noError_1, setNoError_1] = useState(true)
	const [noError_2, setNoError_2] = useState(true)
	const [openWarning, setOpenWarning] = useState(false)
	const [openIncorrect, setOpenIncorrect] = useState(false)

	useEffect(() => {
		if (ValidateSesion()) {
			setTimeout(() => {
				window.location.assign("/admin")
			}, 1000)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
		evt.preventDefault()

		if (noError_1 && noError_2) {
			const inputData = Array.from(
				refForm?.current.querySelectorAll("input")
			).map((x) => x.value)

			if (inputData[0] === "" || inputData[1] === "") {
				handleWarning()
			} else {
				verify({username: inputData[0], password: inputData[1]})
					? openSesion({username: inputData[0], password: inputData[1]})
					: incorrect()
			}
		} else {
			handleWarning()
		}
	}

	const incorrect = () => {
		setOpenIncorrect((prev) => true)
		setTimeout(() => {
			setOpenIncorrect((prev) => false)
		}, 5000)
	}

	const handleWarning = () => {
		setOpenWarning((prev) => true)
		setTimeout(() => {
			setOpenWarning((prev) => false)
		}, 5000)
	}

	const isEmpty = (): [boolean, boolean] => {
		const inputData = Array.from(
			refForm?.current.querySelectorAll("input")
		).map((x) => x.value)

		return [inputData[0] !== "", inputData[1] !== ""]
	}

	return (
		<Box sx={{...style.container}}>
			<Grid
				container
				component={Paper}
				elevation={12}
				sx={{...style.responsive}}
			>
				<Grid
					component={FormControl}
					sx={{...style.gridItem}}
					item
					xs={12}
					ref={refForm}
				>
					<TextField
						error={!noError_1}
						onBlur={() => {
							const empty = isEmpty()
							empty[0]
								? setNoError_1((prev) => true)
								: setNoError_1((prev) => false)
						}}
						helperText={!noError_1 ? "Este campo es obligatorio" : ""}
						onFocus={() => {
							setNoError_1((prev) => true)
						}}
						required
						fullWidth
						label={"Username"}
					/>
					<TextField
						error={!noError_2}
						onBlur={() => {
							const empty = isEmpty()
							empty[1]
								? setNoError_2((prev) => true)
								: setNoError_2((prev) => false)
						}}
						onFocus={() => {
							setNoError_2((prev) => true)
						}}
						helperText={!noError_2 ? "Este campo es obligatorio" : ""}
						required
						fullWidth
						label={"Password"}
						type={"password"}
					/>
					<Button onClick={handleClick} variant="contained">
						Login
					</Button>
				</Grid>
			</Grid>
			<Warning openWarning={openWarning} />
			<Incorrect openIncorrect={openIncorrect} inputRef={refForm} />
		</Box>
	)
}
