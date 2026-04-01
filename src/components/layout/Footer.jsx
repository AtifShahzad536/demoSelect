import React from 'react';

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconYoutube = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const IconX = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const footerLinks = {
  Products: ['Match Balls', 'Training Balls', 'Goalkeeper Gloves', 'Accessories', 'Clothing'],
  Sport: ['Football', 'Futsal', 'Handball', 'Volleyball', 'Rugby'],
  Explore: ['About Select', 'Sustainability', 'Sponsorships', 'News & Stories', 'Careers'],
  'Partner With Us': ['Become a Dealer', 'Club Partnerships', 'League Partnerships', 'Custom Balls', 'Contact'],
};

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      {/* Top Section */}
      <div className="max-w-[1440px] mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12">

          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden">
                <img
                  src="/logo_silverstar1.png"
                  alt="Silver Star Group"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Silver Star Group</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-[260px]">
              Since 1947, Select Sport has been manufacturing premium sports equipment trusted by professional athletes and leagues worldwide.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[
                { icon: <IconInstagram />, label: 'Instagram' },
                { icon: <IconFacebook />, label: 'Facebook' },
                { icon: <IconYoutube />, label: 'YouTube' },
                { icon: <IconX />, label: 'X / Twitter' },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-200"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="md:col-span-1">
              <h4 className="text-xs font-black tracking-[0.2em] uppercase mb-5 text-white">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 tracking-wide"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-12 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-black tracking-tight uppercase mb-1">Stay in the Game</h4>
              <p className="text-sm text-gray-400">Get the latest news, products and offers straight to your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-900 text-white text-sm px-5 py-3 border border-gray-700 focus:outline-none focus:border-white transition-colors w-full md:w-72 placeholder:text-gray-600"
              />
              <button className="bg-white text-black px-6 py-3 text-xs font-black tracking-widest hover:bg-gray-200 transition-colors whitespace-nowrap">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1440px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600 tracking-wide">
            © {new Date().getFullYear()} Select Sport A/S. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Cookie Policy', 'Terms of Service'].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-600 hover:text-white transition-colors tracking-wide">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
