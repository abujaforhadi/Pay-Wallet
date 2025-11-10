/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { Eye, EyeOff, Lock, Mail, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import HelmetTitle from "@/components/layout/HelmetTitle";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      const result = await login({ email, password }).unwrap();
      console.log("Login successful:", result);

      // Extract from API response
      const user = result?.data?.user;
      const accessToken = result?.data?.accessToken;
      const refreshToken = result?.data?.refreshToken;

      // Dispatch Redux credentials
      dispatch(setCredentials({ user, token: accessToken }));

      // Prepare local user data for persistence
      const userData = {
        id: user?._id,
        email: user?.email,
        name: user?.name,
        role: user?.role,
        token: accessToken,
      };

      // Store tokens and session info
      Cookies.set("token", accessToken, { expires: 7 });
      Cookies.set("refreshToken", refreshToken, { expires: 7 });
      Cookies.set("isAuthenticated", "true", { expires: 7 });

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userRole", user?.role);
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");

      // Redirect based on role
      const redirectPath = `/dashboard/${user?.role?.toLowerCase()}`;
      navigate(redirectPath);

      toast.success(`Welcome back, ${user?.name || "User"}!`);
    } catch (error: any) {
      console.error("Login failed:", error?.data?.message || error.message);
      toast.error(error?.data?.message || "Login failed");
    }
  };

  // Demo credentials for quick access
  const demoCredentials = [
    { role: "user", email: "testuser@example.com", password: "Password@123" },
    { role: "agent", email: "agent@agent.com", password: "Password@123" },
    { role: "admin", email: "admin@admin.com", password: "Password@123" },
  ];

  const fillDemoCredentials = (demoRole: string) => {
    const creds = demoCredentials.find((c) => c.role === demoRole);
    if (creds) {
      setEmail(creds.email);
      setPassword(creds.password);
    }
  };

  // Auto-redirect if already authenticated
  useEffect(() => {
    const authenticated =
      localStorage.getItem("isAuthenticated") === "true" ||
      Cookies.get("isAuthenticated") === "true";

    if (authenticated) {
      const userRole = localStorage.getItem("userRole")?.toLowerCase();
      let redirectPath = "/";

      if (userRole && ["user", "agent", "admin", "super_admin"].includes(userRole)) {
        redirectPath = `/dashboard/${userRole}`;
      }

      if (window.location.pathname.includes("/auth/login")) {
        navigate(redirectPath, { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <HelmetTitle title="Login" />
      <div className="w-full max-w-md space-y-6">
        {/* Brand Logo */}
        <div className="text-center">
         
          <p className="text-muted-foreground text-sm mt-1">
            Sign in to your account
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-border">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-semibold text-foreground">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your email and password below
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>

          {/* Footer Links */}
          <CardFooter className="flex-col space-y-4 pt-4">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot your password?
            </Link>
            <div className="text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <Link to="/auth/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Demo Credentials */}
        <div className="pt-4">
          <p className="text-sm text-muted-foreground text-center mb-2">
            Quick Demo Access:
          </p>
          <div className="flex justify-center flex-wrap gap-2">
            {demoCredentials.map((cred) => (
              <Button
                key={cred.role}
                variant="secondary"
                size="sm"
                className="justify-center hover:bg-secondary/80 transition-colors"
                onClick={() => fillDemoCredentials(cred.role)}
              >
                <span className="capitalize font-medium text-secondary-foreground">
                  {cred.role} Demo
                </span>
                <Badge
                  variant="outline"
                  className="ml-2 text-xs border-dashed text-muted-foreground"
                >
                  {cred.email}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
