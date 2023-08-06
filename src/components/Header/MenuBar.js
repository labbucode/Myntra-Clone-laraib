import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';


import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import bagContext from '../../context/bag.context';
import wishlistContext from '../../context/wishlist.context';

import { signOut } from 'firebase/auth';
import { auth } from "../authentication/firebase";




function MenuBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const navigate = useNavigate();
    const { bagList } = useContext(bagContext);
    const {wishlist} = useContext(wishlistContext)

    const [userName, setUserName] = useState("")
    let isAuthenticate = localStorage.getItem("isAuthenticate") ==="true";


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName);
            }
            else {
                setUserName("")
            }
        })
    }, [])

    const handelSignOut = () => {
        signOut(auth)
            .then(() => {

                localStorage.setItem("isAuthenticate", false)

            })
            .catch((err) => {
                console.log("its not work");
            })
        handleClose();
        window.location.reload()

    }

    const handelNavigateLogin =()=>{
        navigate("/login")
        handleClose()
    }
    const handelNavigateSignup =()=>{
        navigate("/signup")
        handleClose()
    }
    return (


        <div className="menu-bar">

            <div >
                <div onClick={handleClick} className='profile'>
                    <PersonOutlineOutlinedIcon style={{ fontSize: "26px" }} />
                    <div>Profile</div>
                </div>

                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}

                >

                    {
                        isAuthenticate === false ? (
                            <div>
                                <MenuItem onClick={handelNavigateLogin} style={{paddingRight:90}}>Login</MenuItem>
                                <MenuItem onClick={handelNavigateSignup}>Signup</MenuItem>

                            </div>

                        ) : (

                            <div>
                                <div className='welcome-menu' onClick={handleClose} style={{ fontWeight: "revert-layer" }}>Welcome </div>
                                <div className='welcome-menu' onClick={handleClose} style={{ fontSize: 17, fontWeight: "bolder" }}>{userName}</div>
                                <MenuItem onClick={handelSignOut} style={{ fontWeight: 100 }}>Logout</MenuItem>
                            </div>
                        )
                    }
                </Menu>
            </div>
            <div className="wishlist" onClick={()=> navigate("/wishlist")}>
                <FavoriteBorderOutlinedIcon style={{ fontSize: "25px" }} />
                <div>Wishlist</div>
                {wishlist.length >= 1 ? <div className='bag-count'>{wishlist.length}</div> : null}
            </div>
            <div className='bag' onClick={() => navigate("/bag")}>
                <ShoppingBagOutlinedIcon style={{ fontSize: "25px" }} />
                <div>Bag</div>
                {bagList.length >= 1 ? <div className='bag-count'>{bagList.length}</div> : null}
            </div>




        </div>
    )
}
export default MenuBar;