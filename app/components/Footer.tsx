'use client'

import Link from "next/link"
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { useState } from "react"
import { ChevronDown, Mail } from "lucide-react"
import type React from "react" // Added import for React

const FooterSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-purple-800 last:border-b-0 md:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-lg font-semibold text-purple-300">{title}</h4>
        <ChevronDown
          className={`h-5 w-5 text-purple-300 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>
      <div className={`${isOpen ? "block" : "hidden"} md:block space-y-2 pb-4 md:pb-0`}>{children}</div>
    </div>
  )
}

const Footer = () => {
  return (
    <footer className="glass mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              EliteBuy
            </h3>
            <p className="text-purple-200">Premium mobile shopping experience</p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-pink-400 transition-colors"
              >
                <FaFacebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <Link
                href="https://github.com/MohsinKhan94"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-pink-400 transition-colors"
              >
                <FaGithub className="h-6 w-6" />
                <span className="sr-only">Github</span>
              </Link>
              <a
                href="https://www.instagram.com/mohsin_khanmvp/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-pink-400 transition-colors"
              >
                <FaInstagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/in/mohsinkhanlkk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-pink-400 transition-colors"
              >
                <FaLinkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <FooterSection title="Quick Links">
            <ul>
              <li>
                <Link href="/shop" className="text-purple-200 hover:text-pink-400 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-purple-200 hover:text-pink-400 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-purple-200 hover:text-pink-400 transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-purple-200 hover:text-pink-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </FooterSection>
          <FooterSection title="Customer Service">
            <ul>
              <li>
                <Link href="/faq" className="text-purple-200 hover:text-pink-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-purple-200 hover:text-pink-400 transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-purple-200 hover:text-pink-400 transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-purple-200 hover:text-pink-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </FooterSection>
          <FooterSection title="Contact Us">
            <address className="not-italic">
              <p className="text-purple-200">123 Elite Street</p>
              <p className="text-purple-200">Luxe City, 90210</p>
              <p className="text-purple-200 mt-2">Phone: (555) 123-4567</p>
              <a
                href="mailto:info@elitebuy.com"
                className="text-purple-200 hover:text-pink-400 transition-colors flex items-center mt-2"
              >
                <Mail className="h-4 w-4 mr-2" />
                info@elitebuy.com
              </a>
            </address>
          </FooterSection>
        </div>
        <div className="mt-8 pt-8 border-t border-purple-800 text-center text-purple-300">
          <p>&copy; {new Date().getFullYear()} EliteBuy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

