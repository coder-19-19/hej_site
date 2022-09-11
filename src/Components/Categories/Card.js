import {Link} from "react-router-dom";
import Basket from "../../api/basket";
import {useDispatch} from "react-redux";
import {setCart} from "../../Stores/cartStore";
import {toast} from "react-toastify";
import {useState} from "react";

function Card({item}) {
    console.log(item,'ferman')
    const dispatch = useDispatch()
    const [disabled,setDisabled] = useState(false)
    const addBasket = async item => {
        setDisabled(true)
        const body = {
            productDetail: {
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
        toast.dark(`${item?.product?.name} səbətə əlavə olundu`,{position:"bottom-left"})
        setDisabled(false)
    }
    return (
        <div className="product-wrap">
            <div className="product">
                <figure className="product-media"
                        style={{borderBottom: "1px solid black", borderTop: "1px solid black"}}>
                    <a target="_blank" href={`/product/${item?.product?.id}`}>
                        <img src={process.env.REACT_APP_MEDIA_URL + item?.product?.productImages?.[0]?.path} alt="product"
                             style={{width: 280, height: 315, objectFit: "contain"}}/>
                    </a>
                    {item?.product?.isNew &&
                        <div className="product-label-group">
                            <label className="product-label label-new">YENİ</label>
                        </div>
                    }
                    {item?.sale > 0 &&
                        <div className={`product-label-group ${item?.product?.isNew && 'mt-6'}`}>
                            <label className="product-label label-sale">{item?.sale}% ENDİRİM</label>
                        </div>
                    }
                    <div className="product-action">
                        <button disabled={disabled} style={{cursor: "pointer"}} onClick={() => addBasket(item)}
                                className={`btn-product btn-quickview ${disabled && 'btn-disabled'}`}
                                title="Səbətə əlavə et">SƏBƏTƏ ƏLAVƏ ET
                        </button>
                    </div>
                </figure>
                <div className="product-details text-capitalize">
                    <div>
                        <span>{item?.product?.subCategory?.name} ({item?.product?.subCategory?.category?.name})</span>
                    </div>
                    <h3 className="product-name">
                        <a target="_blank" href={`/product/${item?.product?.id}`}>{item?.product?.name}</a>
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