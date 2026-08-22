import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import type { ReactNode } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatLayout from "./components/ChatLayout";
import Login from "./pages/Login/Login";
import DiseaseDetectionPage from "./pages/DiseaseDetection/DiseaseDetectionPage";
import DiseaseHistory from "./pages/DiseaseDetection/DiseaseHistory";
import FarmerProfile from "./pages/Profile/FarmerProfile";
import EditProfile from "./pages/Profile/EditProfile";
import ScrollToTop from "./components/ScrollToTop";
import WeatherAgent from "./pages/Weather/WeatherAgent";
import MarketPrice from "./pages/MarketPrice/MarketPrice";


// ===============================
// Route Props
// ===============================

interface RouteProps {
    children: ReactNode;
}


// ===============================
// Protected Route
// ===============================

function ProtectedRoute({ children }: RouteProps) {

    const token = localStorage.getItem("token");

    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <>{children}</>;
}


// ===============================
// Main Layout
// ===============================

function MainLayout({ children }: RouteProps) {

    return (
        <div
            className="
                min-h-screen
                flex
                flex-col
                bg-gray-100
            "
        >

            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <Footer />

        </div>
    );
}


// ===============================
// App
// ===============================

function App() {

    return (

        <BrowserRouter>

            {/* Scroll reset when route changes */}
            <ScrollToTop />

            <Routes>

                {/* ================================= */}
                {/* LOGIN */}
                {/* ================================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* ================================= */}
                {/* AI CHAT */}
                {/* ================================= */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <ChatLayout />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />


                {/* ================================= */}
                {/* DISEASE DETECTION */}
                {/* ================================= */}

                <Route
                    path="/disease"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <DiseaseDetectionPage />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />


                {/* ================================= */}
                {/* DISEASE HISTORY */}
                {/* ================================= */}

                <Route
                    path="/disease/history"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <DiseaseHistory />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />


                {/* ================================= */}
                {/* WEATHER */}
                {/* ================================= */}

                <Route
                    path="/weather"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <WeatherAgent />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />


                {/* ================================= */}
                {/* MARKET PRICES */}
                {/* ================================= */}

                <Route
                    path="/market-price"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <MarketPrice />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />


                {/* ================================= */}
                {/* FARMER PROFILE */}
                {/* ================================= */}

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <FarmerProfile />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />


                {/* ================================= */}
                {/* EDIT PROFILE */}
                {/* ================================= */}

                <Route
                    path="/profile/edit"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <EditProfile />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />


                {/* ================================= */}
                {/* DEFAULT REDIRECT */}
                {/* ================================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;