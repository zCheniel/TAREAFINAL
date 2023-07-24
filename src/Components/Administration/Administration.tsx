import React, {useContext} from "react"
import HeaderGlo from "../Header/Header"
import {DataContext} from "../Context/ContextProvider"
import NotAllowed from "./NotAllowed"
import Panel from "./DataAdministration/GeneralPanel"

function Administration() {
	const {ValidateSesion} = useContext(DataContext)
	const allow = ValidateSesion()

	return (
		<>
			{allow ? (
				<>
					<HeaderGlo />
					<Panel />
				</>
			) : (
				<NotAllowed />
			)}
		</>
	)
}

export default Administration
