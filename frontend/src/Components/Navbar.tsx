import GoogleOauth from "./GoogleOauth"

const Navbar = () => {
  

  return (
    <div className='flex justify-between p-3 items-center'>
        <h1 className='font-bold text-[#452aba] text-[35px]'>WATCH ME</h1>
        <GoogleOauth />
    </div>
  )
}

export default Navbar