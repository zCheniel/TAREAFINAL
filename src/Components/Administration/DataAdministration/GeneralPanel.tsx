import {
	Button,
	CircularProgress,
	FormControl,
	Grid,
	Pagination,
	Paper,
	SxProps,
	TextField,
	Typography,
} from "@mui/material"
import {Box} from "@mui/system"
import React, {useEffect, useRef, useState} from "react"
import axios from "axios"
import PaginationI from "../../../../Interfaces/Pagination"
import ItemInventario from "./Item"
import AddItemModal from "./AddItemModal"

interface panelStyles {
	container: SxProps
	subContainer: SxProps
	AddContainer: SxProps
	searchContainer: SxProps
	itemPanel: SxProps
	progressContainer: SxProps
}

const style: panelStyles = {
	container: {width: "100%", padding: "2rem"},
	subContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		"@media (min-width:960px)": {alignItems: "flex-end"},
	},
	AddContainer: {
		"@media (min-width:960px)": {
			width: "100%",
			height: "5rem",
			padding: "3rem",
		},
		"@media (min-width:0px)": {width: "100%", paddingY: "3rem"},
		marginBottom: "1rem",
	},
	searchContainer: {width: "100%", marginBottom: "1rem"},
	itemPanel: {
		width: "100%",
		backgroundColor: "#3496F7",
		boxSizing: "border-box",
		padding: "1rem",
	},
	progressContainer: {
		display: "flex",
		height: "50vh",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
}

function Panel() {
	const inputRef = useRef() as React.MutableRefObject<HTMLDivElement>

	// const initialState: PaginationI = {items:[]}
	const [pages, setPagination] = useState<PaginationI | null>(null)
	const [page, setPage] = useState<number>(1)
	const [count, setCount] = useState<number>(1)
	const [lookUp, setlookUp] = useState<string>("")
	const [noInformation, setNoInformation] = useState<boolean>(false)
	const [needUpdate, setNeedUpdate] = useState<boolean>(false)
	const [create, setCreate] = useState<boolean>(false)

	const handleCreate = (value: boolean) => setCreate((prev) => value)

	const fetchingData = async () => {
		try {
			if (lookUp !== "") {
				setPage((prev) => 1)
			}
			let data = await axios.get(
				`https://ops.enerbit.dev/learning/api/v1/meters?page=${
					page - 1
				}&size=10${lookUp !== "" ? `&serial=${lookUp}` : ""}`
			)
			let info: PaginationI = data.data
			setPagination((prev) => info)
			setCount((prev) => info.pages)
		} catch (e) {
			setPagination((prev) => null)
			setCount((prev) => 0)
			if (pages?.previous_page === null) {
				setTimeout(() => {
					setNoInformation((prev) => true)
				}, 1000)
			} else {
				setPage((prev) => 1)
			}
		}
	}

	const handleUpdate = () => {
		setNeedUpdate((prev) => !prev)
	}

	// Recuperacion de datos en la base de datos
	useEffect(() => {
		fetchingData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, lookUp, needUpdate])

	// state para la paginación
	const handleChange = (evt: React.ChangeEvent<unknown>, value: number) => {
		setPage((prev) => value)
	}

	const handleInputChange = () => {
		const value = extractInputValue()
		setlookUp((prev: string) => value)
	}

	const extractInputValue = (): any => {
		return inputRef?.current.querySelector("input")?.value
	}

	return (
		<Grid container sx={{...style.container}}>
			<Grid item component={Box} sx={{...style.subContainer}}>
				<Box>
					<Button
						onClick={() => {
							handleCreate(true)
						}}
						variant="contained"
						sx={{...style.AddContainer}}
					>
						Add Product
					</Button>
				</Box>
				<FormControl sx={{...style.searchContainer}}>
					<Typography
						fontFamily={"Tauri, sans-serif"}
						fontSize={"3vmin"}
						variant="h5"
						marginBottom={".5rem"}
					>
						Busqueda por serial
					</Typography>
					<TextField ref={inputRef} onChange={handleInputChange} />
				</FormControl>
				<Paper component={Box} sx={{...style.itemPanel}}>
					<Pagination
						color="primary"
						page={page}
						count={count}
						onChange={handleChange}
						boundaryCount={2}
					/>
					{pages === null ? (
						<Box sx={{...style.progressContainer}}>
							{!noInformation ? (
								<CircularProgress color="secondary" />
							) : (
								<Typography variant="h3" fontSize={"5vmin"}>
									No information
								</Typography>
							)}
						</Box>
					) : (
						<>
							{pages.items.map((x) => (
								<ItemInventario
									key={x.id}
									{...x}
									handleUpdate={handleUpdate}
									// setNeedUpdate={setNeedUpdate}
								/>
							))}
						</>
					)}
					<Pagination
						color="primary"
						page={page}
						count={count}
						onChange={handleChange}
						boundaryCount={2}
					/>
				</Paper>
			</Grid>
			<AddItemModal
				Update={handleUpdate}
				create={create}
				handleCreate={handleCreate}
			/>
		</Grid>
	)
}

export default Panel
