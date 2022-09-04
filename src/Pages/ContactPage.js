import Header from "../Components/header/Header";
import Footer from "../Components/Footer/Footer";
import {MdLocationOn, MdPhone} from "react-icons/md"
import {IoLogoWhatsapp} from "react-icons/io5"
import {RiInstagramFill} from "react-icons/ri"
import {useDispatch, useSelector} from "react-redux";
import Constant from "../api/constant";
import {useEffect, useState} from "react";

function ContactPage() {
    const dispatch = useDispatch()
    const [contactData,setContactData] = useState([])
    const getData = async () =>{
        const {data} = await Constant.getConstants()
        setContactData(data?.data)
    }

    useEffect(()=> {
        getData()
    },[])
    return (
        <>
            <Header/>
            <div className="store-section mt-6 pt-10 pb-8">
                <div className="container">
                    <h1 className="page-title text-center mb-10 ls-l font-weight-bold text-capitalize"
                        style={{color: "#ff675d"}}>Bizimlə əlaqə</h1>
                    <div className="row cols-sm-2 cols-lg-4">
                        <div className="store">
                            <figure className="banner-radius pl-0 pr-0">
                                <div style={{
                                    height: 280,
                                    display: "flex",
                                    justifyContent: "center",
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                    alignItems: "center"
                                }}><MdLocationOn style={{width: 180, height: "auto"}}/></div>
                                <h4 className="overlay-visible"></h4>
                                <div className="overlay overlay-transparent">
                                    <h3 className="text-capitalize"
                                        style={{color: "#ff675d", fontWeight: "bold", letterSpacing: 1}}>Ünvan</h3>
                                    {contactData?.map(item => (
                                        <div style={{fontSize: 15}}
                                             className="font-weight-bold pl-10 pr-10">{item?.title === "address" && item?.value}</div>
                                    ))}
                                </div>
                            </figure>
                        </div>
                        <div className="store">
                            <figure className="banner-radius">
                                <div style={{
                                    height: 280,
                                    display: "flex",
                                    justifyContent: "center",
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                    alignItems: "center"
                                }}><MdPhone style={{width: 180, height: "auto"}}/></div>
                                <h4 className="overlay-visible"></h4>
                                <div className="overlay overlay-transparent">
                                    <h3 className="text-capitalize"
                                        style={{color: "#ff675d", fontWeight: "bold", letterSpacing: 1}}>Telefon</h3>
                                    {contactData?.map(item => (
                                        item?.title === 'phone_number' && (
                                            <a href={`tel:${item?.value}`} style={{fontSize: 15}}
                                               className="font-weight-bold pl-10 pr-10">{item?.title === "phone_number" && item?.value}</a>
                                        )
                                    ))}
                                </div>
                            </figure>
                        </div>
                        <div className="store">
                            <figure className="banner-radius pl-0 pr-0">
                                <div style={{
                                    height: 280,
                                    display: "flex",
                                    justifyContent: "center",
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                    alignItems: "center"
                                }}><IoLogoWhatsapp style={{width: 180, height: "auto"}}/></div>
                                <h4 className="overlay-visible"></h4>
                                <div className="overlay overlay-transparent">
                                    <h3 className="text-capitalize"
                                        style={{color: "#ff675d", fontWeight: "bold", letterSpacing: 1}}>Whatsapp</h3>
                                    {contactData?.map(item => (
                                        <a style={{fontSize: 15}} target="_blank"
                                           href={`https://wa.me/${item?.value.replace(/\D/g, '')}`}
                                           className="font-weight-bold pl-10 pr-10 cursor-pointer">{item?.title === "whatsapp_number" && item?.value}</a>
                                    ))}
                                </div>
                            </figure>
                        </div>
                        <div className="store">
                            <figure className="banner-radius pl-0 pr-0">
                                <div style={{
                                    height: 280,
                                    display: "flex",
                                    justifyContent: "center",
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                    alignItems: "center"
                                }}><RiInstagramFill style={{width: 180, height: "auto"}}/></div>
                                <h4 className="overlay-visible"></h4>
                                <div className="overlay overlay-transparent">
                                    <h3 className="text-capitalize"
                                        style={{color: "#ff675d", fontWeight: "bold", letterSpacing: 1}}>İnstagram</h3>
                                    {contactData?.map(item => (
                                        <a style={{fontSize: 15}}
                                           target="_blank" href={`https://www.instagram.com/${item?.value}`}
                                           className="font-weight-bold pl-10 pr-10 cursor-pointer">{item?.title === "instagram_address" && item?.value}</a>
                                    ))}
                                </div>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default ContactPage
