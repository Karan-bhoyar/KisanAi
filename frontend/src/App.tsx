
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import type { ReactNode } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import ChatLayout from "./components/ChatLayout";

import Login from "./pages/Login/Login";
import Signup from "./pages/signup/Signup";

import DiseaseDetectionPage from "./pages/DiseaseDetection/DiseaseDetectionPage";
import DiseaseHistory from "./pages/DiseaseDetection/DiseaseHistory";

import FarmerProfile from "./pages/Profile/FarmerProfile";
import EditProfile from "./pages/Profile/EditProfile";

import WeatherAgent from "./pages/Weather/WeatherAgent";
import MarketPrice from "./pages/MarketPrice/MarketPrice";


// ======================================================
// TYPES
// ======================================================

interface RouteProps {
    children: ReactNode;
}


// ======================================================
// PROTECTED ROUTE
// ======================================================

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


// ======================================================
// MAIN LAYOUT
// ======================================================

function MainLayout({ children }: RouteProps) {

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">

            {/* =============================== */}
            {/* NAVBAR */}
            {/* =============================== */}

            <Navbar />


            {/* =============================== */}
            {/* PAGE CONTENT */}
            {/* =============================== */}

            <main className="flex-1 w-full">
                {children}
            </main>


            {/* =============================== */}
            {/* FOOTER */}
            {/* =============================== */}

            <Footer />

        </div>
    );
}


// ======================================================
// APP
// ======================================================

function App() {

    return (
        <BrowserRouter>

            {/* ========================================= */}
            {/* SCROLL TO TOP */}
            {/* ========================================= */}

            <ScrollToTop />


            <Routes>

                {/* ========================================= */}
                {/* PUBLIC ROUTES */}
                {/* ========================================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />


                {/* ========================================= */}
                {/* HOME */}
                {/* ========================================= */}

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


                {/* ========================================= */}
                {/* AI CHAT */}
                {/* ========================================= */}

                <Route
                    path="/chat"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <ChatLayout />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />


                {/* ========================================= */}
                {/* DISEASE DETECTION */}
                {/* ========================================= */}

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


                {/* ========================================= */}
                {/* DISEASE HISTORY */}
                {/* ========================================= */}

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


                {/* ========================================= */}
                {/* WEATHER */}
                {/* ========================================= */}

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


                {/* ========================================= */}
                {/* MARKET PRICE */}
                {/* ========================================= */}

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


                {/* ========================================= */}
                {/* FARMER PROFILE */}
                {/* ========================================= */}

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


                {/* ========================================= */}
                {/* EDIT PROFILE */}
                {/* ========================================= */}

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


                {/* ========================================= */}
                {/* FALLBACK */}
                {/* ========================================= */}

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
    
