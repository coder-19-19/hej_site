import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

function Amount() {

    const cart = useSelector(state => state.cart.cart)

    return (
        cart?.totalLastPrice !== 0 ? (<aside className="col-lg-4 sticky-sidebar-wrapper">
            <div className="sticky-sidebar" data-sticky-options="{'bottom': 20}">
                <div className="summary mb-4">
                    <table className="total">
                        <tbody>
                        <tr className="summary-subtotal">
                            <td>
                                <h4 className="summary-subtitle">İlkin qiymət</h4>
                            </td>
                            <td className="summary-subtotal-price pb-0 pt-0">{cart?.totalPrice} AZN
                            </td>
                        </tr>
                        <tr className="summary-subtotal">
                            <td>
                                <h4 className="summary-subtitle">Endirim</h4>
                            </td>
                            <td className="summary-subtotal-price pb-0 pt-0">{cart?.totalPrice - cart?.totalLastPrice} AZN
                            </td>
                        </tr>
                        <tr className="summary-subtotal">
                            <td>
                                <h4 className="summary-subtitle">Çatdırılma</h4>
                            </td>
                            <td className="summary-subtotal-price pb-0 pt-0">{cart?.deliveryCost ? `${cart?.deliveryCost} AZN` : 'Pulsuz'}
                            </td>
                        </tr>
                        <tr className="summary-total">
                            <td>
                                <h4 className="summary-subtitle" style={{width: "max-content"}}>Yekun qiymət</h4>
                            </td>
                            <td>
                                <p className="summary-total-price ls-s"
                                   style={{color: "#FF675D"}}>{cart?.totalLastPriceWithDelivery} AZN</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <Link to="/checkout" className="btn btn-dark btn-rounded btn-checkout">ÖDƏNİŞƏ KEÇ</Link>
                </div>
            </div>
        </aside>) : (<></>)
    )
}

export default Amount