import { megaDealsData } from "../../constants/data";

function MegaDeals(){
    const megaBannerUrl = "https://myntra-clone-laraib.netlify.app/assets/top2-99473adf.jpg";
    return(
        <>
            <img style={{width:"100%"}} src={megaBannerUrl} alt="" />
            <div className="mega-deals-container">
                {
                    megaDealsData.map(data => (
                        <img key={data.id} className="mega-deals" src={data.url} alt="" />
                    ))
                }
            </div>
        </>
    )
}
export default MegaDeals;