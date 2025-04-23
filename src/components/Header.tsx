import logo from "../assets/sl_logo.jpg"

const Header = () => {
  return (
    <div className="header-wrapper  w-full">
        <div className="header flex justify-between w-full  max-w-[90%] m-auto p-2">
            <div className="site-logo">
                <a href="/"><img src={logo} alt="Site Logo" className="h-[55px] md:h-[100px] lg:h-[110px]" /></a>
            </div>
            <div className="h-add-banner w-[200px] md:w-[500px] lg:w-[570px] h-[55px] md:h-[100px] bg-green-800 float-rights"></div>
        </div>

    </div>
  )
}

export default Header;