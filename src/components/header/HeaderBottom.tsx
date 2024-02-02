import { LuMenu } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { userSignOut } from "@/redux/amazonSlice";
import { useState } from "react";
import { motion } from "framer-motion"


const HeaderBottom = () => {

    const [message, setMessage] = useState("")
    const userInfo = useSelector((state: any) => state.amazonReducer.userInfo)
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
            {/* {
                message ? (
                    <div>
                        <motion.p
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-base font-semibold text-green-500 border-[1px]
                            border-green-500 px-2 text-center"
                        >{message}
                        </motion.p>
                    </div>
                ) : null
            } */}
        </div>

    )
}

export default HeaderBottom