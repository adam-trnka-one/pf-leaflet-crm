import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/contexts/WorkspaceContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { updateWorkspaceData } = useWorkspace();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save email to workspace context (which will automatically save to localStorage)
    if (email.trim()) {
      updateWorkspaceData({
        email: email.trim(),
        username: email.trim() // Use email as username as well
      });
    }
    
    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 lg:px-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-8 w-auto mb-8" />
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-3xl font-light text-gray-800 mb-2">
              Hello,
            </h1>
            <h2 className="text-3xl font-bold text-leaflet-green">
              welcome!
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-leaflet-green hover:bg-leaflet-green-hover text-white font-medium rounded-md"
            >
              Sign in
            </Button>
          </form>

          {/* Demo Info */}
          <div className="mt-8">
            <p className="text-xs text-gray-400">
              Demo credentials: any email/password
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Gradient Background */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-leaflet-green via-green-400 to-emerald-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-leaflet-green/90 via-green-400/80 to-emerald-500/90"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white/20 rounded-full"></div>
        
        {/* Gradient overlay shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-green-400/30 to-transparent rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-emerald-400/30 to-transparent rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
