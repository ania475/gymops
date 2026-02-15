import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GymOpsLogo } from "@/components/ui/GymOpsLogo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <GymOpsLogo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Pricing
            </a>
            <a
              href="#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              How It Works
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button variant="default" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors px-2 py-2"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-muted-foreground hover:text-foreground transition-colors px-2 py-2"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#how-it-works"
                className="text-muted-foreground hover:text-foreground transition-colors px-2 py-2"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" asChild className="justify-center">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button variant="default" asChild className="justify-center">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <GymOpsLogo size="md" variant="white" />
            <p className="text-primary-foreground/70 text-sm">
              The complete platform for combat sports academies. Automate
              memberships, track retention, and engage your fighters.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display text-sm font-semibold mb-4 tracking-wider text-primary-foreground">
              PRODUCT
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a
                  href="#features"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h4 className="font-display text-sm font-semibold mb-4 tracking-wider text-primary-foreground">
              SPORTS
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                MMA
              </li>
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                Boxing
              </li>
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                Muay Thai
              </li>
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                Brazilian Jiu-Jitsu
              </li>
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                Wrestling
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-sm font-semibold mb-4 tracking-wider text-primary-foreground">
              COMPANY
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                About
              </li>
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                Contact
              </li>
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                Terms of Service
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/70">
            © 2024 GymOps. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-primary-foreground/70">
              Built for fighters, by fighters.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
