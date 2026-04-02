import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { colourDots } from '../../data/productsData';

const badgeColors = {
  NEW: 'bg-emerald-500',
  FEATURED: 'bg-blue-600',
  POPULAR: 'bg-orange-500',
  OFFICIAL: 'bg-purple-600',
  ECO: 'bg-green-600',
};

const ProductCard = ({ product, index }) => {
  return (
    <Link to={`/product/${product.id}`} className="block h-full cursor-pointer">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group bg-white border border-gray-100 hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col h-full"
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-black tracking-widest text-white uppercase ${badgeColors[product.badge] || 'bg-black'
                }`}
            >
              {product.badge}
            </span>
          )}
          {/* Quick Add overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full py-3 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-gray-900 transition-colors">
              View Specifics
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col gap-1.5 flex-1">
          <h3 className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-black transition-colors line-clamp-2 uppercase tracking-wide">
            {product.name}
          </h3>

          {/* Price */}
          <p className="text-sm font-bold text-gray-900">
            ${product.price?.toFixed(2)}
          </p>

          {/* Colour dots */}
          {product.colours && product.colours.length > 0 && (
            <div className="flex items-center gap-1.5 mt-auto pt-1">
              {product.colours.map((c) => (
                <div
                  key={c}
                  title={c}
                  className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
                  style={{ backgroundColor: colourDots[c] || '#ccc' }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
