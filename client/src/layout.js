
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

const Layout = () => {

    return (
        <div>
            <BrowserRouter>
                    <Routes>
                        <Route element={<Chat />} path="/chat" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/" />
                    </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Layout;