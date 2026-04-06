import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Layout from './components/Layout/';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Categories from './pages/Categories/Categories';
import Brands from './pages/Brands/Brands';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Favorite from './pages/Favorite/Favorite';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import WishList from './pages/WishList/WishList';
import Orders from './pages/Orders/Orders';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import SearchProducts from './pages/SearchProducts/SearchProducts';
import FeaturedProducts from './pages/FeaturedProducts/FeaturedProducts';
import Deals from './pages/Deals/Deals';
import Offers from './pages/Offers/Offers';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import BrandDetails from './pages/BrandDetails/BrandDetails';
import CategoryDetails from './pages/CategoryDetails/CategoryDetails';
import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import { AuthProvider } from './context/Auth.context';
import RecentlyAdded from './pages/RecentlyAdded/RecentlyAdded';
import Account from './pages/Account/Account';
import CartProvider from './context/Cart.context';
import WishlistProvider from './context/Wishlist.context';
import OfflineScreen from './components/OfflineScreen/OfflineScreen';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const router = createBrowserRouter([
  // Define your routes here
  {
    path: '/', element: <Layout />, children: [


      { index: true, element: <Home /> },
      { path: 'signup', element: <Signup /> },
      { path: 'login', element: <Login /> },
      { path: 'categories', element: <Categories /> },
      { path: 'category/:id', element: <CategoryDetails /> },
      { path: 'brands', element: <Brands /> },
      { path: 'brands/:id', element: <BrandDetails /> },
      { path: 'cart', element: <ProtectedRoutes><Cart /> </ProtectedRoutes> },
      { path: 'checkout', element: <ProtectedRoutes><Checkout /> </ProtectedRoutes> },
      { path: 'favorite', element: <ProtectedRoutes><Favorite /></ProtectedRoutes> },
      { path: 'forgot-password', element: <ForgetPassword /> },
      { path: 'verify-email', element: <VerifyEmail /> },
      { path: 'wishlist', element: <ProtectedRoutes><WishList /></ProtectedRoutes> },
      { path: 'allorders', element: <ProtectedRoutes><Orders /></ProtectedRoutes> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: 'search-products', element: <SearchProducts /> },
      { path: 'featured-products', element: <FeaturedProducts /> },
      { path: 'recently-added', element: <RecentlyAdded /> },
      { path: 'deals', element: <Deals /> },
      { path: 'offers', element: <Offers /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'account', element: <ProtectedRoutes><Account /></ProtectedRoutes> },
      { path: '*', element: <NotFound /> }


    ]
  },

]);

function App() {

  const queryClient = new QueryClient()


  return (

    <>

      <QueryClientProvider client={queryClient}>

        <OfflineScreen>


          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
               
                
                    <RouterProvider router={router} />
                    <ToastContainer
                      position="top-right"
                      autoClose={3000}
                      hideProgressBar={false}
                      closeOnClick
                      pauseOnHover
                      draggable
                      theme="colored"
                    />            
            
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>

        </OfflineScreen>

  <ReactQueryDevtools initialIsOpen={false} />

      </QueryClientProvider>


    </>

  )
}

export default App
