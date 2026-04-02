import { useState, useRef } from "react";

const blogs = [
  {
    id: 1,
    tag: "Anniversary",
    title: "SELECT Sport celebrates 75 years!",
    excerpt:
      "On May 4, it will be 75 years since SELECT was founded in 1947 by the Danish national football team goalkeeper Eigil Nielsen.",
    date: "May 4, 2022",
    image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=600&q=80",
  },
  {
    id: 2,
    tag: "Innovation",
    title: "The first football with an integrated tracking sensor",
    excerpt:
      "Danish SELECT and German KINEXON have jointly developed the intelligent football SELECT Brillant Super iBall.",
    date: "Apr 20, 2022",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80",
  },
  {
    id: 3,
    tag: "Partnership",
    title: "The world's longest football partnership turns 70 years!",
    excerpt:
      "The ball from SELECT has a very special place in Danish football history, and it is therefore also a legendary partnership for the national team football.",
    date: "Oct 12, 2021",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80",
  },
];

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50 flex-shrink-0">
      <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BlogCard({ blog }) {
  return (
    <article className="group border-b border-gray-100 overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors duration-200 bg-white h-full">
      <div className="w-full h-[200px] bg-gray-100 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>
      <div className="p-4 md:p-5">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
          {blog.tag}
        </span>
        <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3">
          {blog.title}
        </h3>
        <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
          {blog.excerpt}
        </p>
        <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
          <CalendarIcon />
          <span>{blog.date}</span>
        </div>
      </div>
    </article>
  );
}

export default function BlogSection() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);

  const prev = () => setCurrent((c) => (c === 0 ? blogs.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === blogs.length - 1 ? 0 : c + 1));

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) next();
    else if (diff < -40) prev();
    touchStartX.current = null;
  };

  return (
    <section className="w-full bg-white py-[5%] px-[2%] md:px-[3%]">
      <div className="w-full">

       

        {/* MOBILE: 1-card swipeable slider */}
        <div className="block md:hidden">
          <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {blogs.map((blog) => (
                <div key={blog.id} className="w-full flex-shrink-0">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          </div>

          {/* Arrows + dots */}
          <div className="flex items-center justify-center gap-4 mt-5">
            <button
              onClick={prev}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-800 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex gap-2">
              {blogs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-200 ${i === current ? "w-4 h-2 bg-gray-900" : "w-2 h-2 bg-gray-300"}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-800 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* DESKTOP: 3-col grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-[2.5%]">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

      </div>
    </section>
  );
}