import {Link} from "react-router-dom";
import Auth from "../../api/auth";
import {useState} from "react";
import {useNavigate} from 'react-router-dom'
import {toast} from "react-toastify";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai"
import {useDispatch} from "react-redux";
import {setCart} from "../../Stores/cartStore";

function Register() {
    const navigate = useNavigate()
    const [passwordShown, setPasswordShown] = useState(false)
    const [isRequested,setIsRequested] = useState(false)
    const dispatch = useDispatch()
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const [initialFormData, setInitialFormData] = useState(
        {
            email: '',
            firstName: '',
            lastName: '',
            phone:'',
            password: ''
        })
    const registerUser = async e => {
        e.preventDefault()
        if(initialFormData?.firstName?.length < 3 || initialFormData?.lastName < 3) {
            toast.error('Ad və soyad 3 simvoldan kiçik ola bilməz', {
                position: 'bottom-left'
            })
            return
        }
        if (initialFormData?.phone?.length < 9) {
            toast.error('Nömrə 9 simvoldan kiçik ola bilməz', {
                position: 'bottom-left'
            })
            return
        }
        if (initialFormData?.password?.length < 8) {
            toast.error('Şifrə 8 simvoldan kiçik ola bilməz', {
                position: 'bottom-left'
            })
            return
        }
        setIsRequested(true)
        try {
            const {data} = await Auth.register({
                ...initialFormData,
                basket:JSON.parse(localStorage.getItem('basket'))
            })
            localStorage.removeItem('token')
            localStorage.setItem('token', data?.data?.token)
            if(data?.data?.basket) {
                dispatch(setCart(data?.data?.basket))
            }
            navigate('/')
            toast.success('Uğurla qeydiyyatdan keçildi', {
                position: 'bottom-left'
            })
        }catch (e) {
            toast.error(e.response.data?.message, {
                position: 'bottom-left'
            })
        }
        setIsRequested(false)

    }
    return (
        <main className="main">
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><Link to="/"><i className="d-icon-home"></i></Link></li>
                        <li>Hesabım</li>
                    </ul>
                </div>
            </nav>
            <div className="page-content mt-6 pb-2 mb-10">
                <div className="container">
                    <div className="login-popup">
                        <div className="form-box">
                            <div className="tab tab-nav-simple tab-nav-boxed form-tab">
                                <ul className="nav nav-tabs nav-fill align-items-center border-no justify-content-center mb-5"
                                    role="tablist">
                                    <li className="nav-item">
                                        <Link className="nav-link border-no lh-1 ls-normal" to="/login">Giriş</Link>
                                    </li>
                                    <li className="delimiter">və ya</li>
                                    <li className="nav-item">
                                        <Link className="nav-link active border-no lh-1 ls-normal"
                                              to="/register">Qeydiyyat</Link>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active" id="register">
                                        <form onSubmit={registerUser}>
                                            <div className="form-group mb-3">
                                                <input type="text" className="form-control" id="name"
                                                       name="firstName" placeholder="Ad"
                                                       onChange={e => {
                                                           setInitialFormData(prev => ({
                                                               ...prev,
                                                               firstName: e.target.value
                                                           }))
                                                       }}
                                                       required value={initialFormData.firstName}/>
                                            </div>
                                            <div className="form-group mb-3">
                                                <input type="text" className="form-control" id="surname"
                                                       name="surname" placeholder="Soyad"
                                                       required value={initialFormData.lastName} onChange={e => {
                                                    setInitialFormData(prev => ({
                                                        ...prev,
                                                        lastName: e.target.value
                                                    }))
                                                }}/>
                                            </div>
                                            <div className="form-group mb-3">
                                                <input type="email" className="form-control" id="email"
                                                       name="email" placeholder="Email"
                                                       required value={initialFormData.email} onChange={e => {
                                                    setInitialFormData(prev => ({
                                                        ...prev,
                                                        email: e.target.value
                                                    }))
                                                }}/>
                                            </div>
                                            <div className="form-group mb-3">
                                                <input type="number" className="form-control" id="phone"
                                                       name="phone" placeholder="Telefon"
                                                       required value={initialFormData.phone} onChange={e => {
                                                    setInitialFormData(prev => ({
                                                        ...prev,
                                                        phone: e.target.value
                                                    }))
                                                }}/>
                                            </div>
                                            <div className="form-group mb-3" style={{position: "relative"}}>
                                                <input type={passwordShown ? "text" : "password"}
                                                       className="form-control" id="password"
                                                       name="password" placeholder="Şifrə"
                                                       required value={initialFormData.password} onChange={e => {
                                                    setInitialFormData(prev => ({
                                                        ...prev,
                                                        password: e.target.value
                                                    }))
                                                }}/>{passwordShown === false ? (
                                                <AiFillEye style={{position: "absolute", top: 11, right: 15}}
                                                           onClick={togglePassword}
                                                           size={24} cursor={"pointer"}/>) : (
                                                <AiFillEyeInvisible style={{position: "absolute", top: 11, right: 15}}
                                                           onClick={togglePassword}
                                                           size={24} cursor={"pointer"}/>)}
                                            </div>
                                            <button className={`btn btn-dark btn-block btn-rounded ${isRequested && 'btn-disabled'}`} disabled={isRequested}
                                                    type="submit">QEYDİYYATDAN KEÇ
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Register