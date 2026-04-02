import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CategoryScrollbar from '../components/products/CategoryScrollbar';
import FilterSidebar from '../components/products/FilterSidebar';
import ProductCard from '../components/products/ProductCard';
import { allProducts, categories } from '../data/productsData';

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest', value: 'newest' },
];

const ITEMS_PER_PAGE = 8;

/* ── Pagination Component ─────────────────────────────────────────── */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10 mb-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold border border-gray-200 hover:border-black hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-gray-200 transition-all duration-200"
      >
        <ChevronLeft size={14} />
        Prev
      </button>

      {getPages().map((page, idx) =>
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-3 py-2 text-sm text-gray-400">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 text-sm font-bold border transition-all duration-200 ${
              currentPage === page
                ? 'bg-black text-white border-black'
                : 'border-gray-200 text-gray-700 hover:border-black hover:bg-black hover:text-white'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold border border-gray-200 hover:border-black hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-gray-200 transition-all duration-200"
      >
        Next
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

/* ── Main Page ────────────────────────────────────────────────────── */
const SubCategoriesPage = () => {
  const { category: urlCategory } = useParams();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState(urlCategory || 'footballs');
  const [filters, setFilters] = useState({ colour: [], size: [], version: [], gender: [] });
  const [sortBy, setSortBy] = useState('featured');
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (urlCategory && urlCategory !== activeCategory) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, filters, sortBy]);

  const activeCatInfo = categories.find((c) => c.slug === activeCategory);

  const filteredProducts = useMemo(() => {
    let products = allProducts.filter((p) => p.category === activeCategory);

    if (filters.colour.length > 0) {
      products = products.filter((p) =>
        p.colours?.some((c) => filters.colour.map((f) => f.toLowerCase()).includes(c.toLowerCase()))
      );
    }
    if (filters.size.length > 0) {
      products = products.filter((p) => filters.size.includes(p.size));
    }
    if (filters.version.length > 0) {
      products = products.filter((p) => filters.version.includes(p.version));
    }
    if (filters.gender.length > 0) {
      products = products.filter((p) => filters.gender.includes(p.gender));
    }

    switch (sortBy) {
      case 'price_asc':
        return [...products].sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price_desc':
        return [...products].sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'newest':
        return [...products].sort((a, b) => b.id - a.id);
      default:
        return products;
    }
  }, [activeCategory, filters, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFilterChange = (key, values) => {
    setFilters((prev) => ({ ...prev, [key]: values }));
  };

  const handleClearAllFilters = () => {
    setFilters({ colour: [], size: [], version: [], gender: [] });
  };

  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label || 'Featured';
  const rangeStart = filteredProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const rangeEnd = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner — 100% Fluid Layout */}
      <section className="relative w-full overflow-hidden bg-[#2D2D2D] min-h-[400px] md:min-h-[500px] flex items-center">
        <div className="absolute inset-0 hex-bg opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10"></div>

        <div className="relative z-20 w-full px-[2%] md:px-[3%] flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1"
          >
            {/* Real Breadcrumb Path */}
            <div className="flex items-center gap-2 text-emerald-500 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-8 font-black">
              <Link to="/" className="hover:text-white transition-colors">HOME</Link>
              <span className="text-gray-600">»</span>
              <span className="text-white">{activeCatInfo?.name || 'PRODUCTS'}</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-8">
              {activeCatInfo ? (
                <>
                  {activeCatInfo.name.split(' ')[0]} <br /> 
                  <span className="text-outline">{activeCatInfo.name.split(' ').slice(1).join(' ') || 'COLLECTION'}</span>
                </>
              ) : (
                <>ALL <br /> <span className="text-outline">BALLS</span></>
              )}
            </h1>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg mb-8 font-medium">
              At Silver Star Group, we create world-class balls characterized by high quality, 
              durability and beautiful design. Since 1947, we have been the supplier of 
              the official match ball to the world's best leagues.
            </p>

            <div className="flex items-center gap-3 text-white/50 text-[10px] font-black tracking-[0.2em] uppercase bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>{filteredProducts.length} Premium Results Available</span>
            </div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -20, x: 100 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
              className="relative hidden lg:block flex-shrink-0"
          >
              <div className="absolute inset-0 bg-emerald-500/10 blur-[120px] rounded-full"></div>
              <img 
                src="/football/Select_Brillant_Super_iBall_fodbold_2022_061cbe02-ff5c-4b13-b07d-6a81a0bb2298.webp" 
                alt="Featured Ball"
                className="w-[300px] md:w-[450px] relative z-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transition-transform duration-1000 hover:scale-105"
              />
          </motion.div>
        </div>
      </section>

      <CategoryScrollbar
        activeCategory={activeCategory}
        onCategoryChange={(slug) => {
          setActiveCategory(slug);
          navigate(`/collections/${slug}`);
          setFilters({ colour: [], size: [], version: [], gender: [] });
        }}
      />

      <div className="w-full px-[2%] md:px-[3%] py-16" id="product-grid">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 border-b border-gray-100 pb-10 gap-6">
          <div className="flex items-center gap-6 w-full md:w-auto">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-3 border border-black px-10 py-5 text-[11px] font-black uppercase tracking-widest bg-black text-white hover:bg-gray-800 transition-all shadow-2xl"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
            <div className="hidden md:block">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">
                {filteredProducts.length > 0 ? (
                  <>
                    Showing <span className="text-black">{rangeStart}–{rangeEnd}</span> of <span className="text-black">{filteredProducts.length}</span> {activeCatInfo?.name}
                  </>
                ) : (
                  <span className="text-black">0 Products Found</span>
                )}
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-auto">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="w-full md:w-auto flex items-center justify-between md:justify-start gap-6 text-[11px] font-black uppercase tracking-widest border border-gray-200 px-10 py-5 hover:border-black transition-all bg-white shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-bold">Sort:</span>
                <span>{activeSortLabel}</span>
              </div>
              <ChevronDown size={16} className={`transition-transform duration-300 ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-2xl z-50 w-full md:w-72 overflow-hidden"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                        className={`block w-full text-left px-6 py-5 text-[10px] font-black tracking-[0.25em] uppercase transition-colors ${
                          sortBy === opt.value ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Results Badge */}
        <div className="md:hidden flex justify-center mb-12">
           <div className="inline-flex items-center gap-3 px-8 py-3 bg-gray-50 border border-gray-100 rounded-full shadow-md">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">
                {filteredProducts.length > 0 ? (
                  <>
                    <span className="text-black">{rangeStart}–{rangeEnd}</span> of <span className="text-black">{filteredProducts.length}</span> {activeCatInfo?.name}
                  </>
                ) : (
                  <span className="text-black">0 Results Found</span>
                )}
              </p>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-[5vw]">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAllFilters}
            isMobileOpen={mobileFilterOpen}
            onMobileClose={() => setMobileFilterOpen(false)}
          />

          <div className="flex-1 min-w-0" ref={gridRef}>
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-40 text-center"
              >
                <div className="text-8xl mb-8">⚽</div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-6">No results for your search</h3>
                <p className="text-gray-500 text-base mb-10 max-w-sm">Try removing some filters to see more of our world-class products.</p>
                <button
                  onClick={handleClearAllFilters}
                  className="px-12 py-5 bg-black text-white text-[11px] font-black tracking-[0.3em] uppercase hover:bg-gray-800 transition-all shadow-2xl"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory}-${currentPage}-${sortBy}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-8 xl:gap-10"
                  >
                    {paginatedProducts.map((product, idx) => (
                      <ProductCard key={product.id} product={product} index={idx} />
                    ))}
                  </motion.div>
                </AnimatePresence>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* ── Back to Top Button ────────────────────────────────────────── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:bg-gray-800 transition-colors group"
          >
            <ChevronDown size={28} className="rotate-180 group-hover:-translate-y-2 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubCategoriesPage;
