import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { toast } from "sonner";
import {
  CreditCard,
  HomeIcon,
  LogOut,
  Menu,
  User,
  Wallet,
} from "lucide-react";
import { useGetProfileQuery } from "@/redux/api/userApi";
import { logout } from "@/redux/slices/authSlice";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetProfileQuery();
  const user = data?.data;
  const isUser = localStorage.getItem("userRole");
  const isAuthenticated =
    Cookie.get("isAuthenticated") || localStorage.getItem("isAuthenticated");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    ["token", "userRole", "isAuthenticated", "userData"].forEach((key) => {
      Cookie.remove(key);
      localStorage.removeItem(key);
    });
    toast.info("You have been logged out successfully");
    navigate("/");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
  ];

  const dashboardLink =
    isUser === "USER"
      ? "/dashboard/user"
      : isUser === "AGENT"
      ? "/dashboard/agent"
      : "/dashboard/admin";

  const profileLink =
    isUser === "USER"
      ? "/dashboard/user/profile"
      : isUser === "AGENT"
      ? "/dashboard/agent/profile"
      : "/dashboard/admin/transactions";

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Wallet className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-200" />
          <span className="font-bold text-xl tracking-tight">PayWallet</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ href, label }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Auth / Profile Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated === "true" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full hover:bg-accent"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={
                        user?.image ||
                        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                      }
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link to={dashboardLink} className="flex items-center">
                    <HomeIcon className="mr-2 h-4 w-4" /> Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to={profileLink} className="flex items-center">
                    {isUser === "ADMIN" ? (
                      <CreditCard className="mr-2 h-4 w-4" />
                    ) : (
                      <User className="mr-2 h-4 w-4" />
                    )}
                    {isUser === "ADMIN" ? "Transactions" : "Profile"}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <DialogTitle className="sr-only">Mobile Navigation</DialogTitle>
            <div className="mt-6 space-y-5">
              {navLinks.map(({ href, label }) => (
                <NavLink
                  key={href}
                  to={href}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block text-base font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              <div className="border-t pt-5 space-y-3">
                {isAuthenticated === "true" ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user?.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={profileLink}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center text-sm text-muted-foreground hover:text-primary"
                    >
                      <User className="h-4 w-4 mr-2" /> Profile
                    </Link>

                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="w-full" asChild>
                      <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link to="/auth/signup" onClick={() => setIsOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
