"use client";

import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bahola-neutral-100 text-bahola-neutral-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold text-bahola-navy-950">Bahola Labs</h3>
            <address className="not-italic">
              <p className="mb-2 flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-bahola-blue-600" />
                <span className="text-bahola-neutral-700">
                  2, Tiger Varachari Road, Kalakshetra Colony, Besant Nagar, Chennai – 600090
                </span>
              </p>
              <p className="mb-2 flex items-center">
                <Phone size={18} className="mr-2 text-bahola-blue-600" />
                <a href="tel:+919791035385" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  +91 9791035385
                </a>
              </p>
              <p className="flex items-center">
                <Mail size={18} className="mr-2 text-bahola-blue-600" />
                <a href="mailto:care@baholalabs.in" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  care@baholalabs.in
                </a>
              </p>
            </address>

            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-bahola-blue-100 transition-colors hover:bg-bahola-blue-500 hover:text-white"
              >
                <Facebook size={18} className="text-bahola-blue-600" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-bahola-blue-100 transition-colors hover:bg-bahola-blue-500 hover:text-white"
              >
                <Twitter size={18} className="text-bahola-blue-600" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-bahola-blue-100 transition-colors hover:bg-bahola-blue-500 hover:text-white"
              >
                <Instagram size={18} className="text-bahola-blue-600" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-bahola-blue-100 transition-colors hover:bg-bahola-blue-500 hover:text-white"
              >
                <Youtube size={18} className="text-bahola-blue-600" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-bahola-navy-950">Shop By Concern</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/concern/allergies-hay-fever" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  Allergies
                </Link>
              </li>
              <li>
                <Link href="/concern/digestive-issues" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  Digestive Health
                </Link>
              </li>
              <li>
                <Link href="/concern/cold-flu" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  Respiratory Care
                </Link>
              </li>
              <li>
                <Link href="/concern/skin-conditions" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  Skin Care
                </Link>
              </li>
              <li>
                <Link href="/concern/anxiety-stress" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  Sleep &amp; Stress
                </Link>
              </li>
              <li>
                <Link href="/concern/cold-flu" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  Immunity Support
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  View All Concerns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-bahola-navy-950">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  Consult a Homeopath
                </Link>
              </li>
              <li>
                <a
                  href="https://lovable.dev/projects/90f95490-dd0f-4544-953c-3fada8daac1b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bahola-neutral-700 hover:text-bahola-blue-600"
                >
                  I ❤️ HOMEOPATHY Blog
                </a>
              </li>
              <li>
                <Link href="/reviews" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/help-center" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns-policy" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-bahola-neutral-700 hover:text-bahola-blue-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-bahola-navy-950">Newsletter</h3>
            <p className="mb-4 text-bahola-neutral-700">
              Subscribe to receive updates on new products and special promotions.
            </p>
            <form
              className="mb-4 flex"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-l-lg border border-bahola-neutral-300 bg-white px-4 py-2 text-bahola-neutral-800 focus:outline-none focus:ring-1 focus:ring-bahola-blue-400"
                required
              />
              <button type="submit" className="rounded-l-none rounded-r-lg bg-bahola-blue-500 px-4 py-2 text-white hover:bg-bahola-blue-600">
                Subscribe
              </button>
            </form>
            <p className="text-sm text-bahola-neutral-600">
              By subscribing, you agree to our {" "}
              <Link href="/privacy-policy" className="underline hover:text-bahola-blue-600">
                Privacy Policy
              </Link>{" "}
              and consent to receive updates from Bahola Labs.
            </p>

            <div className="mt-6">
              <h3 className="mb-2 text-lg font-bold text-bahola-navy-950">Find Us</h3>
              <Link href="/store-locator" className="flex items-center text-bahola-blue-600 hover:underline">
                <MapPin size={16} className="mr-1" /> Store Locations
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-bahola-neutral-300 pt-6 text-sm text-bahola-neutral-600">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p>© 2025 Bahola Labs. All rights reserved.</p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link href="/privacy-policy" className="hover:text-bahola-blue-600">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-bahola-blue-600">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-bahola-blue-600">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


