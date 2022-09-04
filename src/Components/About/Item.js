import image from "../../assets/images/HE logo PNG.png"
import image2 from "../../assets/images/291510953_3346692908897443_7045416555878851247_n.jpg"

function Item() {
    return (
        <div className={"page-content mt-10"}>
            <h1 className="page-title text-center mb-10 ls-l font-weight-bold text-capitalize"
                style={{color: "#ff675d"}}>HE Jewellery haqqında</h1>
            <section className="customer-section pb-10 appear-animate fadeIn appear-animation-visible"
                     style={{animationDuration: "1.2s"}}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-7 mb-4">
                            <figure>
                                <img src={image} alt="Logo" width="400" height="400"
                                     className="banner-radius" style={{border: "1px solid #966939", padding: 50}}/>
                            </figure>
                        </div>
                        <div className="col-md-5 mb-4">
                            <p className="section-desc" style={{fontSize: 16}}>
                                Qızıl hekayəmiz <b>2022-ci ildən</b> etibarən başlamışdır və qısa zamanda paytaxtın
                                topdan
                                və
                                pərakəndə qızıl satışı üzrə aparıcı brendi olmuşdur. Beləliklə, adımız axtarılan,
                                dəbdəbəli,
                                müasir və əntiq toxunuşlarını əks etdirən müxtəlif çeşidləri ilə tanınaraq <b>HE
                                Jewellery </b>
                                olaraq özünü tamamlamışdır. Təbii gözəlliyinizi vurğulayacaq, getdiyiniz yerdə sizi
                                fərqləndirəcək saysız-hesabsız çeşidləri ilə daim yenilənən dəbli kolleksiyamız bütün
                                müştərilərimizin məmnunluğunu qazanıb onların daimi ünvanına çevrilmişdir.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="customer-section pb-10 appear-animate fadeIn appear-animation-visible"
                     style={{animationDuration: "1.2s"}}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-7 mb-4">
                            <p className="section-desc" style={{fontSize: 16, maxWidth: 440}}>
                                Təbii gözəlliyinizi vurğulayacaq, getdiyiniz yerdə sizi
                                fərqləndirəcək saysız-hesabsız
                                çeşidləri ilə daim yenilənən dəbli kolleksiyamız bütün müştərilərimizin
                                məmnunluğunu
                                qazanıb onların daimi ünvanına çevrilmişdir. <b>Bakı şəhəri, Nizami rayon Gold Center
                                ticarət mərkəzi</b>ndə yerləşən mağazamızda müxtəlif əyarlarda boyunbağı, üzük, kulon,
                                komplekt, qolbaq çeşidləri ilə öz müştərilərini gözləyir.
                            </p>
                        </div>
                        <div className="col-md-4 mb-4">
                            <figure>
                                <img src={image2} alt="Mağazamız" width="400" height="400"
                                     className="banner-radius"/>
                            </figure>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Item