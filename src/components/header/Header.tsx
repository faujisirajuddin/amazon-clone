import Image from "next/image"
import logo from "../../images/logo.png"
import cartIcon from "../../images/cartIcon.png"
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import Link from "next/link";
import { useSelector } from "react-redux";
import { MdArrowDropDown } from "react-icons/md";
import { useState } from "react";
import { allItems } from "../footer/constant"


const Header = () => {

    const userInfo = useSelector((state: any) => state.amazonReducer.userInfo)
    const [showAll, setShowAll] = useState(false)
    return (
        <>
            <div className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50">
                <div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4">
                    {/* logo */}
                    <Link href="/">
                        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]">
                            <Image className="w-28 object-cover mt-1" src={logo} alt="logoImg" />
                        </div>
                    </Link>
                    {/* delivery*/}
                    <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] hidden xl:inline-flex gap-1">
                        <SlLocationPin />
                        <div className="text-xs">
                            <p>Deliver to</p>
                            <p className="text-white font-bold">USA</p>
                        </div>
                    </div>
                    {/* searchbar */}
                    <div className="h-10 rounded-md flex flex-grow relative">
                        <span onClick={() => setShowAll(!showAll)} className="w-14 h-full bg-gray-200 hover:bg-gray-300 
                        border-2 cursor-pointer duration-300 text-sm text-amazon_blue 
                        flex items-center justify-center rounded-tl-md rounded-bl-md "
                        >All<span></span><MdArrowDropDown />
                        </span>
                        {
                            showAll && (
                                <div>
                                    <ul className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll
                                    overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2
                                    flex flex-col gap-1 z-50">
                                        {
                                            allItems.map((item: any) => (
                                                <li className="text-sm tracking-wide border-b-[1px] 
                                                border-b-transparent hover:border-b-amazon_blue 
                                                cursor-pointer duration-200">
                                                    {item.title}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            )
                        }
                        <input className="h-full rounded-tr-md rounded-br-md flex-grow px-2 placeholder:text-sm text-base text-amazon_blue border-[3px] 
                        border-transparent outline-none focus-visible:border-amazon_yellow"
                            type="test"
                            placeholder="Search amazon product" />
                        <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex justify-center
                         cursor-pointer items-center absolute right-0 rounded-tr-md rounded-br-md">
                            <HiOutlineSearch />
                        </span>
                    </div>
                    {/* signin */}
                    <Link href="/signIn">
                        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 justify-center h-[70%] text-xs text-gray-100 flex flex-col">
                            {
                                userInfo ? (
                                    <p className="text-sm text-gray-100 font-medium">{userInfo.userName}</p>
                                ) : (
                                    <p className="text-xs">Hello, sign in</p>
                                )
                            }
                            <p className="text-white font-bold flex items-center">
                                Account & Lists
                                <span><BiCaretDown /></span>
                            </p>
                        </div>
                    </Link>
                    {/* favorite */}
                    <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 justify-center h-[70%] text-xs text-gray-100 flex flex-col">
                        <p>Marked</p>
                        <p className="text-white font-bold">& Favorite</p>
                    </div>
                    {/* cart */}
                    <Link href="/cart">
                        <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 justify-center h-[70%] relative">
                            <Image className="w-auto object-cover h-8" src={cartIcon} alt="cartImg" />
                            <p className="text-xs text-white font-bold mt-3">cart</p>
                            <span className="absolute text-amazon_yellow text-sm top-0 left-[29px] font-semibold ">0</span>
                        </div>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default Header