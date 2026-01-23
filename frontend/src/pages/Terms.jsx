import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Terms = () => {
  const lastUpdated = "January 23, 2026";
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');

  // Scroll to section if hash is present
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('h2[id]');
      let currentSection = '';
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'account', title: '2. Account Registration' },
    { id: 'conduct', title: '3. Content and Conduct' },
    { id: 'bookings', title: '4. Bookings and Reservations' },
    { id: 'host-responsibilities', title: '5. Host Responsibilities', badge: 'For Hosts' },
    { id: 'cancellations', title: '6. Cancellations and Refunds' },
    { id: 'fees', title: '7. Fees and Payments' },
    { id: 'liability', title: '8. Disclaimers and Limitations' },
    { id: 'indemnification', title: '9. Indemnification' },
    { id: 'modifications', title: '10. Modifications to Terms' },
    { id: 'governing-law', title: '11. Governing Law' },
    { id: 'contact', title: '12. Contact Information' },
  ];

  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      {/* Header section */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-primary-100">
              The rules and guidelines for using Smart Rent System
            </p>
            <p className="text-sm text-primary-200 mt-4">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Table of Contents - Sticky Sidebar */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-sm p-6 mb-8">
                <h3 className="font-bold text-lg text-neutral-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Table of Contents
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group ${
                        activeSection === section.id
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                      }`}
                    >
                      <span className="flex-1">{section.title}</span>
                      {section.badge && (
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full ml-2">
                          {section.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
                
                {/* Quick Action */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <Link
                    to="/help"
                    className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Questions?
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <div className="prose prose-lg max-w-none">
                  
                  <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mb-8 rounded-r-lg">
                    <p className="text-primary-900 font-medium mb-2">📋 Important Notice</p>
                    <p className="text-primary-800 text-base">
                      Please read these Terms of Service carefully before using Smart Rent System. By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms.
                    </p>
                  </div>

                  <p className="lead text-lg text-neutral-700 mb-8">
                    Welcome to Smart Rent System. These Terms of Service govern your access to and use of the Smart Rent System website, apps, and services. By accessing or using our service, you agree to be bound by these terms.
                  </p>

                  <h2 id="acceptance" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">1. Acceptance of Terms</h2>
                  <p className="mb-6">
                    By registering for and/or using the Service in any manner, you agree to these Terms and all other operating rules, policies, and procedures that may be published by Smart Rent System. These Terms apply to all users of the Service, including hosts, guests, and general visitors.
                  </p>

                  <h2 id="account" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">2. Account Registration</h2>
                  <h2 id="account" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">2. Account Registration</h2>
                  <p className="mb-4">
                    To access certain features of the Service, you must register for an account. When you register, you agree to:
                  </p>
                  <ul className="list-disc pl-6 mb-6">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Maintain the security of your account and password</li>
                    <li>Accept all risks of unauthorized access to your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                  <p className="mb-6">
                    We reserve the right to refuse service, terminate accounts, or remove content in our sole discretion.
                  </p>

                  <h2 id="conduct" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">3. Content and Conduct</h2>
                  <h2 id="conduct" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">3. Content and Conduct</h2>
                  <p className="mb-4">
                    Our Service allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content you post and the consequences of sharing it. By posting content, you represent that you have the necessary rights to that content.
                  </p>
                  <p className="mb-6">
                    You agree not to use the Service to:
                  </p>
                  <ul className="list-disc pl-6 mb-6">
                    <li>Post illegal, harmful, threatening, abusive, or discriminatory content</li>
                    <li>Impersonate any person or entity</li>
                    <li>Falsely state or misrepresent your affiliation with a person or entity</li>
                    <li>Post private or confidential information of others without permission</li>
                    <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
                    <li>Use the Service for any illegal purpose or in violation of any laws</li>
                    <li>Upload viruses or other malicious code</li>
                    <li>Attempt to circumvent any security features of the Service</li>
                  </ul>

                  <h2 id="bookings" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">4. Bookings and Reservations</h2>
                  <p className="mb-4">
                    As a guest, when you make a booking, you agree to:
                  </p>
                  <ul className="list-disc pl-6 mb-6">
                    <li>Pay all fees, applicable taxes, and any other charges related to your booking</li>
                    <li>Be responsible for your conduct during your stay</li>
                    <li>Adhere to the host's house rules and checkout procedures</li>
                    <li>Leave the property in the same condition as when you arrived</li>
                    <li>Report any damage or issues promptly</li>
                  </ul>

                  <h2 id="host-responsibilities" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">
                    <span className="flex items-center">
                      5. Host Responsibilities
                      <span className="ml-3 text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">For Hosts</span>
                    </span>
                  </h2>
                  
                  <div className="bg-gradient-to-r from-primary-50 to-blue-50 border-l-4 border-primary-500 p-6 mb-6 rounded-r-lg">
                    <p className="text-primary-900 font-medium mb-2">🏠 Attention Hosts</p>
                    <p className="text-primary-800 text-base">
                      If you're listing a property on Smart Rent System, please pay special attention to this section. These terms outline your specific responsibilities as a host.
                    </p>
                  </div>

                  <p className="mb-4 font-medium text-neutral-800">
                    When you list your property on Smart Rent System, you agree to:
                  </p>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Accuracy:</strong> Provide accurate and complete information about your space, including photos, amenities, location, and capacity</li>
                    <li><strong>Quality Standards:</strong> Maintain your property in a safe, clean, and habitable condition at all times</li>
                    <li><strong>Responsiveness:</strong> Respond to booking requests and guest messages within 24 hours</li>
                    <li><strong>Availability:</strong> Honor confirmed bookings and maintain accurate calendar availability</li>
                    <li><strong>Legal Compliance:</strong> Comply with all applicable laws, including tax, zoning, safety regulations, and licensing requirements</li>
                    <li><strong>Safety:</strong> Ensure your property meets all safety standards, including working smoke detectors, carbon monoxide detectors, and emergency exits</li>
                    <li><strong>Non-Discrimination:</strong> Accept guests without regard to race, religion, national origin, disability, sex, gender identity, sexual orientation, or age</li>
                    <li><strong>Transparency:</strong> Disclose any property limitations, house rules, or potential issues upfront</li>
                  </ul>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
                    <p className="text-yellow-900 text-sm">
                      <strong>⚠️ Important:</strong> Violations of host responsibilities may result in listing suspension, account penalties, or termination. Hosts are responsible for understanding and following all platform policies.
                    </p>
                  </div>

                  <h2 id="cancellations" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">6. Cancellations and Refunds</h2>
              <p className="mb-6">
                Cancellations and refunds are handled according to the specific cancellation policy selected by the host for their listing. This policy is displayed on each listing prior to booking. By completing a booking, guests acknowledge and agree to the host's cancellation policy.
              </p>
              <p className="mb-6">
                For more information, please refer to our <Link to="/cancellation" className="text-primary-600 hover:text-primary-700">Cancellation Policy</Link>.
              </p>

              <h2 id="fees" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">7. Fees and Payments</h2>
              <p className="mb-6">
                Smart Rent System charges service fees to both guests and hosts for use of the platform. These fees are calculated as a percentage of the booking subtotal and are clearly displayed before checkout. By using our Service, you agree to pay all applicable fees. All payments are processed securely through our platform.
              </p>

              <h2 id="liability" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">8. Disclaimers and Limitations of Liability</h2>
              <p className="mb-6">
                The Service is provided on an "as is" and "as available" basis. Smart Rent System expressly disclaims all warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
              <p className="mb-6">
                In no event shall Smart Rent System be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>

              <h2 id="indemnification" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">9. Indemnification</h2>
              <p className="mb-6">
                You agree to defend, indemnify, and hold harmless Smart Rent System, its officers, directors, employees, and agents, from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney's fees and costs, arising out of or in any way connected with your access to or use of the Service, your violation of these Terms, or your violation of any rights of another.
              </p>

              <h2 id="modifications" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">10. Modifications to Terms</h2>
              <p className="mb-6">
                We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of the Service after such notice constitutes your acceptance of the new Terms.
              </p>

              <h2 id="governing-law" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">11. Governing Law</h2>
              <p className="mb-6">
                These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located within [Jurisdiction].
              </p>

              <h2 id="contact" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">12. Contact Information</h2>
              <p className="mb-6">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="bg-neutral-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Email:</strong> legal@smartrentsystem.com</p>
                <p className="mb-2"><strong>Postal Address:</strong> 123 Rent Street, City, Country</p>
                <p><strong>Phone:</strong> +1 (123) 456-7890</p>
              </div>
            </div>
          </div>
        </div>

        {/* Host CTA Banner */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl shadow-lg p-8 text-white text-center mb-8 lg:col-span-3">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Become a Host?</h3>
            <p className="text-primary-100 mb-6">
              Now that you understand our Terms of Service, start listing your property and earn extra income!
            </p>
            <Link 
              to="/host/become-a-host"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-neutral-100 transition duration-300 shadow-md"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              List Your Property
            </Link>
          </div>
        </div>

        {/* Related links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:col-span-3">
            <Link 
              to="/privacy"
              className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:border-primary-500 transition duration-300"
            >
              <h3 className="font-medium text-lg text-neutral-900 mb-2">Privacy Policy</h3>
              <p className="text-neutral-600 mb-2">
                Learn how we collect, use, and protect your information.
              </p>
              <span className="text-primary-600 font-medium flex items-center">
                Read Privacy Policy
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            
            <Link 
              to="/cookies"
              className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:border-primary-500 transition duration-300"
            >
              <h3 className="font-medium text-lg text-neutral-900 mb-2">Cookie Policy</h3>
              <p className="text-neutral-600 mb-2">
                Learn how we use cookies and similar technologies on our website.
              </p>
              <span className="text-primary-600 font-medium flex items-center">
                Read Cookie Policy
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            
            <Link 
              to="/help"
              className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 hover:border-primary-500 transition duration-300"
            >
              <h3 className="font-medium text-lg text-neutral-900 mb-2">Help Center</h3>
              <p className="text-neutral-600 mb-2">
                Find answers to common questions about our terms and policies.
              </p>
              <span className="text-primary-600 font-medium flex items-center">
                Visit Help Center
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;