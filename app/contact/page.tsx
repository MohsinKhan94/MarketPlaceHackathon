'use client'

import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/sanity'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'
import { FaFacebook,FaInstagram,FaGithub } from "react-icons/fa";
import Link from 'next/link'


interface ContactInfo {
  phone: string
  email: string
  address: string
}

export default function Contact() {
  const [contact, setContact] = useState<ContactInfo | null>(null)
  const [error, setError] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [messageSent, setMessageSent] = useState(false)

  // Fetch Contact Info from Sanity
  useEffect(() => {
    client
      .fetch(
        `*[_type == "contactInfo"][0]{
          phone,
          email,
          address
        }`
      )
      .then((data) => setContact(data))
      .catch(() => setError(true))
  }, [])

  // Save Form Data to Local Storage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("contactForm") || "{}")
    if (savedData) {
      setName(savedData.name || "")
      setEmail(savedData.email || "")
      setMessage(savedData.message || "")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("contactForm", JSON.stringify({ name, email, message }))
  }, [name, email, message])

  // Form Submission Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) {
      alert("Please fill out all fields.")
      return
    }
    setMessageSent(true)
    setTimeout(() => setMessageSent(false), 3000) // Hide after 3 seconds
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Contact Us
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="glass p-6 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-purple-200">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md bg-white/10 border border-purple-500 text-white placeholder-purple-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-200">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md bg-white/10 border border-purple-500 text-white placeholder-purple-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-purple-200">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full rounded-md bg-white/10 border border-purple-500 text-white placeholder-purple-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Send Message
            </button>
            {messageSent && <p className="text-green-500 text-center mt-2">Your message has been sent!</p>}
          </form>
        </div>

        {/* Contact Information */}
        <div className="glass p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-semibold text-purple-300">Contact Information</h2>
          {contact ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <p className="flex items-center text-purple-200">
                <Phone className="h-5 w-5 mr-2 text-pink-400" />
                {contact.phone}
              </p>
              <p className="flex items-center text-purple-200">
                <Mail className="h-5 w-5 mr-2 text-pink-400" />
                {contact.email}
              </p>
              <p className="flex items-center text-purple-200">
                <MapPin className="h-5 w-5 mr-2 text-pink-400" />
                {contact.address}
              </p>

              {/* WhatsApp Link */}
              <p className="flex items-center text-purple-200">
                <a href={`https://wa.me/${contact.phone}`} target="_blank" rel="noopener noreferrer">
                  <Phone className="h-5 w-5 mr-2 text-green-400" />
                  WhatsApp Us
                </a>
              </p>
              
              {/* Social Media Links */}
              <div className="flex space-x-4 mt-4">
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="h-6 w-6 text-blue-400 hover:text-blue-600 transition-all" />
                </Link>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="h-6 w-6 text-blue-300 hover:text-blue-500 transition-all" />
                </Link>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="h-6 w-6 text-pink-400 hover:text-pink-600 transition-all" />
                </Link>
              </div>
            </motion.div>
          ) : error ? (
            <p className="text-red-500">Failed to load contact info.</p>
          ) : (
            <p className="text-purple-300">Loading contact info...</p>
          )}
        </div>
      </div>
    </div>
  )
}
