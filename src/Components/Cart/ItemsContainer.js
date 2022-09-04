import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Basket from "../../api/basket";
import {setCart} from "../../Stores/cartStore";
import {toast} from "react-toastify";

function ItemsContainer() {

    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch()
    const deleteBasketItem = async (cartItem) =>{
        await Basket.deleteBasket(cartItem.id)
        const basketId = JSON.parse(localStorage.getItem('basket')).id
        const  data = (await Basket.getBaskets(basketId))?.data?.data
        dispatch(setCart(data))
    }
    const increaseItemCount = async item => {
        const body = {
            product: {
                id:item?.product?.id
            },
            count: 1,
            basket: JSON.parse(localStorage.getItem('basket'))
        }
        const res = await Basket.addBasket(body)
        localStorage.setItem('basket',JSON.stringify(res?.data?.data))
        const basketId = JSON.parse(localStorage.getItem('basket')).id
        const  data = (await Basket.getBaskets(basketId))?.data?.data
        dispatch(setCart(data))
        toast.dark(`${item?.product?.name} sayı artırıldı`,{position:"bottom-left"})
    }
    const decreaseItemCount = async item => {
        const body = {
            product: {
                id:item?.product?.id
            },
            count: -1,
            basket: JSON.parse(localStorage.getItem('basket'))
        }
        const res = await Basket.addBasket(body)
        localStorage.setItem('basket',JSON.stringify(res?.data?.data))
        const basketId = JSON.parse(localStorage.getItem('basket')).id
        const  data = (await Basket.getBaskets(basketId))?.data?.data
        dispatch(setCart(data))
        toast.dark(`${item?.product?.name} sayı azaldıldı`,{position:"bottom-left"})
    }

    return (
        <div className="col-lg-8 col-md-12 pr-lg-4">
            {cart?.basketItems?.length === 0 ? (<h3>Səbətiniz boşdur</h3>) : (
                <table className="shop-table cart-table">
                    <thead>
                    <tr>
                        <th><span>Məhsul</span></th>
                        <th></th>
                        <th><span>QİYMƏT</span></th>
                        <th><span>Say</span></th>
                        <th>ÜMUMİ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart?.basketItems?.map(cartItem => (
                            <tr key={cartItem.id}>
                                <td className="product-thumbnail">
                                    <figure className="product-media">
                                        <Link to={`/product/${cartItem?.product?.id}`} style={{width:80}}>
                                            <img src={process.env.REACT_APP_MEDIA_URL + cartItem.product?.productImages[0]?.path} style={{width: 80, height: 90}}
                                                 alt="Məhsulun şəkli"/>
                                        </Link>
                                    </figure>
                                </td>
                                <td className="product-name">
                                    <div className="product-name-section">
                                        <Link to={`/product/${cartItem?.product?.id}`}>{cartItem.product?.name}</Link>
                                    </div>
                                </td>
                                <td className="product-subtotal">
                                    <span className="amount">{cartItem.lastPrice} AZN</span>
                                </td>
                                <td className="product-quantity">
                                    <div className="input-group">
                                        <button
                                            onClick={()=> decreaseItemCount(cartItem)}
                                            className="quantity-minus d-icon-minus hover-red"></button>
                                        <input disabled={true} value={cartItem.count} className="quantity form-control"
                                               type="number" min="1"
                                               max="10"/>
                                        <button
                                            onClick={()=> increaseItemCount(cartItem)}
                                            className="quantity-plus d-icon-plus hover-red"></button>
                                    </div>
                                </td>
                                <td className="product-price">
                                    <span className="amount">{cartItem.lastPrice * cartItem.count} AZN</span>
                                </td>
                                <td className="product-close">
                                    <button
                                        onClick={() => deleteBasketItem(cartItem)}
                                        style={{cursor: "pointer"}} className="product-remove hover-red">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            )}
            <div className="cart-actions mb-6 pt-4">
                <Link to="/" className="btn btn-dark btn-md btn-rounded btn-icon-left mr-4 mb-4"><i
                    className="d-icon-arrow-left"></i>ALIŞ-VERİŞƏ DAVAM ET</Link>
            </div>
        </div>
    )
}

export default ItemsContainer