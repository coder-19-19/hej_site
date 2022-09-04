import Header from "../Components/header/Header";
import TotalBanner from "../Components/Banners/TotalBanner";
import Section from "../Components/Cards/Section";
import CategoriesContainer from "../Components/HomeCategories/CategoriesContainer";
import SaleBanner from "../Components/Banners/SaleBanner";
import Footer from "../Components/Footer/Footer";
import {useEffect, useState} from "react";
import {useDispatch,} from "react-redux";
import {getHomeData} from "../Stores/productsStore";
import Loading from "../Components/Loading";
import Category from "../api/category";
import Constant from "../api/constant";

function Home() {
    const dispatch = useDispatch()
    const [isFetching, setIsFetching] = useState(false)
    const [homeCategories, setHomeCategories] = useState([])
    const [homeSubCategories, setHomeSubCategories] = useState([])
    const [banners,setBanners] = useState({
        main:[],
        sale:[]
    })

    const fetchCategories = async () => {
        const [homeCategory, homeSubCategory] = await Promise.all([Category.getHomeCategory(), Category.getHomeSubCategory()])
        setHomeCategories(homeCategory?.data?.data)
        setHomeSubCategories(homeSubCategory?.data?.data)
    }

    const fetchBanners = async () => {

        const [main, sale] = await Promise.all([Constant.getBanners('MAIN'), Constant.getBanners('SALE')])
        setBanners({
            main: main?.data?.data,
            sale: sale?.data?.data
        })
    }

    useEffect(() => {
        setIsFetching(true)
        fetchCategories()
        fetchBanners()
        dispatch(getHomeData())
        setIsFetching(false)
    }, [])

    return (
        isFetching ? (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <Loading width={200} height={200} color="#ff675d" type="bubbles"/>
            </div>
        ) : (
            <div className="page-wrapper">
                <main className="main demo2-cls">
                    <div className="page-content">
                        <div className="container">
                            <Header/>
                            <TotalBanner data={banners?.main} categories={homeCategories}/>
                            <Section sectionName={"Ən çox satanlar"}/>
                            <CategoriesContainer title={"Populyar kateqoriyalar"} categories={homeSubCategories}/>
                            <SaleBanner data={banners?.sale} />
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        )
    )
}

export default Home