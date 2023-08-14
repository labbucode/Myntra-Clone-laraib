import Carousel from "react-multi-carousel";
import { bannerData } from "../../constants/data";
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
function Banner(){
    return(
        <div style={{marginTop:110}}>
            <Carousel 
            responsive={responsive} 
            swipeable={false}
            draggable={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            slidesToSlide={1}

            >
              {
                bannerData.map(data =>(
                  <img key={data.id} style={{width:"100%"}} src={data.url} alt="banner" />
                ))
              } 
            </Carousel>
        </div>
    )
}

export default Banner;