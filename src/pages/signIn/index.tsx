import Image from "next/image"
import { useState } from "react";
import { useRouter } from 'next/navigation'
import darkLogo from "../../images/darkLogo.png"
import { MdArrowRight } from "react-icons/md";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion"
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/userSlice";


const signInSchema = Yup.object({
    email: Yup.string().required().email("Enter your email"),
    password: Yup.string().required("Enter your password"),
})

const initialValues = {
    email: "",
    password: ""
}

const SignIn = () => {

    const auth = getAuth();
    const router = useRouter()
    const dispatch = useDispatch()
    const [firebaseErr, setFirebaseErr] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: signInSchema,
        onSubmit: (values, action) => {
            setLoading(true)
            setFirebaseErr("")
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    dispatch(setUserInfo({
                        _id:user.uid,
                        userName:user.displayName,
                        email:user.email
                    }))
                    console.log(user)
                    setLoading(false)
                    setMessage("Logged in successfully! Welcome you back!")
                    setTimeout(() => {
                        router.push("/")
                    }, 2000)
                    // ...
                })
                .catch((error) => {
                    setLoading(false)
                    const errorCode = error.code
                    console.log(errorCode)
                    if(errorCode.includes("auth/invalid-credential")){
                        setFirebaseErr("Invalid email or password")
                    }
                });
            action.resetForm()
        }
    })

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik

    return (
        <div className="w-full">
            <div className="w-full bg-gray-100 ph-10">
                <form onSubmit={handleSubmit} className="w-[370px] mx-auto flex flex-col items-center py-8">
                    <Image 
                    onClick = {()=>router.push("/")}
                    className="w-32 cursor-pointer" src={darkLogo} alt="signIn Logo" />
                    <div className="w-full border border-zinc-200 p-6">
                        <h2 className="text-3xl font-medium mb-4">Sign in</h2>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2" >
                                <p className="text-sm font-medium">Email or mobile phone number</p>
                                <input
                                    className="w-full lowercase py-1 border border-zinc-400 px-2 
                                text-base rounded-sm outline-none focus-within:border-amazon_yellow 
                                focus-within:shadow-amazonInput duration-100"
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handleChange}
                                    value={values.email}
                                    onBlur={handleBlur} />
                                <p className="text-xs text-red-600 font-semibold tracking-wide">{errors.email && touched.email && <span>{errors.email}!</span>}</p>
                            </div>
                            <div className="flex flex-col gap-2" >
                                <p className="text-sm font-medium">Password</p>
                                <input className="w-full lowercase py-1 border border-zinc-400 px-2 
                                text-base rounded-sm outline-none focus-within:border-amazon_yellow 
                                focus-within:shadow-amazonInput duration-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={handleChange}
                                    value={values.password}
                                    onBlur={handleBlur} />
                                <p className="text-xs text-red-600 font-semibold tracking-wide">{errors.password && touched.password && <span>{errors.password}!</span>}</p>
                            </div>
                            <button type="submit"
                                className="w-full lowercase py-1.5 border border-zinc-400 px-2 
                                text-sm font-normal bg-gradient-to-t from-[#f0c14b] hover:bg-gradient-to-b rounded-sm 
                                active:border-yello-800 active:shadow-amazonInput
                                 duration-100"
                            >Continue
                            </button>
                            {
                                loading && (
                                    <div className="flex justify-center">
                                        <RotatingLines
                                            visible={true}
                                            strokeColor="#febd69"
                                            width="50"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                        />
                                    </div>
                                )}
                            {
                                message && (
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
                                )
                            }
                             {
                                firebaseErr && (
                                    <div>
                                        <motion.p
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            className="text-base font-semibold text-red-500 border-[1px]
                                                       border-red-500 px-2 text-center"
                                        >{firebaseErr}
                                        </motion.p>
                                    </div>
                                )
                            }
                        </div>
                        <p className="text-xs text-black leading-4 mt-4">Continuing, you agree to Amazon's <span className="text-blue-600">Conditions of Use</span> and <span className="text-blue-600">Privacy Notice.</span></p>
                        <p className="text-xs text-gray-600 mt-4 cursor-pointer flex items-center group">
                            <MdArrowRight className="text-[16px]" /><span className="text-blue-600 group-hover:text-orange-700 group-hover:underline">Need help?</span>
                        </p>
                    </div>
                    <p className="w-full mt-4 text-xs text-gray-600 flex items-center">
                        <span className="w-1/3 h-[1px] bg-zinc-400"></span>
                        <span className="w-1/3 text-center">New to Amazon?</span>
                        <span className="w-1/3 h-[1px] bg-zinc-400"></span>
                    </p>
                    <Link className="w-full" href="/registration">
                        <button className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm
                    bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border 
                    border-zinc-400 active:border-yellow-800 active:shadow-amazonInput">
                            Create your Amazon account
                        </button>
                    </Link>
                </form>
            </div>
            <div className="w-full gap-3 bg-gradient-to-t from-white via-white to-zinc-200 h-20 flex flex-col items-center justify-center">
                <div className="flex items-center gap-6 mt-3 justify-center">
                    <p className="text-xs text-blue-600 hover:text-orange-700 hover:underline 
                    duration-100 cursor-pointer">Conditions of Use
                    </p>
                    <p className="text-xs text-blue-600 hover:text-orange-700 hover:underline 
                    duration-100 cursor-pointer">Pravicy Notice
                    </p>
                    <p className="text-xs text-blue-600 hover:text-orange-700 hover:underline 
                    duration-100 cursor-pointer">Help
                    </p>
                </div>
                <p className="text-xs text-gray-600">© 1996-2024, Amazon.com, Inc. or its affiliates</p>
            </div>
        </div>
    )
}

export default SignIn