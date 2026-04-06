import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faBagShopping, faBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Link } from 'react-router'

import groceryLogo from "../../assets/Images/freshcart-logo.svg";
import useCategories from '../../Hooks/useCategories'

export default function Footer() {
  const { categories } = useCategories();

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Privacy Policy", path: "#" },
    { name: "Terms of Service", path: "#" }
  ]

  const customerService = [
    { name: "My Account", path: "/account" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Track Order", path: "#" },
    { name: "Help Center", path: "#" }
  ]

  const socialLinks = [
    { icon: faFacebook, url: "https://facebook.com" },
    { icon: faTwitter, url: "https://twitter.com" },
    { icon: faInstagram, url: "https://instagram.com" },
    { icon: faLinkedin, url: "https://linkedin.com" }
  ]

  return (
    <footer className="bg-gray-100 pb-4 text-gray-700 py-5 ">
      <div className="container mx-auto px-4 mt-8">
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12 mb-16">
          {/* Logo + Description */}
          <div className="xl:col-span-2 space-y-6">
            <img src={groceryLogo} alt="FreshCart Logo" className="h-8 md:h-10" />

            <p className='text-sm leading-relaxed text-gray-500 max-w-sm'>
              FreshCart is your favorite online store for groceries, meat, and fashion. 
              We offer high-quality products from trusted sources delivered directly to you.
            </p>

            <ul className="flex gap-5 text-lg items-center pt-4">
              {socialLinks.map((social, i) => (
                <li key={i}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-600 transition-all hover:-translate-y-1 block">
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-lg font-bold mb-6 text-gray-900">Categories</h2>
            <ul className="space-y-4 text-sm *:text-gray-600 *:hover:text-primary-600 *:transition-all font-medium">
              {categories?.slice(0, 5).map((cat) => (
                <li key={cat._id}>
                  <Link to={`/category/${cat._id}`}>{cat.name}</Link>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/categories" className="text-primary-600 font-bold">Explore All &rarr;</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-6 text-gray-900">Company</h2>
            <ul className="space-y-4 text-sm *:text-gray-600 *:hover:text-primary-600 *:transition-all font-medium">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className="text-lg font-bold mb-6 text-gray-900">Help Center</h2>
            <ul className="space-y-4 text-sm *:text-gray-600 *:hover:text-primary-600 *:transition-all font-medium">
              {customerService.map((item, i) => (
                <li key={i}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-200 pt-10 pb-8 gap-6">
          <p className="text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()} <span className="text-gray-900 font-bold">FreshCart</span> • Quality products for your family.
          </p>

          <div className="flex items-center gap-6">
             <span className="text-xs font-medium text-gray-400">Secure Payments via Stripe & PayPal</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
