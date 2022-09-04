import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setMinPrice} from "../../Stores/categoriesStore";
import {setFilterIsActive} from "../../Stores/MobileStore";
import {getProducts, setLoading} from "../../Stores/productsStore";
import {useLocation, useSearchParams} from "react-router-dom";

function Filter({page,setPage}) {
    const initialFilterData = {
        hallmarkValue: null,
        maxPrice: null,
        minPrice: null,
        categoryId: null,
        subcategoryId: null
    }

    const [filterData, setFilterData] = useState(initialFilterData)
    const [selectedMenu, setSelectedMenu] = useState([])
    const [catalogIsActive, setCatalogIsActive] = useState(true)
    const [priceIsActive, setPriceIsActive] = useState(true)
    const [sizeIsActive, setSizeIsActive] = useState(true)
    const categories = useSelector(state => state.categories.categories)
    const dispatch = useDispatch()
    const location = useLocation()
    const handleClick = (id) => {
        if (selectedMenu.includes(id)) {
            setSelectedMenu(prevState => ([...prevState.filter(item => item !== id)]))
            return
        }
        setSelectedMenu(prevState => ([...prevState, id]))

    }

    const filter = async (data) => {
        await dispatch(setLoading(true))
        await dispatch(getProducts(data || filterData))
        dispatch(setLoading(false))
        window.scrollTo(0,0)
    }

    useEffect(() => {
        let search = location.search
        if (search) {
            search = search.replace('?', '')
            search = search.split('=')
            if (search?.includes('name')) {
                filter({...filterData, [search[0]]: search[1]})
            } else {
                setFilterData(prev => ({
                    ...prev,
                    [search[0]]: search[1]
                }))
                filter({...filterData, [search[0]]: search[1]})
            }
        }
    }, [])

    useEffect(() => {
        filter({...filterData, page:page-1})
    },[page])

    const generateCategories = () => {
        return categories?.map(item => (
            <li style={{position: "relative"}}
                className={`with-ul ${selectedMenu.includes(item?.id) && 'show'}`}
                key={item?.id}>
                <a className="hover-red cursor-pointer"
                   style={{display: "inline-block", fontWeight: "bold", fontSize: 14}}
                   onClick={() => {
                       setFilterData(prev => ({
                           ...prev,
                           categoryId: item?.id
                       }))
                       filter({...filterData, categoryId: item?.id})
                   }}>{item?.name}</a>
                <i className="hover-red" onClick={() => {
                    handleClick(item.id)
                }}
                   style={{right: "20px", position: "absolute", cursor: "pointer", opacity: 0.8}}>⮟</i>
                <ul className={+selectedMenu?.includes(item?.id) && 'd-block'}>
                    {item.subcategories?.map(sub => (
                        <li key={sub?.id}><a className="hover-red cursor-pointer" onClick={() => {
                            setFilterData(prev => ({
                                ...prev,
                                subcategoryId: sub?.id
                            }))
                            filter({...filterData, subcategoryId: sub?.id})
                        }}>{sub?.name}</a></li>
                    ))}
                </ul>
            </li>
        ))
    }


    return (
        <aside className={`col-lg-3 sidebar sidebar-fixed sidebar-toggle-remain shop-sidebar sticky-sidebar-wrapper`}>
            <div onClick={() => dispatch(setFilterIsActive(false))} className="sidebar-overlay"></div>
            <button style={{backgroundColor: "rgba(28,26,26,0.8)", cursor: "pointer", border: 'none', padding: "5px"}}
                    onClick={() => dispatch(setFilterIsActive(false))} className="sidebar-close"><i
                className="d-icon-times"></i></button>
            <button onClick={() => dispatch(setFilterIsActive(true))} style={{cursor: "pointer"}}
                    className="sidebar-toggle">
                <span style={{fontSize: 24}}>➥</span>
            </button>
            <div className="sidebar-content">
                <div className="pin-wrapper" style={{height: "1683.28px"}}>
                    <div className="sticky-sidebar" data-sticky-options="{'top': 10}"
                         style={{borderBottom: "0px none rgb(102, 102, 102)", width: "239.9px"}}>
                        <div className="widget widget-collapsible">
                            <div style={{position: "relative"}} onClick={() => setCatalogIsActive(!catalogIsActive)}><h3
                                className="widget-title hover-red">Cinsiyyət<span style={{
                                fontSize: 14,
                                top: 29,
                                right: 20,
                                position: "absolute"
                            }}>{catalogIsActive ? '⮟' : '⮝'}</span></h3></div>
                            {catalogIsActive &&
                                <ul className="widget-body filter-items search-ul" style={{display: "block"}}>
                                    {generateCategories()}
                                </ul>}
                        </div>
                        <div className="widget widget-collapsible">
                            <div onClick={() => setPriceIsActive(!priceIsActive)}>
                                <h3 className="widget-title hover-red" style={{position: "relative"}}>Qiymətə görə göstər<span
                                    style={{
                                        fontSize: 14,
                                        top: 29,
                                        right: 20,
                                        position: "absolute"
                                    }}>{priceIsActive ? '⮟' : '⮝'}</span></h3>
                            </div>
                            {priceIsActive && <div className="widget-body mt-3">
                                <div className="d-flex align-items-center" style={{gap: 10, marginLeft: 4}}><input
                                    className="custom-input-red"
                                    placeholder="min."
                                    style={{
                                        border: "1px solid black",
                                        width: 60,
                                        height: 30,
                                        borderRadius: 3,
                                        padding: 7
                                    }} type="number" onChange={(e) => {
                                    setFilterData(prev => ({
                                        ...prev,
                                        minPrice: e.target.value ? e.target.value : null
                                    }))
                                }
                                }/>
                                    →<input className="custom-input-red"
                                        onChange={(e) => {
                                            setFilterData(prev => ({
                                                ...prev,
                                                maxPrice: e.target.value ? e.target.value : null
                                            }))
                                        }
                                        }
                                        placeholder="maks."
                                        style={{
                                            border: "1px solid black",
                                            width: 60,
                                            height: 30,
                                            borderRadius: 3,
                                            padding: 7
                                        }} type="number"/>
                                </div>
                                <button
                                    onClick={() => filter()}
                                    style={{marginLeft: 4, marginTop: 14}}
                                    className="btn btn-dark btn-sm btn-rounded">axtar
                                </button>
                            </div>
                            }
                        </div>
                        <div className="widget widget-collapsible">
                            <div onClick={() => setSizeIsActive(!sizeIsActive)}>
                                <h3 className="widget-title hover-red" style={{position: "relative"}}>Əyar dəyəri<span
                                    style={{
                                        fontSize: 14,
                                        top: 29,
                                        right: 20,
                                        position: "absolute"
                                    }}>{sizeIsActive ? '⮟' : '⮝'}</span></h3></div>
                            {sizeIsActive && <ul className="widget-body filter-items">
                                <li className={filterData?.hallmarkValue === 585 ? 'active' : ''}>
                                    <a href="#"
                                       onClick={() => {
                                           setFilterData(prev => ({
                                               ...prev,
                                               hallmarkValue: 585
                                           }))
                                           filter({
                                               ...filterData,
                                               hallmarkValue: 585
                                           })
                                       }}>
                                        585
                                    </a></li>
                                <li className={filterData?.hallmarkValue === 750 ? 'active' : ''} onClick={() => {
                                    setFilterData(prev => ({
                                        ...prev,
                                        hallmarkValue: 750
                                    }))
                                    filter({...filterData, hallmarkValue: 750})
                                }}><a href="#">750</a></li>

                            </ul>}
                            <button className="btn btn-dark btn-rounded btn-sm" onClick={() => {
                                setFilterData(initialFilterData)
                                filter(initialFilterData)
                                setPage(1)
                            }
                            }>sifirla
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

    )
}

export default Filter