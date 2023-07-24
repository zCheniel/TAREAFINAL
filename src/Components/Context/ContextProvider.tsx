import React, {createContext} from "react"
import admin from "./default"
import UserI from "../../../Interfaces/User"
import openSesion from "./OpenSesion"
import closeSesion from "./CloseSesion"
import ValidateSesion from "./ValidateSesion"

export const DataContext = createContext<any>({})

export function ContextProvider({children}: any) {
	const verify = (data: UserI): boolean => {
		const {username, password} = admin
		const {username: usernameComp, password: passwordComp} = data
		console.log("data: ", data, " admin: ", admin)
		const correct =
			username === usernameComp && password === passwordComp ? true : false
		console.log(correct, "es correcto?")
		return correct
	}

	return (
		<DataContext.Provider
			value={{verify, openSesion, closeSesion, ValidateSesion}}
		>
			{children}
		</DataContext.Provider>
	)
}
