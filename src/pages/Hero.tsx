
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, BarChart3, CheckCircle, Star, Shield, Zap, Globe, Clock } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-gray-200 relative z-10">
        <div className="flex items-center">
          <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-8 w-auto" />
        </div>
        <Link to="/login">
          <Button className="bg-[#4AB831] hover:bg-[#3da127] text-white">
            Sign In
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-8 py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=6000&q=80" 
            alt="People having conversations in a natural setting with trees" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Lightness for your business that
            <span className="text-[#4AB831] block mt-4"> grow your revenue</span>
          </h1>
          <p className="text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Streamline your customer relationships, boost sales productivity, and grow your business with our intuitive CRM platform.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link to="/login">
              <Button size="lg" className="bg-[#4AB831] hover:bg-[#3da127] text-white px-10 py-6 text-xl">
                Get Started
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-10 py-6 text-xl border-2 border-white text-white hover:bg-white hover:text-gray-900">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Everything you need to grow your business
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-[#4AB831] rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Contact Management</h3>
              <p className="text-gray-600 text-lg">
                Organize and manage all your customer relationships in one centralized platform.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-[#4AB831] rounded-xl flex items-center justify-center mx-auto mb-6">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Sales Pipeline</h3>
              <p className="text-gray-600 text-lg">
                Track opportunities, manage leads, and close deals faster with our intuitive pipeline.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-[#4AB831] rounded-xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Analytics & Reports</h3>
              <p className="text-gray-600 text-lg">
                Get insights into your sales performance with detailed analytics and reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why businesses choose Leaflet CRM
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for modern teams who need powerful CRM features without the complexity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#4AB831] rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise Security</h3>
                <p className="text-gray-600">Your data is protected with bank-level security and compliance standards.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#4AB831] rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Built for speed with modern technology that keeps up with your pace.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#4AB831] rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Access</h3>
                <p className="text-gray-600">Access your CRM from anywhere, on any device, at any time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-8 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Trusted by thousands of businesses
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say about Leaflet CRM
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Leaflet CRM transformed how we manage our sales process. We've seen a 40% increase in conversion rates."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Sales Director, TechCorp</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The ease of use is incredible. Our team was up and running in minutes, not weeks."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold text-gray-900">Mike Chen</p>
                  <p className="text-sm text-gray-600">CEO, StartupXYZ</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Best CRM investment we've made. The ROI was visible within the first month."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold text-gray-900">Emily Rodriguez</p>
                  <p className="text-sm text-gray-600">VP Sales, GrowthCo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
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
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </div>
            <div className="border-2 border-[#4AB831] rounded-xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#4AB831] text-white px-4 py-2 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$79</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
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
              <Button className="w-full bg-[#4AB831] hover:bg-[#3da127] text-white">
                Get Started
              </Button>
            </div>
            <div className="border border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$199</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
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
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-8 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#4AB831] mb-2">50K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#4AB831] mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#4AB831] mb-2">150+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#4AB831] mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
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
          <p className="text-xl text-green-100 mb-10">
            Join thousands of businesses already using Leaflet CRM to grow their revenue.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-white text-[#4AB831] hover:bg-gray-100 px-10 py-6 text-xl">
              Start Free Trial
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-10 bg-gray-900 text-white text-center">
        <div className="flex items-center justify-center mb-6">
          <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-8 w-auto" />
        </div>
        <p className="text-gray-400 text-lg">
          © 2024 Leaflet CRM. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Hero;
