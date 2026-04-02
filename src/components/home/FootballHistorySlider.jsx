import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    year: "1947",
    title: "THE BEGINNING",
    subtitle: "SELECT IS BORN",
    description:
      "In 1947, Eigil Nielsen founded SELECT Sport. As a former professional goalkeeper for the Danish national team, Eigil had strong opinions on ball quality and set out to create the best ball in the world.",
    image: "/football/select_fodbold_1947.avif",
    accent: "#c8a96e",
  },
  {
    year: "1951",
    title: "EXPANDING HORIZONS",
    subtitle: "FIRST EXPORT",
    description:
      "SELECT began exporting balls internationally in 1951, marking the beginning of its global presence in the world of sport. Quality craftsmanship crossed borders for the first time.",
    image: "/football/Select_fodbold_1951_9c89cd36-273c-4fbf-83af-98a97ae4f3af.webp",
    accent: "#7eb8a4",
  },
  {
    year: "1962",
    title: "FIRST FOOTBALL WITH 32 PANELS",
    subtitle: "A REVOLUTION IN DESIGN",
    description:
      "In 1962, SELECT introduced one of the greatest inventions in football history — the 32-panel ball. With 32 panels (20 hexagons and 12 pentagons), SELECT managed to create the roundest ball ever. The 32-panel design means that the ball meets wind resistance later in its flight through the air, thus maintaining a stable high speed for a longer period of time. This provides a stable and more predictable flight.",
    image: "/football/Select_fodbold_1962_cd927d76-7d9c-490d-82cd-8531602753e5.webp",
    accent: "#d4a843",
  },
  {
    year: "1972",
    title: "FIRST HANDBALL WITH 32 PANELS",
    subtitle: "SHAPING THE GAME",
    description:
      "In 1972, SELECT entered the world of handball in earnest when the first 32-panel ball was launched. This innovation changed the sport forever and set a new standard for handball manufacturing worldwide.",
    image: "/football/Select_harndbold_1972.webp",
    accent: "#a8b8c8",
  },
  {
    year: "1974",
    title: "WORLD CUP OFFICIAL",
    subtitle: "GLOBAL RECOGNITION",
    description:
      "SELECT balls were used in major international tournaments in 1974, cementing the brand's reputation as the gold standard in ball manufacturing at the highest levels of competition.",
    image: "/football/Select_fodbold_1951_9c89cd36-273c-4fbf-83af-98a97ae4f3af.webp",
    accent: "#c87a5a",
  },
  {
    year: "2012",
    title: "TECHNOLOGICAL INNOVATION",
    subtitle: "NEW ERA BEGINS",
    description:
      "SELECT introduced cutting-edge materials and manufacturing techniques in 2012, combining decades of craft knowledge with modern technology to produce balls of unparalleled quality and performance.",
    image: "/football/Select_Brillant_Super_iBall_fodbold_2022_061cbe02-ff5c-4b13-b07d-6a81a0bb2298.webp",
    accent: "#8a7eb8",
  },
  {
    year: "2018",
    title: "SUSTAINABILITY FOCUS",
    subtitle: "PLAYING FOR THE PLANET",
    description:
      "In 2018, SELECT committed to sustainable production practices. The company began integrating eco-friendly materials into its manufacturing process without compromising on the legendary SELECT quality.",
    image: "/football/Futsal_-_Talento__colour_white_blue.jpg",
    accent: "#6aaa7c",
  },
  {
    year: "2021",
    title: "DIGITAL TRANSFORMATION",
    subtitle: "SMART SPORT",
    description:
      "SELECT embraced digital innovation in 2021, launching connected ball technologies and expanding its digital presence to bring the brand closer to athletes and fans around the world.",
    image: "/football/Gymball_-_2kg___colour_black.jpg",
    accent: "#5a9ec8",
  },
  {
    year: "2022",
    title: "75 YEARS OF EXCELLENCE",
    subtitle: "A LEGACY CELEBRATED",
    description:
      "SELECT celebrated 75 years of ball-making excellence in 2022. From a small Danish workshop to a global leader, the journey has been defined by innovation, quality, and an unrelenting passion for the beautiful game.",
    image: "/football/Brillant_Super_UZ_Allsvenskan__colour_white_red (1).jpg",
    accent: "#d4a843",
  },
];

