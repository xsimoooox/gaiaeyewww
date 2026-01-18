import { useState } from "react";
import { cn } from "@/lib/utils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PLATFORMS = [
    {
        id: "agriculture",
        title: "agikal",
        subtitle: "Valoriser l'agriculture de précision",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200",
    },
    {
        id: "urbanism",
        title: "orbano",
        subtitle: "Valoriser l'urbanisme durable",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1200",
    },
    {
        id: "conservation",
        title: "vanox",
        subtitle: "data of earth ",
        image: "https://pro.arcgis.com/en/pro-app/latest/help/analysis/raster-functions/GUID-5F58FFB9-45B6-40A0-A6A1-B7365039EAA1-web.gif",
    },
];

export const OurPlatform = () => {
    const [activePlatform, setActivePlatform] = useState(1);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    const handleNext = () => {
        setActivePlatform((prev) => (prev + 1) % PLATFORMS.length);
    };

    const handlePrev = () => {
        setActivePlatform((prev) => (prev - 1 + PLATFORMS.length) % PLATFORMS.length);
    };

    // Touch handlers for mobile swipe
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
        <section id="platform" className="w-screen bg-white py-16 md:py-24 text-black overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="font-general text-3xl md:text-6xl font-black mb-10 md:mb-16">
                    Nos plateformes
                </h2>

                {/* Carousel Container */}
                <div
                    className="relative flex items-center justify-center"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Nav Buttons (Mobile & Desktop) */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-2 z-20 p-3 bg-white/50 backdrop-blur-md rounded-full text-black hover:bg-white/80 transition-all shadow-md active:scale-90"
                        aria-label="Previous"
                    >
                        <FaChevronLeft size={20} className="md:size-6" />
                    </button>

                    <div className="flex items-center gap-4 md:gap-16 transition-all duration-700 ease-in-out">
                        {PLATFORMS.map((platform, index) => {
                            const isActive = activePlatform === index;
                            const isPrev = (activePlatform - 1 + PLATFORMS.length) % PLATFORMS.length === index;
                            const isNext = (activePlatform + 1) % PLATFORMS.length === index;

                            // Hide items that are not active, prev, or next
                            if (!isActive && !isPrev && !isNext) return null;

                            return (
                                <div
                                    key={platform.id}
                                    onClick={() => !isActive && (isPrev ? handlePrev() : handleNext())}
                                    className={cn(
                                        "flex flex-col transition-all duration-700 ease-in-out shrink-0 cursor-pointer",
                                        isActive
                                            ? "w-[85vw] md:w-[60vw]"
                                            : "w-[5vw] md:w-[15vw] opacity-20 blur-[1px] md:opacity-40 md:blur-[2px]"
                                    )}
                                >
                                    {/* Image Card */}
                                    <div className={cn(
                                        "relative w-full aspect-[16/9] rounded-2xl md:rounded-[2rem] overflow-hidden transition-all duration-700",
                                        isActive ? "shadow-2xl scale-100" : "scale-90"
                                    )}>
                                        <img
                                            src={platform.image}
                                            alt={platform.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Info Section */}
                                    <div className={cn(
                                        "mt-6 flex flex-wrap items-end justify-between px-2 transition-opacity duration-500",
                                        isActive ? "opacity-100" : "opacity-0"
                                    )}>
                                        <div className="flex flex-col text-left max-w-[65%]">
                                            <h3 className="text-lg md:text-3xl font-bold text-black leading-tight">
                                                {platform.title}
                                            </h3>
                                            <p className="text-gray-500 text-xs md:text-lg mt-1">
                                                {platform.subtitle}
                                            </p>
                                        </div>

                                        <a
                                            href="#"
                                            className="group flex flex-col items-end pr-2 shrink-0"
                                        >
                                            <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter mb-1">
                                                DÉCOUVRIR
                                            </span>
                                            <div className="flex items-center gap-1 border-b-2 border-blue-600 pb-0.5 md:pb-1 group-hover:gap-3 transition-all">
                                                <FaChevronRight size={12} className="text-blue-600 md:size-4" />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={handleNext}
                        className="absolute right-2 z-20 p-3 bg-white/50 backdrop-blur-md rounded-full text-black hover:bg-white/80 transition-all shadow-md active:scale-90"
                        aria-label="Next"
                    >
                        <FaChevronRight size={20} className="md:size-6" />
                    </button>
                </div>


                {/* Mobile Indicators */}
                <div className="flex justify-center gap-2 mt-8 md:hidden">
                    {PLATFORMS.map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                "size-1.5 rounded-full transition-all",
                                activePlatform === index ? "w-4 bg-blue-600" : "bg-gray-300"
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
