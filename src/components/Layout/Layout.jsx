import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import BackToTop from '../BackToTop/BackToTop'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}