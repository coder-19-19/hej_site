import Card from "./Card";
import {useSelector} from "react-redux";
import Loading from "../Loading";
import CustomPagination from "../pagination";

function Section({page,setPage}) {
    const products = useSelector(state => state.products.products)
    const loading = useSelector(state => state.products.loading)

    const generateProducts = () => {
        return products?.content?.map(item => (
            <Card
                key={item?.id}
                item={item}
            />
        ))
    }
    return (
        loading === false ? (<div className={"col-lg-9 main-content"}>
            <div>
                <div className={"row cols-2 cols-sm-3 product-wrapper"}>
                    {generateProducts()}
                </div>
                <div className="d-flex justify-content-center">
                    <CustomPagination
                        justifyContent="end"
                        className="pagination-bar"
                        currentPage={page}
                        totalCount={products?.totalElements}
                        pageSize={10}
                        onPageChange={(page) => {
                            setPage(page);
                        }}
                    />
                </div>
            </div>
        </div>) : (<Loading type="bubbles" color="#ff675d" width={200} height={200} className="custom-loading"/>)
    )
}

export default Section