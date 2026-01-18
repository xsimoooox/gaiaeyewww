import { VIDEO_LINKS } from "@/constants";
import { PropsWithChildren, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

interface BentoTiltProps {
  className?: string;
}

const BentoTilt = ({
  children,
  className = "",
}: PropsWithChildren<BentoTiltProps>) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;

    setTransformStyle(newTransform);
  };
  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  src: string;
  title: React.ReactNode;
  description?: string;
}

const BentoCard = ({ src, title, description }: BentoCardProps) => {
  return (
    <article className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />

      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="tetx-xl mt-3 max-w-64 md:text-base">{description}</p>
          )}
        </div>
      </div>
    </article>
  );
};

export const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the Intelligence Layer
          </p>

          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Immerse yourself in a dynamic Earth-observation ecosystem where satellite data, advanced analytics, and real-time insights converge into a unified layer of understanding over the planet—empowering clearer vision, smarter decisions, and meaningful impact on the real world.
          </p>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src={VIDEO_LINKS.feature1}
            title={
              <>
                or<b>bi</b>tria
              </>
            }
            description="A cross-platform Earth intelligence platform, transforming satellite data, sensors, and analytics into actionable insights across agriculture, climate, and land management."
          />
        </BentoTilt>

        <div
          id="nexus"
          className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7"
        >
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src={VIDEO_LINKS.feature2}
              title={
                <>
                  zig<b>m</b>a
                </>
              }
              description="A visual intelligence layer inspired by Earth dynamics — a growing data-driven map system designed for expansion across industries and regions."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src={VIDEO_LINKS.feature3}
              title={
                <>
                  l<b>m</b>en
                </>
              }
              description="A collaborative planetary hub, connecting institutions, experts, and decision-makers through shared Earth observation and real-time insights."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src={VIDEO_LINKS.feature4}
              title={
                <>
                  az<b>u</b>l
                </>
              }
              description="A cross-domain AI agent, assisting users in interpreting satellite imagery, predicting outcomes, and optimizing decisions with precision and clarity."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-green-400 p-5">
              <h1 className="bento-title special-font max-w-64 text-black-600">
                m<b>o</b>re co<b>m</b>ing so<b>o</b>n!
              </h1>

              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <video
              src={VIDEO_LINKS.feature5}
              loop
              muted
              autoPlay
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};
