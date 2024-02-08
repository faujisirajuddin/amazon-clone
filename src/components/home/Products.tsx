import { ProductProps } from "@/type"
import Image from "next/image"
import { HiShoppingCart } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import FormattedPrice from "./FormattedPrice";
import { useDispatch } from "react-redux";
import { addToCart, addToFavorite } from "@/redux/productSlice";

const Products = ({ productData }: any) => {
    const dispatch = useDispatch()
    return (
        <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {
                productData.map(({
                    _id,
                    title,
                    brand,
                    category,
                    description,
                    image,
                    isNew,
                    price,
                    oldPrice
                }: ProductProps) => (
                    <div key={_id} className="w-full bg-white text-black p-4 
                    border border-gray-300 rounded-lg group  overflow-hidden">
                        <div className="w-full h-[260px] relative">
                            <Image
                                className="w-full h-full object-cover scale-90 hover:scale-100 
                        transition-transform duration-300"
                                width={300}
                                height={300}
                                src={image}
                                alt="productImg" />
                            <div className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400
                              bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
                                <span 
                                 onClick={() =>
                                    dispatch(
                                        addToCart({
                                            _id: _id,
                                            brand: brand,
                                            category: category,
                                            image: image,
                                            description: description,
                                            isNew: isNew,
                                            oldPrice: oldPrice,
                                            price: price,
                                            title: title,
                                            quantity: 1
                                        }))}
                                className="w-full h-full border-b-[1px] border-b-gray-400 
                                flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow 
                                cursor-pointer duration-300">
                                    <HiShoppingCart />
                                </span>
                                <span 
                                 onClick={() =>
                                    dispatch(
                                        addToFavorite({
                                            _id: _id,
                                            brand: brand,
                                            category: category,
                                            image: image,
                                            description: description,
                                            isNew: isNew,
                                            oldPrice: oldPrice,
                                            price: price,
                                            title: title,
                                            quantity: 1
                                        }))}
                                className="w-full h-full 
                                flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow 
                                cursor-pointer duration-300">
                                    <FaHeart />
                                </span>
                            </div>
                            {
                                isNew && <p className="absolute top-0 right-0 text-amzon_blue 
                                font-medium text-sm tracking-wide animate-bounce">
                                    !save <FormattedPrice amount={oldPrice - price} /></p>
                            }
                        </div>
                        <hr />
                        <div className="px-4 py-3 flex flex-col gap-1">
                            <p className="text-xs text-gray-500 tracking-wide">{category}</p>
                            <p className="text-base font-semibold">{title}</p>
                            <p className="flex items-center gap-2">
                                <span className="text-sm line-through">
                                    <FormattedPrice amount={oldPrice} />
                                </span>
                                <span className=" text-amzon_blue font-semibold">
                                    <FormattedPrice amount={price} />
                                </span>
                            </p>
                            <p className="text-xs text-gray-600 text-justify">
                                {description.substring(0, 120)}
                            </p>
                            <button
                                onClick={() =>
                                    dispatch(
                                        addToCart({
                                            _id: _id,
                                            brand: brand,
                                            category: category,
                                            image: image,
                                            description: description,
                                            isNew: isNew,
                                            oldPrice: oldPrice,
                                            price: price,
                                            title: title,
                                            quantity: 1
                                        }))}
                                className="h-10 font-medium bg-amazon_blue text-white rounded-md 
                                hover:bg-amazon_yellow hover:text-amazon_blue duration-300 mt-2">
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Products