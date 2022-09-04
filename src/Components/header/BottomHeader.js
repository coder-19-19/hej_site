import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCategories} from "../../Stores/categoriesStore";

function BottomHeader() {
    const categories = useSelector(state => state.categories.categories)
    const dispatch = useDispatch()

    const generateCategories = () => {
        return categories?.map(item => (
            <li className="submenu2" key={item?.id}>
                <Link to={`/categories/?categoryId=${item?.id}`}>{item?.name}</Link>
                {item.subcategories.length > 0 &&
                    <ul>
                        {item.subcategories.map(sub => (
                            <li key={sub?.id}><Link to={`/categories/?subcategoryId=${sub?.id}`}>{sub?.name}</Link></li>
                        ))}
                    </ul>
                }
            </li>
        ))
    }

    useEffect(() => {
        !categories.length && dispatch(getCategories())
    },[])
    return (
        <header className="header">
            <div className="header-bottom d-lg-show">
                <div className="container">
                    <div className="header-left">
                        <nav className="main-nav">
                            <ul className="menu menu-active-underline">
                                <li className={`${window.location.pathname === '/' && 'active'}`}>
                                    <Link to="/">Ana Səhifə</Link>
                                </li>
                                <li className={`submenu ${window.location.href.includes('/categories') && 'active'}`}>
                                    <Link to="/categories">Kataloq</Link>
                                    <ul>
                                        {generateCategories()}
                                    </ul>
                                </li>
                                <li className={`${window.location.href.includes('/about') && 'active'}`}>
                                    <Link to="/about">Haqqımızda</Link>
                                </li>
                                <li>
                                    <Link to={"/contact"}>Əlaqə</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default BottomHeader