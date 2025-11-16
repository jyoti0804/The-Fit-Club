import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Logo from "../../assets/logo.png";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "How can I reset my password?",
    answer:
      "Go to your profile settings, click on 'Change Password', and follow the instructions.",
  },
  {
    question: "How do I view my transactions?",
    answer:
      "Navigate to the Transactions page from the sidebar. You can filter, search, and paginate through your transactions.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can fill out the contact form below or email us at support@fitclub.com.",
  },
];

const HelpSupport: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFAQClick = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });

    // Redirect to membership page after 2 seconds
    setTimeout(() => {
      navigate("/membership");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-gray-300">
      {/* Header */}
      {/* <header className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img src={Logo} alt="Fit Club" className="w-36 md:w-40 object-contain" />
          <h1 className="text-2xl font-extrabold text-orange-500">Help & Support</h1>
        </div>
      </header> */}
      {/* Header */}
{/* Header */}
{/* Header */}
<header className="bg-orange-700 text-white shadow-sm">
  <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center md:justify-between gap-4">
    {/* Logo & Title */}
    <div className="flex items-center gap-4">
      <img src={Logo} alt="Fit Club" className="w-28 md:w-32 object-contain" />
      <div className="space-y-0.5">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
          Help & Support
        </h1>
        <p className="text-orange-200 text-sm md:text-base">
          We are here to assist you 24/7.
        </p>
      </div>
    </div>

    {/* Contact Button */}
    <button
      onClick={() => window.scrollTo({ top: 1000, behavior: "smooth" })}
      className="mt-2 md:mt-0 bg-white text-orange-600 font-semibold px-5 py-2 rounded-full shadow hover:bg-orange-50 transition-colors"
    >
      Contact Us
    </button>
  </div>
</header>



      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* FAQ Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-orange-500">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-700 rounded-md overflow-hidden"
              >
                <button
                  onClick={() => handleFAQClick(idx)}
                  className="w-full text-left px-4 py-3 bg-[#2b2b2b] hover:bg-[#3a3a3a] flex justify-between items-center font-semibold"
                >
                  {faq.question}
                  <span>{openFAQ === idx ? "-" : "+"}</span>
                </button>
                {openFAQ === idx && (
                  <div className="px-4 py-3 bg-[#1f1f1f] text-gray-200">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-orange-500">Contact Support</h2>
          
          {success && (
            <div className="bg-green-600 text-white px-4 py-2 rounded-md">
              Message sent successfully! 
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-md bg-[#2b2b2b] border border-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-md bg-[#2b2b2b] border border-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <textarea
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-md bg-[#2b2b2b] border border-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 h-32 resize-none"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 rounded-md text-white font-semibold hover:scale-105 transition-transform"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Support Info */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-orange-500">Support Information</h2>
          <p>Email: <span className="text-gray-400">support@fitclub.com</span></p>
          <p>Phone: <span className="text-gray-400">+1 (555) 123-4567</span></p>
          <p>Working Hours: <span className="text-gray-400">Mon - Fri, 9am - 6pm</span></p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HelpSupport;
