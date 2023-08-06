import Banner from "./Banner"
import BudgetBuys from "./BudgetBuys";
import Footer from "./Footer";
import MegaDeals from "./Megadeals";
import TopBrands from "./TopBrands"

function Home(){
    return(
        <>
            <Banner/>
            <BudgetBuys/>
            <MegaDeals/>
            <TopBrands/>
            <Footer/>
        </>
    )
}

export default Home;