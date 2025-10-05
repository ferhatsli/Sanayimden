import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { SignupForm } from './components/SignupForm';
import { Footer } from './components/Footer';

function App() {
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
      <Benefits />
      <SignupForm />
      <Footer />
    </div>
  );
}

export default App;
