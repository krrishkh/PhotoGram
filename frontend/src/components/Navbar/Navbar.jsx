import { Link } from "react-router-dom";

function Navbar () {
    return (
        <div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
            <nav className="flex items-center justify-between ">
            <a href="/">
                <div className=" p-9 text-5xl  bg-gradient-to-r from-pink-400 via-slate-500 to-purple-600  text-transparent bg-clip-text ">
                    PhotoGram
                </div>
            </a>
            <div className="text-2xl p-9">
                <a href="">
                    Register
                </a>
            </div>
        </nav>
        </div>
        
    )
}



export default Navbar;
