import { useState } from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image"
import darkLogo from "../../images/darkLogo.png"
import { MdArrowRight } from "react-icons/md";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion"



const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string().min(6).required("Password should have atleast 6 characters"),
  confirmPassword: Yup.string().required().oneOf([Yup.ref("password")], "Password should be matched")
})

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const Registration = () => {

  const router = useRouter()
  const [firebaseErr, setFirebaseErr] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const auth = getAuth();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      console.log(values)
      setLoading(true)
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          // ...
          let User: any = auth?.currentUser
          updateProfile(User, { displayName: values.name })
          setLoading(false)
          setMessage("Account created successfully!")
          setTimeout(() => {
            router.push('/signIn')
          }, 3000)
        })
        .catch((error: any) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("Email already in use, Try another one")
          }
        });
      action.resetForm()
    }
  })
  const { errors, touched, values, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 ph-10">
        <form onSubmit={handleSubmit} className="w-[370px] mx-auto flex flex-col items-center py-8">
          <Image className="w-32" src={darkLogo} alt="signIn Logo" />
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="text-3xl font-medium mb-4">
              Create Account</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2" >
                <p className="text-sm font-medium">
                  Your name
                </p>
                <input
                  className="w-full py-1 border border-zinc-400 px-2 
                          text-base rounded-sm outline-none focus-within:border-amazon_yellow 
                          focus-within:shadow-amazonInput duration-100"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="name" />
                <p className="text-xs text-red-600 font-semibold tracking-wide">{errors.name && touched.name && <span>{errors.name}!</span>}</p>
              </div>
              <div className="flex flex-col gap-2" >
                <p className="text-sm font-medium">
                  Email or mobile phone number
                </p>
                <input
                  className="w-full lowercase py-1 border border-zinc-400 px-2 
                          text-base rounded-sm outline-none focus-within:border-amazon_yellow 
                          focus-within:shadow-amazonInput duration-100"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="email" />
                <p className="text-xs text-red-600 font-semibold tracking-wide">{errors.email && touched.email && <span>{errors.email}!</span>}</p>
                {firebaseErr ? <p className="text-xs text-red-600 font-semibold tracking-wide">{firebaseErr}!</p> : null}
              </div>
              <div className="flex flex-col gap-2" >
                <p className="text-sm font-medium">
                  Password
                </p>
                <input
                  className="w-full py-1 border border-zinc-400 px-2 
                            text-base rounded-sm outline-none focus-within:border-amazon_yellow 
                            focus-within:shadow-amazonInput duration-100"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="password" />
                <p className="text-xs text-red-600 font-semibold tracking-wide">{errors.password && touched.password && <span>{errors.password}!</span>}</p>
              </div>
              <div className="flex flex-col gap-2" >
                <p className="text-sm font-medium">
                  Re-enter Password
                </p>
                <input
                  className="w-full py-1 border border-zinc-400 px-2 
                            text-base rounded-sm outline-none focus-within:border-amazon_yellow 
                            focus-within:shadow-amazonInput duration-100"
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="confirmPassword" />
                <p className="text-xs text-red-600 font-semibold tracking-wide">{errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}!</span>}</p>
                <p className="text-xs text-gray-600">Password must be atleast 6 charachters.</p>
              </div>
              <button
                type="submit"
                onClick={() => handleSubmit}
                className="w-full py-1.5 border border-zinc-400 px-2 
                        text-sm font-normal bg-gradient-to-t from-[#f0c14b] hover:bg-gradient-to-b rounded-sm 
                        active:border-yello-800 active:shadow-amazonInput
                        duration-100" >
                Continue
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
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              Continuing, you agree to Amazon's{" "}
              <span className="text-blue-600">Conditions of Use</span> and{" "}
              <span className="text-blue-600">Privacy Notice.</span>
            </p>
            <div className="mt-3">
              <p className="text-xs text-black flex gap-1">
                Already have an account?
                <Link href="/signIn">
                  <span className="flex items-center text-xs text-blue-600 
                hover:text-orange-600 hover:underline cursor-pointer duration-100">
                    Sign in
                    <span><MdArrowRight className="text-[16px]" />
                    </span>
                  </span>
                </Link>
              </p>
              <p className="text-xs text-black flex gap-1">
                Buying for work?
                <span className="flex items-center text-xs text-blue-600 
                hover:text-orange-600 hover:underline cursor-pointer duration-100">
                  create a free buiness account
                  <span><MdArrowRight className="text-[16px]" />
                  </span>
                </span>
              </p>
            </div>
          </div>
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
  );
};

export default Registration