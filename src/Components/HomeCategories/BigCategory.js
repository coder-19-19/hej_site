import {Link} from "react-router-dom";

function BigCategory({image,categoryName,description,id}) {
    return (
        <div className="grid-item col-md-6 height-x2">
            <Link to={'/categories/?subcategoryId=' + id} className="banner banner-fixed content-middle content-center overlay-dark">
                <Link to={'/categories/?subcategoryId=' + id}>
                    <figure>
                        <img src={image} alt="category" width="585"
                             height="397" style={{backgroundColor: "#eef0f1"}}/>
                    </figure>
                </Link>
                <div className="banner-content text-center w-100 h-100 d-flex flex-column">
                    <h4
                        className="banner-subtitle flex-1 font-weight-normal text-capitalize text-body ls-md lh-1 mb-0"></h4>
                    <div className="btn-group">
                        <Link to={'/categories/?subcategoryId=' + id}
                              className="btn btn-white btn-rounded font-weight-semi-bold">{categoryName}</Link>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BigCategory