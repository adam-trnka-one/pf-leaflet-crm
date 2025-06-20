
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake login - just navigate to dashboard
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">L</span>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">Welcome to Leaflet CRM</CardTitle>
          <p className="text-slate-600">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@company.com"
                required
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-600">
              Demo credentials: any email/password
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
