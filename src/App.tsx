import { useState } from 'react';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { AppScreens } from './components/AppScreen';
import { Benefits } from './components/Benefits';
import { PricingPackages } from './components/PricingPackages';
import { SignupForm } from './components/SignupForm';
import { Footer } from './components/Footer';

function App() {
  const [selectedPackage, setSelectedPackage] = useState('3');
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

export default App;
