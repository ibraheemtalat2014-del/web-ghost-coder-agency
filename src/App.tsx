import React, { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Advantages } from './components/Advantages';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { PortfolioDeck } from './components/PortfolioDeck';
import { QuoteEstimator } from './components/QuoteEstimator';
import { DevelopmentProcess } from './components/DevelopmentProcess';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { AboutUs } from './components/AboutUs';
import { FAQ } from './components/FAQ';
import { ContactSection, ContactSectionHandle } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProjectModal } from './components/ProjectModal';
import { ServiceModal } from './components/ServiceModal';
import { PortalLoginModal } from './components/portal/PortalLoginModal';
import { PortalDashboard } from './components/portal/PortalDashboard';
import { OrdersInboxModal } from './components/portal/OrdersInboxModal';
import { ServiceItem, PortfolioItem } from './types';
import { PortalUser, ProjectData } from './types/portal';

export default function App() {
  // Navigation & Form Scrolling
  const contactRef = useRef<ContactSectionHandle>(null);

  // Modals state
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Client Portal State
  const [isPortalLoginOpen, setIsPortalLoginOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [portalUser, setPortalUser] = useState<PortalUser | null>(null);
  const [portalProject, setPortalProject] = useState<ProjectData | null>(null);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderService = (serviceTitle: string) => {
    contactRef.current?.prefillForm({
      serviceType: serviceTitle,
      message: `I would like to order the ${serviceTitle} for my organization.`,
    });
    scrollToContact();
  };

  const handleOrderSimilarProject = (projectTitle: string) => {
    contactRef.current?.prefillForm({
      message: `I saw your sample project "${projectTitle}" and would like to build a similar website for my organization.`,
    });
    scrollToContact();
  };

  const handleSelectPackage = (packageName: string, price: string) => {
    contactRef.current?.prefillForm({
      serviceType: packageName,
      budget: price,
      message: `I want to proceed with the ${packageName} (${price}) package.`,
    });
    scrollToContact();
  };

  const handleApplyEstimate = (data: { serviceType: string; budget: string; summary: string }) => {
    contactRef.current?.prefillForm({
      serviceType: data.serviceType,
      budget: data.budget,
      message: data.summary,
    });
    scrollToContact();
  };

  const handlePortalLoginSuccess = (user: PortalUser, project: ProjectData) => {
    setPortalUser(user);
    setPortalProject(project);
    setIsPortalLoginOpen(false);
  };

  const handlePortalLogout = () => {
    setPortalUser(null);
    setPortalProject(null);
  };

  // If client is logged in to the portal, display the full-screen Portal Dashboard
  if (portalUser && portalProject) {
    return (
      <PortalDashboard
        user={portalUser}
        initialProject={portalProject}
        onLogout={handlePortalLogout}
        onBackToAgency={() => {
          // Temporarily view website while preserving session
          setPortalUser(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white transition-colors duration-200">
      {/* Top 3-Zone Navigation */}
      <Navbar
        onQuoteClick={scrollToContact}
        onClientPortalClick={() => setIsPortalLoginOpen(true)}
        onOrdersClick={() => setIsOrdersModalOpen(true)}
      />

      {/* Main Agency Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onQuoteClick={scrollToContact}
          onExploreServicesClick={scrollToServices}
        />

        {/* 3 Core Advantages Section */}
        <Advantages onQuoteClick={scrollToContact} />

        {/* 5 Core Specialized Services */}
        <Services
          onSelectService={(service) => setSelectedService(service)}
          onOrderService={handleOrderService}
        />

        {/* Sample Projects Portfolio */}
        <Portfolio
          onSelectProject={(project) => setSelectedProject(project)}
          onQuoteClick={scrollToContact}
        />

        {/* Morphing Portfolio PPT Presentation Deck */}
        <PortfolioDeck onOrderProject={handleOrderSimilarProject} />

        {/* Interactive Quote & Timeline Estimator */}
        <QuoteEstimator onApplyEstimateToForm={handleApplyEstimate} />

        {/* 5-Step Development Process */}
        <DevelopmentProcess onQuoteClick={scrollToContact} />

        {/* Why Choose Us & Tech Advantage */}
        <WhyChooseUs />

        {/* Transparent Pricing Packages */}
        <Pricing onSelectPackage={handleSelectPackage} />

        {/* Attributable Testimonials */}
        <Testimonials />

        {/* About Agency & Engineering Stack */}
        <AboutUs onQuoteClick={scrollToContact} />

        {/* FAQ Section */}
        <FAQ />

        {/* Functional Contact Form Section */}
        <ContactSection ref={contactRef} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating 1-Tap WhatsApp Contact Button */}
      <FloatingWhatsApp />

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOrderSimilar={handleOrderSimilarProject}
      />

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOrderService={handleOrderService}
      />

      {/* Client Portal Authentication Dialog */}
      <PortalLoginModal
        isOpen={isPortalLoginOpen}
        onClose={() => setIsPortalLoginOpen(false)}
        onLoginSuccess={handlePortalLoginSuccess}
      />

      {/* Owner Orders & Inquiries Inbox Modal */}
      <OrdersInboxModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
      />
    </div>
  );
}
