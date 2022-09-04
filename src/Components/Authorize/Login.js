import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Auth from "../../api/auth";
import {toast} from "react-toastify";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {useDispatch} from "react-redux";
import User from "../../api/user"
import {setUser} from "../../Stores/userStore";

function Login() {
    const navigate = useNavigate()
    const [passwordShown, setPasswordShown] = useState(false)
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }
    const [isRequested,setIsRequested] = useState(false)
    const [initialFormData, setInitialFormData] = useState({
        email: '', password: ''
    })

    const loginUser = async e => {
        e.preventDefault()
        setIsRequested(true)
        const {data} = await Auth.login({
            ...initialFormData,
            basket:JSON.parse(localStorage.getItem('basket'))
        }).catch(function (error) {
            if (error.response) {
                toast.error('E-mail və ya şifrə yanlışdır', {
                    position: 'bottom-left'
                })
                setInitialFormData({email: '',password: ''})
                setIsRequested(false)
            }
        })
        localStorage.removeItem('token')
        localStorage.setItem('token', data?.data?.token)
        localStorage.setItem('basket', JSON.stringify(data?.data?.basket))
        toast.success('Uğurla daxil oldunuz', {
            position: 'bottom-left'
        })
        setIsRequested(false)
        navigate('/')
    }

    return (<main className="main">
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
                                        <Link className="nav-link active border-no lh-1 ls-normal"
                                              to="/login">Giriş</Link>
                                    </li>
                                    <li className="delimiter">və ya</li>
                                    <li className="nav-item">
                                        <Link className="nav-link border-no lh-1 ls-normal"
                                              to="/register">Qeydiyyat</Link>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active" id="signin">
                                        <form onSubmit={loginUser}>
                                            <div className="form-group mb-3">
                                                <input type="email" value={initialFormData.email} onChange={e => {
                                                    setInitialFormData(prev => ({
                                                        ...prev, email: e.target.value
                                                    }))
                                                }} className="form-control" id="email"
                                                       name="email" placeholder="E-mail"
                                                       required/>
                                            </div>
                                            <div className="form-group" style={{position: "relative"}}>
                                                <input value={initialFormData.password} onChange={e => {
                                                    setInitialFormData(prev => ({
                                                        ...prev, password: e.target.value
                                                    }))
                                                }} type={passwordShown ? "text" : "password"} className="form-control"
                                                       id="password"
                                                       name="password" placeholder="Şifrə"
                                                       required/>{passwordShown === false ? (
                                                <AiFillEye style={{position: "absolute", top: 11, right: 15}}
                                                           onClick={togglePassword}
                                                           size={24} cursor={"pointer"}/>) : (
                                                <AiFillEyeInvisible style={{position: "absolute", top: 11, right: 15}}
                                                                    onClick={togglePassword}
                                                                    size={24} cursor={"pointer"}/>)}
                                            </div>
                                            <button className={`btn btn-dark btn-block btn-rounded ${isRequested && 'btn-disabled'}`} disabled={isRequested}
                                                    type="submit">DAXİL OL
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>)
}

export default Login