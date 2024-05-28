import { ReactNode } from "react";

interface Props {
  children : ReactNode;
}

const googleAuthorization = async ({children} : Props) => {
  //send req.auth
  //verify if the token.sub is = in the database
  //if(!token is not in the database or null then the send a 401)

  const response = await fetch("http://localhost:3000/authenticate/checkAuth", { 
    credentials: 'include',
  })

  const [row] = await response.json();
  if(!row) return 
  return (
    <>
    
    </>
  )
}

export default googleAuthorization
 