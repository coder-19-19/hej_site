import {Link} from "react-router-dom";

function SecondBanner({img, gender,id}) {
    return (
        <div className="col-md-6 mb-4">
            <div
                className="banner banner-fixed overlay-zoom overlay-dark intro-banner intro-banner1 content-middle appear-animate fadeInUpShorter appear-animation-visible"
                data-animation-options="{'name': 'fadeInUpShorter','delay': '.3s'}"
                style={{animationDuration: "1.2s",height:"250px"}}>
                <figure>
                    <img src={img} width="580" height="250" alt="banner"
                         style={{backgroundColor: "#eca5a9",filter: "blur(1px)"}}/>
                </figure>
                <div className="banner-content">
                    <h4 className="banner-subtitle ls-normal text-white text-uppercase font-weight-normal lh-1">
                        YENİ MƏHSULLAR</h4>
                    <h3 className="banner-title text-white font-weight-bold ls-md">
                        {gender} Üçün
                    </h3>
                    <Link to={'/categories/?categoryId=' + id} className="btn btn-white btn-link btn-underline font-weight-semi-bold">Keçid
                        et<i className="d-icon-arrow-right"></i></Link>
                </div>
            </div>
        </div>
    )
}

export default SecondBanner