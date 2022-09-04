import Basket from "../../api/basket"
import {Link} from "react-router-dom";
import basket from "../../api/basket";
import {setCart} from "../../Stores/cartStore";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {useState} from "react";

function Card({item}) {
    const dispatch = useDispatch()
    const [disabled,setDisabled] = useState(false)
    const addBasket = async item => {
        setDisabled(true)
        const body = {
            product: {
                id:item?.id
            },
            count: 1,
            basket: JSON.parse(localStorage.getItem('basket'))
        }
        const res = await Basket.addBasket(body)
        localStorage.setItem('basket',JSON.stringify(res?.data?.data))
        const basketId = JSON.parse(localStorage.getItem('basket')).id
        const  data = (await Basket.getBaskets(basketId))?.data?.data
        dispatch(setCart(data))
        toast.dark(`${item?.name} səbətə əlavə olundu`,{position:"bottom-left"})
        setDisabled(false)
    }

    return (
        <div className="col-lg-3 col-md-4 col-6 mb-4">
            <div className="product appear-animate fadeInLeftShorter appear-animation-visible" data-animation-options="{
                                    'name': 'fadeInLeftShorter',
                                    'delay': '.4s'
                                }" style={{animationDuration: "1.2s"}}>
                <figure className="product-media"
                        style={{borderBottom: "1px solid black", borderTop: "1px solid black"}}>
                    <a target="_blank" href={`/product/${item?.id}`}>
                    <img src={process.env.REACT_APP_MEDIA_URL + item?.productImages[0]?.path} alt=""
                             style={{height: "315px", width: "280px", objectFit: "contain"}}/>
                    </a>
                    {item?.isNew &&
                        <div className="product-label-group">
                            <label className="product-label label-new">YENİ</label>
                        </div>
                    }
                    {item?.sale > 0 &&
                        <div className="product-label-group mt-6">
                            <label className="product-label label-sale">{item?.sale}% ENDİRİM</label>
                        </div>
                    }
                    <div className="product-action">
                        <button
                            disabled={disabled}
                            onClick={() => {addBasket(item)}}
                            style={{cursor: "pointer"}}
                            className={`btn-product btn-quickview ${disabled && 'btn-disabled'}`}>Səbətə əlavə et
                        </button>
                    </div>
                </figure>
                <div className="product-details">
                    <div className="product-cat">
                        <a href="#">{item?.subCategory?.category?.name}</a>
                    </div>
                    <h3 className="product-name">
                        <a target="_blank" href={`/product/${item?.id}`}>{item?.name}</a>
                    </h3>
                    <div className="product-price">
                        <ins
                            className="new-price">{item?.sale > 0 ? (item?.lastPrice) : (item?.sellingPrice)} AZN
                        </ins>
                        <del className="old-price">{item?.sale > 0 && item?.sellingPrice + ' AZN'}</del>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card