"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, ExternalLink } from "lucide-react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";

export interface CarouselImageItem {
  src: string;
  alt: string;
  title?: string;
  issuer?: string;
  year?: string;
  credentialId?: string;
}

interface Carousel003Props {
  images: CarouselImageItem[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean | { delay?: number; disableOnInteraction?: boolean };
  spaceBetween?: number;
  onImageClick?: (item: CarouselImageItem) => void;
}

export const Carousel_003: React.FC<Carousel003Props> = ({
  images,
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = { delay: 3000, disableOnInteraction: false },
  spaceBetween = 0,
  onImageClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className={cn("relative w-full max-w-6xl px-2 sm:px-4 overflow-hidden", className)}
    >
      <div className="relative w-full overflow-hidden py-4">
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? typeof autoplay === "object"
                ? autoplay
                : { delay: 3000, disableOnInteraction: false }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 35,
            stretch: 0,
            depth: 140,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                  dynamicBullets: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".cert-swiper-next",
                  prevEl: ".cert-swiper-prev",
                }
              : false
          }
          className="cert-inverted-carousel !py-8 overflow-hidden"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {images.map((item, index) => (
            <SwiperSlide
              key={index}
              className="!w-[250px] xs:!w-[270px] sm:!w-[340px] md:!w-[420px] max-w-[85vw] group select-none"
            >
              <div
                onClick={() => onImageClick?.(item) || window.open(item.src, "_blank")}
                className="cursor-pointer relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-xl transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/10"
              >
                {/* 16:9 Landscape Aspect Ratio Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    src={item.src}
                    alt={item.alt || item.title || "Certificate"}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-lg backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      View Certificate <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Caption Bar */}
                {(item.title || item.issuer) && (
                  <div className="p-4 bg-white/95 dark:bg-slate-900/95 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="font-sans font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-primary transition-colors">
                      {item.title || item.alt}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span className="truncate">{item.issuer}</span>
                      {item.year && <span className="font-mono ml-2 shrink-0">{item.year}</span>}
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation Controls */}
          {showNavigation && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                aria-label="Previous slide"
                className="cert-swiper-prev w-11 h-11 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-primary hover:border-primary/50 shadow-md backdrop-blur-sm transition-all flex items-center justify-center cursor-pointer active:scale-95"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                className="cert-swiper-next w-11 h-11 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-primary hover:border-primary/50 shadow-md backdrop-blur-sm transition-all flex items-center justify-center cursor-pointer active:scale-95"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </Swiper>
      </div>
    </motion.div>
  );
};

export default Carousel_003;
