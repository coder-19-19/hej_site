import Header from "../Components/header/Header";
import Footer from "../Components/Footer/Footer";
import Main from "../Components/User/Main";

function UserPage() {
    return (
        <>
            <Header/>
            <main className="main account">
                <div className="page-content mt-4 mb-10 pb-6">
                    <div className="container">
                        <div className="tab tab-vertical gutter-lg">
                            <Main/>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default UserPage