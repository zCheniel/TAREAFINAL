import {
	FormControl,
	Modal,
	TextField,
	Typography,
	Button,
	NativeSelect,
} from "@mui/material"
import {Box, SxProps} from "@mui/system"
import axios from "axios"
import React, {useEffect, useRef, useState} from "react"
import SingleItem from "../../../../Interfaces/SingleItem"
import DeleteModal from "./DeleteModal"

interface Props {
	openInfo: boolean
	willEdit: boolean
	setOpenInfoTrue: () => void
	setOpenInfoFalse: () => void
	setWillEditFalse: () => void
	item: SingleItem
	// Props for delete
	willDelete: boolean
	setWillDeleteTrue: () => void
	setWillDeleteFalse: () => void
	setNeedUpdate: () => void
}

interface modalInfoStyles {
	container: SxProps
	typography: SxProps
	infoStyle: SxProps
	subModalStyle: SxProps
}

const style: modalInfoStyles = {
	container: {
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
		height: "80%",
		gap: "1rem",
		overflow: "auto",
	},
	typography: {fontFamily: "Tauri, sans-serif"},
	infoStyle: {
		padding: "1rem",
		backgroundColor: "#B3BBDC",
		borderRadius: "1rem",
		overflow: "hidden",
	},
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

function ShowInfoModal(props: Props) {
	const {
		openInfo,
		setOpenInfoTrue,
		setOpenInfoFalse,
		willEdit,
		setWillEditFalse,
		willDelete,
		setWillDeleteTrue,
		setWillDeleteFalse,
		setNeedUpdate,
	} = props
	const inputRef = useRef() as React.MutableRefObject<HTMLDivElement>
	const [edit, setEdit] = useState<boolean>(false)
	const [sure, setSure] = useState<boolean>(false)
	const [item, setItem] = useState<SingleItem>(props.item)
	const [fetch, setFetch] = useState<boolean>(false)

	const {
		id,
		condition,
		connection_type,
		created_at,
		i_b,
		i_max,
		i_n,
		location,
		manufacturer,
		owner,
		purchase,
		seals,
		serial,
		storage_system,
		updated_at,
	} = item

	const handleClose = () => {
		setOpenInfoFalse()
		handleCloseEdit()
		if (willEdit === true) {
			// false
			setWillEditFalse()
		}
	}

	// const handleSwitchEditFalse = () => setEdit((prev) => false)
	const handleSwitchSure = () => setSure((prev) => !prev)
	const handleSwitchEdit = () => setEdit((prev) => !prev)
	const handleSubmit = () => {
		setFetch((prev) => true)
		getDataForm()
		handleSwitchSure()
	}
	const handleCloseEdit = () => {
		setEdit((prev) => false)
	}

	const handleOpenEdit = () => {
		setEdit((prev) => true)
	}

	const formatDate = (date: string): string => {
		const transforming = new Date(date)
		const formater = transforming.toJSON()?.split("T")[0]
		return formater
	}

	const submitFormat = (date: string): string => {
		const toFormat = new Date(date)
		const formated = toFormat.toJSON()
		return formated
	}

	const getDataForm = () => {
		const info = Array.from(
			inputRef.current.querySelectorAll("input, select")
		).map((x: any) => {
			const compareName: string = x.name
			if (compareName === "purchase") {
				return {[x.name]: submitFormat(x.value)}
			} else if (
				["i_max", "i_b", "i_n", "seals"].some((x) => x === compareName)
			) {
				return {[x.name]: +x.value}
			} else {
				return {[x.name]: x.value}
			}
		})

		const reducer = info.reduce((prev, actual) => {
			return {...prev, ...actual}
		}, {})

		setItem((prev) => {
			return {...prev, ...reducer}
		})
	}

	useEffect(() => {
		if (willEdit === true) {
			handleOpenEdit()
			setOpenInfoTrue()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [willEdit])

	useEffect(() => {
		if (fetch) {
			fetchItem()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item])

	const fetchItem = async () => {
		try {
			const {id, created_at, updated_at, ...creationObject} = item
			const {status, data} = await axios.patch(
				`https://ops.enerbit.dev/learning/api/v1/meters/${id}`,
				creationObject
			)
			setFetch((prev) => false)
			setItem((prev) => {
				return {...prev, updated_at: data.updated_at}
			})
			if (status === 200) {
				handleSwitchEdit()
			}
		} catch (e) {
			console.log(e, "error")
		}
	}

	return (
		<Modal open={openInfo} onClose={handleClose}>
			<Box sx={{...style.container}} ref={inputRef}>
				<FormControl>
					<Typography sx={{...style.typography}}>ID</Typography>
					<Typography sx={{...style.infoStyle}}>{id}</Typography>
				</FormControl>
				<FormControl>
					<Typography sx={{...style.typography}}>Updated at</Typography>
					<Typography sx={{...style.infoStyle}}>
						{updated_at ? updated_at : "No updated"}
					</Typography>
				</FormControl>
				<FormControl>
					<Typography sx={{...style.typography}}>Created At</Typography>
					<Typography sx={{...style.infoStyle}}>{created_at}</Typography>
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>Serial</Typography>

					{edit ? (
						<TextField name="serial" defaultValue={serial} />
					) : (
						<Typography sx={{...style.infoStyle}}>{serial}</Typography>
					)}
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>connection_type</Typography>

					{edit ? (
						<NativeSelect name="connection_type" defaultValue={connection_type}>
							<option value={"directa"}>Directa</option>
							<option value={"semi-directa"}>Semi-directa</option>
							<option value={"indirecta"}>Indirecta</option>
						</NativeSelect>
					) : (
						<Typography sx={{...style.infoStyle}}>{connection_type}</Typography>
					)}
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>Storage System</Typography>

					{edit ? (
						<NativeSelect name="storage_system" defaultValue={storage_system}>
							<option value={"interno"}>Interno</option>
							<option value={"externo"}>Externo</option>
						</NativeSelect>
					) : (
						<Typography sx={{...style.infoStyle}}>{storage_system}</Typography>
					)}
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>condition</Typography>

					{edit ? (
						<NativeSelect name="condition" defaultValue={condition}>
							<option value={"usado"}>Usado</option>
							<option value={"nuevo"}>Nuevo</option>
						</NativeSelect>
					) : (
						// <TextField name="condition" defaultValue={condition} />
						<Typography sx={{...style.infoStyle}}>{condition}</Typography>
					)}
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>Owner</Typography>

					{edit ? (
						<NativeSelect name="owner" defaultValue={owner}>
							<option value={"RF"}>RF</option>
							<option value={"OR"}>Semi-directa</option>
						</NativeSelect>
					) : (
						<Typography sx={{...style.infoStyle}}>{owner}</Typography>
					)}
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>Location</Typography>

					{edit ? (
						<TextField name="location" defaultValue={location} />
					) : (
						<Typography sx={{...style.infoStyle}}>{location}</Typography>
					)}
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>Manufacturer</Typography>

					{edit ? (
						<TextField name="manufacturer" defaultValue={manufacturer} />
					) : (
						<Typography sx={{...style.infoStyle}}>{manufacturer}</Typography>
					)}
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>Purchase</Typography>

					{edit ? (
						<TextField
							helperText={"dd/mm/yyyy"}
							type={"date"}
							name="purchase"
							defaultValue={formatDate(purchase)}
						/>
					) : (
						<Typography sx={{...style.infoStyle}}>{purchase}</Typography>
					)}
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>i_max</Typography>

					{edit ? (
						<TextField name="i_max" defaultValue={i_max} />
					) : (
						<Typography sx={{...style.infoStyle}}>{i_max}</Typography>
					)}
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>i_b</Typography>

					{edit ? (
						<TextField name="i_b" defaultValue={i_b} />
					) : (
						<Typography sx={{...style.infoStyle}}>{i_b}</Typography>
					)}
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>i_n</Typography>

					{edit ? (
						<TextField name="i_n" defaultValue={i_n} />
					) : (
						<Typography sx={{...style.infoStyle}}>{i_n}</Typography>
					)}
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>Seals</Typography>

					{edit ? (
						<TextField name="seals" defaultValue={seals} />
					) : (
						<Typography sx={{...style.infoStyle}}>{seals}</Typography>
					)}
				</FormControl>

				{!edit ? (
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Box>
							<Button onClick={handleSwitchEdit}>Edit</Button>
							<Button
								color="error"
								variant="contained"
								onClick={() => {
									setWillDeleteTrue()
								}}
							>
								Delete
							</Button>
						</Box>
						<Button color="error" variant="outlined" onClick={handleClose}>
							Close
						</Button>
					</Box>
				) : (
					<Box>
						<Button onClick={handleSwitchSure}>Submit</Button>
						<Button onClick={handleSwitchEdit} color="error">
							Cancel
						</Button>
					</Box>
				)}

				<Modal
					hideBackdrop
					open={sure}
					sx={{height: "auto"}}
					onClose={handleSwitchSure}
				>
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
							Seguro que desea hacer los cambios?
						</Typography>
						<Box>
							<Button onClick={handleSubmit}>Save</Button>
							<Button color="error" onClick={handleSwitchSure}>
								Cancel
							</Button>
						</Box>
					</Box>
				</Modal>
				<DeleteModal
					id={id}
					willDelete={willDelete}
					// setWillDeleteTrue={setWillDeleteTrue}
					setWillDeleteFalse={setWillDeleteFalse}
					setNeedUpdate={setNeedUpdate}
					setOpenInfoFalse={handleClose}
				/>
			</Box>
		</Modal>
	)
}

export default ShowInfoModal
