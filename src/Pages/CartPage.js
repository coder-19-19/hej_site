import Steps from "../Components/Cart/Steps";
import ItemsContainer from "../Components/Cart/ItemsContainer";
import Amount from "../Components/Cart/Amount";
import Header from "../Components/header/Header";
import Footer from "../Components/Footer/Footer";

function CartPage() {
    return (<>
            <Header/>
            <main className="main cart">
                <div className="page-content pt-7 pb-10">
                    <Steps/>
                    <div className="container mt-7 mb-2">
                        <div className="row">
                            <ItemsContainer/>
                            <Amount/>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>)
}

export default CartPage