import BigCategory from "./BigCategory";
import img from "../../assets/images/joeyy-lee-hXhMzWysB8s-unsplash.jpg"
import img2 from "../../assets/images/samar-ahmad--nKCbZlOHek-unsplash.jpg"
import img3 from "../../assets/images/daihana-monares-oWFPDjxuyUM-unsplash.jpg"
import SmallCategory from "./SmallCategory";
import SmallCategory2 from "./SmallCategory2";

function CategoriesContainer({title,categories}) {
    return (
        <section className="pt-md-2 pb-md-6 category-section appear-animate fadeIn appear-animation-visible"
                 data-animation-options="{'name': 'fadeIn'}" style={{animationDuration:"1.2s"}}>
            <h2 className="title title-simple ls-m">{title}</h2>
            <div className="row grid categoriesContainer">
                <BigCategory image={process.env.REACT_APP_MEDIA_URL + categories?.[0]?.imageUrl} id={categories?.[0]?.id} categoryName={categories?.[0]?.name} />
                <SmallCategory image={process.env.REACT_APP_MEDIA_URL + categories?.[1]?.imageUrl} id={categories?.[1]?.id} categoryName={categories?.[1]?.name} />
                <SmallCategory2 image={process.env.REACT_APP_MEDIA_URL + categories?.[2]?.imageUrl} id={categories?.[2]?.id} categoryName={categories?.[2]?.name} />
                <div className="col-1 grid-space"></div>
            </div>
        </section>
    )
}

export default CategoriesContainer