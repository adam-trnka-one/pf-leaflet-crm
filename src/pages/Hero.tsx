
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, BarChart3 } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
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
      <section className="px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Lightness for your business that
            <span className="text-[#4AB831]"> grow your revenue</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Streamline your customer relationships, boost sales productivity, and grow your business with our intuitive CRM platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-[#4AB831] hover:bg-[#3da127] text-white px-8 py-4 text-lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything you need to grow your business
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#4AB831] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact Management</h3>
              <p className="text-gray-600">
                Organize and manage all your customer relationships in one centralized platform.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#4AB831] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sales Pipeline</h3>
              <p className="text-gray-600">
                Track opportunities, manage leads, and close deals faster with our intuitive pipeline.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#4AB831] rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics & Reports</h3>
              <p className="text-gray-600">
                Get insights into your sales performance with detailed analytics and reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20 bg-[#4AB831]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to transform your business?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of businesses already using Leaflet CRM to grow their revenue.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-white text-[#4AB831] hover:bg-gray-100 px-8 py-4 text-lg">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 bg-gray-900 text-white text-center">
        <div className="flex items-center justify-center mb-4">
          <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-6 w-auto" />
        </div>
        <p className="text-gray-400">
          © 2024 Leaflet CRM. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Hero;
