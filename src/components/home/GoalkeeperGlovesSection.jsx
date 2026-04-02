export default function GoalkeeperGlovesSection() {
  return (
    <section className="w-full flex flex-col md:flex-row min-h-[600px] mx-auto px-[2%] md:px-[3%] my-12 gap-4">
      {/* Left - Text Card */}
      <div
        className="flex-1 flex flex-col items-start justify-center text-left px-10 py-16 rounded-lg"
        style={{ backgroundColor: "#6d7f9e" }}
      >
        <h2
          className="text-white font-bold text-4xl md:text-5xl uppercase leading-tight mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          2024 Goalkeeper
          <br />
          Gloves
        </h2>

        <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8">
          We proudly present our 2024 glove collection, crafted to meet every
          goalkeeper's needs! Regardless of weather conditions, age, or skill
          level, we have the perfect glove for you. Our gloves combine
          exceptional grip with long-lasting durability and come in a variety
          of colors and designs, allowing you to express your personal style
          on the field.
        </p>

        <button
          className="px-8 py-4 text-white font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-white hover:text-[#6d7f9e]"
          style={{
            backgroundColor: "#556070",
            border: "2px solid rgba(255,255,255,0.3)",
          }}
        >
          See all gloves
        </button>
      </div>

      {/* Right - Video */}
      <div className="flex-1 min-h-[400px] md:min-h-0 relative overflow-hidden rounded-lg">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls
        >
          <source src="https://www.select-sport.com/cdn/shop/videos/c/vp/05b072ff0f6547d0ac4a35024391ff3f/05b072ff0f6547d0ac4a35024391ff3f.HD-1080p-7.2Mbps-22875215.mp4?v=0" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}