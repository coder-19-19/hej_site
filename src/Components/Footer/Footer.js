import React, {useEffect, useState} from 'react';
import {SocialIcon} from 'react-social-icons';
import {Link} from "react-router-dom";
import icon from "../../assets/images/HE logo PNG.png"
import Constant from "../../api/constant";

function Footer() {
    const [constantData,setConstantData] = useState([])

    const fetchConstants = async () => {
        const {data} = await Constant.getConstants()
        setConstantData(data?.data)
        localStorage.setItem('order_info',data?.data?.find(item => item?.title === 'order_info')?.value)
    }

    useEffect(() => {
        fetchConstants()
    },[])
    return (
        <footer className="footer appear-animate fadeIn appear-animation-visible" style={{animationDuration: "1.2s"}}>
            <div className="container">
                <div className="footer-middle">
                    <div className="row">
                        <div className="col-lg-3 col-sm-4">
                            <div className="widget widget-about">
                                <Link to="/" className="logo-footer mb-4" style={{width: 126}}>
                                    <img src={icon} alt="logo-footer" style={{height: 100, width: "auto"}}/>
                                </Link>

                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-4 col-sm-4">
                                    <div className="widget">
                                        <h4 className="widget-title">Bizimlə əlaqə</h4>
                                        <ul className="widget-body">
                                            <li><p className={"copyright"}><i className="d-icon-map" style={{
                                                color: "white",
                                                marginRight: 5
                                            }}></i>Nizami rayonu, Xalqlar m.s. yaxınlığı <br/><span className="ml-4">"Gold Center" ticarət mərkəzi</span>
                                            </p>
                                            </li>
                                            <li><p className={"copyright"}><i className="d-icon-phone" style={{
                                                color: "white",
                                                marginRight: 5
                                            }}></i>+994 (51) 250 09 90
                                            </p>
                                            </li>
                                            <li><p className={"copyright"}><i className="d-icon-instagram" style={{
                                                color: "white",
                                                marginRight: 5
                                            }}></i>HE__Jewellery
                                            </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-center">
                        <p className="copyright">HE Jewelry © 2022. Bütün müəllif hüquqları qorunur</p>
                    </div>
                    <div className="footer-right">
                        <div className="social-links">
                            <span title="İnstagram Səhifəmiz" style={{display: "flex"}}
                               className="social-link social-instagram fab fa-instagram"><SocialIcon
                                target="_blank" rel="noopener noreferrer"
                                style={{width: "100%", height: "100%"}}
                                url={"https://www.instagram.com/" + constantData?.find(item => item?.title === 'instagram_address')?.value}/></span>
                            <span title="Whatsapp nömrəmiz" style={{display: "flex"}}
                               className="social-link social-instagram fab fa-instagram"><SocialIcon
                                target="_blank" rel="noopener noreferrer"
                                style={{width: "100%", height: "100%"}}
                                url={"https://wa.me/" + constantData?.find(item => item?.title === 'whatsapp_number')?.value} network={"whatsapp"}/></span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
