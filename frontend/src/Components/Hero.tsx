import heroImage from '../assets/cover.jpg'
const Hero = () => {

  return (
    <div className="flex justify-center rounded-[25px]">
      <div className="main-image">
        <img src={heroImage} />
        {
        <button className="text-[35px] bg-[#ffffff] py-3 px-5 rounded-full text-[#452aba] hover:text-[white] hover:bg-[#452aba]">
          WATCH
        </button>
        }
      </div>  
    </div>
  )
}

export default Hero