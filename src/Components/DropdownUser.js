import {Link, useNavigate} from "react-router-dom";
import {IoExitOutline} from "react-icons/io5"

function DropdownUser() {
    const navigate = useNavigate()
    return (
        <div className="dropdown-box" style={{fontSize: 14, width: 150, textAlign: "center",padding:"20px 0 10px 0"}}>
            <Link style={{fontWeight: 'bold', paddingLeft: '31%'}} to="/user">Hesabım</Link>
            <button
                onClick={()=> {
                    localStorage.removeItem('token')
                    if(window.location.pathname === '/' ){
                        window.location.reload()
                    }
                    else {
                        navigate('/')
                    }
                }}
                style={{color: "#ff675d", cursor: "pointer", fontWeight: 'bold'}}
                    className="border-no custom-exit">Çıxış 
                    <IoExitOutline className="custom-exit-icon"
                fontSize={20}
                style={{verticalAlign: "bottom", stroke: "#ff675d", strokeWidth: "5", marginBottom: "-2px"}}
                fontWeight={900}/></button>
        </div>
    )
}

export default DropdownUser