import MainBanner from "./MainBanner";
import SecondBanner from "./SecondBanner";
import slider from "../../assets/images/Style-Accessories-for-Men.jpg"
import slider2 from "../../assets/images/content-pixie-ZB4eQcNqVUs-unsplash.jpg"

function TotalBanner({data,categories}) {
    return(
        <section className="intro-section">
            <div className="row">
                <MainBanner data={data} slider1={slider} slider2={slider2}/>
                {categories?.map(item => (
                    <SecondBanner img={process.env.REACT_APP_MEDIA_URL + item?.imageUrl} gender={item?.name} id={item?.id}/>
                ))}
            </div>
        </section>
    )
}
export default TotalBanner