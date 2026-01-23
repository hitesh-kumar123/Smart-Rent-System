import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HostPolicies = () => {
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
    { id: 'listing-standards', title: '1. Listing Standards' },
    { id: 'pricing', title: '2. Pricing & Fees' },
    { id: 'communication', title: '3. Communication' },
    { id: 'checkin-checkout', title: '4. Check-in & Check-out' },
    { id: 'safety', title: '5. Property Safety' },
    { id: 'cancellation', title: '6. Cancellation Policies' },
    { id: 'legal', title: '7. Legal Compliance' },
    { id: 'prohibited', title: '8. Prohibited Activities' },
    { id: 'reviews', title: '9. Reviews & Ratings' },
    { id: 'support', title: '10. Host Support' },
    { id: 'violations', title: '11. Policy Violations' },
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Host Policies & Guidelines</h1>
            <p className="text-xl text-primary-100">
              Everything you need to know about hosting on Smart Rent System
            </p>
            <p className="text-sm text-primary-200 mt-4">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Quick Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-primary-500">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-bold text-lg mb-2">Quality Standards</h3>
              <p className="text-neutral-600 text-sm">Maintain high-quality listings with accurate information and great photos</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="font-bold text-lg mb-2">Guest Experience</h3>
              <p className="text-neutral-600 text-sm">Provide excellent service and respond promptly to guest inquiries</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-bold text-lg mb-2">Legal Compliance</h3>
              <p className="text-neutral-600 text-sm">Follow all local laws, regulations, and tax requirements</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Table of Contents - Sticky Sidebar */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-sm p-6 mb-8">
                <h3 className="font-bold text-lg text-neutral-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Contents
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
                
                {/* Quick Action */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <Link
                    to="/host/become-a-host"
                    className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    List Property
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <div className="prose prose-lg max-w-none">
                  
                  <div className="bg-primary-50 border-l-4 border-primary-500 p-6 mb-8 rounded-r-lg">
                    <p className="text-primary-900 font-medium mb-2">🌟 Welcome, Host!</p>
                    <p className="text-primary-800">
                      These policies are designed to ensure a safe, respectful, and high-quality experience for both hosts and guests. By listing your property on Smart Rent System, you agree to follow these guidelines.
                    </p>
                  </div>

                  <h2 id="listing-standards" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">1. Listing Standards & Accuracy</h2>
                  
                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Property Information</h3>
                  <p className="mb-4">All listings must provide accurate and complete information:</p>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Property Description:</strong> Clearly describe your space, highlighting features and amenities</li>
                    <li><strong>Photos:</strong> Upload at least 5 high-quality, recent photos showing all areas guests can access</li>
                    <li><strong>Location:</strong> Provide the exact location of your property</li>
                    <li><strong>Amenities:</strong> List all available amenities accurately (WiFi, parking, kitchen, etc.)</li>
                    <li><strong>House Rules:</strong> Clearly state any rules (no smoking, no pets, quiet hours, etc.)</li>
                    <li><strong>Capacity:</strong> Specify the maximum number of guests allowed</li>
                  </ul>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <p className="text-yellow-800">
                      <strong>⚠️ Important:</strong> Misrepresenting your property or providing false information may result in listing suspension or account termination.
                    </p>
                  </div>

                  <h2 id="pricing" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">2. Pricing & Fees</h2>
                  
                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Setting Your Prices</h3>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Set competitive and fair pricing for your market</li>
                    <li>Nightly rates should include all base costs</li>
                    <li>Clearly communicate any additional fees (cleaning, extra guests, etc.)</li>
                    <li>Honor the price displayed at the time of booking</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Service Fees</h3>
                  <p className="mb-6">
                    Smart Rent System charges a service fee of 3% on each booking. This fee is automatically deducted from your payout and covers payment processing, customer support, and platform maintenance.
                  </p>

                  <h2 id="communication" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">3. Communication & Responsiveness</h2>
                  
                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Response Time Requirements</h3>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Booking Requests:</strong> Respond within 24 hours</li>
                    <li><strong>Guest Messages:</strong> Reply within 12 hours during active bookings</li>
                    <li><strong>Pre-booking Inquiries:</strong> Respond within 24 hours</li>
                    <li>Maintain professional and courteous communication at all times</li>
                  </ul>

                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                    <p className="text-green-800">
                      <strong>💡 Pro Tip:</strong> Hosts with quick response times receive higher ratings and more bookings!
                    </p>
                  </div>

                  <h2 id="checkin-checkout" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">4. Guest Check-in & Check-out</h2>
                  
                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Check-in Procedures</h3>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Provide clear check-in instructions at least 48 hours before arrival</li>
                    <li>Ensure the property is clean and ready by check-in time</li>
                    <li>Be available or provide contact information for check-in support</li>
                    <li>Provide working keys, codes, or access methods</li>
                    <li>Greet guests personally when possible</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Check-out Requirements</h3>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Clearly communicate check-out time and procedures</li>
                    <li>Provide checkout instructions (key return, trash disposal, etc.)</li>
                    <li>Inspect property promptly after guest departure</li>
                    <li>Report any damages through the platform within 48 hours</li>
                  </ul>

                  <h2 id="safety" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">5. Property Maintenance & Safety</h2>
                  
                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Safety Requirements</h3>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Smoke Detectors:</strong> Install working smoke detectors on each floor</li>
                    <li><strong>Carbon Monoxide Detectors:</strong> Required if you have gas appliances</li>
                    <li><strong>Fire Extinguisher:</strong> Provide a working fire extinguisher</li>
                    <li><strong>First Aid Kit:</strong> Keep a basic first aid kit available</li>
                    <li><strong>Emergency Exits:</strong> Ensure all exits are clearly marked and accessible</li>
                    <li><strong>Security:</strong> Provide working locks on all doors and windows</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Maintenance Standards</h3>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Keep property clean and well-maintained between bookings</li>
                    <li>Ensure all appliances and utilities are in working order</li>
                    <li>Repair any damages or issues promptly</li>
                    <li>Provide clean linens, towels, and basic toiletries</li>
                    <li>Regular pest control and property inspections</li>
                  </ul>

                  <h2 id="cancellation" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">6. Cancellation Policies</h2>
                  
                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Available Policies</h3>
                  <div className="space-y-4 mb-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-neutral-800 mb-2">🟢 Flexible</h4>
                      <p className="text-neutral-700 mb-2">Full refund if cancelled 24 hours before check-in</p>
                      <p className="text-sm text-neutral-600">Best for: New hosts, competitive markets</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-neutral-800 mb-2">🟡 Moderate</h4>
                      <p className="text-neutral-700 mb-2">Full refund if cancelled 5 days before check-in</p>
                      <p className="text-sm text-neutral-600">Best for: Most listings, balanced approach</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-neutral-800 mb-2">🔴 Strict</h4>
                      <p className="text-neutral-700 mb-2">50% refund if cancelled 7 days before check-in</p>
                      <p className="text-sm text-neutral-600">Best for: High-demand properties, special events</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Host-Initiated Cancellations</h3>
                  <p className="mb-4">Host cancellations are strongly discouraged and may result in:</p>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Cancellation fees</li>
                    <li>Negative impact on search ranking</li>
                    <li>Automatic calendar blocking</li>
                    <li>Account review or suspension for repeated cancellations</li>
                  </ul>

                  <h2 id="legal" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">7. Legal & Tax Compliance</h2>
                  
                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Your Responsibilities</h3>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Local Laws:</strong> Research and comply with local short-term rental laws</li>
                    <li><strong>Permits & Licenses:</strong> Obtain necessary permits, licenses, or registrations</li>
                    <li><strong>Tax Obligations:</strong> Report income and pay applicable taxes</li>
                    <li><strong>HOA/Lease Restrictions:</strong> Ensure you have permission to rent if applicable</li>
                    <li><strong>Insurance:</strong> Maintain appropriate property and liability insurance</li>
                    <li><strong>Zoning Compliance:</strong> Verify your property is zoned for short-term rentals</li>
                  </ul>

                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                    <p className="text-red-800">
                      <strong>⚠️ Critical:</strong> You are solely responsible for ensuring compliance with all applicable laws. Smart Rent System does not provide legal or tax advice.
                    </p>
                  </div>

                  <h2 id="prohibited" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">8. Prohibited Activities</h2>
                  
                  <p className="mb-4">The following activities are strictly prohibited:</p>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Discriminating against guests based on race, religion, national origin, disability, sex, gender identity, sexual orientation, or age</li>
                    <li>Creating fake or duplicate listings</li>
                    <li>Attempting to circumvent platform fees by booking off-platform</li>
                    <li>Requesting guests to provide false reviews</li>
                    <li>Using surveillance devices in private areas</li>
                    <li>Subletting without proper authorization</li>
                    <li>Hosting commercial events without disclosure</li>
                    <li>Allowing more guests than your property's stated capacity</li>
                  </ul>

                  <h2 id="reviews" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">9. Reviews & Ratings</h2>
                  
                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Review System</h3>
                  <p className="mb-4">Both hosts and guests can leave reviews within 14 days after checkout:</p>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Reviews become public after both parties submit, or after 14 days</li>
                    <li>Be honest, fair, and constructive in your reviews</li>
                    <li>Do not retaliate with negative reviews</li>
                    <li>Cannot be edited once submitted</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Rating Categories</h3>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Accuracy of listing description</li>
                    <li>Cleanliness of property</li>
                    <li>Communication responsiveness</li>
                    <li>Check-in process</li>
                    <li>Location and neighborhood</li>
                    <li>Value for money</li>
                  </ul>

                  <h2 id="support" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">10. Support & Resources</h2>
                  
                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Host Support</h3>
                  <p className="mb-4">We're here to help you succeed as a host:</p>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>24/7 Customer Support:</strong> Available for urgent issues</li>
                    <li><strong>Host Community:</strong> Connect with other hosts for tips and advice</li>
                    <li><strong>Resource Center:</strong> Access guides, tutorials, and best practices</li>
                    <li><strong>Host Protection:</strong> Coverage for property damage up to $1M</li>
                  </ul>

                  <h2 id="violations" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">11. Policy Violations & Enforcement</h2>
                  
                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Warning System</h3>
                  <p className="mb-4">Policy violations may result in:</p>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>First Offense:</strong> Warning and policy review</li>
                    <li><strong>Second Offense:</strong> Temporary listing suspension</li>
                    <li><strong>Third Offense:</strong> Permanent account suspension</li>
                    <li><strong>Severe Violations:</strong> Immediate account termination</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-neutral-700 mt-6 mb-3">Appeals Process</h3>
                  <p className="mb-6">
                    If you believe an enforcement action was taken in error, you can appeal within 30 days by contacting our support team with relevant documentation.
                  </p>

                  <h2 id="contact" className="text-2xl font-bold text-neutral-800 mt-10 mb-4 scroll-mt-24">12. Contact Information</h2>
                  
                  <div className="bg-neutral-50 p-6 rounded-lg mb-8">
                    <p className="mb-4">For questions about Host Policies, please contact us:</p>
                    <div className="space-y-2">
                      <p><strong>Host Support:</strong> <a href="mailto:hosts@smartrentsystem.com" className="text-primary-600 hover:text-primary-700">hosts@smartrentsystem.com</a></p>
                      <p><strong>Legal Inquiries:</strong> <a href="mailto:legal@smartrentsystem.com" className="text-primary-600 hover:text-primary-700">legal@smartrentsystem.com</a></p>
                      <p><strong>Phone Support:</strong> +1 (123) 456-7890 (24/7)</p>
                      <p><strong>Help Center:</strong> <Link to="/help" className="text-primary-600 hover:text-primary-700">Visit Help Center</Link></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl shadow-sm p-8 mb-8">
                <h3 className="text-2xl font-bold text-neutral-800 mb-6 text-center">Related Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link 
                    to="/terms"
                    className="bg-white rounded-lg p-4 hover:shadow-md transition duration-300 text-center"
                  >
                    <div className="text-2xl mb-2">📜</div>
                    <h4 className="font-semibold text-neutral-800 mb-1">Terms of Service</h4>
                    <p className="text-xs text-neutral-600">Platform terms & conditions</p>
                  </Link>
                  
                  <Link 
                    to="/safety"
                    className="bg-white rounded-lg p-4 hover:shadow-md transition duration-300 text-center"
                  >
                    <div className="text-2xl mb-2">🛡️</div>
                    <h4 className="font-semibold text-neutral-800 mb-1">Safety Center</h4>
                    <p className="text-xs text-neutral-600">Safety tips & guidelines</p>
                  </Link>
                  
                  <Link 
                    to="/help"
                    className="bg-white rounded-lg p-4 hover:shadow-md transition duration-300 text-center"
                  >
                    <div className="text-2xl mb-2">💬</div>
                    <h4 className="font-semibold text-neutral-800 mb-1">Help Center</h4>
                    <p className="text-xs text-neutral-600">FAQs & support articles</p>
                  </Link>
                  
                  <Link 
                    to="/cancellation"
                    className="bg-white rounded-lg p-4 hover:shadow-md transition duration-300 text-center"
                  >
                    <div className="text-2xl mb-2">🔄</div>
                    <h4 className="font-semibold text-neutral-800 mb-1">Cancellation Policy</h4>
                    <p className="text-xs text-neutral-600">Detailed cancellation rules</p>
                  </Link>
                </div>
              </div>

              {/* CTA Banner */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl shadow-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Become a Host?</h3>
                <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                  Now that you understand our host policies, you're ready to list your property and start earning!
                </p>
                <Link 
                  to="/host/become-a-host"
                  className="inline-flex items-center px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-neutral-100 transition duration-300"
                >
                  List Your Property
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostPolicies;
