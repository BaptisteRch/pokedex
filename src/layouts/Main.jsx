import Logo from "../components/Logo/Logo";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import { Outlet, useNavigation } from "react-router-dom";

export default function Main() {
    // Variable
    const navigation = useNavigation();

    return (
        <>
            {/* Logo */}
            <Logo />

            {/* Nav */}
            <Nav />

            {/* Loading */}
            {navigation.state === "loading" ? (
                <div className="flex justify-center mt-1">Chargement...</div>
            ) : (
                // Outlet
                <Outlet />
            )}

            {/* Footer */}
            <Footer />
        </>
    );
}
