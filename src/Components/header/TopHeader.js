function TopHeader() {
    return (
        <header className="header">
            <div className="header-top">
                <div className="container">
                    <div className="header-left">
                        <p className="welcome-msg">Burada şirkətin etiketi (sloqan) ola bilər</p>
                    </div>
                    <div className="header-right">
                        {/*<div className="dropdown">*/}
                        {/*    <a href="#currency">USD</a>*/}
                        {/*    <ul className="dropdown-box">*/}
                        {/*        <li><a href="#USD">USD</a></li>*/}
                        {/*        <li><a href="#EUR">EUR</a></li>*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                        {/*<div className="dropdown ml-5">*/}
                        {/*    <a href="#language">ENG</a>*/}
                        {/*    <ul className="dropdown-box">*/}
                        {/*        <li>*/}
                        {/*            <a href="#USD">ENG</a>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <a href="#EUR">FRH</a>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                        <span className="divider"></span>
                        <a href="contact-us.html" className="contact d-lg-show"><i className="d-icon-map"></i>Ünvan</a>
                        <span className="divider"></span>
                        <a href="contact-us.html" className="contact d-lg-show"><i className="d-icon-phone"></i>+994
                            (77) 568 28 22</a>
                        {/*<a href="#" className="help d-lg-show"><i className="d-icon-info"></i> Need Help</a>*/}
                        {/*<a className="login-link" href="ajax/login.html" data-toggle="login-modal"><i*/}
                        {/*    className="d-icon-user"></i>Daxil ol</a>*/}
                        {/*<span className="delimiter">/</span>*/}
                        {/*<a className="register-link ml-0" href="ajax/login.html" data-toggle="login-modal">Qeydiyyat</a>*/}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default TopHeader