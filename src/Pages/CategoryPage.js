import Filter from "../Components/Categories/Filter";
import Header from "../Components/header/Header";
import Footer from "../Components/Footer/Footer";
import Section from "../Components/Categories/Section";
import { useState} from "react";
import { useSelector} from "react-redux";
import Loading from "../Components/Loading";

function CategoryPage() {
    const filterIsActive = useSelector(state => state.mobile.filterIsActive)
    const [isFetching,setIsFetching] = useState(false)
    const [page,setPage] = useState(1)
    return (
        isFetching ? (
            <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
                <Loading width={200}  height={200} color="#ff675d" type="bubbles"/>
            </div>
        ) :(
        <>
            <Header/>
            <main className={`${filterIsActive === true && `sidebar-active`} main`}>
                <div className={"page-content mb-10 pb-6"}>
                    <div className="container">
                        <div className={"row gutter-lg main-content-wrap"}>
                            <Filter page={page} setPage={setPage} setIsFetching={setIsFetching}/>
                            <Section page={page} setPage={setPage}/>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
        )
    )
}

export default CategoryPage