import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productsContext from "../../context/products.context";
import bagContext from "../../context/bag.context";
import Footer from "../Home/Footer";
import wishlistContext from "../../context/wishlist.context";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';



function ProductPage() {
    const { id } = useParams();
    const { productList } = useContext(productsContext);
    const [currentProduct, setCurrentProduct] = useState(null);
    const { bagList, setBagList } = useContext(bagContext);
    const { wishlist, setWishlist } = useContext(wishlistContext)

    useEffect(() => {
        setCurrentProduct(productList.find((product) => product.id === id))
    }, [id, productList]);

    useEffect(() => {
        localStorage.setItem("bagList", JSON.stringify(bagList))
    }, [bagList])

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }, [wishlist])

    const [addToBag, setAddToBag] = useState("Add To Bag");
    const [addWishlist,setAddWishlist] = useState("WISHLIST")
    const [selectSize, setSelectSize] = useState(null);
    const [hasSelectSize, setHasSelectSize] = useState(null);
    const buttonRef = useRef([]);
    const navigate = useNavigate();

    const handelAddToBag = () => {
        if (selectSize) {
            setAddToBag("Go To Bag")
            if (addToBag === "Go To Bag") {
                navigate("/bag")
                return;
            }
            const itemAlreadyInCart = bagList.find(item => item.id === currentProduct.id)
            if (itemAlreadyInCart) {
                const updateBag = bagList.map((item) => {
                    if (item.id === currentProduct.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    else {
                        return item;
                    }
                })
                setBagList(updateBag);
                return;
            }
            setBagList((prev) => {
                return [...prev, {
                    id: currentProduct.id,
                    name: currentProduct.name,
                    description: currentProduct.description,
                    finalPrice: currentProduct.finalPrice,
                    strickPrice: currentProduct.strickPrice,
                    discount: currentProduct.discount,
                    image: currentProduct.otherImages[0],
                    selectSize: selectSize,
                    quantity: 1
                }]

            })
        }
        else {
            setHasSelectSize("Please select a size")
            buttonRef.current.classList.add("shake")
            setTimeout(() => {
                buttonRef.current.classList.remove("shake")
            }, 500)
        }
    }
    const handleWishlist = () => {
        setAddWishlist("WISHLISTED")
        let itemAlreadyInWishlist = wishlist.find((item) => item.id === currentProduct.id);
        if (itemAlreadyInWishlist) {
            return;
        }
        setWishlist((prev) => {
            return [...prev, {
                id: currentProduct.id,
                name: currentProduct.name,
                description: currentProduct.description,
                finalPrice: currentProduct.finalPrice,
                strickPrice: currentProduct.strickPrice,
                discount: currentProduct.discount,
                image: currentProduct.otherImages[0],
                selectSize: selectSize,
                quantity: 1
            }]
        })
    }
    const handelSizeClick = (size) => {
        setSelectSize(size)
        setHasSelectSize("");
    }

    return (
        <>
            <div className="product-page">
                <div className="product-img">
                    {
                        currentProduct?.otherImages.map((image, index) => (
                            <img key={index} src={image} alt={currentProduct?.name} />
                        ))
                    }
                </div>
                <div className="product-details">
                    <div style={{ fontWeight: "bold", fontSize: 20 }}>{currentProduct?.name}</div>

                    <p className="des">{currentProduct?.description}</p>

                    <div >
                        <span style={{ fontWeight: "bold", fontSize: 20 }}>₹{currentProduct?.finalPrice}  </span>
                        <span style={{ fontSize: 17 }}> MRP </span>
                        <span style={{ textDecoration: "line-through", fontSize: 20 }}>₹{currentProduct?.strickPrice}</span>
                        <span style={{ color: "#d61b60", fontSize: 20 }}> ({currentProduct?.discount}% OFF)</span>
                    </div>

                    <p style={{ fontSize: 14, color: "green", fontWeight: "bold", marginTop: 8 }}>inclusive of all taxes</p>

                    <div>
                        <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 3 }}>SELECT SIZE</div>
                        <p style={{ margin: 0, color: "red", fontSize: 15 }}>{hasSelectSize}</p>
                        <div ref={buttonRef} className="size-button">
                            {currentProduct?.productSize.split(",").map((size) => (
                                <button
                                    key={productList.id}
                                    className={selectSize === size ? "selected" : ""}
                                    onClick={() => handelSizeClick(size)}>{size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bag-wish-button">
                        <button onClick={handelAddToBag}>{addToBag === "Add To Bag" ? <ShoppingBagOutlinedIcon /> : <ArrowForwardIcon />}{addToBag}</button>
                        <button onClick={handleWishlist} style={{ background: addWishlist === "WISHLISTED" ? "grey" : "white", color:  addWishlist === "WISHLISTED" ? "white" : "black", border: "1px solid grey" }}>
                            {addWishlist === "WISHLISTED" ?
                             <FavoriteIcon style={{ color: "#fd3e6c" }}/>
                              :
                              <FavoriteBorderOutlinedIcon style={{ color: "#fd3e6c" }} /> }
                            
                            {addWishlist}</button>
                    </div>

                    <div style={{ paddingTop: 20 }}>
                        <div style={{ fontSize: 16, fontWeight: "bold", display: "flex", alignItems: "center" }}>
                            DELIVERY OPTIONS
                            <LocalShippingOutlinedIcon style={{ paddingLeft: 8 }} />
                        </div>
                    </div>

                    <div className="delivery">
                        <div><img src="https://i.ibb.co/THzw1MR/fastdl.png" alt="fast" /> Get it by Thu</div>
                        <div><img src="https://i.ibb.co/pw3LqCP/cash.png" alt="cash" /> Pay on delivery available</div>
                        <div><img src="https://i.ibb.co/WvPhQ1K/return.png" alt="return" /> Easy 14 days return & exchange available</div>
                    </div>

                    <div className="offers">
                        <p>100% Original Products</p>
                        <div style={{ paddingTop: 10 }}>BEST OFFERS<SellOutlinedIcon style={{ fontSize: 18 }} /></div>
                        <p>This product is already at its best price</p>
                        <div>Up To Rs 500 Cashback on CRED pay transactions.</div>
                        <ul>
                            <li>Min Spend Rs 1,000. Available only on Android Devices.</li>
                        </ul>
                        <p style={{ fontWeight: "bold", fontSize: 13, color: "#fd3e6c" }}>Terms & Condition</p>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )

}

export default ProductPage;