import { faShieldHalved, faStar, faTruckFast, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import reviewAuthImg from '../../assets/Images/review-author.png'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { sendDataToSignUp } from '../../services/auth-service'
import { checkPasswordStrength } from '../../utils/password.strenght';
import { Helmet } from "react-helmet";


export default function Signup() {
  const navigate = useNavigate()
  const [exitError, seTExitError] = useState(null)
  const [isLoader, setIsLoader] = useState(false)

  async function handleSignup(values) {

    seTExitError(null)
    setIsLoader(true)

    try {


      const response = await sendDataToSignUp(values)

      if (response.success) {
        toast.success("Signup successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        setIsLoader(false)
      }

    } catch (error) {

      setIsLoader(false)

      seTExitError(error?.message || "An error occurred. Please try again.");
    }

  }


  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("*Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("*Email is required"),

    phone: Yup.string()
      .matches(/^(\\+20|0)?1[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("*Phone number is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("*Password is required"),

    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("*Please confirm your password"),

    term: Yup.boolean()
      .oneOf([true], "*You must accept the terms")
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      repeatPassword: "",
      term: false
    },
    validationSchema,
    onSubmit: handleSignup
  })


  const passwordFeedback = checkPasswordStrength(formik.values.password)
  return (

    <main className="signup-page py-12">
      <Helmet>
        <title>Signup - FreshCart</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT SIDE */}

        <div className="welcome-section py-6 md:py-10 space-y-8">

          <div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to <span className="text-primary-600">FreshCart!</span>
            </h2>

            <p className="text-base md:text-lg">
              Join thousands of satisfied customers today!
            </p>

          </div>


          {/* FEATURES */}

          <ul className="space-y-6">

            <li className="flex items-center gap-4">

              <div className="size-10 md:size-12 rounded-full bg-primary-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faStar} className="text-primary-600" />
              </div>

              <div>
                <h3 className="font-semibold">Premium Quality</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Experience the difference with our premium products.
                </p>
              </div>

            </li>


            <li className="flex items-center gap-4">

              <div className="size-10 md:size-12 rounded-full bg-primary-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faTruckFast} className="text-primary-600" />
              </div>

              <div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Get your products delivered quickly and safely.
                </p>
              </div>

            </li>


            <li className="flex items-center gap-4">

              <div className="size-10 md:size-12 rounded-full bg-primary-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faShieldHalved} className="text-primary-600" />
              </div>

              <div>
                <h3 className="font-semibold">Secure Payment</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Shop with confidence using secure payment.
                </p>
              </div>

            </li>

          </ul>


          {/* REVIEW */}

          <div className="bg-white shadow-md p-6 rounded-xl">

            <div className="flex items-center gap-4 mb-4">

              <img
                src={reviewAuthImg}
                alt="Review author"
                className="rounded-full size-10 md:size-12"
              />

              <div>

                <h3 className="font-semibold">Sarah M.</h3>

                <div className="flex text-yellow-500 gap-1">

                  {Array.from({ length: 5 }).map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} />
                  ))}

                </div>

              </div>

            </div>

            <blockquote className="text-gray-600 italic text-sm md:text-base">
              "I had an amazing experience shopping with FreshCart!
              The quality of the products is top-notch and delivery was fast."
            </blockquote>

          </div>

        </div>


        {/* RIGHT SIDE FORM */}

        <div className="signup-form bg-white p-6 md:p-10 rounded-xl shadow-xl space-y-8">

          <div className="text-center">

            <h2 className="text-xl md:text-2xl font-bold">
              Create Your Account
            </h2>

            <p className="text-sm md:text-base">
              Join us today and enjoy exclusive benefits!
            </p>

          </div>


          {/* SOCIAL LOGIN */}

          <div className="flex flex-col sm:flex-row gap-2">

            <button
              type="button"
              className="btn border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 w-full"
            >
              <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
              Google
            </button>

            <button
              type="button"
              className="btn border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 w-full"
            >
              <FontAwesomeIcon icon={faFacebook} className="text-primary-600" />
              Facebook
            </button>

          </div>


          <div className="relative h-px bg-gray-300">
            <span className="absolute bg-white px-3 left-1/2 -translate-x-1/2 -top-3">
              or
            </span>
          </div>


          {/* FORM */}

          <form onSubmit={formik.handleSubmit} className="space-y-6">

            {/* NAME */}
            <div className="flex flex-col gap-2">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Ali"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="ali@gmail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
              {exitError && (
                <p className="text-red-500 text-sm">{exitError}</p>
              )}
            </div>

            {/* PHONE */}
            <div className="flex flex-col gap-2">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="+20 1012345678"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Create password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}

              {formik.values.password && (
                <div className="password-strength flex items-center gap-2 mt-1">
                  <div className="bar h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${passwordFeedback.background} ${passwordFeedback.width}`}
                    ></div>
                  </div>
                  <span className={`text-xs font-medium ${passwordFeedback.textColor}`}>
                    {passwordFeedback.text}
                  </span>
                </div>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="flex flex-col gap-2">
              <label>Confirm Password</label>
              <input
                type="password"
                name="repeatPassword"
                className="form-control"
                placeholder="Confirm password"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.repeatPassword && formik.errors.repeatPassword && (
                <p className="text-red-500 text-sm">
                  {formik.errors.repeatPassword}
                </p>
              )}
            </div>

            {/* TERMS */}
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="term"
                  checked={formik.values.term}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="accent-primary-600"
                />
                <label className="text-sm">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary-600 underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary-600 underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {formik.touched.term && formik.errors.term && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.term}
                </p>
              )}
            </div>

            {/* SUBMIT */}

            {isLoader ? (
              <button disabled className="btn bg-primary-600 w-full text-white flex justify-center items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </button>
            ) : (
              <button
                type="submit"
                className="btn bg-primary-600 w-full text-white hover:bg-primary-700 flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faUserPlus} />
                Create Account
              </button>
            )}

          </form>


          <p className="text-center pt-6 border-t border-gray-200 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-600 underline">
              Sign In
            </Link>
          </p>

        </div>

      </div>

    </main>

  )
}
