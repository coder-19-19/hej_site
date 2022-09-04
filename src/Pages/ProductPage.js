import Header from "../Components/header/Header";
import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import Footer from "../Components/Footer/Footer";
import Products from "../api/products";
import Section from "../Components/Cards/Section";
import Basket from "../api/basket";
import {setCart} from "../Stores/cartStore";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import Loading from "../Components/Loading";

function ProductPage() {
    const dispatch = useDispatch()
    const [isFetching,setIsFetching] = useState(false)
    const addBasket = async item => {
        const body = {
            product: {
                id:item?.id
            },
            count: cartValue,
            basket: JSON.parse(localStorage.getItem('basket'))
        }
        const res = await Basket.addBasket(body)
        localStorage.setItem('basket',JSON.stringify(res?.data?.data))
        const basketId = JSON.parse(localStorage.getItem('basket')).id
        const  data = (await Basket.getBaskets(basketId))?.data?.data
        dispatch(setCart(data))
        toast.dark(`${item?.name} səbətə əlavə olundu`,{position:"bottom-left"})
        setCartValue(1)
    }
    const {id} = useParams()
    const [product,setProduct] = useState({})
    const [cartValue,setCartValue] = useState(1)
    const [otherProducts,setOtherProducts] = useState([])
    const [activeImage,setActiveImage] = useState('')
    const fetchProduct = async () => {
        try {
            return await Products.getProductById(id)
        }catch (e) {
            return <h1>404</h1>
        }

    }

    const fetchProducts = async () => {
        setIsFetching(true)
        return await Products.getPopularProducts(4)
    }

    useEffect(() => {
        fetchProduct().then(res => {
            setProduct(res?.data?.data)
            setActiveImage(res?.data?.data?.productImages?.[0]?.id)
            setIsFetching(false)
        })
        fetchProducts().then(res => {
            setOtherProducts(res?.data?.data)
        })
    },[id])
    return(
        isFetching ? (
                <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
                    <Loading width={200}  height={200} color="#ff675d" type="bubbles"/>
                </div>
            ) :(
            <>
                <Header/>
                <main className="main mt-8 single-product">
                    <div className="page-content mb-10 pb-6">
                        <div className="container">
                            <div className="product product-single row mb-8">
                                <div className="col-md-6">
                                    <div className="product-gallery pg-vertical">
                                        <div
                                            className="product-single-carousel owl-carousel owl-theme owl-nav-inner row cols-1 gutter-no">
                                            {product?.productImages?.map(item => (
                                                activeImage === item?.id && (
                                                    <figure className="product-image" key={item?.id} style={{maxHeight:'492px'}}>
                                                        <img src={process.env.REACT_APP_MEDIA_URL + item?.path}
                                                             alt={item?.name} width="800" height="900" style={{objectFit:'cover',maxHeight:'492px'}}/>
                                                    </figure>
                                                )
                                            ))}
                                        </div>
                                        <div className="product-thumbs-wrap">
                                            <div className="product-thumbs">
                                                {product?.productImages?.map(item => (
                                                    <div onClick={() => setActiveImage(item?.id)} className={`product-thumb ${activeImage === item?.id && 'active'}`} key={item?.id}>
                                                        <img src={process.env.REACT_APP_MEDIA_URL + item?.path}
                                                             alt="product thumbnail"
                                                             width="109" height="122"/>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="thumb-up disabled"><i className="fas fa-chevron-left"></i>
                                            </button>
                                            <button className="thumb-down disabled"><i className="fas fa-chevron-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 sticky-sidebar-wrapper">
                                    <div className="product-details sticky-sidebar" data-sticky-options="{'minWidth': 767}">
                                        <h1 className="product-name">{product?.name}</h1>
                                        <div className="product-meta">
                                            Kateqoriya: <span className="product-sku">{product?.subCategory?.name}</span>
                                        </div>
                                        <div className="product-price">{product?.lastPrice} AZN</div>
                                        <p className="product-short-desc">{product?.description}</p>

                                        <hr className="product-divider"/>

                                        <div className="product-form product-qty">
                                            <div className="product-form-group">
                                                <div className="input-group mr-2">
                                                    <button className="quantity-minus d-icon-minus" onClick={() => setCartValue(cartValue - 1 > 0 ? cartValue - 1 : 1)}/>
                                                    <input className="quantity form-control" defaultValue={cartValue} onChange={e => setCartValue(e.target.value)} value={cartValue} type="number" min="1"
                                                           max="10"/>
                                                    <button onClick={() => setCartValue(cartValue + 1)} className="quantity-plus d-icon-plus"></button>
                                                </div>
                                                <button onClick={() => addBasket(product)}
                                                        className="btn-product btn-cart text-normal ls-normal font-weight-semi-bold">
                                                    <i
                                                        className="d-icon-bag"></i>Səbətə əlavə et
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab tab-nav-simple product-tabs mb-4">
                                <div className="tab-content">
                                    <div className="tab-pane active in" id="product-tab-description">
                                        <div className="row mt-6">
                                            <div className="col-md-6">
                                                <h5 className="description-title mb-3 font-weight-semi-bold ls-m">Özəlliklər
                                                </h5>
                                                <table className="table">
                                                    <tbody>
                                                    <tr>
                                                        <th className="font-weight-semi-bold text-dark pl-0">Artikul</th>
                                                        <td className="pl-4">{product?.article}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="font-weight-semi-bold text-dark pl-0">Çəki
                                                        </th>
                                                        <td className="pl-4">{product?.weight} qr</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="font-weight-semi-bold text-dark pl-0">Əyar
                                                        </th>
                                                        <td className="pl-4">{product?.hallmarkValue}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="font-weight-semi-bold text-dark border-no pl-0">
                                                            Anbardaki sayı
                                                        </th>
                                                        <td className="border-no pl-4">{product?.stockValue}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Section sectionName="Digər məhsullar" otherProducts={otherProducts}/>
                        </div>
                    </div>
                </main>

                <Footer/>
            </>
            )
    )
}
export default ProductPage