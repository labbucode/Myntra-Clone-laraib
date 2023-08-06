import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
function Footer() {
    return (
        <>
            <div className="footer-container">
                <div className="footer-1">
                    <p>ONLINE SHOPPING</p>
                    <p>Men</p>
                    <p>Women</p>
                    <p>Kids</p>
                    <p>Home & Living</p>
                    <p>Beauty</p>
                    <p>Gift Cards</p>
                    <p>Myntra Insider</p>
                </div>
                <div className="footer-2">
                    <p>CUSTOMER POLICIES</p>
                    <p>Contact Us</p>
                    <p>FAQ</p>
                    <p>T&C</p>
                    <p>Terms Of Use</p>
                    <p>Track Orders</p>
                    <p>Shipping</p>
                    <p>Cancellation</p>
                    <p>Returns</p>
                    <p>Privacy policy</p>
                    <p>Grievance Officer</p>
                </div>
                <div className="footer-3">
                    <p>EXPERIENCE MYNTRA APP ON MOBILE</p>
                    <a href="https://play.google.com/store/apps/details?id=com.myntra.android&hl=en_IN&gl=US" rel="noreferrer" target='_blank'>
                        <img src="https://i.ibb.co/vsDKXFC/play-store.png" alt="playStore" />
                    </a>
                    <a href="https://apps.apple.com/in/app/myntra-fashion-shopping-app/id907394059" rel="noreferrer" target='_blank'>
                        <img src="https://i.ibb.co/z7Wt5pg/app-store.png" alt="appStore" />
                    </a>
                    <p style={{ fontWeight: "bold", padding: 7, paddingLeft: 2, paddingBottom: 4 }}>KEEP IN TOUCH</p>
                    <div >
                        <FacebookIcon style={{ fontSize: 30 }} />
                        <TwitterIcon style={{ fontSize: 30 }} />
                        <YouTubeIcon style={{ fontSize: 30 }} />
                        <InstagramIcon style={{ fontSize: 30 }} />
                    </div>
                </div>
                <div className='footer-4'>
                    <div >
                        <img src="https://i.ibb.co/5TZkPVK/original-removebg-preview.png" alt="" />
                        <span><span style={{ fontWeight: "bold" }}>100% ORIGINAL</span> guarantee for all products at myntra.com</span>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/C96F6p2/30days-removebg-preview.png" alt="" />
                        <span><span style={{ fontWeight: "bold" }}>Return within 30days</span> of receiving your order</span>
                    </div>
                </div>
            </div>

            <div className='footer-5'>
               

                <div className='about'>
                    <p>In case of any concern, <a href='https://www.linkedin.com/in/laraib/' rel="noreferrer" target='_blank'><span>Contact Us</span></a></p>
                    <p style={{ fontWeight: "bold" }}>Developed by Laraib Ahmad</p>
                    <p>© 2023 www.myntra.com. All rights reserved.</p>
                </div>
            </div>
        </>

    )
}
export default Footer;


