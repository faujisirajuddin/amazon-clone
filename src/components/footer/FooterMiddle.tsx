import FooterMiddleList from "./FooterMiddleList"
import { middleList } from "./constant"
import logo from "../../images/logo.png"
import indFlag from "../../images/indFlag.jpg"
import Image from "next/image"

const FooterMiddel = () => {
    return (
        <div className="w-full bg-amazon_light text-white">
            {/* MiddleTop */}
            <div className="w-full border-b-[1px] border-gray-500 py-10">
                <div className="max-w-5xl mx-auto text-gray-300">
                    <div className="w-full grid grid-cols-4 place-items-center items-start">
                        {
                            middleList.map((item: any) => (
                                <FooterMiddleList
                                    key={item._id}
                                    title={item.title}
                                    listItem={item.listItem} />
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* MiddleBottom */}
            <div className="w-full flex gap-5 items-center justify-center py-6">
                <div>
                    <Image className="w-20 pt-3" src={logo} alt="logoImg" />
                </div>
                <div className="flex gap-2">
                    <p className="flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow px-2 py-1 cursor-pointer duration-200">English</p>
                </div>
                <div className="flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1">
                    <Image className="w-6" src={indFlag} alt="indFlag" />
                <p>India</p>
                </div>
            </div>
        </div>
    )
}

export default FooterMiddel