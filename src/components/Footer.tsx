
const Footer = () => {
    return(
        <div className="footer-wrapper w-full h-[60px] bg-red-700">
            <div className="footer flex justify-between w-full  max-w-[90%] m-auto p-2">
            © {new Date().getFullYear()} SL News. All rights reserved.
  
            </div>
        </div>
    )
}

export default Footer;