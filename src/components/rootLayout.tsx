import Footer from "./footer/Footer"
import Header from "./header/Header"
import HeaderBottom from "./header/HeaderBottom"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <HeaderBottom />
            {children}
            <Footer />
        </>
    )
}

export default RootLayout