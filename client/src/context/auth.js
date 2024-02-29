import { createContext , useContext ,useState,useEffect } from 'react';

export const Authentication = createContext()

 const Authprovider = ({children})=>{
const [auth, setAuth] = useState({
    user:null,
    token:'',
});

useEffect(() => {
    const data = localStorage.getItem('auth');
if(data){
    const parsedata = JSON.parse(data)
    setAuth({
        ...auth,
        user:parsedata.user,
        token:parsedata.token
    })
}
 }, [])

return (
    <Authentication.Provider value={{ auth, setAuth }}
       
    >
        {children}
    </Authentication.Provider>
)
 }

 // Custom Hook

 const useauth = ()=> useContext(Authentication )

 export {useauth, Authprovider }