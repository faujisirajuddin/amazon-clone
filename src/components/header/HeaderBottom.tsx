import { LuMenu } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { userSignOut } from "@/redux/userSlice";
import { useState } from "react";

const HeaderBottom = () => {

    const [message, setMessage] = useState("")
    const userInfo = useSelector((state: any) => state.userReducer.userInfo)
    const dispatch = useDispatch()
    const auth = getAuth()

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                dispatch(userSignOut())
                setMessage("Sign out successfully!")
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <div className="w-full h-10 bg-amazon_light text-sm text-white px-4 flex items-center">
                <p className="flex items-center gap-1 h-8 border border-transparent hover:border-white cursor-pointer duration-300 px-2"><LuMenu className="text-xl" />All</p>
                <p className="hidden md:inline-flex items-center h-8 border border-transparent 
           hover:border-white cursor-pointer duration-300 px-2" > Todays Deal</p>
                <p className="hidden md:inline-flex items-center h-8 border border-transparent 
           hover:border-white cursor-pointer duration-300 px-2" > Customer Service</p>
                <p className="hidden md:inline-flex items-center h-8 border border-transparent 
           hover:border-white cursor-pointer duration-300 px-2" > Registry</p>
                <p className="hidden md:inline-flex items-center h-8 border border-transparent 
           hover:border-white cursor-pointer duration-300 px-2" > Gift cards</p>
                <p className="hidden md:inline-flex items-center h-8 border border-transparent 
           hover:border-white cursor-pointer duration-300 px-2" > Sell</p>
                {
                    userInfo ? <p onClick={handleSignOut}
                        className="hidden md:inline-flex items-center h-8 border border-transparent 
                        hover:border-red-600 hover:text-red-400 text-amazon_yellow 
                        cursor-pointer duration-300 px-2"
                    >
                        Sign Out
                    </p> : null
                }
            </div>
        </div>

    )
}

export default HeaderBottom