import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Basket from "../api/basket";
import {setCart} from "../Stores/cartStore";

function DropdownCart() {

    const dispatch = useDispatch()

    const deleteBasketItem = async (cartItem) =>{
        await Basket.deleteBasket(cartItem?.id)
        const basketId = JSON.parse(localStorage.getItem('basket'))?.id
        const  data = (await Basket.getBaskets(basketId))?.data?.data
        dispatch(setCart(data))
    }
    const cart = useSelector(state => state.cart.cart)
    console.log(cart?.basketItems,'ferman')
    return (
        <div className="dropdown-box">
            {cart?.basketItems?.length === 0 ? (<>
                <h5 className="text-center">Səbətiniz boşdur</h5>
                <Link to="/" className="btn btn-dark btn-md btn-rounded btn-icon-left"><i
                    className="d-icon-arrow-left"></i>ALIŞ-VERİŞƏ DAVAM ET</Link>
            </>) : (
                <>
                    <div className="products scrollable">
                        {cart.basketItems?.map(cartItem => (
                            <div key={cartItem.id} className="product product-cart">
                                <figure className="product-media">
                                    <a target="_blank" href={`/product/` + cartItem?.product?.id}>
                                        <img src={process.env.REACT_APP_MEDIA_URL + cartItem.product?.productImages[0]?.path} alt="məhsulun şəkli" style={{width: 80, height: 90}}/>
                                    </a>
                                    <button
                                        onClick={() => {
                                           deleteBasketItem(cartItem)
                                        }}
                                        className="btn btn-link btn-close hover-red">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </figure>
                                <div className="product-detail">
                                    <a target="_blank" href={'/product/' + cartItem?.product?.id}
                                       className="product-name">{cartItem.product?.name}</a>
                                    <div className="price-box">
                                        <span className="product-quantity">{cartItem.count}</span>
                                        <span className="product-price">{cartItem.lastPrice} AZN</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-total">
                        <label>Ümumi:</label>
                        <span className="price">{cart.totalLastPrice} AZN</span>
                    </div>
                    <div className="cart-action">
                        <Link to="/cart" className="btn btn-dark btn-link">Səbətə keçid et</Link>
                        <Link to="/checkout" className="btn btn-dark"><span>ÖDƏNİŞ ET</span></Link>
                    </div>
                </>
            )}

        </div>
    )
}

export default DropdownCart