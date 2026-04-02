export default function SustainabilitySection() {
  return (
    <section
      className="w-full mx-auto px-6 my-12"
      style={{
        background: 'linear-gradient(90deg, rgba(68, 68, 68, 1), rgba(198, 199, 200, 1) 100%)'
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-20">
        {/* Left Card - Environmental Transition */}
        <div className="relative rounded-lg overflow-hidden group cursor-pointer">
          <img
            src="https://www.select-sport.com/cdn/shop/files/SUSTAINABILITY_63f2ee20-eb83-493b-b6af-f2e2e7971375.jpg?v=1720425234&width=1200"
            alt="Environmental Transition"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h3 className="text-white font-bold text-2xl uppercase tracking-wider">
              ENVIRONMENTAL TRANSITION
            </h3>
          </div>
        </div>

        {/* Right Card - Select Lab */}
        <div className="relative rounded-lg overflow-hidden group cursor-pointer">
          <img
            src="https://www.select-sport.com/cdn/shop/files/SELECT_lab.jpg?v=1742389828&width=1200"
            alt="Silver Lab"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded">
            <h3 className="text-black font-bold text-lg uppercase tracking-wider">
              SILVER LAB
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
