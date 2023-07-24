import React, {useEffect, useRef, useState} from "react"
import {
	FormControl,
	Modal,
	Typography,
	Button,
	TextField,
	NativeSelect,
	Paper,
} from "@mui/material"
import ItemBasicStructure from "../../../../Interfaces/Creation"

import {Box, SxProps} from "@mui/system"
import axios from "axios"

interface Props {
	Update: () => void
	create: boolean
	handleCreate: (value: boolean) => void
}

interface modalCreateStyles {
	container: SxProps
	typography: SxProps
	buttonContainerStyle: SxProps
	buttonStyle: SxProps
}

const style: modalCreateStyles = {
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
	buttonContainerStyle: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
		width: "100%",
		alignItems: "center",
	},
	buttonStyle: {
		display: "flex",
		padding: "2rem",
		width: "100%",
		"@media (min-width:960px)": {width: "25%", padding: "1rem"},
	},
}

function AddItemModal(props: Props) {
	const {Update, create, handleCreate} = props
	const [newCreation, setNewCreation] = useState<ItemBasicStructure | null>(
		null
	)

	const inputRef = useRef() as React.MutableRefObject<HTMLDivElement>

	const submitFormat = (date: string): string => {
		const toFormat = new Date(date)
		const formated = toFormat.toJSON()
		return formated
	}

	const formatDate = (date: string): string => {
		const transforming = new Date(date)
		const formater = transforming.toJSON()?.split("T")[0]

		return formater
	}

	const createRequest = async () => {
		try {
			const {status} = await axios.post(
				"https://ops.enerbit.dev/learning/api/v1/meters",
				newCreation
			)
			if (status === 201) {
				console.log("Post Creado Exitosamente")
				Update()
			}
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (newCreation !== null) {
			createRequest()
			handleCreate(false)
		} else {
			console.log("es null")
			handleCreate(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newCreation])

	const handleSubmit = () => {
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

		const newItem = factoryItem({data: reducer})

		setNewCreation((prev) => newItem)
	}

	const factoryItem = ({
		data,
	}: {
		data: ItemBasicStructure | any
	}): ItemBasicStructure => {
		const newItem: ItemBasicStructure = {
			serial: data.serial,
			connection_type: data.connection_type,
			storage_system: data.storage_system,
			condition: data.condition,
			owner: data.owner,
			location: data.location,
			manufacturer: data.manufacturer,
			purchase: data.purchase,
			i_max: data.i_max,
			i_b: data.i_b,
			i_n: data.i_n,
			seals: data.seals,
		}
		return newItem
	}

	return (
		<Modal
			open={create}
			onClose={() => {
				handleCreate(false)
			}}
		>
			<Box sx={{...style.container}} ref={inputRef}>
				<Paper
					sx={{
						width: "100%",
						height: "auto",
						boxSizing: "border-box",
						padding: "2rem",
						display: "flex",
						justifyContent: "space-between",
						flexWrap: "wrap",
					}}
				>
					{" "}
					<Typography sx={{...style.typography}} variant="h2">
						Adding Product
					</Typography>
					<Button
						variant="contained"
						color="error"
						onClick={() => {
							handleCreate(false)
						}}
					>
						Cancel
					</Button>
				</Paper>
				<FormControl>
					<Typography sx={{...style.typography}}>Serial</Typography>

					<TextField name="serial" />
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>connection_type</Typography>

					<NativeSelect name="connection_type" defaultValue={"directa"}>
						<option value={"directa"}>Directa</option>
						<option value={"semi-directa"}>Semi-directa</option>
						<option value={"indirecta"}>Indirecta</option>
					</NativeSelect>
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>Storage System</Typography>

					<NativeSelect name="storage_system" defaultValue={"interno"}>
						<option value={"interno"}>Interno</option>
						<option value={"externo"}>Externo</option>
					</NativeSelect>
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>condition</Typography>

					<NativeSelect name="condition" defaultValue={"usado"}>
						<option value={"usado"}>Usado</option>
						<option value={"nuevo"}>Nuevo</option>
					</NativeSelect>
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>Owner</Typography>

					<NativeSelect name="owner" defaultValue={"RF"}>
						<option value={"RF"}>RF</option>
						<option value={"OR"}>Semi-directa</option>
					</NativeSelect>
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>Location</Typography>

					<TextField name="location" />
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>Manufacturer</Typography>

					<TextField name="manufacturer" />
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>Purchase</Typography>

					<TextField
						helperText={"dd/mm/yyyy"}
						type={"date"}
						name="purchase"
						defaultValue={formatDate(new Date().toJSON())}
						// defaultValue={formatDate(purchase)}
					/>
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>i_max</Typography>

					<TextField
						defaultValue={0}
						inputProps={{min: 0}}
						onBlur={(evt) => {
							if (+evt.target.value < 0) {
								evt.target.value = "0"
							}
						}}
						type={"number"}
						name="i_max"
					/>
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>i_b</Typography>

					<TextField
						defaultValue={0}
						inputProps={{min: 0}}
						onBlur={(evt) => {
							if (+evt.target.value < 0) {
								evt.target.value = "0"
							}
						}}
						type={"number"}
						name="i_b"
					/>
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>i_n</Typography>

					<TextField
						defaultValue={0}
						inputProps={{min: 0}}
						onBlur={(evt) => {
							if (+evt.target.value < 0) {
								evt.target.value = "0"
							}
						}}
						type={"number"}
						name="i_n"
					/>
				</FormControl>

				<FormControl>
					<Typography sx={{...style.typography}}>Seals</Typography>

					<TextField
						defaultValue={0}
						inputProps={{min: 0}}
						onBlur={(evt) => {
							if (+evt.target.value < 0) {
								evt.target.value = "0"
							}
						}}
						type={"number"}
						name="seals"
					/>
				</FormControl>
				<Box sx={{...style.buttonContainerStyle}}>
					<Button
						variant="contained"
						sx={{...style.buttonStyle}}
						color="success"
						onClick={handleSubmit}
					>
						Save
					</Button>
					<Button
						sx={{...style.buttonStyle}}
						variant="contained"
						color="error"
						onClick={() => {
							handleCreate(false)
						}}
					>
						Cancel
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}

export default AddItemModal
