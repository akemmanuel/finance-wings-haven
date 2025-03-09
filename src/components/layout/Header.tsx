
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, PieChart, BarChart4, Settings } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" />, path: "/" },
    { name: "Portfolio", icon: <PieChart className="h-5 w-5" />, path: "/portfolio" },
    { name: "Transactions", icon: <BarChart4 className="h-5 w-5" />, path: "/transactions" },
    { name: "Settings", icon: <Settings className="h-5 w-5" />, path: "/settings" }
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-10 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-xl font-medium tracking-tight">finwise</span>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                  location.pathname === item.path 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className="flex md:hidden space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "p-2 rounded-full transition-colors duration-200",
                  location.pathname === item.path 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                aria-label={item.name}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
