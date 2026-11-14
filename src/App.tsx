import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProjectModal } from './components/ProjectModal';
import { ServiceModal } from './components/ServiceModal';
import { PortalLoginModal } from './components/portal/PortalLoginModal';
import { PortalDashboard } from './components/portal/PortalDashboard';
import { OrdersInboxModal } from './components/portal/OrdersInboxModal';
import { CinematicIntro } from './components/CinematicIntro';
import { SEOHead } from './components/SEOHead';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ContactPage } from './pages/ContactPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { WebsiteForShopsPage } from './pages/WebsiteForShopsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SERVICE_PAGES_DATA } from './data/servicePagesData';
import { useRouter } from './context/RouterContext';
import { ServiceItem, PortfolioItem } from './types';
import { PortalUser, ProjectData } from './types/portal';

export default function App() {
  const { pathname, navigate, isValidRoute } = useRouter();

  // Modals state
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Client Portal State
  const [isPortalLoginOpen, setIsPortalLoginOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [portalUser, setPortalUser] = useState<PortalUser | null>(null);
  const [portalProject, setPortalProject] = useState<ProjectData | null>(null);

  // Cinematic 3D Intro State: Show automatically on Home visit (and replayable on any page via Navbar)
  const [showIntro, setShowIntro] = useState<boolean>(() => pathname === '/');

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  const handleQuoteClick = () => {
    if (pathname === '/contact') {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/contact#contact');
  };

  const handleExploreServicesClick = () => {
    if (pathname === '/') {
      const el = document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/website-development');
  };

  const handleOrderService = (serviceTitle: string) => {
    navigate('/contact#contact', {
      prefill: {
        serviceType: serviceTitle,
        message: `I would like to order the ${serviceTitle} for my organization.`,
      },
    });
  };

  const handleOrderSimilarProject = (projectTitle: string) => {
    navigate('/contact#contact', {
      prefill: {
        message: `I saw your sample project "${projectTitle}" and would like to build a similar website for my organization.`,
      },
    });
  };

  const handleSelectPackage = (packageName: string, price: string) => {
    navigate('/contact#contact', {
      prefill: {
        serviceType: packageName,
        budget: price,
        message: `I want to proceed with the ${packageName} (${price}) package.`,
      },
    });
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

  const renderCurrentPage = () => {
    if (!isValidRoute) {
      return <NotFoundPage />;
    }

    if (pathname === '/') {
      return (
        <HomePage
          onQuoteClick={handleQuoteClick}
          onExploreServicesClick={handleExploreServicesClick}
          onSelectService={(service) => setSelectedService(service)}
          onOrderService={handleOrderService}
          onSelectPackage={handleSelectPackage}
        />
      );
    }

    if (pathname === '/about') {
      return <AboutPage onQuoteClick={handleQuoteClick} />;
    }

    if (pathname === '/portfolio') {
      return (
        <PortfolioPage
          onSelectProject={(project) => setSelectedProject(project)}
          onQuoteClick={handleQuoteClick}
          onOrderProject={handleOrderSimilarProject}
        />
      );
    }

    if (pathname === '/contact') {
      return <ContactPage />;
    }

    if (pathname === '/website-for-shops-pakistan') {
      return <WebsiteForShopsPage />;
    }

    const serviceContent = SERVICE_PAGES_DATA[pathname];
    if (serviceContent) {
      return <ServiceDetailPage content={serviceContent} />;
    }

    return <NotFoundPage />;
  };

  // If client is logged in to the portal, display the full-screen Portal Dashboard
  if (portalUser && portalProject) {
    return (
      <>
        <SEOHead />
        <PortalDashboard
          user={portalUser}
          initialProject={portalProject}
          onLogout={handlePortalLogout}
          onBackToAgency={() => {
            setPortalUser(null);
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white transition-colors duration-200">
      {/* Dynamic Per-Route SEO Title, Description, Canonicals, OpenGraph & Schema.org JSON-LD */}
      <SEOHead />

      {/* 3D Cinematic Coding Intro Animation (with instant Skip button & Replay from Navbar) */}
      {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}

      {/* Top 3-Zone Multi-Page Navigation */}
      <Navbar
        onQuoteClick={handleQuoteClick}
        onClientPortalClick={() => setIsPortalLoginOpen(true)}
        onOrdersClick={() => setIsOrdersModalOpen(true)}
        onReplayIntro={handleReplayIntro}
      />

      {/* Route-Matched Agency Page */}
      <main className="flex-1">{renderCurrentPage()}</main>

      {/* Multi-Page Agency Footer */}
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
