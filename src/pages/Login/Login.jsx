import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Link, useLocation } from 'react-router'
import groceryCart from "../../assets/Images/login-img.png";
import { motion } from "framer-motion";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Truck,
  ShieldCheck,
  Clock,
  CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router";
import { sendDataToLogin } from "../../services/auth-service";
import { AuthContext } from "../../context/Auth.context";

export default function Login() {
  const location = useLocation()
  const from = location?.state?.from || "/"



  const { setToken } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isLoader, setIsLoader] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [inCorrectCredentialMes, setInCorrectCredentialMes] = useState('')

  async function handleLogin(values) {
    try {
      setIsLoader(true)

      const response = await sendDataToLogin(values)

      if (response.success) {
        toast.success("Welcome Back!");
        setToken(response.data.token)
        if (values.rememberMe) {
          localStorage.setItem("token", response.data.token)
        } else {
          sessionStorage.setItem("token", response.data.token)
        }
        setTimeout(() => {
          navigate(from);
        }, 1500);
        setIsLoader(false)
      }



    } catch (error) {
      setIsLoader(false)
      setInCorrectCredentialMes(error?.message || "Login failed. Please try again.")
    }

  }


  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("*Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("*Password is required"),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: handleLogin
  })


  function handleChange(e) {

    setInCorrectCredentialMes(null)
    formik.handleChange(e)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 lg:p-12 xl:p-24 overflow-hidden">
      <Helmet>
        <title>Login - FreshCart</title>
      </Helmet>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* LEFT COLUMN: BRAND CONTENT */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col items-center text-center space-y-10"
        >
          <div className="relative group">
             <div className="absolute inset-x-0 -bottom-8 h-8 bg-gray-900/10 blur-xl rounded-[100%] scale-90 mx-auto"></div>
             <img 
               src={groceryCart} 
               alt="FreshCart Groceries" 
               className="w-full max-w-lg object-contain drop-shadow-2xl group-hover:-translate-y-2 transition-transform duration-500 ease-out" 
             />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              Fresh Groceries Delivered
            </h1>
            <p className="text-gray-500 text-base font-medium leading-relaxed max-w-md mx-auto">
              Join thousands of happy customers who trust FreshCart for their daily grocery needs
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                <Truck size={16} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Free Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                <ShieldCheck size={16} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Clock size={16} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">24/7 Support</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: LOGIN FORM CARD */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="w-full max-w-md mx-auto"
        >
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-primary-600/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-32 h-32 bg-primary-600/5 rounded-full blur-3xl"></div>

            <h1 className="text-center text-3xl font-extrabold relative z-10">
              <span className="text-primary-600">Fresh</span>Cart
            </h1>

            <h2 className="mt-6 text-center text-3xl font-black text-gray-900 tracking-tight">
              Welcome Back!
            </h2>

            <p className="mt-2 text-center text-sm text-gray-400 font-bold">
              Sign in to continue your fresh shopping experience
            </p>

            {/* Social Login */}
            <div className="space-y-3 mt-8">
              <button className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-50 bg-white hover:bg-gray-50 hover:border-gray-100 transition-all font-bold text-gray-700 active:scale-[0.98]">
                <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
                Continue with Google
              </button>

              <button className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-50 bg-white hover:bg-gray-50 hover:border-gray-100 transition-all font-bold text-gray-700 active:scale-[0.98]">
                <FontAwesomeIcon icon={faFacebook} className="text-[#1877F2]" />
                Continue with Facebook
              </button>
            </div>

            <div className="my-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest whitespace-nowrap px-1">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary-600 transition" size={18} />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`w-full h-12 rounded-2xl border-2 pl-12 pr-4 outline-none transition-all placeholder:text-gray-300 font-medium ${
                        formik.touched.email && formik.errors.email 
                        ? "border-red-100 bg-red-50/20 focus:border-red-500" 
                        : "border-gray-50 bg-gray-50/50 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-600/5"
                    }`}
                    value={formik.values.email}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs font-bold ml-2">{formik.errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-bold text-gray-700" htmlFor="password">
                    Password
                  </label>
                  <Link to='/forgot-password' className="text-xs font-bold text-primary-600 hover:text-primary-700 focus:ring-0 outline-none">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary-600 transition" size={18} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className={`w-full h-12 rounded-2xl border-2 pl-12 pr-12 outline-none transition-all placeholder:text-gray-300 font-medium ${
                        formik.touched.password && formik.errors.password 
                        ? "border-red-100 bg-red-50/20 focus:border-red-500" 
                        : "border-gray-50 bg-gray-50/50 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-600/5"
                    }`}
                    value={formik.values.password}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs font-bold ml-2">{formik.errors.password}</p>
                )}
                {inCorrectCredentialMes && (
                    <p className="text-red-500 text-xs font-bold mt-2 ml-2 bg-red-50 p-2 rounded-lg border border-red-100">
                      {inCorrectCredentialMes}
                    </p>
                )}
              </div>

              <div className="flex items-center px-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      name="rememberMe" 
                      className="peer sr-only"
                      onChange={formik.handleChange} 
                      onBlur={formik.handleBlur}
                      checked={formik.values.rememberMe}
                    />
                    <div className="w-5 h-5 border-2 border-gray-200 rounded-lg bg-gray-50 transition-all peer-checked:bg-primary-600 peer-checked:border-primary-600"></div>
                    <CheckCircle2 className="absolute text-white transition-opacity opacity-0 peer-checked:opacity-100 inset-0 m-auto" size={14} strokeWidth={4} />
                  </div>
                  <span className="text-sm font-bold text-gray-400 group-hover:text-gray-600 transition">Keep me signed in</span>
                </label>
              </div>

              <div className="pt-2">
                {isLoader ? (
                  <button disabled className="w-full h-14 bg-primary-600/80 text-white rounded-2xl flex justify-center items-center shadow-lg shadow-primary-600/20">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full h-14 bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all duration-300 shadow-xl shadow-primary-600/20 active:scale-[0.98] transform hover:-translate-y-0.5"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </form>

            <footer className="mt-10 pt-8 border-t border-gray-50 text-center space-y-6">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                New to FreshCart? 
                <Link to="/signup" className="text-primary-600 font-black ml-2 hover:text-primary-700">Create an account</Link>
              </p>
              
              <div className="flex justify-center flex-wrap gap-6 opacity-60">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <Lock size={12} className="text-primary-600" />
                  SSL Secured
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                   <Clock size={12} className="text-primary-600" />
                   50K+ Users
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                   <ShieldCheck size={12} className="text-primary-600" />
                   4.9 Rating
                </div>
              </div>
            </footer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}