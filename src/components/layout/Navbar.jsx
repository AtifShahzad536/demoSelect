import React, { useState } from 'react';
import { Search, Globe, ChevronDown, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavigationDrawer from './NavigationDrawer';
import PartnerMegaMenu from './PartnerMegaMenu';
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';

const Navbar = () => {
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const drawerData = {
    PRODUCTS: {
      categories: [
        {
          name: 'PRODUCT 1',
          subCategories: [
            { name: 'PRODUCT SUBMENU 1', image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?q=80&w=150&auto=format&fit=crop' },
            { name: 'PRODUCT SUBMENU 2', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=150&auto=format&fit=crop' },
            { name: 'PRODUCT SUBMENU 3', image: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=150&auto=format&fit=crop' },
            { name: 'PRODUCT SUBMENU 4', image: 'https://images.unsplash.com/photo-1518605388461-9c1682f63eef?q=80&w=150&auto=format&fit=crop' },
            { name: 'PRODUCT SUBMENU 5', image: 'https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?q=80&w=150&auto=format&fit=crop' }
          ]
        },
        {
          name: 'PRODUCT 2',
          subCategories: [
            { name: 'PRODUCT SUBMENU 1', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=150&auto=format&fit=crop' },
            { name: 'PRODUCT SUBMENU 2', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=150&auto=format&fit=crop' },
            { name: 'PRODUCT SUBMENU 3', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=150&auto=format&fit=crop' }
          ]
        },
        {
          name: 'PRODUCT 3',
          subCategories: [
            { name: 'PRODUCT SUBMENU 1', image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=150&auto=format&fit=crop' },
            { name: 'PRODUCT SUBMENU 2', image: 'https://images.unsplash.com/photo-1590483256059-e31460c5cff9?q=80&w=150&auto=format&fit=crop' },
            { name: 'PRODUCT SUBMENU 3', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=150&auto=format&fit=crop' }
          ]
        },
        {
          name: 'PRODUCT 4',
          subCategories: [
            { name: 'PRODUCT SUBMENU 1', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=150&auto=format&fit=crop' },
            { name: 'PRODUCT SUBMENU 2', image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=150&auto=format&fit=crop' }
          ]
        },
        {
          name: 'PRODUCT 5',
          subCategories: [
            { name: 'PRODUCT SUBMENU 1', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=150&auto=format&fit=crop' },
            { name: 'PRODUCT SUBMENU 2', image: 'https://images.unsplash.com/photo-1588612143162-87a718d09553?q=80&w=150&auto=format&fit=crop' }
          ]
        }
      ],
      bottomImage: {
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop',
        alt: 'My Training',
        badge: 'NEW',
        title: 'SELECT MY TRAINING'
      }
    },
    SPORT: {
      categories: [
        {
          name: 'FOOTBALL',
          subCategories: [
            { name: 'FOOTBALLS', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=150&auto=format&fit=crop' },
            { name: 'CLOTHING', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=150&auto=format&fit=crop' },
            { name: 'GOALKEEPER GLOVES', image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?q=80&w=150&auto=format&fit=crop' },
            { name: 'SHINGUARDS', image: 'https://images.unsplash.com/photo-1590483256059-e31460c5cff9?q=80&w=150&auto=format&fit=crop' },
            { name: 'CARE & SUPPORTS', image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=150&auto=format&fit=crop' },
            { name: 'EQUIPMENT', image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=150&auto=format&fit=crop' }
          ]
        },
        {
          name: 'HANDBALL',
          subCategories: [
            { name: 'HANDBALLS', image: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=150&auto=format&fit=crop' },
            { name: 'CLOTHING', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=150&auto=format&fit=crop' },
            { name: 'CARE & SUPPORTS', image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=150&auto=format&fit=crop' },
            { name: 'RESIN PRODUCTS', image: 'https://images.unsplash.com/photo-1584735935682-167814db35ed?q=80&w=150&auto=format&fit=crop' },
            { name: 'EQUIPMENT', image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=150&auto=format&fit=crop' }
          ]
        },
        {
          name: 'FUTSAL',
          subCategories: [
            { name: 'FUTSAL BALLS', image: 'https://images.unsplash.com/photo-1518605388461-9c1682f63eef?q=80&w=150&auto=format&fit=crop' },
            { name: 'CLOTHING', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=150&auto=format&fit=crop' },
            { name: 'GLOVES', image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?q=80&w=150&auto=format&fit=crop' },
            { name: 'CARE & SUPPORTS', image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=150&auto=format&fit=crop' },
            { name: 'EQUIPMENT', image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=150&auto=format&fit=crop' }
          ]
        },
        {
          name: 'OTHER',
          subCategories: [
            { name: 'BALLS', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=150&auto=format&fit=crop' }
          ]
        }
      ],
      bottomImage: [
        {
          src: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=800&auto=format&fit=crop',
          alt: 'Other balls',
          badge: '',
          title: 'Other balls'
        },
        {
          src: 'https://images.unsplash.com/photo-1574629810360-7efbc193988b?q=80&w=800&auto=format&fit=crop',
          alt: 'Handballs',
          badge: '',
          title: 'Handballs'
        }
      ]
    },
    EXPLORE: {
      categories: [
        'GUIDES', 'CATALOGUE', 'SILVER STAR LAB'
      ],
      hideChevrons: true,
      bottomImage: {
        src: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
        alt: 'Brochure',
        isRawImage: true
      }
    },
    'ABOUT US': {
      categories: [
        'ABOUT SILVER STAR', 'CONTACT', 'CSR', 'ENVIROMENTAL TRANSITION',
        'PRESS & NEWS', 'CHARITY', 'SPONSORSHIPS'
      ],
      hideChevrons: true,
      bottomImage: {
        src: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15f?q=80&w=800&auto=format&fit=crop',
        alt: 'Environmental transition',
        title: 'Environmental transition',
        isRawImage: true,
        noRotate: true
      }
    },
    'PARTNER WITH US': {
      categories: [
        {
          name: 'SPONSORSHIPS',
          subCategories: [
            { name: 'Sponsorships - Football' },
            { name: 'Sponsorships - Handball' },
            { name: 'Sponsorships - Futsal' }
          ]
        },
        'EVERYTHING FOR YOUR CLUB'
      ],
      bottomImage: {
        src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800&auto=format&fit=crop',
        alt: 'Everything for your club',
        title: 'Everything for your club'
      }
    }
  };

  const navLinks = [
    'PRODUCTS',
    'SPORT',
    'EXPLORE',
    'PARTNER WITH US',
    'COMPLIANCE',
    'CERTIFICATION',
    'ABOUT US'
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="w-full px-[2%] md:px-[3%] h-16 md:h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => { setActiveDrawer(null); navigate('/'); }}
          >
            <div className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center overflow-hidden">
              <img
                src="/logo_silverstar1.png"
                alt="Silver Star Group"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Desktop Navigation Links — hidden below lg */}
          <div className="hidden lg:flex items-center gap-[1.5vw]">
            {navLinks.map((link) => (
              <div
                key={link}
                className="flex items-center gap-1 cursor-pointer group"
                onClick={() => {
                  if (drawerData[link] || link === 'PARTNER WITH US') {
                    if (activeDrawer === link) {
                      setActiveDrawer(null);
                    } else {
                      setActiveDrawer(link);
                    }
                  } else {
                    setActiveDrawer(null);
                  }
                }}
              >
                <span className={`text-[10px] md:text-[10px] font-bold tracking-[0.1em] transition-all duration-300 ${activeDrawer === link ? 'text-black' : 'text-gray-500 hover:text-black uppercase'}`}>
                  {link}
                </span>
                
                {/* Underline Animation */}
                <div className={`absolute -bottom-1 left-0 h-[1.5px] bg-black transition-all duration-300 ease-out ${activeDrawer === link ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>

                {(drawerData[link] || link === 'PARTNER WITH US') && (
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${activeDrawer === link ? 'rotate-180' : 'group-hover:rotate-180'}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6 lg:gap-[2.5vw]">
            {/* Language — desktop only */}
            <div className="hidden lg:flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
              <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-blue-600">
                <Globe size={14} className="text-white" />
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase">
                International
              </span>
            </div>

            {/* Search — always visible */}
            <button
              id="search-toggle"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              <Search size={22} strokeWidth={1.5} />
            </button>

            {/* Hamburger — visible on mobile & tablet (< lg) */}
            <button
              id="mobile-menu-toggle"
              className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors gap-[5px]"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={1.8} className="text-black" />
            </button>
          </div>
        </div>

        {/* Desktop Drawers — hidden on mobile/tablet */}
        <div className="hidden lg:block">
          <NavigationDrawer
            isOpen={!!activeDrawer && activeDrawer !== 'PARTNER WITH US'}
            onClose={() => setActiveDrawer(null)}
            data={activeDrawer && activeDrawer !== 'PARTNER WITH US' ? drawerData[activeDrawer] : null}
          />
          <PartnerMegaMenu
            isOpen={activeDrawer === 'PARTNER WITH US'}
            onClose={() => setActiveDrawer(null)}
          />
        </div>
      </nav>

      {/* Mobile / Tablet Menu — rendered outside <nav> to avoid z-index clipping */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        drawerData={drawerData}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
