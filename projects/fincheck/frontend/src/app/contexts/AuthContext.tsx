import { createContext } from 'react'

type AuthContextValue = {
  signedIn: boolean
}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContext.Provider value={{ signedIn: false }}>{children}</AuthContext.Provider>
}
