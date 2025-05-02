import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Users, Calendar, BarChart3, Newspaper } from 'lucide-react';

// Define navigation items with icons
const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/teams', label: 'Teams', icon: Users },
  { href: '/matches', label: 'Matches', icon: Calendar },
  { href: '/standings', label: 'Standings', icon: BarChart3 },
  { href: '/news', label: 'News', icon: Newspaper },
];

// Reusable Logo Component
function Logo() {
    return (
        <Link href="/" className="flex items-center space-x-2 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-primary transition-transform group-hover:rotate-[15deg]">
                <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.177A7.547 7.547 0 0 1 6.648 6.61a.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
            </svg>
            <span className="font-bold">Canary Ball</span>
        </Link>
    );
}

// Reusable Navigation Link Component
function NavLink({ href, label, icon: Icon, className = "", isMobile = false }: { href: string; label: string; icon: React.ElementType; className?: string; isMobile?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 transition-colors text-foreground/60 hover:text-foreground/80",
        isMobile ? "p-2 rounded-md hover:bg-accent hover:text-accent-foreground" : "text-sm font-medium",
        className
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo and Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Logo />
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>
        </div>

        {/* Mobile Logo and Trigger */}
        <div className="flex md:hidden items-center">
          <Logo />
        </div>

        {/* Mobile Nav Trigger */}
        <div className="flex items-center md:hidden">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] pr-0 pt-8">
              {/* <Logo /> We can add logo inside if needed */}
              <nav className="flex flex-col space-y-3 px-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <NavLink {...item} isMobile={true} />
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// Helper function for conditional class names (replace with your actual implementation if different)
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// SheetClose component (example - replace with your actual import if needed)
const SheetClose = ({ children, asChild }: { children: React.ReactNode, asChild?: boolean }) => {
    if (asChild) return <>{children}</>;
    // Basic implementation if not using Radix Slot for SheetClose
    return <div onClick={(e) => {
        // Find parent SheetContent and close it. Needs actual implementation based on Sheet library.
        // This is a placeholder. You might need context or pass down a close function.
         console.log("SheetClose clicked - implement closing logic");
    }}>{children}</div>;
}
