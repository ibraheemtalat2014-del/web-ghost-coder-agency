export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  badge: string;
  benefits: string[];
  deliverables: string[];
  idealFor: string;
  estimatedTime: string;
  startingPrice: string;
  orderNote?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  description: string;
  client: string;
  features: string[];
  results: string;
  techStack: string[];
  liveDemoHighlight: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceUSD: number;
  pricePKR: string;
  turnaround: string;
  popular?: boolean;
  features: string[];
  bestFor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  projectType: string;
  quote: string;
  outcome: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'timeline' | 'pricing' | 'process';
}

export interface PortfolioPPTSlide {
  id: string;
  slideNumber: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  image: string;
  problemStatement: string;
  architectureSolution: string;
  metricsHighlight: string;
  turnaround: string;
  techStack: string[];
  keyHighlights: string[];
  client: string;
}

