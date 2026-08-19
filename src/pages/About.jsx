import React from "react";
import { useNavigate } from "react-router-dom";
import { Gem, Leaf, Clock, ArrowRight, Quote } from "lucide-react";
import { assets } from "../assets/assets";

const values = [
  {
    icon: Gem,
    title: "Uncompromising Craft",
    text: "Every piece is cut, stitched, and finished by hand under the eye of artisans with decades of experience.",
  },
  {
    icon: Leaf,
    title: "Conscious Sourcing",
    text: "We work only with mills and tanneries that meet our standards for ethical labor and low-impact materials.",
  },
  {
    icon: Clock,
    title: "Built To Outlast Trend",
    text: "We design for a decade of wear, not a season of scrolling. Fewer pieces, made better, worn longer.",
  },
];

const stats = [
  { number: "12", label: "Years in Craft" },
  { number: "40+", label: "Master Artisans" },
  { number: "18", label: "Countries Shipped" },
  { number: "50K+", label: "Pieces Delivered" },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#faf9f6] text-neutral-900 antialiased selection:bg-[#C9A227]/20 selection:text-[#C9A227]">
      <section className="relative h-[70vh] min-h-130 w-full overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 bg-linear-to-br from-neutral-900 via-neutral-900 to-neutral-800" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,#C9A227,transparent_45%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-16">
          <span className="text-[#C9A227] text-xs font-semibold tracking-[0.3em] uppercase mb-5">
            Our Story
          </span>
          <h1 className="text-white font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] max-w-3xl">
            Crafted for those who value substance over noise.
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#C9A227] text-xs font-semibold tracking-[0.3em] uppercase">
            Since 2013
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl mt-4 mb-6 leading-tight">
            A house built on restraint, not excess.
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-5">
            NOVA began as a single tailoring bench in a small studio, driven
            by one belief: that clothing should earn its place in your
            wardrobe, not just fill it. No trend chasing, no disposable
            fashion — only pieces designed to be worn for years.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Today that same philosophy shapes everything we make. Each
            collection starts with the fabric, is refined through dozens of
            fittings, and only reaches you once it meets a standard we would
            wear ourselves.
          </p>
        </div>

        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
          <img
            src={assets.about}
            alt="NOVA tailoring atelier"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-900/80 via-neutral-900/10 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 border-l-2 border-[#C9A227] pl-5">
            <p className="text-white font-serif text-xl leading-snug">
              "Quality is a decision you make before the first stitch."
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[#C9A227] text-xs font-semibold tracking-[0.3em] uppercase">
              What Guides Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl mt-4">
              Three principles, no exceptions.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-neutral-200/60 bg-[#faf9f6] p-8 hover:border-[#C9A227] transition-colors duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-neutral-900 flex items-center justify-center mb-6">
                  <value.icon size={20} className="text-[#C9A227]" />
                </div>
                <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-4xl sm:text-5xl text-neutral-900">
                {stat.number}
              </p>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-400 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_50%,#C9A227,transparent_45%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
          <Quote size={32} className="text-[#C9A227] mx-auto mb-8" />
          <p className="font-serif text-2xl sm:text-3xl text-white leading-relaxed">
            We don't measure success in units sold. We measure it in pieces
            still worn ten years after they were bought.
          </p>
          <p className="text-neutral-400 text-sm font-semibold tracking-[0.2em] uppercase mt-8">
            Founder, NOVA
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl mb-6">
          See the craft for yourself.
        </h2>
        <p className="text-neutral-500 max-w-lg mx-auto mb-10">
          Explore the current collection and find the pieces built to stay in
          your wardrobe long after the season ends.
        </p>
        <button
          onClick={() => navigate("/collection")}
          className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-[#C9A227] transition-colors duration-300"
        >
          Shop The Collection
          <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
};

export default About;
