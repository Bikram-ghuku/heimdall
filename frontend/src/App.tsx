import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Form from "./Form";
import Services from "./Services";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "./constants";

function App() {
    const [email, setEmail] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        fetch(`${BACKEND_URL}/validate-jwt`, { credentials: "include" }).then(
            (response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setEmail(data.email);
                        setIsAuthenticated(true);
                    });
                }
            },
        );
    }, [email, isAuthenticated]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Form
                                isAuthenticated={isAuthenticated}
                                setIsAuthenticated={setIsAuthenticated}
                                email={email}
                                setEmail={setEmail}
                            />
                        }
                    />
                    <Route
                        path="/services"
                        element={
                            isAuthenticated ? <Services /> : <Navigate to="/" />
                        }
                    />
                </Routes>
            </BrowserRouter>
            <Toaster position="bottom-center" reverseOrder={false} />
        </>
    );
}

export default App;
