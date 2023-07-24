import React, {useEffect, useState} from "react"

import {Modal, Typography, Button, Box, SxProps} from "@mui/material"
import axios from "axios"

interface Props {
	id: number
	willDelete: boolean
	setWillDeleteFalse: () => void

	setNeedUpdate: () => void
	setEditFalse?: () => void
	setOpenInfoFalse?: () => void
}

interface modalInfoStyles {
	subModalStyle: SxProps
}

const style: modalInfoStyles = {
	subModalStyle: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "80%",
		bgcolor: "white",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
		display: "flex",
		flexDirection: "column",
		height: "30%",
		gap: "1rem",
		overflow: "hidden",
		justifyContent: "space-between",
	},
}

function DeleteModal(props: Props) {
	const {
		id,
		willDelete,
		setWillDeleteFalse,
		setEditFalse,
		setOpenInfoFalse,
		setNeedUpdate,
	} = props

	const [deleting, setDeleting] = useState<boolean>(false)

	const handleNo = () => {
		setWillDeleteFalse()
		setDeleting((prev) => false)
	}

	const handleYes = () => {
		if (setEditFalse !== undefined) {
			setEditFalse()
		}
		if (setOpenInfoFalse !== undefined) {
			setOpenInfoFalse()
		}
		setDeleting((prev) => true)
	}

	// useEffect(() => {
	// 	setNeedUpdate((prev) => !prev)
	// 	console.log("deleting: ", id)
	// }, [deleting])

	const deleteRequest = async () => {
		try {
			const {status} = await axios.delete(
				`https://ops.enerbit.dev/learning/api/v1/meters/${id}`
			)

			if (status === 202) {
				setNeedUpdate()
			}
			setWillDeleteFalse()
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (willDelete) {
			deleteRequest()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deleting])

	return (
		<Modal hideBackdrop sx={{height: "auto"}} open={willDelete}>
			<Box sx={{...style.subModalStyle, width: "20vw"}}>
				<Typography
					sx={{
						fontFamily: "Tauri, sans-serif",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "80%",
					}}
				>
					¿Está seguro de que desea borrar este elemento?
				</Typography>
				<Box>
					<Button onClick={handleYes}>Yes</Button>
					<Button color="error" onClick={handleNo}>
						No
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}

export default DeleteModal
