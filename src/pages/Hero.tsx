
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, BarChart3 } from "lucide-react";

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
            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" 
            alt="Business team collaboration" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/85"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Lightness for your business that
            <span className="text-[#4AB831] block mt-4"> grow your revenue</span>
          </h1>
          <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Streamline your customer relationships, boost sales productivity, and grow your business with our intuitive CRM platform.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link to="/login">
              <Button size="lg" className="bg-[#4AB831] hover:bg-[#3da127] text-white px-10 py-6 text-xl">
                Get Started
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-10 py-6 text-xl border-2">
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
