import { budgetBuyData } from "../../constants/data";

function BudgetBuys(){
    const budgetBannerUrl = "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/7/1e599d37-1ed6-4e39-9057-ffb4065173b51651897264796-Unbelievable-Deals.jpg"
    return(
        <>
            <img style={{width:"100%"}} src={budgetBannerUrl} alt="" />
            <div className="budget-buy-container">
            {
                budgetBuyData.map(data =>(
                    <img key={data.id} className="budget-buy" src={data.url} alt="" />
                ))
            }
            </div>
           
        </>
        
        
    )

}
export default BudgetBuys;