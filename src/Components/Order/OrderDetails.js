import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Order from "../../api/order";

function OrderDetails(){
    const {id} = useParams()
    const [order,setOrder] = useState({})
    const fetchOrder = async () => {
            const {data} = await Order.getCurrent(id)
            setOrder(data?.data)
    }
    useEffect(() => {
        fetchOrder()
    },[])
    return(
        <>
            <h2 className="title title-simple text-left pt-4 font-weight-bold text-uppercase">SİFARİŞ MƏLUMATLARI</h2>
            <div className="order-details">
                <table className="order-details-table">
                    <thead>
                    <tr className="summary-subtotal">
                        <td>
                            <h3 className="summary-subtitle">Məhsullar</h3>
                        </td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {order?.orderItems?.map(item => (
                        <tr key={item?.id}>
                            <td className="product-name">{item?.productDetail?.product?.name} - {item?.productDetail?.size} qr <span> <i className="fas fa-times"></i>
                                {item?.count}</span></td>
                            <td className="product-price">{item?.lastPrice} AZN</td>
                        </tr>
                    ))}
                    <tr className="summary-subtotal">
                        <td>
                            <h4 className="summary-subtitle">Məhsulların ümumi dəyəri:</h4>
                        </td>
                        <td className="summary-subtotal-price">{order?.totalLastPrice} AZN</td>
                    </tr>
                    <tr className="summary-subtotal">
                        <td>
                            <h4 className="summary-subtitle">Çatdırılma:</h4>
                        </td>
                        <td className="summary-subtotal-price">{order?.deliveryCost ? `${order?.deliveryCost} AZN` : 'Pulsuz'}</td>
                    </tr>
                    <tr className="summary-subtotal">
                        <td>
                            <h4 className="summary-subtitle">Cəmi:</h4>
                        </td>
                        <td>
                            <p className="summary-total-price">{order?.totalLastPriceWithDelivery} AZN</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <Link to="/" className="mt-4 btn btn-icon-left btn-dark btn-back btn-rounded btn-md mb-4"><i
                className="d-icon-arrow-left"></i>Ana səhifəyə dön</Link>
        </>
    )
}
export default OrderDetails