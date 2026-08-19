import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 border-b border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold tracking-wide text-black">
            Join the inner circle
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Early access to drops, private sales & style edits.
          </p>
        </div>

        <form
          onSubmit={handleSubscribe}
          className="flex w-full md:w-auto border-b border-black pb-1 min-w-[300px]"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-transparent flex-1 text-sm text-black placeholder:text-gray-400 outline-none px-1"
          />
          <button
            type="submit"
            className="flex items-center gap-1 text-xs font-semibold tracking-widest text-black hover:text-[#C9A227] transition-colors duration-300"
          >
            SUBSCRIBE
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold tracking-wide text-black">
            NOVA<span className="text-[#C9A227]">.</span>
          </h2>

          <p className="text-sm text-gray-500 mt-3 max-w-xs leading-relaxed">
            Timeless pieces, crafted from the finest materials. Designed for
            those who value quality over trend.
          </p>

          <div className="flex items-center gap-4 mt-6">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-[#C9A227] hover:text-[#C9A227] transition-colors duration-300"
            >
              <FaInstagram className="w-4 h-4" />
            </a>

            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-[#C9A227] hover:text-[#C9A227] transition-colors duration-300"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>

            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-[#C9A227] hover:text-[#C9A227] transition-colors duration-300"
            >
              <FaXTwitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest text-black mb-4">
            SHOP
          </h4>

          <ul className="space-y-3 text-sm text-gray-500">
            <li className="hover:text-[#C9A227] transition-colors cursor-pointer">
              Men
            </li>
            <li className="hover:text-[#C9A227] transition-colors cursor-pointer">
              Women
            </li>
            <li className="hover:text-[#C9A227] transition-colors cursor-pointer">
              Kids
            </li>
            <li className="hover:text-[#C9A227] transition-colors cursor-pointer">
              New Arrivals
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest text-black mb-4">
            COMPANY
          </h4>

          <ul className="space-y-3 text-sm text-gray-500">
            <li className="hover:text-[#C9A227] transition-colors cursor-pointer">
              About Us
            </li>
            <li className="hover:text-[#C9A227] transition-colors cursor-pointer">
              Careers
            </li>
            <li className="hover:text-[#C9A227] transition-colors cursor-pointer">
              Sustainability
            </li>
            <li className="hover:text-[#C9A227] transition-colors cursor-pointer">
              Contact
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest text-black mb-4">
            SUPPORT
          </h4>

          <ul className="space-y-3 text-sm text-gray-500">
            <li className="hover:text-[#C9A227] transition-colors cursor-pointer">
              Shipping
            </li>
            <li className="hover:text-[#C9A227] transition-colors cursor-pointer">
              Returns
            </li>
            <li className="hover:text-[#C9A227] transition-colors cursor-pointer">
              FAQs
            </li>
            <li className="hover:text-[#C9A227] transition-colors cursor-pointer">
              Size Guide
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} LUXÉ. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-gray-400">
            <span className="hover:text-black transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-black transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;