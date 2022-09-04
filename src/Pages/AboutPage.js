import Item from "../Components/About/Item";
import Header from "../Components/header/Header";
import Footer from "../Components/Footer/Footer";

function AboutPage() {
    return (
        <>
            <Header/>
            <main style={{borderTop:"1px solid #ccc"}} className="main">
                <Item/>
            </main>
            <Footer/>
        </>
    )
}

export default AboutPage