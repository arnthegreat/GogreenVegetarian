import { LeafIcon } from '@/components/icons'
import type { Navigate } from '@/types/navigation'

export default function Footer({ navigate }: { navigate: Navigate }) {
  return (
    <>
      <footer
        id="footer-contact"
        className="bg-[#121E10] py-12 sm:py-16 grain grain-heavy"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#A8C49A]/15 flex items-center justify-center">
                  <LeafIcon className="w-4 h-4 text-[#6B8F5E]" />
                </div>
                <span className="font-sans text-lg font-bold tracking-wide">
                  <span style={{ color: "#C4962A" }}>Go</span>
                  <span style={{ color: "#6B8F5E" }}>green</span>{" "}
                  <span style={{ color: "#C4962A" }}>Vegetarian</span>
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Crafting authentic plant-based Cambodian products with
                compassion, heritage, and zero compromise since 2020.
              </p>
              <address className="text-white/30 text-xs not-italic leading-relaxed space-y-1">
                <div>Phnom Penh, Cambodia</div>
                <div>hello@gogreen.com.kh</div>
                <div>+855 12 345 678</div>
              </address>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-5">Company</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => navigate("about")}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("founder")}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors text-left"
                  >
                    Founder Story
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("about", "classes")}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors text-left"
                  >
                    Cooking Classes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("contact")}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors text-left"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-5">
                Products
              </h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => navigate("shop")}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors text-left"
                  >
                    Shop All Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("partner")}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors text-left"
                  >
                    Wholesale Orders
                  </button>
                </li>
                <li>
                  <a
                    href="#stores"
                    className="text-white/40 text-sm hover:text-white/70 transition-colors"
                  >
                    Find a Store
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => navigate("shop")}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors text-left"
                  >
                    New Arrivals
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-5">Connect</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.56V6.82a4.85 4.85 0 01-1.07-.13z" />
                    </svg>
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-xs">
              © {new Date().getFullYear()} Gogreen Vegetarian. All rights
              reserved.
            </p>
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="text-white/25 text-xs hover:text-white/50 transition-colors"
              >
                Cookies
              </a>
              <a
                href="#"
                className="text-white/25 text-xs hover:text-white/50 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white/25 text-xs hover:text-white/50 transition-colors"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
