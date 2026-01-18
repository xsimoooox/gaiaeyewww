import { useEffect, useRef } from "react";
import gsap from "gsap";

const SPONSORS = [
    {
        src: "https://graphiste.com/blog/wp-content/uploads/sites/4/2024/02/LOGO-EXEMPLE-10c-740x555.gif",
        name: "UEMF",
    },
    {
        src: "https://wallpapercave.com/wp/wp10587911.png",
        name: "OrbitAI",
    },
    {
        src: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2001/05/esa_logo/9173490-7-eng-GB/ESA_Logo_pillars.jpg",
        name: "TerraScan",
    },
    {
        src: "https://cdn-04.9rayti.com/rsrc/cache/widen_224/uploads/2022/09/logo-EIDIA_page-0001-1.jpeg",
        name: "CosmosData",
    },
    {
        src: "https://i0.wp.com/campus.leconomiste.com/wp-content/uploads/2023/07/LOGO-UEMF.jpg?fit=1065,458&ssl=1",
        name: "SpectralView",
    },
    {
        src: "https://www.airlineapps.com/news/images/ZG_Logo.png",
        name: "GeoSense",
    },
    {
        src: "https://img.freepik.com/vecteurs-premium/logo-gratuit-conseil-aux-entreprises-vectoriel-orange-noir_883906-2718.jpg?semt=ais_hybrid&w=740&q=80",
        name: "PlanetaryMind",
    },
    {
        src: "https://img.freepik.com/vecteurs-premium/logo-partenaire-entreprise-communaute-personnes-logo-diversite-marque-vecteur-equipe-travail-soin-idee-concept_214369-1438.jpg?semt=ais_hybrid&w=740&q=80",
        name: "AstroLens",
    },
    {
        src: "https://images.seeklogo.com/logo-png/20/1/2m-tv-logo-png_seeklogo-202016.png",
        name: "EcoWatch",
    },
    {
        src: "https://dynamic.brandcrowd.com/asset/logo/e8483a98-2141-43f4-a663-d2f5afcd3f3a/logo-search-grid-2x?logoTemplateVersion=1&v=639010904028300000&layout=auto-1-1",
        name: "SkyGrid",
    },
];

export const Sponsors = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        // Duplicate content for seamless loop
        const content = scrollContainer.innerHTML;
        scrollContainer.innerHTML = content + content;

        const scrollWidth = scrollContainer.scrollWidth / 2;

        const animation = gsap.to(scrollContainer, {
            x: -scrollWidth,
            duration: 30,
            ease: "none",
            repeat: -1,
            paused: false,
        });

        const handleMouseEnter = () => animation.pause();
        const handleMouseLeave = () => animation.play();

        scrollContainer.addEventListener("mouseenter", handleMouseEnter);
        scrollContainer.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            animation.kill();
            scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
            scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <section className="w-screen bg-white py-12 overflow-hidden border-y border-white/10">
            <div
                ref={scrollRef}
                className="flex w-max items-center gap-12 px-10 cursor-grab active:cursor-grabbing"
                style={{ willChange: "transform" }}
            >
                {SPONSORS.map((sponsor, index) => (
                    <div
                        key={index}
                        className="flex flex-shrink-0 items-center justify-center transition-all duration-500 hover:scale-110"
                    >
                        <img
                            src={sponsor.src}
                            alt={sponsor.name}
                            className="h-28 w-auto md:h-30 object-contain transition-all duration-500"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

