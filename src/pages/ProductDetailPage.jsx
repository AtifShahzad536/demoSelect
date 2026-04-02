import React, { useMemo, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Share2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/products/ProductCard';
import { allProducts, colourDots } from '../data/productsData';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [activeSize, setActiveSize] = useState('5');
  const [activeColour, setActiveColour] = useState('');
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  
  // Find the product
  const product = useMemo(() => 
    allProducts.find(p => p.id === parseInt(id)), 
  [id]);

  // Find related products
  const relatedProducts = useMemo(() => 
    product ? allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4) : [],
  [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product?.colours?.length > 0) {
      setActiveColour(product.colours[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-4xl font-black uppercase mb-4">Product Not Found</h2>
          <Link to="/products/all-balls" className="text-black underline font-bold">Return to Shop</Link>
        </div>
      </div>
    );
  }

  // Mock multiple images for the thumbnail gallery
  const images = [product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans selection:bg-black selection:text-white">
      <Navbar />

      <main className="w-full px-[2%] md:px-[3%] pb-20 pt-10">
        
        {/* Main Product Container - White Card */}
        <div className="bg-white rounded-[2rem] w-full mx-auto p-4 md:p-12 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* ── Left: Image Gallery ── */}
            <div className="w-full lg:w-[55%] flex gap-6">
              {/* Thumbnails (Vertical) */}
              <div className="hidden md:flex flex-col gap-4">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-black' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover bg-gray-50" alt={`Thumbnail ${idx+1}`} />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 relative h-[350px] md:h-[500px] lg:h-[600px] bg-white flex items-center justify-center rounded-2xl overflow-hidden">
                 <motion.img 
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={images[activeImage]} 
                    alt={product.name}
                    className="w-full h-full object-contain p-8"
                 />
                 {product.badge && (
                   <div className="absolute top-8 left-8 w-16 h-16 pointer-events-none">
                     {/* Dummy badge, user screen showed a star logo, replacing with text if specific image isn't available */}
                     <div className="w-full h-full border border-[#c8a96e] flex flex-col items-center justify-center text-[#c8a96e] rotate-12">
                       <span className="text-[8px] font-bold text-center leading-tight">EHF<br/>CHAMPIONS<br/>LEAGUE</span>
                     </div>
                   </div>
                 )}
              </div>
            </div>

            {/* ── Right: Product Info ── */}
            <div className="w-full lg:w-[45%] flex flex-col lg:max-w-xl self-start pt-4">
              
              <h1 className="text-4xl md:text-5xl font-normal tracking-tight uppercase leading-[1.1] mb-4 text-black" style={{ fontFamily: "Arial, sans-serif" }}>
                {product.name}
              </h1>
              
              <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest space-y-1 mb-8 font-medium">
                <p>STYLE NO.: {product.id + 200000}</p>
                <p>VERSION: {product.version || '2024'}</p>
              </div>

              {/* Colour Selection */}
              <div className="mb-8">
                 <p className="text-sm font-medium mb-3">
                   Colour: <span className="font-bold capitalize">{activeColour || product.colours?.[0] || 'White/Multicolor'}</span>
                 </p>
                 <div className="flex gap-4">
                    {product.colours?.map((clr, idx) => (
                      <button 
                         key={idx} 
                         onClick={() => setActiveColour(clr)}
                         className={`w-16 h-16 rounded-lg border p-1 transition-all flex items-center justify-center relative overflow-hidden ${
                           activeColour === clr ? 'border-black shadow-sm' : 'border-gray-200 hover:border-gray-300'
                         }`}
                      >
                        <img src={product.image} className={`w-full h-full object-cover rounded-md ${activeColour !== clr ? 'opacity-60' : ''}`} alt={`${clr} option`} />
                        {/* Add a tiny color indicator dot since we use the same mock image */}
                        <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-gray-300 shadow-sm" style={{ backgroundColor: clr === 'white' ? '#fff' : clr }}></div>
                      </button>
                    ))}
                 </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                 <div className="flex justify-between items-center mb-3">
                   <p className="text-sm font-medium">Size: <span className="font-bold">{activeSize}</span></p>
                   <button onClick={() => setIsSizeChartOpen(true)} className="text-xs text-gray-500 underline underline-offset-4 hover:text-black transition-colors">Size chart</button>
                 </div>
                 <div className="flex gap-3">
                    {['2', '3', '4', '5'].map(size => (
                      <button 
                        key={size} 
                        onClick={() => setActiveSize(size)}
                        className={`w-14 h-14 flex items-center justify-center text-sm font-medium border rounded-md transition-all ${
                        activeSize === size ? 'border-2 border-black text-black' : 'border-gray-200 text-gray-600 hover:border-gray-400'
                      }`}>
                        {size}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Description */}
              <div className="mb-8 border-b border-gray-100 pb-8">
                <p className="text-sm text-gray-600 leading-relaxed">
                   The official match ball of the {product.category} is crafted from a newly developed, durable synthetic leather material with a recycled backing. The ball offers excellent touch, durability, and a stable flight.
                   <br/><a href="#" className="text-black underline font-medium mt-1 inline-block">Read more</a>
                </p>
              </div>

              {/* Accordions */}
              <div className="space-y-0">
                 {/* Material */}
                 <div className="border-b border-gray-100">
                    <button 
                      onClick={() => setIsMaterialOpen(!isMaterialOpen)}
                      className="w-full flex justify-between items-center py-5 text-sm font-bold tracking-wide"
                    >
                      Material
                      <div className="bg-gray-100 p-1.5 rounded-full">
                        <ChevronDown size={14} className={`transition-transform ${isMaterialOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {isMaterialOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 text-sm text-gray-600 leading-relaxed">Made from premium Japanese PU material with a zero-wing latex bladder for optimal roundness.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>

                 {/* Buy Here */}
                 <div className="border-b border-gray-100">
                    <button 
                      onClick={() => setIsBuyOpen(!isBuyOpen)}
                      className="w-full flex justify-between items-center py-5 text-sm font-bold tracking-wide"
                    >
                      Buy the ball here
                      <div className="bg-gray-100 p-1.5 rounded-full">
                        <ChevronDown size={14} className={`transition-transform ${isBuyOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {isBuyOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5 pt-2 flex gap-4">
                            <button className="bg-black text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors w-full">Find a Retailer</button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
              </div>

              {/* Share */}
              <button className="flex items-center gap-2 text-gray-500 text-sm mt-8 hover:text-black transition-colors w-fit">
                <Share2 size={16} />
                Share
              </button>

            </div>
          </div>
        </div>

        {/* ── Feature Badges ── */}
        <div className="w-full bg-white rounded-[2rem] mt-4 py-16 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 shadow-sm">
           <div className="flex flex-col items-center gap-4 cursor-pointer group">
              <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center p-2 group-hover:bg-gray-50 transition-colors">
                 <img src="/logo_silverstar1.png" className="w-12 opacity-80" alt="Hand stitched" />
              </div>
              <h3 className="text-sm font-normal tracking-wide uppercase">HAND STITCHED BALL</h3>
              <a href="#" className="text-xs text-black underline underline-offset-4">Read more</a>
           </div>

           <div className="flex flex-col items-center gap-4 cursor-pointer group">
              <div className="w-24 h-24 flex items-center justify-center group-hover:scale-105 transition-transform">
                 <span className="text-5xl font-black text-gray-800 italic tracking-tighter">EHF</span>
              </div>
              <h3 className="text-sm font-normal tracking-wide uppercase">EHF APPROVED</h3>
              <a href="#" className="text-xs text-black underline underline-offset-4">Read more</a>
           </div>
        </div>

        {/* ── You May Also Like ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8 px-2">
               <h2 className="text-2xl md:text-3xl font-normal uppercase tracking-tight text-black">YOU MAY ALSO LIKE</h2>
               <div className="flex gap-2">
                 <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all text-gray-600">
                   <ChevronLeft size={18} />
                 </button>
                 <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all text-gray-600">
                   <ChevronRight size={18} />
                 </button>
               </div>
            </div>
            
            {/* Products Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
               {/* Progress bar line under title, passing behind slider */}
               <div className="absolute -top-3 left-0 w-full h-[1px] bg-gray-200">
                 <div className="h-[2px] bg-black w-[20%] absolute top-0 -translate-y-1/2"></div>
               </div>

               {relatedProducts.map((rp, idx) => (
                 <div key={rp.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-50">
                   <ProductCard product={rp} index={idx} />
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* ── Recently Viewed ── */}
        <div className="mt-32">
            <div className="flex items-center justify-between mb-8 px-2">
               <h2 className="text-2xl md:text-3xl font-normal uppercase tracking-tight text-black">RECENTLY VIEWED PRODUCTS</h2>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                 <div className="absolute -top-3 left-0 w-full h-[1px] bg-gray-200"></div>
                 {/* Empty grid for now, or just mirror related products as a placeholder */}
                 {relatedProducts.slice(0, 2).map((rp, idx) => (
                 <div key={rp.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-50">
                   <ProductCard product={rp} index={idx} />
                 </div>
               ))}
             </div>
        </div>

      </main>

      <Footer />

      {/* ── Size Chart Drawer ── */}
      <AnimatePresence>
        {isSizeChartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsSizeChartOpen(false)}
               className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            {/* Drawer Panel */}
            <motion.div
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'tween', duration: 0.3 }}
               className="relative w-full md:w-[500px] lg:w-[600px] bg-white h-full shadow-2xl flex flex-col p-8 md:p-14 z-10 overflow-y-auto"
            >
               <button onClick={() => setIsSizeChartOpen(false)} className="absolute top-8 right-8 p-2 text-black hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} strokeWidth={2.5} />
               </button>

               <h2 className="text-lg md:text-xl font-normal uppercase tracking-wide mb-10 text-black">
                 Size chart for {product?.category}
               </h2>

               <div className="w-full">
                  <table className="w-full text-left border-collapse text-sm">
                     <thead>
                        <tr className="border-t border-b border-gray-200">
                           <th className="py-4 px-2 font-black uppercase tracking-widest text-[10px] md:text-xs">Ball Size</th>
                           <th className="py-4 px-2 font-black uppercase tracking-widest text-[10px] md:text-xs">Circumference</th>
                           <th className="py-4 px-2 font-black uppercase tracking-widest text-[10px] md:text-xs">Weight</th>
                        </tr>
                     </thead>
                     <tbody>
                        {[
                           { size: '00', circ: '41-44 cm', wgt: '200 - 230 g' },
                           { size: '0', circ: '46-48 cm', wgt: '240 - 300 g' },
                           { size: '1', circ: '50-52 cm', wgt: '290 - 330 g' },
                           { size: '2', circ: '54-56 cm', wgt: '325 - 375 g' },
                           { size: '3', circ: '58-60 cm', wgt: '425 - 475 g' },
                        ].map((row, i) => (
                           <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-2 text-black text-xs md:text-sm">{row.size}</td>
                              <td className="py-4 px-2 text-black text-xs md:text-sm">{row.circ}</td>
                              <td className="py-4 px-2 text-black text-xs md:text-sm">{row.wgt}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProductDetailPage;
