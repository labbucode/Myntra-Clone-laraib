
import './components/Header/header.css'
import "./components/Home/home.css"
import "./components/Home/footer.css"
import "./components/Catalogue/catalogue.css"
import "./components/Catalogue/productCard.css"
import "./components/Catalogue/productPage.css"
import "./components/Bag/bag.css"
import "./components/Bag/paymentPage.css"
import "./components/authentication/auth.css"
import "./components/Wishlist/Wishlist.css"


import Header from "./components/Header/Header";
import Home from './components/Home/Home';
import Catalogue from './components/Catalogue/Catalogue';
import Bag from './components/Bag/Bag';
import ProductPage from './components/Catalogue/ProductPage';
import PaymentPage from './components/Bag/PaymentPage';
import Wishlist from './components/Wishlist/Wishlist';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';

import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProductContext from "./context/products.context"
import { productsData } from './constants/data'
import BagContext from './context/bag.context'
import FilterProductsContext from './context/filterProducts.context'
import WishlistContext from './context/wishlist.context'


function App() {
  const [productList, setProductsList] = useState([]);
  const [bagList, setBagList] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    setProductsList(productsData)
  }, [])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [{

        path: "/",
        element: <Home />

      }, {

        path: "/catalogue",
        element: <Catalogue />

      }, {

        path: "/product/:id",
        element: <ProductPage />

      }, {

        path: "/wishlist",
        element: <Wishlist />

      }, {

        path: "/login",
        element: <Login />

      }, {

        path: "/signup",
        element: <Signup />

      }]
    },
    {
      path: "/bag",
      element: <Bag />
    },
    {
      path: "/payment",
      element: <PaymentPage />
    }
  ])
  return (
    <div className="App">
      <WishlistContext.Provider value={{ wishlist, setWishlist }}>
        <FilterProductsContext.Provider value={{ filterProducts, setFilterProducts }}>
          <BagContext.Provider value={{ bagList, setBagList }}>
            <ProductContext.Provider value={{ productList, setProductsList }}>
              <RouterProvider router={router}></RouterProvider>
            </ProductContext.Provider>
          </BagContext.Provider>
        </FilterProductsContext.Provider>
      </WishlistContext.Provider>
    </div>
  );
}

export default App;
