import React from "react"
import {Box, SxProps} from "@mui/material"
import {AnimatePresence, motion} from "framer-motion"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./Components/Login/Login"
import {ContextProvider} from "./Components/Context/ContextProvider"
import Administration from "./Components/Administration/Administration"

interface generalStyles {
	container: SxProps
}

const style: generalStyles = {
	container: {
		height: "100vh",
		width: "100%",
		boxSizing: "border-box",
	},
}
function App() {
	return (
		<Box sx={{...style.container}}>
			<ContextProvider>
				<Router>
					<AnimatePresence>
						<Box
							sx={{height: "100vh"}}
							component={motion.div}
							initial={{opacity: 0, x: "-20rem"}}
							animate={{opacity: 1, x: "0"}}
							transition={{duration: 1}}
							exit={{opacity: 0, x: "20rem"}}
						>
							<Routes>
								<Route path="/" element={<Login />} />
								<Route path="/admin" element={<Administration />} />
							</Routes>
						</Box>
					</AnimatePresence>
				</Router>
			</ContextProvider>
		</Box>
	)
}

export default App
