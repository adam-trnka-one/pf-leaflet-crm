
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, BarChart3, CheckCircle, Star, Shield, Zap, Globe, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-card">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-300 ${
        isScrolled 
          ? 'bg-card/70 backdrop-blur-md border-b border-border/20 shadow-sm' 
          : 'bg-card border-b border-border'
      }`}>
        <div className="flex items-center">
          <button onClick={scrollToTop} className="hover:opacity-80 transition-opacity">
            <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-8 w-auto" />
          </button>
        </div>
        <Link to="/login">
          <Button className="bg-[#4AB831] hover:bg-[#3da127] text-white">
            Sign In
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-8 py-20 overflow-hidden mt-[89px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=6000&q=80" 
            alt="People having conversations with laptops in a bright setting with trees" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
            Lighten your workload
            <span className="text-[#4AB831] block mt-4"> Boost your revenue</span>
          </h1>
          <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Streamline your customer relationships, boost sales productivity, and grow your business with our intuitive CRM platform.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link to="/login">
              <Button size="lg" className="bg-[#4AB831] hover:bg-[#3da127] text-white px-10 py-6 text-xl">
                Get Started
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20 bg-muted">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">
            Everything you need to grow your business
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-[#4AB831] rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Contact Management</h3>
              <p className="text-muted-foreground text-lg">
                Organize and manage all your customer relationships in one centralized platform.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-[#4AB831] rounded-xl flex items-center justify-center mx-auto mb-6">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Sales Pipeline</h3>
              <p className="text-muted-foreground text-lg">
                Track opportunities, manage leads, and close deals faster with our intuitive pipeline.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-[#4AB831] rounded-xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Analytics & Reports</h3>
              <p className="text-muted-foreground text-lg">
                Get insights into your sales performance with detailed analytics and reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-8 py-20 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why businesses choose Leaflet CRM
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built for modern teams who need powerful CRM features without the complexity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#4AB831] rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Enterprise Security</h3>
                <p className="text-muted-foreground">Your data is protected with bank-level security and compliance standards.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#4AB831] rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">Built for speed with modern technology that keeps up with your pace.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#4AB831] rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Global Access</h3>
                <p className="text-muted-foreground">Access your CRM from anywhere, on any device, at any time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-8 py-20 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Trusted by thousands of businesses
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our customers have to say about Leaflet CRM
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-warning fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                "Leaflet CRM transformed how we manage our sales process. We've seen a 40% increase in conversion rates."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold text-foreground">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Sales Director, TechCorp</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-warning fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                "The ease of use is incredible. Our team was up and running in minutes, not weeks."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold text-foreground">Mike Chen</p>
                  <p className="text-sm text-muted-foreground">CEO, StartupXYZ</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-warning fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                "Best CRM investment we've made. The ROI was visible within the first month."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold text-foreground">Emily Rodriguez</p>
                  <p className="text-sm text-muted-foreground">VP Sales, GrowthCo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-8 py-20 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4AB831] mr-3" />
                  <span>Up to 1,000 contacts</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4AB831] mr-3" />
                  <span>Basic reporting</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4AB831] mr-3" />
                  <span>Email support</span>
                </li>
              </ul>
            </div>
            <div className="border-2 border-[#4AB831] rounded-xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#4AB831] text-white px-4 py-2 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Professional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">$79</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4AB831] mr-3" />
                  <span>Up to 10,000 contacts</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4AB831] mr-3" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4AB831] mr-3" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4AB831] mr-3" />
                  <span>API access</span>
                </li>
              </ul>
            </div>
            <div className="border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">$199</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4AB831] mr-3" />
                  <span>Unlimited contacts</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4AB831] mr-3" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4AB831] mr-3" />
                  <span>24/7 phone support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#4AB831] mr-3" />
                  <span>Custom training</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-8 py-20 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#4AB831] mb-2">50K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#4AB831] mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#4AB831] mb-2">150+</div>
              <div className="text-muted-foreground">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#4AB831] mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-24 bg-[#4AB831]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to transform your business?
          </h2>
          <p className="text-xl text-success-foreground mb-10">
            Join thousands of businesses already using Leaflet CRM to grow their revenue.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-card text-[#4AB831] hover:bg-muted px-10 py-6 text-xl">
              Get Started
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-10 bg-secondary text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-8 w-auto" />
          </div>
          <div className="flex justify-center space-x-8 mb-6">
            <Link to="/blog" className="text-muted-foreground hover:text-white transition-colors">
              Blog
            </Link>
            <Link to="/help" className="text-muted-foreground hover:text-white transition-colors">
              Help
            </Link>
          </div>
          <p className="text-muted-foreground text-lg text-center">
            © 2025 Leaflet CRM. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
