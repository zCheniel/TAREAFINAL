import {Button, Grid, Paper, SxProps, Typography} from "@mui/material"
import React, {useState} from "react"
import singleItem from "../../../../Interfaces/SingleItem"
import DeleteModal from "./DeleteModal"
import ShowInfoModal from "./ShowInfoModal"

interface itemStyle {
	container: SxProps
	buttonsContainer: SxProps
	textContainer: SxProps
}

interface Props extends singleItem {
	handleUpdate: () => void
}

const style: itemStyle = {
	container: {
		width: "100%",
		marginY: ".5rem",
		padding: ".5rem",
		display: "flex",
		borderRadius: "1rem",

		flexWrap: "wrap",
		height: "auto",
		transition: "1s all",
		"&:hover": {Color: "#6FB3FC", padding: "2rem", transition: "1s all"},
	},
	buttonsContainer: {display: "flex", alignItems: "stretch"},
	textContainer: {
		display: "flex",
		alignItems: "center",
		fontSize: "1rem",
		flexGrow: "1",
		cursor: "pointer",
	},
}

function ItemInventario(props: Props) {
	const [openInfo, setOpenInfo] = useState<boolean>(false)
	const [willEdit, setWillEdit] = useState<boolean>(false)
	const [willDelete, setWillDelete] = useState<boolean>(false)
	// Probado willDelete
	// useEffect(() => {
	// 	console.log("top level is updating willDelete", willDelete)
	// }, [willDelete])

	const {id, handleUpdate} = props

	// const handleEditTrue = () => setWillEdit((prev) => true)
	const handleEditFalse = () => setWillEdit((prev) => false)

	const handleOpen = () => setOpenInfo((prev) => true)
	const handleClose = () => setOpenInfo((prev) => false)

	const handleDeleteFalse = () => setWillDelete((prev) => false)
	const handleDeleteTrue = () => setWillDelete((prev) => true)

	return (
		<Grid container sx={{...style.container}} component={Paper} elevation={4}>
			<Grid
				className="Information"
				item
				component={Typography}
				variant="h6"
				fontFamily={"Tauri, sans-serif"}
				height={"auto"}
				sx={{...style.textContainer}}
				onClick={handleOpen}
			>
				Item ID {id}
			</Grid>
			<Grid item sx={{...style.buttonsContainer}}>
				<Button
					onClick={() => {
						setWillEdit((prev) => true)
					}}
				>
					Edit
				</Button>
				<Button color="error" onClick={handleDeleteTrue}>
					Delete
				</Button>
			</Grid>
			<ShowInfoModal
				willEdit={willEdit}
				openInfo={openInfo}
				// setWillEditTrue={handleEditTrue}
				setWillEditFalse={handleEditFalse}
				setOpenInfoTrue={handleOpen}
				setOpenInfoFalse={handleClose}
				item={props}
				// setNeedUpdate={setNeedUpdate}
				willDelete={willDelete}
				setWillDeleteTrue={handleDeleteTrue}
				setWillDeleteFalse={handleDeleteFalse}
				setNeedUpdate={handleUpdate}
			/>
			<DeleteModal
				setNeedUpdate={handleUpdate}
				id={id}
				willDelete={willDelete}
				setWillDeleteFalse={handleDeleteFalse}
			/>
		</Grid>
	)
}

export default ItemInventario
