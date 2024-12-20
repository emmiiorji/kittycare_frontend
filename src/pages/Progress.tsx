import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Panels from '../components/Panels';
import ProgressBar from '../components/ProgressBar';
import Layout from '../components/Layout';
import PaymentModal from '../components/PaymentModal';
import { useMediaQuery } from 'react-responsive';

// Constants
const MAX_STEPS = 15;
const MIN_STEP = 1;

const Progress = () => {
  // Initialize state based on localStorage
  const catId = localStorage.getItem('catId');
  const [currentStep, setCurrentStep] = useState(catId ? MAX_STEPS : MIN_STEP);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const step = queryParams.get('step');
    if (step) {
      const stepNumber = parseInt(step, 10);
      if (!isNaN(stepNumber) && stepNumber >= MIN_STEP && stepNumber <= MAX_STEPS) {
        setCurrentStep(stepNumber);
      }
    }
  }, [location.search]);

  // Navigation handlers
  const nextStep = () => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;
      // Skip steps 11 and 14
      window.scrollTo(0, 0);
      const updatedStep = nextStep === 14 ? 15 : Math.min(nextStep, MAX_STEPS);
      // Open modal if the updated step is 15
      if (updatedStep === 15) {
        setIsModalOpen(true);
      }
      // Update URL with new step
      navigate(`?step=${updatedStep}`, { replace: true });
      return updatedStep;
    });
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => {
      const newPrevStep = prevStep - 1;
      window.scrollTo(0, 0);
      const updatedStep = newPrevStep === 14 ? 13 : Math.max(newPrevStep, MIN_STEP);
      // Update URL with new step
      navigate(`?step=${updatedStep}`, { replace: true });
      return updatedStep;
    });
  };

  useEffect(() => {
    // Select elements with the 'top-left' and 'top-right' classes
    const topLeftElement = document.querySelector('.top-left') as HTMLElement;
    const topRightElement = document.querySelector('.top-right') as HTMLElement;

    // Hide the elements
    if (topLeftElement && isMobile) {
      topLeftElement.style.display = 'none';
    }

    if (topRightElement && isMobile) {
      topRightElement.style.display = 'none';
    }
  }, []);

  // Memoized panel mapping to prevent recreation on each render
  const panelMap = useMemo(() => ({
    1: <Panels.Panel01 nextStep={nextStep} />,
    2: <Panels.Panel02 nextStep={nextStep} previousStep={previousStep} />,
    3: <Panels.Panel03 nextStep={nextStep} previousStep={previousStep} />,
    4: <Panels.Panel04 nextStep={nextStep} previousStep={previousStep} />,
    5: <Panels.Panel05 nextStep={nextStep} previousStep={previousStep} />,
    6: <Panels.Panel06 nextStep={nextStep} previousStep={previousStep} />,
    7: <Panels.Panel07 nextStep={nextStep} previousStep={previousStep} />,
    8: <Panels.Panel08 nextStep={nextStep} previousStep={previousStep} />,
    9: <Panels.Panel09 nextStep={nextStep} previousStep={previousStep} />,
    10: <Panels.Panel10 nextStep={nextStep} previousStep={previousStep} />,
    11: <Panels.Panel11 nextStep={nextStep} previousStep={previousStep} />,
    12: <Panels.Panel12 nextStep={nextStep} previousStep={previousStep} />,
    13: <Panels.Panel13 nextStep={nextStep} previousStep={previousStep} />,
    // 14: <Panels.Panel14 nextStep={nextStep} previousStep={previousStep} />,
    15: <Panels.Panel15 previousStep={previousStep} />,
  }), []);

  // Render current panel based on step
  const renderPanel = () => {
    return panelMap[currentStep as keyof typeof panelMap] || panelMap[1];
  };

  return (
    <Layout>
      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className={`w-full text-center flex justify-center items-center ${isModalOpen ? 'blur' : ''}`}>
        <ProgressBar
          className="w-full flex items-center justify-center"
          currentStep={currentStep}
        />
      </div>
      <div className="flex-grow flex items-center justify-center w-full">
        {renderPanel()}
      </div>
    </Layout>
  );
};

export default Progress;
