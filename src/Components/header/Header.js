import MidHeader from "./MidHeader";
import BottomHeader from "./BottomHeader";
import MobileMenu from "./MobileMenu";
import {useSelector} from "react-redux";

function Header(){

    const mobileMenuIsActive = useSelector(state => state.mobile.mobileMenuIsActive)

    return(
        <div className={`${mobileMenuIsActive === true && `mmenu-active`}`}>
            <MidHeader/>
            <BottomHeader/>
            <MobileMenu/>
        </div>
    )
}

export default Header