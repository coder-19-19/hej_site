import Header from "../Components/header/Header";
import Footer from "../Components/Footer/Footer";
import Steps from "../Components/Order/Steps";
import Thank from "../Components/Order/Thank";
import OrderDetails from "../Components/Order/OrderDetails";

function OrderPage(){
    return(
        <>
        <Header/>
            <main className="main order">
                <div className={"page-content pt-7 pb-10 mb-10"}>
                    <Steps/>
                    <div className={"container mt-8"}>
                        <Thank/>
                        <OrderDetails/>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}
export default OrderPage