import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NavBar from './components/ui/NavBar';
import Footer from './components/ui/Footer';
import HomePage from './pages/HomePage';
import TracksPortfolioPage from './pages/TracksPortfolioPage';
import TracksPage from './pages/TracksPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import CheckoutCancelPage from './pages/CheckoutCancelPage';
import TechnoPreferencesPage from './pages/TechnoPreferencesPage';
import ContactUsPage from './pages/ContactUsPage';
import ServicesPage from './pages/ServicesPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/techno-preferences" element={<TechnoPreferencesPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tracks"
                element={
                  <ProtectedRoute>
                    <TracksPortfolioPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tracks/:trackId"
                element={
                  <ProtectedRoute>
                    <TracksPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contact"
                element={
                  <ProtectedRoute>
                    <ContactUsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
              <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
              <Route
                path="/services"
                element={
                  <ProtectedRoute>
                    <ServicesPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;