export default function HistorySlider() {
  const [current, setCurrent] = useState(2); // start at 1962
  const [animating, setAnimating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [direction, setDirection] = useState("right");
  const timelineRef = useRef(null);

  const goTo = (index, dir) => {
    if (animating || index === current) return;
    setDirection(dir !== undefined ? dir : index > current ? "right" : "left");
    setAnimating(true);
    setIsExpanded(false);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 250);
  };

  const prev = () => goTo(current > 0 ? current - 1 : slides.length - 1, "left");
  const next = () => goTo(current < slides.length - 1 ? current + 1 : 0, "right");

  const slide = slides[current];

  // Scroll timeline into view
  useEffect(() => {
    if (timelineRef.current) {
      const activeEl = timelineRef.current.querySelector(".timeline-active");
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [current]);

  return (
    <div className="relative w-full min-h-screen font-sans overflow-hidden bg-gray-150">
      {/* Background year watermark */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none overflow-hidden z-0">
        <span
          className={`font-black tracking-tighter leading-none transition-all duration-300 text-8xl md:text-9xl lg:text-[22rem] opacity-${animating ? '0' : '100'}`}
          style={{ color: "rgba(0,0,0,0.055)", lineHeight: 1, paddingBottom: "8vh" }}
        >
          {slide.year}
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 items-center px-[2%] md:px-[3%] py-16 lg:py-24 gap-8 lg:gap-16">
        {/* Left: Image */}
        <div className={`flex items-center justify-center transition-all duration-300 ${animating ? 'opacity-0' : 'opacity-100'} ${animating ? (direction === 'right' ? '-translate-x-10' : 'translate-x-10') : 'translate-x-0'}`}>
          <img
            src={slide.image}
            alt={slide.title}
            className="w-64 md:w-80 lg:w-[560px] h-64 md:h-80 lg:h-[560px] object-cover   "
          />
        </div>

        {/* Right: Text - Positioned higher */}
        <div className={`transition-all duration-300 flex items-start justify-center ${animating ? 'opacity-0' : 'opacity-100'} ${animating ? (direction === 'right' ? 'translate-x-10' : '-translate-x-10') : 'translate-x-0'}`}>
          <div className="mt-[-2rem] max-w-[600px]">
            <p
              className="uppercase tracking-widest font-normal mb-3 text-xs md:text-sm"
              style={{ color: slide.accent, letterSpacing: "0.2em", fontFamily: "'Arial', sans-serif" }}
            >
              {slide.subtitle}
            </p>
            <h1 className="font-normal uppercase leading-tight mb-6 text-2xl md:text-3xl lg:text-5xl text-gray-900" style={{ lineHeight: 1.1, fontFamily: "'Arial', sans-serif" }}>
              {slide.title}
            </h1>
            
            <div className="relative">
              <p className={`text-sm md:text-base text-gray-600 leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
                {slide.description}
              </p>
              {slide.description.length > 150 && (
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-3 text-xs font-bold uppercase tracking-widest border-b-2 border-current transition-all hover:opacity-70"
                  style={{ color: slide.accent }}
                >
                  {isExpanded ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline bar */}
      <div className="relative z-20 w-full pb-8 md:pb-10">
        <div className="relative px-[2%] md:px-[3%]">
          {/* Line */}
          <div className="absolute top-5 left-[2%] md:left-[3%] right-[2%] md:right-[3%] h-px bg-gray-300"></div>

          {/* Dots + labels */}
          <div
            ref={timelineRef}
            className="flex justify-between items-start overflow-x-auto scrollbar-hide pb-1 gap-2 md:gap-4"
          >
            {slides.map((s, i) => (
              <button
                key={s.year}
                onClick={() => goTo(i)}
                className={`timeline-${i === current ? "active" : "dot"} flex flex-col items-center flex-shrink-0 min-w-[60px] md:min-w-[70px] outline-none`}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300 mb-1.5 ${i === current
                      ? 'w-5 h-5 bg-gray-900 border-3 border-gray-900 scale-110 shadow-lg'
                      : 'w-2.5 h-2.5 bg-gray-400 border-2 border-gray-400'
                    }`}
                />
                <span
                  className={`text-xs md:text-sm transition-all duration-300 ${i === current ? 'text-gray-900 font-bold' : 'text-gray-500 font-normal'
                    }`}
                >
                  {s.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute right-[50%] md:right-[3%] bottom-2 md:bottom-20 lg:bottom-30 w-9 h-9 md:w-12 md:h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center cursor-pointer z-30 shadow-lg transition-all duration-200 hover:bg-gray-900 hover:text-white mr-12 md:mr-16"
      >
        <FiChevronLeft size={18} />
      </button>

      <button
        onClick={next}
        className="absolute right-[40%] md:right-[3%] bottom-2 md:bottom-20 lg:bottom-30 w-9 h-9 md:w-12 md:h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center cursor-pointer z-30 shadow-lg transition-all duration-200 hover:bg-gray-900 hover:text-white"
      >
        <FiChevronRight size={18} />
      </button>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}