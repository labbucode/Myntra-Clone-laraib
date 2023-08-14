import { useContext, useEffect, useState } from "react";
import bagContext from "../../context/bag.context";
import { useNavigate } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';


function Bag() {
    const { bagList, setBagList } = useContext(bagContext);
    const navigate = useNavigate();
    const isAuthenticate = localStorage.getItem("isAuthenticate");

    const [totalMrp, setTotalMrp] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);


    useEffect(() => {
        const storageBagList = localStorage.getItem("bagList")
        if (storageBagList) {
            setBagList(JSON.parse(storageBagList));
        }

    }, [setBagList])


    useEffect(() => {
        setTotalMrp(bagList.reduce((acc, item) => acc + Number(item.strickPrice * item.quantity), 0))
        setDiscount(bagList.reduce((acc, item) => acc + Number(item.strickPrice * item.quantity) - Number(item.finalPrice * item.quantity), 0))
        setTotalAmount(bagList.reduce((acc, item) => acc + Number(item.finalPrice * item.quantity), 0))
    }, [bagList])

    const handleClickLogo = () => {
        navigate("/");
        window.location.reload();
    };

    const removeFromBag = (itemId) => {
        let updatedBagList = bagList.filter((item) => item.id !== itemId)
        setBagList(updatedBagList);
        localStorage.setItem("bagList", JSON.stringify(updatedBagList))
    }
    const updateQuantity = (itemId, newQuantity) => {
        const updateBagList = bagList.map((item) => {
            if (itemId === item.id) {
                return { ...item, quantity: newQuantity };
            }
            else {
                return item;
            }
        })
        setBagList(updateBagList);
        localStorage.setItem("bagList", JSON.stringify(updateBagList))
    }

    const handelQtyInc = (itemId, currentQyt) => {
        if (currentQyt < 5) {
            const newQuantity = currentQyt + 1;
            updateQuantity(itemId, newQuantity);
        }

    }

    const handelQtyDec = (itemId, currentQyt) => {
        if (currentQyt > 1) {
            const newQuantity = currentQyt - 1;
            updateQuantity(itemId, newQuantity);
        }
    }




    return (
        <>
            <div className="bag-header">
                <img onClick={handleClickLogo} src="https://www.freepnglogos.com/uploads/logo-myntra-png/myntra-logo-m-png-3.png" alt="logo" />
                
                
                <div>
                    <img src="https://constant.myntassets.com/checkout/assets/img/sprite-secure.png" alt="secure" />
                    <p>100% SECURE</p>
                </div>
            </div>
            {
                bagList.length > 0 ? (
                    <div className="bag-main">
                        <div>
                            <div className="address">
                                <div>
                                    <p>Deliver to: <span>Abdul Aziz,742140</span></p>
                                    <p>Chandpur,Kolla,Kandi,Murshidabad</p>
                                </div>
                                <div>
                                    <button>CHANGE ADDRESS</button>
                                </div>
                            </div>

                            <div className="bag-offers">
                                <div>Available Offers</div>
                                <ul>
                                    <li>10% Instant Discount on IndusInd Bank Debit Cards on a min spend Of Rs 2,500. TCA</li>
                                </ul>

                            </div>

                            <div className="convi-fee">
                                <img src="https://constant.myntassets.com/checkout/assets/img/ship-free.webp" alt="" /> Yay! <span>No convenience fee</span> on this order.
                            </div>

                            <div className="display-card">
                                {bagList.map((item, index) => (
                                    <div className="bag-card" key={index}>
                                        <div style={{ display: "flex" }}>
                                            <div>
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div>
                                                <div style={{ paddingBottom: "5px", fontWeight: "bold" }}>{item.name}</div>
                                                <p>{item.description}</p>
                                                <p style={{ fontWeight: "bold" }}>Size: {item.selectSize}</p>
                                                <p style={{ fontWeight: "bold" }}>Qty:
                                                    <button  onClick={() => handelQtyDec(item.id, item.quantity)}>-</button>
                                                    {item.quantity}
                                                    <button  onClick={() => handelQtyInc(item.id, item.quantity)}>+</button>
                                                </p>
                                                <div className="bag-prices">
                                                    <p style={{ fontWeight: "bold" }}>₹{item.finalPrice * item.quantity}</p>
                                                    <p style={{ textDecoration: "line-through" }}>₹{item.strickPrice * item.quantity}</p>
                                                    <p style={{ color: "#d61b60" }}>{item.discount}%OFF</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <CloseIcon style={{ cursor: "pointer" }} onClick={() => removeFromBag(item.id)} />
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="total">
                            <div style={{ fontWeight: "bold" }}>PRICE DETAILS ({bagList.length} items)</div>
                            <div id="total-all">
                                <p>Total MRP</p>
                                <p>₹{totalMrp}</p>
                            </div>
                            <div id="total-all">
                                <p>Discount on MRP</p>
                                <p style={{ color: "green" }}>-₹{discount}</p>
                            </div>
                            <div id="total-all">
                                <p>Convenience Fee</p>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <p style={{ textDecoration: "line-through" }}>₹99 </p>
                                    <span style={{ color: "green" }}> FREE</span>
                                </div>
                            </div>
                            <div id="total-all" style={{ borderTop: "1px solid rgb(211, 211, 211)" }}>
                                <p style={{ fontWeight: "bold" }}>Total Amount</p>
                                <p style={{ fontWeight: "bold" }}>₹{totalAmount}</p>
                            </div>
                            <button onClick={()=> isAuthenticate === "true" ? navigate("/payment"):navigate("/login")}>PLACE ORDER</button>
                        </div>

                    </div>
                ) : (
                    <div className="bag-empty">
                        <img src="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp" alt="emptyBag" />
                        <p style={{ fontWeight: "bold", marginBottom: 0,fontSize: 20 }}>Hey, it feels so light!</p>
                        <p style={{ marginTop: 1, fontSize: 15 }}>There is nothing in your bag.Let's add some items.</p>
                        <button onClick={() => navigate("/catalogue")}>ADD ITEMS</button>
                    </div>
                )
            }

            <div className="bag-footer">
                <div >
                    <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ssl.png" alt="" />
                    <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-visa.png" alt="" />
                    <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-mc.png" alt="" />
                    <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ae.png" alt="" />
                    <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-dc.png" alt="" />
                    <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-nb.png" alt="" />
                    <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-cod.png" alt="" />
                    <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-rupay.png" alt="" />
                    <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-paypal.png" alt="" />
                    <img src="https://constant.myntassets.com/checkout/assets/img/footer-bank-bhim.png" alt="" />
                </div>
                <div><a target="__blank" href="https://www.linkedin.com/in/aziz7477/">Need Help ? Contact Us</a></div>
            </div>

        </>

    )
}

export default Bag;