import { StateProps } from "@/type"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"

const FooterTop = () => {
    const router = useRouter()
    const {userInfo} = useSelector((state:StateProps)=>state.userReducer)

    return (
        <>
       {
        userInfo?null:
            <div className="w-full bg-white py-6">
            <div className="w-full border-t-[1px] border-b-[1px] py-8">
                <div className="w-64 mx-auto text-center flex flex-col gap-1 ">
                    <p className="text-sm">See Personalised recommendations</p>
                    <button
                        onClick={() => router.push("/signIn")}
                        className="w-full bg-amazon_yellow rounded-md py-1 font-semibold 
                    cursor-pointer hover:bg-yellow-500 active:bg-yellow-700">
                        Sign In
                    </button>
                    <p className="text-xs mt-1">New Customer?{" "}
                        <span
                            onClick={() => router.push("/registration")}
                            className="text-blue-600 ml-1 cursor-pointer">Start here.</span></p>
                </div>
            </div>
        </div>
        
       }
       </>
    )
}

export default FooterTop