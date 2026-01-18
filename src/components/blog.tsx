import { useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const ARTICLES = [
    {
        id: 1,
        title: "The Future of Satellite Intelligence in 2026",
        excerpt: "Discover how next-generation orbital sensors are revolutionizing real-time planetary monitoring and sustainable decision-making.",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800",
        author: "Sarah Drissi",
    },
    {
        id: 2,
        title: "Sustainable Agriculture: A View from Above",
        excerpt: "How GaiaEye is helping farmers optimize water usage and monitor crop health across diverse climatic regions through advanced indices.",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800",
        author: "Karim Bennani",
    },
    {
        id: 3,
        title: "Mapping Urban Growth with AI Precision",
        excerpt: "An exploration of how deep learning models are transforming raw satellite imagery into actionable urban planning insights for smart cities.",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800",
        author: "Lila Mansouri",
    },
];

export const Blog = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % ARTICLES.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + ARTICLES.length) % ARTICLES.length);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStart === null) return;
        const touchEnd = e.changedTouches[0].clientX;
        const distance = touchStart - touchEnd;

        if (distance > 50) handleNext();
        if (distance < -50) handlePrev();
        setTouchStart(null);
    };

    return (
        <section id="blog" className="w-[100vw] bg-black py-12 md:py-24 text-blue-50 overflow-hidden">
            <div className="mx-auto px-4 md:px-6 max-w-7xl">
                <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
                    <p className="font-general text-[10px] md:text-sm uppercase tracking-widest text-blue-100 mb-2 md:mb-4">
                        Latest Insights
                    </p>
                    <h2 className="special-font font-zentry text-4xl md:text-7xl uppercase leading-[0.9]">
                        Our Bl<b>o</b>g
                    </h2>
                </div>

                <div
                    className="relative flex items-center justify-center overflow-visible"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Navigation Buttons (All Devices) */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-2 z-20 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/10 shadow-lg active:scale-90"
                        aria-label="Previous Article"
                    >
                        <FaChevronLeft size={20} className="md:size-8" />
                    </button>

                    <div className="w-full overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translate3d(-${currentIndex * 100}%, 0, 0)`,
                                willChange: 'transform'
                            }}
                        >
                            {ARTICLES.map((article) => (
                                <div
                                    key={article.id}
                                    className="w-full flex-shrink-0 px-2 sm:px-4 md:px-12 flex justify-center"
                                >
                                    <div className="max-w-4xl w-full flex flex-col md:flex-row gap-6 md:gap-10 bg-neutral-900/40 p-5 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-white/5 backdrop-blur-sm shadow-xl">
                                        {/* Image Container */}
                                        <div className="w-full md:w-1/2 overflow-hidden rounded-xl md:rounded-2xl aspect-video md:aspect-square">
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                            />
                                        </div>

                                        {/* Content Container */}
                                        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                                            <p className="text-blue-400 text-[10px] md:text-xs font-black uppercase mb-2 md:mb-4 tracking-tighter">Research & Analysis</p>
                                            <h3 className="font-zentry text-2xl md:text-4xl uppercase mb-4 md:mb-6 leading-tight">
                                                {article.title}
                                            </h3>
                                            <p className="font-circular-web text-blue-100/70 text-sm md:text-lg mb-6 md:mb-8 line-clamp-3 md:line-clamp-none">
                                                {article.excerpt}
                                            </p>

                                            {/* Footer with Author and Button */}
                                            <div className="flex items-center justify-between w-full mt-auto pt-4 md:pt-6 border-t border-white/10">
                                                <span className="text-[10px] md:text-sm font-general uppercase tracking-widest opacity-40">
                                                    By {article.author}
                                                </span>
                                                <Button
                                                    id={`blog-${article.id}`}
                                                    containerClass="bg-blue-100 px-4 py-2 md:px-6 md:py-3 text-[10px] md:text-xs flex-center gap-1 transition-all hover:bg-blue-500 hover:text-black"
                                                >
                                                    Read More
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleNext}
                        className="absolute right-2 z-20 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/10 shadow-lg active:scale-90"
                        aria-label="Next Article"
                    >
                        <FaChevronRight size={20} className="md:size-8" />
                    </button>
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12">
                    {ARTICLES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                "h-1 transition-all duration-300 rounded-full",
                                currentIndex === index ? "w-8 md:w-12 bg-blue-500" : "w-3 md:w-4 bg-white/20 hover:bg-white/40"
                            )}
                            aria-label={`Go to article ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

