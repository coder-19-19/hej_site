import {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "../../Stores/userStore";
import User from "../../api/user";
import {toast} from "react-toastify";
import Auth from "../../api/auth";
import Modal from 'react-modal';
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {IoExitOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import Order from "../../api/order";
import moment from "moment";

function Main() {
    const [formData, setFormData] = useState({})
    const [passwordData, setPasswordData] = useState({})
    const dispatch = useDispatch()
    const [orders, setOrders] = useState([])
    const [passwordShown, setPasswordShown] = useState(false)
    const [user, setUser] = useState({})
    const [isRequested, setIsRequested] = useState(false)
    const [modal, setModal] = useState({status: false})
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            width:'auto',
            transform: 'translate(-50%, -50%)',
        },
    };
    const fetchUser = async () => {
        const data = await dispatch(getUserData())
        setUser(data)
        setFormData({
            firstName: data?.firstName,
            lastName: data?.lastName,
            phone: data?.phone
        })
    }

    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState(0)

    const handleSubmit = async () => {
        if (formData?.firstName?.length < 3 || formData?.lastName < 3) {
            toast.error('Ad və soyad 3 simvoldan kiçik ola bilməz', {
                position: 'bottom-left'
            })
            return
        }
        if (formData?.phone?.length < 9) {
            toast.error('Nömrə 9 simvoldan kiçik ola bilməz', {
                position: 'bottom-left'
            })
            return
        }
        setIsRequested(true)
        try {
            const data = await User.updateUser(formData)
            toast.success('Məlumatlar yeniləndi', {
                position: 'bottom-left'
            })
        } catch (e) {
            toast.error('Xəta baş verdi', {
                position: 'bottom-left'
            })
        }
        setIsRequested(false)
    }

    const handleSubmitPassword = async () => {
        if (passwordData?.newPassword?.length < 8 || passwordData?.currentPassword?.length < 8) {
            toast.error('Şifrə 8 simvoldan az olmamalıdır', {
                position: 'bottom-left'
            })
            return
        }
        if (passwordData?.currentPassword === passwordData?.newPassword) {
            toast.error('Yeni şifrə ilə mövcud şifrə eyni ola bilməz', {
                position: 'bottom-left'
            })
        }
        return
        setIsRequested(true)

        const data = await Auth.changePassword(passwordData)
        if (data?.data?.success) {
            toast.success('Məlumatlar yeniləndi', {
                position: 'bottom-left'
            })
        } else {
            toast.error(data?.response?.data?.message, {
                position: 'bottom-left'
            })
        }
        setIsRequested(false)
    }

    const fetchOrders = async () => {
        const {data} = await Order.getUserCurrent()
        setOrders(data?.data)
    }

    useEffect(() => {
        fetchUser()
        fetchOrders()
    }, [])
    return (
        <>
            <ul className="nav nav-tabs mb-4 col-lg-3 col-md-4" role="tablist">
                <li className="nav-item">
                    <a className={`nav-link cursor-pointer ${activeTab === 0 && 'active'}`}
                       onClick={() => setActiveTab(0)}>Şəxsi məlumatlarım</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link cursor-pointer ${activeTab === 1 && 'active'}`}
                       onClick={() => setActiveTab(1)}>Şifrənin yenilənməsi</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link cursor-pointer ${activeTab === 2 && 'active'}`}
                       onClick={() => setActiveTab(2)}>Sifarişlərim</a>
                </li>
                <li className="nav-item">
                    <button
                        onClick={() => {
                            localStorage.removeItem('token')
                            if (window.location.pathname === '/') {
                                window.location.reload()
                            } else {
                                navigate('/')
                            }
                        }}
                        style={{
                            color: "#ff675d",
                            cursor: "pointer",
                            fontWeight: 'bold',
                            fontSize: 16,
                            marginLeft: 2,
                            marginTop: 10,backgroundColor:"#fff"
                        }}
                        className="border-no custom-exit">Çıxış
                        <IoExitOutline className="custom-exit-icon"
                                       fontSize={26}
                                       style={{
                                           verticalAlign: "bottom",
                                           stroke: "#ff675d",
                                           strokeWidth: "5",
                                           marginBottom: "-4px",
                                           marginLeft: 6
                                       }}
                                       fontWeight={900}/>
                    </button>
                </li>
            </ul>
            <div className="col-lg-9 col-md-8">
                {activeTab === 0 && (
                    <div className="tab-pane" id="account_details" style={{color: "black", fontWeight: 700}}>
                        <h4 className="title title-center" style={{fontSize: 22, color: "#ff675d"}}>Şəxsi
                            məlumatlar</h4>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <label>Ad
                                    <input style={{fontSize: 14, color: "black"}}
                                           className="form-control mt-1 custom-input-red"
                                           type="text"
                                           placeholder="ad"
                                           defaultValue={user?.firstName}
                                           onChange={e => {
                                               setFormData(prev => ({
                                                   ...prev,
                                                   firstName: e.target.value
                                               }))
                                           }}/></label>
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Soyad <input
                                    style={{fontSize: 14, color: "black"}}
                                    className="form-control mt-1 custom-input-red"
                                    type="text"
                                    placeholder="soyad"
                                    defaultValue={user?.lastName}
                                    onChange={e => {
                                        setFormData(prev => ({
                                            ...prev,
                                            lastName: e.target.value
                                        }))
                                    }}/></label>
                            </div>
                            <div className="col-12 col-md-6">
                                <label>E-mail
                                    <input style={{fontSize: 14}}
                                           className="form-control mt-1 custom-input-red"
                                           type="email"
                                           placeholder="E-mail"
                                           defaultValue={user?.email}
                                           disabled={true}
                                    /></label>
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Tel <input
                                    style={{fontSize: 14, color: "black"}}
                                    className="form-control mt-1 custom-input-red"
                                    type="number"
                                    placeholder="Telefon"
                                    defaultValue={user?.phone}
                                    onChange={e => {
                                        setFormData(prev => ({
                                            ...prev,
                                            phone: e.target.value
                                        }))
                                    }}/></label>
                            </div>
                            <div className="col-12">
                                <div className="d-flex justify-content-end">
                                    <button className={`btn btn-rounded btn-primary ${isRequested && 'btn-disabled'}`}
                                            onClick={handleSubmit} disabled={isRequested}>
                                        TƏSDİQLƏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 1 && (
                    <div className="tab-pane" style={{color: "black", fontWeight: 700}}>
                        <h4 className="title title-center" style={{fontSize: 22, color: "#ff675d"}}>Şifrənin
                            yenilənməsi</h4>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <label>
                                    Mövcud şifrə
                                    <input type="text" value={passwordData?.currentPassword}
                                           placeholder={"******"}
                                           style={{fontSize: 14, color: "black"}}
                                           className="form-control mt-1 custom-input-red" onChange={e => {
                                        setPasswordData(prev => ({
                                            ...prev,
                                            currentPassword: e.target.value
                                        }))
                                    }} required={true}/>
                                </label>
                            </div>
                            <div className="col-12 col-md-6">
                                <label>
                                    Yeni şifrə
                                    <input style={{fontSize: 14, color: "black"}} required={true}
                                           className="form-control mt-1 custom-input-red"
                                           type={passwordShown ? 'text' : 'password'}
                                           placeholder={"******"}
                                           value={passwordData?.newPassword} onChange={e => {
                                        setPasswordData(prev => ({
                                            ...prev,
                                            newPassword: e.target.value
                                        }))
                                    }}/> {passwordShown === false ? (
                                    <AiFillEye style={{position: "absolute", top: 30, right: 20}}
                                               onClick={() => setPasswordShown(!passwordShown)}
                                               size={24} cursor={"pointer"}/>) : (
                                    <AiFillEyeInvisible style={{position: "absolute", top: 30, right: 20}}
                                                        onClick={() => setPasswordShown(!passwordShown)}
                                                        size={24} cursor={"pointer"}/>)}
                                </label>
                            </div>
                            <div className="col-12">
                                <div className="d-flex justify-content-end">
                                    <button className={`btn btn-rounded btn-primary ${isRequested && 'btn-disabled'}`}
                                            disabled={isRequested} onClick={handleSubmitPassword}>TƏSDİQLƏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 2 && (
                    <div className="tab-pane" id="orders">
                        <h4 className="title title-center" style={{fontSize: 22, color: "#ff675d"}}>Sifarişlərim</h4>
                        <table className="order-table">
                            <thead>
                            <tr>
                                <th className="pl-2">№</th>
                                <th>Tarix</th>
                                <th>Ümumi</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders?.map((item, index) => (
                                <Fragment key={item?.id}>
                                    <tr>
                                        <td className="order-number"><a href="#">#{index + 1}</a></td>
                                        <td className="order-date">
                                            <span>{moment(item?.createDate).format('DD.MM.YYYY')}</span></td>
                                        <td className="order-total">
                                            <span>{item?.totalPrice} AZN ({item?.orderItems?.length} məhsul)</span></td>
                                        <td className="order-action"><a href="#"
                                                                        className="btn btn-primary btn-link btn-underline"
                                                                        onClick={() => {
                                                                            setModal({
                                                                                status: true,
                                                                                item: item,
                                                                            })
                                                                        }}>Ətraflı</a>
                                        </td>
                                    </tr>
                                </Fragment>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Modal
                isOpen={modal?.status}
                style={customStyles}
                onRequestClose={() => setModal({status: false})}
                contentLabel="Salam"
            >
                <div className="row">
                    <div className="col-12">
                        <h4 className="title title-center" style={{fontSize: 22, color: "#ff675d"}}>Ətraflı baxış</h4>
                    </div>
                    <div className="col-12">
                        <div className="d-flex justify-content-between pl-1 mt-1">
                            <span className="font-weight-bold">Status</span>
                            <span>{modal?.item?.isActive ? 'Çatdırılmayıb' : 'Çatdırlıb'}</span>
                        </div>
                        <div className="d-flex justify-content-between pl-1 mt-1">
                            <span className="font-weight-bold">Çatdırılma</span>
                            <span>{modal?.item?.deliveryCost ? `${modal?.item?.deliveryCost} AZN` : 'Pulsuz'}</span>
                        </div>
                        <div className="d-flex justify-content-between pl-1 mt-1">
                            <span className="font-weight-bold">Endirim</span>
                            <span>{modal?.item?.totalPrice - modal?.item?.totalLastPriceWithDelivery} AZN</span>
                        </div>
                        <div className="d-flex justify-content-between pl-1 mt-1">
                            <span className="font-weight-bold">Yekun dəyər</span>
                            <span>{modal?.item?.totalLastPriceWithDelivery} AZN</span>
                        </div>
                        <div className="pl-1">
                            <table className="table mt-3">
                                <thead>
                                    <tr style={{color:'#ff675d',textAlign:'left'}}>
                                        <th>Ad</th>
                                        <th>Say</th>
                                        <th>Endirim</th>
                                        <th>Yekun qiymət</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {modal?.item?.orderItems?.map(item => (
                                    <tr key={item?.id} style={{margin:'6px 0'}}>
                                        <td>
                                            {item?.product?.name}
                                        </td>
                                        <td>
                                            <span>{item?.count}</span>
                                        </td>
                                        <td>
                                            <span>{item?.price} AZN</span>
                                        </td>
                                        <td>
                                            <span>{item?.lastPrice} AZN</span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-sm btn-primary btn-rounded" onClick={() => setModal({status: false})}>Bağla</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Main