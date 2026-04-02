import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronDown, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────────────────
   SlideAccordion
   Uses scrollHeight (measured on the inner div) so the CSS transition always
   goes from 0 → exact pixel value. Never eases over a large empty range.
   Works on every mobile browser, including old Safari.
──────────────────────────────────────────────────────────────────────────*/
const SlideAccordion = ({ isOpen, children, style = {} }) => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    if (isOpen) {
      const h = inner.scrollHeight;
      outer.style.height = h + 'px';
      
      // Once transition finishes, set height -> auto so nested accordions can grow
      const timer = setTimeout(() => {
        if (outer.style.height !== '0px') {
          outer.style.height = 'auto';
        }
      }, 380);
      return () => clearTimeout(timer);
    } else {
      // Snap current live height → 0 so the transition plays even mid-animation
      outer.style.height = outer.offsetHeight + 'px';
      // Force reflow so the browser registers the "from" value
      void outer.offsetHeight; // eslint-disable-line
      outer.style.height = '0px';
    }
  }, [isOpen]);

  return (
    <div
      ref={outerRef}
      style={{
        overflow: 'hidden',
        height: 0,
        transition: 'height 380ms cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'height',
        ...style,
      }}
    >
      <div ref={innerRef} style={{ opacity: 1 }}>
        {children}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   NavItem — one top-level nav link + its category list
──────────────────────────────────────────────────────────────────────────*/
const NavItem = ({ link, data, isExpanded, onToggle, linkIdx, isMenuOpen, onNavigate }) => {
  const cats = data?.categories || [];
  const hasSubs = !!data;

  return (
    <li
      style={{
        borderBottom: '1px solid #f3f4f6',
        opacity: isMenuOpen ? 1 : 0,
        transform: isMenuOpen ? 'translateY(0)' : 'translateY(14px)',
        transition: `opacity 360ms ease ${60 + linkIdx * 45}ms,
                     transform 360ms cubic-bezier(0.4,0,0.2,1) ${60 + linkIdx * 45}ms`,
      }}
    >
      {/* Top-level button */}
      <button
        onClick={() => hasSubs ? onToggle(link) : onNavigate()}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '15px 0',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{
          fontSize: 12.5, fontWeight: 700,
          letterSpacing: '0.13em', color: '#111',
        }}>
          {link}
        </span>
        {hasSubs && (
          <ChevronDown
            size={17}
            strokeWidth={1.8}
            style={{
              color: '#9ca3af', flexShrink: 0,
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 360ms cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        )}
      </button>

      {/* Level-1 accordion (category list) */}
      {hasSubs && (
        <SlideAccordion isOpen={isExpanded}>
          <CategoryList
            cats={cats}
            linkKey={link}
            onNavigate={onNavigate}
          />
        </SlideAccordion>
      )}
    </li>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   CategoryList — list of categories under a nav item
──────────────────────────────────────────────────────────────────────────*/
const CategoryList = ({ cats, linkKey, onNavigate }) => {
  const [expandedCat, setExpandedCat] = useState(null);

  const toggleCat = useCallback((key) => {
    setExpandedCat(prev => prev === key ? null : key);
  }, []);

  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: '0 0 12px 0' }}>
      {cats.map((cat, idx) => {
        const isObj = typeof cat === 'object';
        const catName = isObj ? cat.name : cat;
        const subCats = isObj && cat.subCategories ? cat.subCategories : [];
        const catKey = `${linkKey}-${catName}`;
        const isCatOpen = expandedCat === catKey;

        return (
          <li key={idx} style={{ borderLeft: '2px solid #f0f0f0', marginLeft: 4 }}>
            {subCats.length > 0 ? (
              <>
                {/* Category button */}
                <button
                  onClick={() => toggleCat(catKey)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 4px 10px 16px',
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: 12, fontWeight: 600,
                    letterSpacing: '0.07em', color: '#374151',
                  }}>
                    {catName}
                  </span>
                  <ChevronDown
                    size={13}
                    strokeWidth={2}
                    style={{
                      color: isCatOpen ? '#111' : '#bbb', flexShrink: 0,
                      transform: isCatOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 320ms cubic-bezier(0.4,0,0.2,1), color 200ms',
                    }}
                  />
                </button>

                {/* Level-2 accordion (sub-categories) */}
                <SlideAccordion isOpen={isCatOpen} style={{ marginLeft: 16 }}>
                  <SubCatList subCats={subCats} onNavigate={onNavigate} />
                </SlideAccordion>
              </>
            ) : (
              /* Plain category (no sub-items) — clicking navigates */
              <div
                onClick={() => onNavigate()}
                style={{ padding: '10px 0 10px 16px', cursor: 'pointer' }}
              >
                <span style={{
                  fontSize: 12, fontWeight: 500,
                  letterSpacing: '0.07em', color: '#374151',
                }}>
                  {catName}
                </span>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   SubCatList — the innermost list (e.g. FOOTBALLS, HANDBALLS inside BALLS)
──────────────────────────────────────────────────────────────────────────*/
const SubCatList = ({ subCats, onNavigate }) => (
  <ul style={{ listStyle: 'none', margin: 0, padding: '2px 0 8px 0' }}>
    {subCats.map((sub, si) => (
      <li
        key={si}
        onClick={() => onNavigate()}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '7px 0 7px 16px',
          borderLeft: '1px solid #f3f4f6',
          cursor: 'pointer',
        }}
      >
        {sub.image && (
          <div style={{
            width: 30, height: 30, flexShrink: 0,
            borderRadius: 6, overflow: 'hidden', background: '#f9fafb',
          }}>
            <img
              src={sub.image} alt={sub.name} loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        <span style={{
          fontSize: 11.5, fontWeight: 500,
          letterSpacing: '0.06em', color: '#6b7280',
        }}>
          {sub.name}
        </span>
      </li>
    ))}
  </ul>
);

/* ─────────────────────────────────────────────────────────────────────────
   MobileMenu
──────────────────────────────────────────────────────────────────────────*/
const MobileMenu = ({ isOpen, onClose, navLinks, drawerData }) => {
  const [expandedLink, setExpandedLink] = useState(null);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { if (isOpen) setMounted(true); }, [isOpen]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleLink = useCallback((link) => {
    setExpandedLink(prev => prev === link ? null : link);
  }, []);

  const handleNavigate = useCallback(() => {
    onClose();
    navigate('/products/all-balls');
  }, [navigate, onClose]);

  if (!mounted) return null;

  return (
    <>
      {/* ── Backdrop ─────────────────────────────────────────── */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 70,
          background: 'rgba(0,0,0,0.52)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 350ms ease',
        }}
      />

      {/* ── Bottom sheet ─────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          zIndex: 75,
          height: '92dvh',
          background: '#ffffff',
          borderTopLeftRadius: 22, borderTopRightRadius: 22,
          boxShadow: '0 -14px 60px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column',
          /* iOS-feel spring spring curve */
          transform: isOpen ? 'translateY(0%)' : 'translateY(100%)',
          transition: 'transform 490ms cubic-bezier(0.32, 0.72, 0, 1)',
          willChange: 'transform',
          overscrollBehavior: 'contain',
        }}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 38, height: 4, borderRadius: 99, background: '#e5e7eb' }} />
        </div>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 20px 12px',
          borderBottom: '1px solid #f3f4f6',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
            <div style={{ position: 'relative', width: 30, height: 30 }}>
              <img
                src="/logo_silverstar1.png"
                alt="Silver Star Group"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: '-0.04em', marginTop: 2 }}>
              SILVER STAR
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: '#f3f4f6', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 180ms',
              flexShrink: 0,
            }}
          >
            <X size={18} strokeWidth={1.6} />
          </button>
        </div>

        {/* Scrollable list */}
        <div
          style={{
            overflowY: 'auto', flex: 1,
            padding: '4px 20px 80px',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {navLinks.map((link, idx) => (
              <NavItem
                key={link}
                link={link}
                data={drawerData[link]}
                isExpanded={expandedLink === link}
                onToggle={toggleLink}
                linkIdx={idx}
                isMenuOpen={isOpen}
                onNavigate={handleNavigate}
              />
            ))}
          </ul>

          {/* Language picker */}
          <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', background: '#2563eb',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Globe size={11} color="#fff" />
              </div>
              <span style={{
                fontSize: 11.5, fontWeight: 500,
                letterSpacing: '0.07em', color: '#4b5563',
                display: 'flex', alignItems: 'center', gap: 3,
              }}>
                International <ChevronDown size={11} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
