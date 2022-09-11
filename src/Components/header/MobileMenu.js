import {Link, useNavigate} from "react-router-dom";
import {setMobileMenuIsActive} from "../../Stores/MobileStore";
import {useDispatch} from "react-redux";
import {useState} from "react";
import Products from "../../api/products";
import Loading from "../Loading";

function MobileMenu() {
    const [searchedData, setSearchedData] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [isRequested,setIsRequested] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchProduct = async e => {
        setSearchValue(e.target.value)
        setIsRequested(true)
        const {data} = await Products.getProduct('/search', {name: e.target.value || null,count:5})
        setIsRequested(false)
        setSearchedData(data?.data)
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setMobileMenuIsActive(false))
        navigate('/categories/?name=' + searchValue)
    }
    return (
        <div className="mobile-menu-wrapper">
            <div
                onClick={() => dispatch(setMobileMenuIsActive(false))}
                className="mobile-menu-overlay">
            </div>
            <button
                style={{backgroundColor: "rgba(28,26,26,0.8)", cursor: "pointer", border: 'none', padding: "5px"}}
                onClick={() => dispatch(setMobileMenuIsActive(false))}
                className="mobile-menu-close"><i className="d-icon-times"></i></button>
            <div className="mobile-menu-container scrollable">
                <form action="#" className="input-wrapper" onSubmit={handleSubmit}>
                    <input type="text" className="form-control" name="search" autoComplete="off"
                           placeholder="Axtar..." required="" onChange={searchProduct}/>
                    <button className="btn btn-search" type="submit" title="submit-button">
                        <i className="d-icon-search"></i>
                    </button>
                </form>
                {searchValue?.length > 0 && (
                    <ul className="list-group list-style-none custom-list d-flex flex-column"
                        style={{gap: 10,position:"absolute",width:"90%",backgroundColor:"#222529",zIndex:99}}>
                        {!isRequested ? (
                            searchedData?.length > 0 ? (
                                searchedData?.map(item => (
                                    <Link to={`/product/${item?.id}?productDetailId=${item?.productDetails?.[0]?.id}`} onClick={() => {
                                        dispatch(setMobileMenuIsActive(false))
                                    }}>
                                        <li key={item?.id} className="list-group-item custom-group-item"
                                            style={{
                                                height: 70,
                                                verticalAlign: "middle",
                                                display: "flex",
                                                paddingBottom:5
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
                                                         }}>{item?.name} - {item?.productDetails?.[0]?.size}</div>
                                                    <div className="product-price">
                                                        <ins
                                                            className="new-price">{item.productDetails?.[0]?.sale > 0 ? (item.productDetails?.[0]?.lastPrice) : (item.productDetails?.[0]?.sellingPrice)} AZN
                                                        </ins>
                                                        <del
                                                            className="old-price">{item?.productDetails?.[0]?.sale > 0 && item.productDetails?.[0]?.sellingPrice + ' AZN'}</del>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                ))
                            ) : (<div className="product-name font-weight-bold">Məhsul tapılmadı</div>)
                        ) : (<Loading type="bubbles" color="#ff675d" width={50} height={50} className="custom-loading"/>)}
                    </ul>
                )}
                <ul className="mobile-menu mmenu-anim">
                    <li>
                        <Link onClick={() => dispatch(setMobileMenuIsActive(false))}
                              to="/">ANA SƏHİFƏ</Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => dispatch(setMobileMenuIsActive(false))}
                            to="/categories">KATALOQ</Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => dispatch(setMobileMenuIsActive(false))}
                            to="/about">HAQQIMIZDA</Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => dispatch(setMobileMenuIsActive(false))}
                            to="/contact">ƏLAQƏ</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MobileMenu