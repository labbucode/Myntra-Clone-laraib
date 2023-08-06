import { useContext, useEffect } from "react";
import wishlistContext from "../../context/wishlist.context";
import { useNavigate } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';
import bagContext from "../../context/bag.context";

function Wishlist() {
    const { wishlist, setWishlist } = useContext(wishlistContext);
    const { bagList, setBagList } = useContext(bagContext);
    const navigate = useNavigate();
    useEffect(() => {
        let storageWishlist = localStorage.getItem("wishlist");
        if (storageWishlist) {
            setWishlist(JSON.parse(storageWishlist));
        }
    }, [setWishlist]);


    useEffect(() => {
        localStorage.setItem("bagList", JSON.stringify(bagList))
    }, [bagList])

    const handleRemoveWishlist = (itemId) => {
        let updateWishlist = wishlist.filter((item) => item.id !== itemId);
        setWishlist(updateWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updateWishlist));
    }

    const handelAddToBag = (product) => {
        const itemAlreadyInCart = bagList.find((item) => item.id === product.id);
        if (itemAlreadyInCart) {
            const updateBag = bagList.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setBagList(updateBag);
            handleRemoveWishlist(product.id);
        } else {
            setBagList((prev) => {
                return [...prev, {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    finalPrice: product.finalPrice,
                    strickPrice: product.strickPrice,
                    discount: product.discount,
                    image: product.image,
                    selectSize: product.selectSize,
                    quantity: 1

                }]

            })
            handleRemoveWishlist(product.id);
        }
    };
    console.log(bagList);

    return (
        <div >
            {
                wishlist.length > 0 ? (
                    <div className="wishlist-container">
                        {
                            wishlist.map((product) => (
                                <div className="card" key={product.id} >
                                    <img className="card-img" style={{ cursor: "pointer" }} onClick={() => { navigate(`/product/${product.id}`) }} src={product.image} alt={product.name} />
                                    <CloseIcon onClick={() => handleRemoveWishlist(product.id)} className="cross-wish" style={{ cursor: "pointer" }} />
                                    <div className="card-title">{product.name}</div>
                                    <p>{product.description}</p>
                                    <div style={{ fontSize: 16 }}>Rs.{product.finalPrice}</div>
                                    <button onClick={() => handelAddToBag(product)} className="wish-btn">Move to Bag</button>
                                    <div>

                                    </div>
                                </div>
                            ))
                        }
                    </div>

                ) : (
                    <div style={{ width: "100%", paddingLeft: 0, paddingTop: "5%" }} className="bag-empty">
                        <p style={{ fontWeight: "bold", marginBottom: 0, fontSize: 20 }}>YOUR WISHLIST IS EMPTY</p>
                        <p style={{ marginTop: 10, fontSize: 15, marginBottom: 0 }}>Add items that you like to your wishlist. Review </p>
                        <p style={{ marginTop: 0, fontSize: 15 }}>them anytime and easily move them to the bag.</p>
                        <img style={{ width: "100px", margin: 30 }} src="https://i.ibb.co/GVP1g7p/Screenshot-2023-07-22-202344.png" alt="emptyBag" />
                        <button style={{ color: "#3466e8", borderColor: "#3466e8" }} onClick={() => navigate("/catalogue")}>CONTINUE SHOPPING</button>
                    </div>
                )

            }


        </div>
    );
}

export default Wishlist;
