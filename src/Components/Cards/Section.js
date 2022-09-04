import Card from "./Card";
import {useSelector} from "react-redux";

function Section({sectionName,otherProducts}) {
    const popularProducts = useSelector(state => state.products.popularProducts)
    const generateProducts = () => {
        const data = otherProducts?.length > 0 ? otherProducts : popularProducts
        return data?.map(item => (
            <Card
                key={item?.id}
                item={item}
            />
        ))
    }

    return (
        <section className="mt-10 pt-3 mb-6">
            <h2 className="title title-simple title-center ls-m">{sectionName}</h2>
            <div className="row cols-2 cols-sm-3 product-wrapper">
                {generateProducts()}
            </div>
        </section>
    )
}

export default Section