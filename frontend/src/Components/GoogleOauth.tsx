import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";


const GoogleOauth = () => {
  const [firstName, setFirstname] = useState<null | string>(null);
  const [lastname, setLastname] = useState<null | string>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);

  useEffect(()  => {
  const checkAuth = async () => {
    const response = await fetch("http://localhost:3000/authenticate/authorize", { 
      credentials: 'include',
    })

    const data = await response.json();
    console.log(data);
    setFirstname(data.given_name);
    setLastname(data.family_name);
    if(response.ok)
    setIsLoggedIn(true);
  }
  checkAuth();
  },[])

  


 const googleLogin = useGoogleLogin({
    onSuccess: async ({code}) => {
      console.log(code)
      const response = await fetch('http://localhost:3000/authenticate/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({code}),
        credentials: 'include',
      })
      const tokens = await response.json();
      setFirstname(tokens.given_name);
      setLastname(tokens.family_name);
      if(response.ok){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    },
    flow: 'auth-code',
  });
  
  console.log(isLoggedIn);
  console.log(firstName, lastname);
  return (
    <>
    { isLoggedIn ? (
      <div>{firstName} {lastname}</div>) 
      :
      (<button 
      onClick={() => googleLogin()} 
      className='border-solid border-2 border-[#452aba] p-2 self-end text-white bg-[#452aba]'
      >
      Sign in with Google 
      </button>)
    }
    </>
    )
}

export default GoogleOauth