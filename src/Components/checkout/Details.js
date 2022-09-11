import {useEffect, useState} from "react";
import User from "../../api/user";
import {toast} from "react-toastify";
import Order from "../../api/order";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Loading from "../Loading";

function Details() {
    const [orderData, setOrderData] = useState({})
    const cart = useSelector(state => state.cart.cart)
    const navigate = useNavigate()
    const [isRequested, setIsRequested] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const fetchUser = async () => {
        setIsFetching(true)
        try {
            const {data} = await User.getUser()
            setOrderData(prev => ({
                ...prev,
                firstName: data?.data?.firstName,
                lastName: data?.data?.lastName,
                email: data?.data?.email,
                phone: data?.data?.phone
            }))
            setIsFetching(false)
        }catch (e) {
            setIsFetching(false)
        }
    }

    const submitOrder = async e => {
        e.preventDefault()
        if (orderData?.firstName?.length < 3 || orderData?.lastName < 3) {
            toast.error('Ad və soyad 3 simvoldan kiçik ola bilməz', {
                position: 'bottom-left'
            })
            return
        }
        if (orderData?.address?.length < 10 || orderData?.address === undefined) {
            toast.error('Ünvan 10 simvoldan kiçik ola bilməz', {
                position: 'bottom-left'
            })
            return
        }
        if (orderData?.phone?.length < 9 || orderData?.phone === undefined) {
            toast.error('Nömrə 9 simvoldan kiçik ola bilməz', {
                position: 'bottom-left'
            })
            return
        }
        if (orderData?.email?.length < 5 || orderData?.email === undefined) {
            toast.error('E-mail 5 simvoldan kiçik ola bilməz', {
                position: 'bottom-left'
            })
            return
        }
        setIsRequested(true)
        try {
            const {data} = await Order.addOrder({
                ...orderData, basket: {
                    id: JSON.parse(localStorage.getItem('basket'))?.id
                }
            })
            toast.success('Sifarişiniz qeydə alındı', {
                position: 'bottom-left'
            })
            navigate('/thanks/' + data?.data?.id)

        } catch (e) {
            toast.error('Xəta baş verdi', {
                position: 'bottom-left'
            })
        }
        setIsRequested(false)
    }

    useEffect(() => {
        fetchUser()
    }, [])
    return (
        isFetching ? (
            <div className="d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
                <Loading width={200} height={200} type="bubbles" color="#ff675d"/>
            </div>
        ) : (
            <>
                <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                    <h3 className="title title-simple text-left text-uppercase">Detallar</h3>
                    <div className="row">
                        <div className="col-xs-6">
                            <label>Ad *</label>
                            <input disabled={localStorage.getItem('token')} type="text" className="form-control" name="first-name" value={orderData?.firstName}
                                   onChange={e => {
                                       setOrderData(prev => ({
                                           ...prev,
                                           firstName: e.target.value
                                       }))
                                   }}/>
                        </div>
                        <div className="col-xs-6">
                            <label>Soyad *</label>
                            <input type="text" disabled={localStorage.getItem('token')} className="form-control" name="last-name" value={orderData?.lastName}
                                   onChange={e => {
                                       setOrderData(prev => ({
                                           ...prev,
                                           lastName: e.target.value
                                       }))
                                   }}/>
                        </div>
                    </div>
                    <label>Ünvan *</label>
                    <input type="text" className="form-control" name="address" value={orderData?.address}
                           onChange={e => {
                               setOrderData(prev => ({
                                   ...prev,
                                   address: e.target.value
                               }))
                           }}/>
                    <div className="row">
                        <div className="col-xs-6">
                            <label>E-mail *</label>
                            <input type="text" disabled={localStorage.getItem('token')} className="form-control" name="email-address" value={orderData?.email}
                                   onChange={e => {
                                       setOrderData(prev => ({
                                           ...prev,
                                           email: e.target.value
                                       }))
                                   }}/>
                        </div>
                        <div className="col-xs-6">
                            <label>Telefon *</label>
                            <input type="number" disabled={localStorage.getItem('token')} className="form-control" name="phone" value={orderData?.phone}
                                   onChange={e => {
                                       setOrderData(prev => ({
                                           ...prev,
                                           phone: e.target.value
                                       }))
                                   }}/>
                        </div>
                    </div>
                    <h2 className="title title-simple text-uppercase text-left">Əlavə qeyd</h2>
                    <textarea className="form-control pb-2 pt-2 mb-0" cols="30" rows="5"
                              placeholder="Çatdırılma haqqında istəkləriniz" value={orderData?.note} onChange={e => {
                        setOrderData(prev => ({
                            ...prev,
                            note: e.target.value
                        }))
                    }}></textarea>
                </div>
                <aside className="col-lg-5 sticky-sidebar-wrapper">
                    <div className="pin-wrapper" style={{width: "100%"}}>
                        <div className="sticky-sidebar mt-1" data-sticky-options="{'bottom': 50}"
                             style={{borderBottom: "0px none rgb(102, 102, 102)"}}>
                            <div className="summary pt-5">
                                <h3 className="title title-simple text-left text-uppercase">SİFARİŞİNİZ</h3>
                                <table className="order-table">
                                    <thead>
                                    <tr>
                                        <th>Məhsul</th>
                                        <th>Qiymət</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cart?.basketItems?.map(cartItem => (
                                        <tr key={cartItem?.id}>
                                            <td className="product-name">{cartItem?.productDetail?.product?.name}<span
                                                className="product-quantity font-weight-bold">× {cartItem?.count}</span>
                                            </td>
                                            <td className="product-total text-body font-weight-bold">{cartItem?.lastPrice} AZN</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className="product-name">Çatdırılma</td>
                                        <td className="product-total text-body">{cart?.deliveryCost ? `${cart?.deliveryCost} AZN` : 'Pulsuz'}</td>
                                    </tr>
                                    <tr className="summary-total">
                                        <td className="pb-0">
                                            <h4 className="summary-subtitle">Yekun qiymət</h4>
                                        </td>
                                        <td className=" pt-0 pb-0">
                                            <p className="summary-total-price ls-s"
                                               style={{color: "#FF675D"}}>{cart?.totalLastPriceWithDelivery} AZN</p>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <button
                                    className={`btn btn-rounded btn-primary btn-block ${isRequested && 'btn-disabled'}`}
                                    disabled={isRequested}
                                    onClick={submitOrder}>SİFARİŞİ TƏSDİQLƏ
                                </button>
                                <p className="mt-1 text-center">{localStorage.getItem('order_info')}</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </>
        )
    )
}

export default Details