import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { AppScreens } from './components/AppScreen';
import { Benefits } from './components/Benefits';
import { PricingPackages } from './components/PricingPackages';
import { SignupForm } from './components/SignupForm';
import { Footer } from './components/Footer';
import { SupplierLogin } from './components/SupplierLogin';
import { SuppliersList } from './components/SuppliersList';
import { SupplierDetail } from './components/SupplierDetail';

function HomePage() {
  const [selectedPackage, setSelectedPackage] = useState<'1' | '3' | '6'>('3');
  const scrollToForm = () => {
    const formElement = document.getElementById('signup-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero onScrollToForm={scrollToForm} />
      <HowItWorks />
      <AppScreens />
      <Benefits />
      <PricingPackages onSelectPackage={(id) => { setSelectedPackage(id); scrollToForm(); }} />
      <SignupForm selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} />
      <Footer />
    </div>
  );
}

// Protected route component
function ProtectedSupplierRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('supplierAuth') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/suppliers-login" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/suppliers-login" element={<SupplierLogin onLoginSuccess={() => window.location.href = '/suppliers'} />} />
        <Route 
          path="/suppliers" 
          element={
            <ProtectedSupplierRoute>
              <SuppliersList />
            </ProtectedSupplierRoute>
          } 
        />
        <Route 
          path="/suppliers/:id" 
          element={
            <ProtectedSupplierRoute>
              <SupplierDetail />
            </ProtectedSupplierRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
