import logo from "../../assets/images/HE logo PNG.png"
import {Link, useLocation, useNavigate} from "react-router-dom";
import DropdownBag from "../DropdownCart";
import {useDispatch, useSelector} from "react-redux";
import {setMobileMenuIsActive} from "../../Stores/MobileStore";
import {useEffect, useState} from "react";
import Products from "../../api/products";
import Basket from "../../api/basket";
import {setCart} from "../../Stores/cartStore";
import DropdownUser from "../DropdownUser";
import Loading from "../Loading";
import Constant from "../../api/constant";

function MidHeader() {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [constantData,setConstantData] = useState([])
    const cart = useSelector(state => state.cart.cart)
    const [searchedData, setSearchedData] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [isRequested, setIsRequested] = useState(false)
    const getBasket = async () => {
        const basketId = JSON.parse(localStorage.getItem('basket'))?.id
        const data = (await Basket.getBaskets(basketId))?.data?.data
        dispatch(setCart(data))
    }

    const getConstants = async () => {
        const {data} = await Constant.getConstants()
        setConstantData(data?.data)
    }

    const handleSubmit = e => {
        e.preventDefault()
        navigate('/categories/?name=' + searchValue)
    }

    useEffect(() => {
        getBasket()
        getConstants()
    }, [])
    useEffect(() => {
        window.scroll(0, 0)
    }, [location])

    const searchProduct = async e => {
        setSearchValue(e.target.value)
        setIsRequested(true)
        const {data} = await Products.getProduct('/search', {name: e.target.value || null, count: 5})
        setIsRequested(false)
        setSearchedData(data?.data)
    }

    return (<header className="header">
        <div className="sticky-content-wrapper" style={{height: "100px"}}>
            <div className="header-middle sticky-header fixed sticky-content">
                <div className="container">
                    <div className="header-left">
                        <button
                            style={{border: "none", cursor: "pointer"}}
                            onClick={() => dispatch(setMobileMenuIsActive(true))}
                            className="mobile-menu-toggle">
                            <i className="d-icon-bars2"></i>
                        </button>
                        <Link to="/" className="logo">
                            <img src={logo} alt="logo" style={{width: "auto", height: 60}}/>
                        </Link>

                        <div className="header-search hs-simple">
                            <form action="#" className="input-wrapper" onSubmit={handleSubmit}>
                                <input type="text" className="form-control custom-search" name="search"
                                       autoComplete="off"
                                       placeholder="Axtar..." required="" onChange={searchProduct}/>
                                <button className="btn btn-search" type="submit" title="submit-button">
                                    <i className="d-icon-search"></i>
                                </button>
                            </form>
                            {searchValue?.length > 0 && (
                                <ul className="list-group list-style-none custom-list d-flex flex-column"
                                    style={{gap: 10, position: "absolute", width: "100%", backgroundColor: "white"}}>
                                    {!isRequested ? (searchedData?.length > 0 ? (searchedData?.map(item => (
                                        <Link to={`/product/${item?.id}`}>
                                            <li key={item?.id} className="list-group-item custom-group-item"
                                                style={{
                                                    height: 70,
                                                    verticalAlign: "middle",
                                                    display: "flex",
                                                    paddingBottom: 5
                                                }}>

                                                <img style={{border: "1px solid #ccc", objectFit: "cover"}}
                                                     src={process.env.REACT_APP_MEDIA_URL + item?.productImages?.[0]?.path}
                                                     alt={item?.name}/>
                                                <div style={{
                                                    marginLeft: 10,
                                                    marginTop: "auto",
                                                    marginBottom: "auto",
                                                    paddingBottom: 5
                                                }}>
                                                    <div className="d-flex justify-content-center flex-column"
                                                         style={{marginTop: 5}}>
                                                        <div className="d-inline-block product-name"
                                                             style={{
                                                                 fontSize: 15, fontWeight: 700
                                                             }}>{item?.name}</div>
                                                        <div className="product-price">
                                                            <ins
                                                                className="new-price">{item?.sale > 0 ? (item?.lastPrice) : (item?.sellingPrice)} AZN
                                                            </ins>
                                                            <del
                                                                className="old-price">{item?.sale > 0 && item?.sellingPrice + ' AZN'}</del>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>))) : (
                                        <div className="product-name font-weight-bold">Məhsul tapılmadı</div>)) : (
                                        <Loading type="bubbles" color="#ff675d" width={50} height={50}
                                                 className="custom-loading"/>)}
                                </ul>)}
                        </div>
                    </div>
                    <div className="header-right">
                            <a href={`tel:${constantData?.find(item => item?.title === 'phone_number')?.value}`} className="icon-box icon-box-side">
                                <div className="icon-box-icon mr-0 mr-lg-2">
                                    <i className="d-icon-phone"></i>
                                </div>
                                <div className="icon-box-content d-lg-show">
                                    <h4 className="icon-box-title">Bizə zəng et:</h4>
                                    <p>{constantData?.find(item => item?.title === 'phone_number')?.value}</p>
                                </div>
                            </a>
                        <div className="divider"></div>
                        {localStorage.getItem('token') ? (<div className="dropdown after-none login-dropdown mb-2">
                            <a
                                className="icon-box icon-box-side"
                                data-toggle="login-modal">
                                <div className="icon-box-icon mr-0 mr-lg-1"><i className="d-icon-user"
                                                                               style={{color: "#ff675d"}}></i>
                                </div>
                            </a>
                            <DropdownUser/>
                        </div>) : (<Link className="icon-box icon-box-side" title={"Giriş / Qeydiyyat"} to="/login"
                                         data-toggle="login-modal">
                            <div className="icon-box-icon mr-0 mr-lg-1"><i className="d-icon-user"></i>
                            </div>
                        </Link>)}
                        <span className="divider"></span>
                        <div className="dropdown cart-dropdown type2 mr-0 mr-lg-2">
                            <Link to="/cart" className="cart-toggle label-block link" title={"Səbət"}>
                                <div className="cart-label d-lg-show">
                                    <span className="cart-name">Səbət:</span>
                                    {localStorage.getItem('basket') != null ? (
                                        <span className="cart-price">{cart?.totalLastPrice} AZN</span>) : (
                                        <span className="cart-price">Boşdur</span>)}
                                </div>
                                <i className="d-icon-bag">{cart?.totalCount > 0 &&
                                    <span className="cart-count">{cart?.totalCount}</span>}</i>
                            </Link>
                            <DropdownBag/>
                        </div>
                        <div className="header-search hs-toggle mobile-search">
                            <a href="#" className="search-toggle">
                                <i className="d-icon-search"></i>
                            </a>
                            <form action="#" className="input-wrapper">
                                <input type="text" className="form-control" name="search" autoComplete="off"
                                       placeholder="Axtar..." required=""/>
                                <button className="btn btn-search" type="submit" title="submit-button">
                                    <i className="d-icon-search"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>)
}

export default MidHeader
