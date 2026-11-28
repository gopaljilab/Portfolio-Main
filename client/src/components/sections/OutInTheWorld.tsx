import React, { useState, useRef, useEffect } from "react";
import { ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export interface PolaroidItem {
  id: string;
  image: string;
  caption: string;
  dateLocation: string;
  tapeColor: "blue" | "yellow" | "pink" | "green";
  initialRotation: number; // in degrees (-4 to 4)
  aspectRatio: string;
}

const POLAROIDS: PolaroidItem[] = [
  {
    id: "aws-builder-meetup",
    image: "/gallery/aws-builder-meetup.jpg",
    caption: "AWS Builder Community Meetup",
    dateLocation: "Bengaluru · AWS Builder Center",
    tapeColor: "blue",
    initialRotation: -2.6,
    aspectRatio: "aspect-[2/3]",
  },
  {
    id: "uipath-community-meetup",
    image: "/gallery/uipath-community-meetup.jpg",
    caption: "UiPath Community Meetup",
    dateLocation: "Bengaluru · AI & Automation",
    tapeColor: "yellow",
    initialRotation: 2.2,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "hacktoberfest-bengaluru",
    image: "/gallery/hacktoberfest-bengaluru.jpg",
    caption: "Hacktoberfest Bengaluru 2.0",
    dateLocation: "#TechForGood · Open Source Summit",
    tapeColor: "pink",
    initialRotation: -1.8,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "alliance-citizen-hackathon",
    image: "/gallery/alliance-citizen-hackathon.jpg",
    caption: "Alliance CITIZEN 2.0 Hackathon",
    dateLocation: "Alliance University · Team Innovation",
    tapeColor: "green",
    initialRotation: 2.8,
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "msme-hackathon",
    image: "/gallery/msme-hackathon.jpg",
    caption: "MSME Hackathon",
    dateLocation: "Vemana Institute of Technology · Finalists",
    tapeColor: "yellow",
    initialRotation: -3.2,
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "java-meetup-devon",
    image: "/gallery/java-meetup-devon.jpg",
    caption: "Java Meetup — Devon Software",
    dateLocation: "Bengaluru · Enterprise Java & Cloud",
    tapeColor: "blue",
    initialRotation: 1.6,
    aspectRatio: "aspect-[3/4]",
  },
];

const TAPE_STYLES: Record<string, string> = {
  blue: "bg-[#8EAFCE]/85 shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-t border-b border-[#7398B8]/40",
  yellow: "bg-[#F3DC7B]/90 shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-t border-b border-[#DFC353]/40",
  pink: "bg-[#EBB0BF]/85 shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-t border-b border-[#D493A4]/40",
  green: "bg-[#A7C8A9]/85 shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-t border-b border-[#8DB28F]/40",
};

interface CardPosition {
  x: number;
  y: number;
  zIndex: number;
}

export function OutInTheWorld() {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidItem | null>(null);
  const [positions, setPositions] = useState<Record<string, CardPosition>>(() => {
    const init: Record<string, CardPosition> = {};
    POLAROIDS.forEach((p, idx) => {
      init[p.id] = { x: 0, y: 0, zIndex: 10 + idx };
    });
    return init;
  });

  const topZIndex = useRef(30);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ pointerId: -1, startX: 0, startY: 0, initialX: 0, initialY: 0, x: 0, y: 0 });
  const dragFrame = useRef<number | null>(null);

  useEffect(() => () => {
    if (dragFrame.current !== null) cancelAnimationFrame(dragFrame.current);
  }, []);

  useEffect(() => {
    const board = containerRef.current;
    if (!board) return;

    const updateStickyTop = () => {
      const availableTop = window.innerHeight - board.offsetHeight - 24;
      board.style.setProperty("--photo-board-top", `${Math.min(96, availableTop)}px`);
    };

    const observer = new ResizeObserver(updateStickyTop);
    observer.observe(board);
    window.addEventListener("resize", updateStickyTop);
    updateStickyTop();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateStickyTop);
    };
  }, []);

  const handlePointerDown = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !e.isPrimary) return;
    if (e.target instanceof Element && e.target.closest("button")) return;

    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const zIndex = ++topZIndex.current;
    setPositions((prev) => ({ ...prev, [id]: { ...prev[id], zIndex } }));
    setDraggingId(id);
    const { x, y } = positions[id];
    drag.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      initialX: x,
      initialY: y,
      x,
      y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { currentTarget: card, pointerId } = e;
    const active = drag.current;
    if (active.pointerId !== pointerId || !card.hasPointerCapture(pointerId)) return;

    active.x = Math.max(-48, Math.min(48, active.initialX + e.clientX - active.startX));
    active.y = Math.max(-24, Math.min(24, active.initialY + e.clientY - active.startY));

    if (dragFrame.current !== null) return;
    dragFrame.current = requestAnimationFrame(() => {
      card.style.translate = `${active.x}px ${active.y}px`;
      dragFrame.current = null;
    });
  };

  const handlePointerUp = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current.pointerId !== e.pointerId) return;

    const { x, y } = drag.current;
    drag.current.pointerId = -1;
    if (dragFrame.current !== null) {
      cancelAnimationFrame(dragFrame.current);
      dragFrame.current = null;
    }

    e.currentTarget.style.translate = `${x}px ${y}px`;
    setPositions((prev) => ({ ...prev, [id]: { ...prev[id], x, y } }));
    setDraggingId(null);
  };

  return (
    <section
      id="out-in-the-world"
      className="relative py-20 md:py-28 bg-[#FBF9F4] dark:bg-[#1A1815] border-b border-border/80 overflow-clip select-none"
    >
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
              05.1
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              OUT IN THE WORLD
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-foreground font-normal tracking-tight mb-4">
            Rooms I sneaked into<span className="text-primary italic">.</span>
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm sm:text-base font-sans text-muted-foreground max-w-xl leading-relaxed">
              Proof I occasionally leave my desk. Drag them around, they don&apos;t mind.
            </p>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground/80 bg-secondary/80 px-3 py-1.5 rounded-full border border-border">
              <span>✦</span> Freeform workspace — grab &amp; arrange
            </span>
          </div>
        </div>

        {/* Desktop Free-Form Drag Workspace */}
        <div className="hidden md:block motion-safe:after:block motion-safe:after:h-[clamp(12rem,36vh,24rem)]">
          <div
            ref={containerRef}
            className="relative grid w-full grid-cols-3 items-start gap-x-12 gap-y-24 py-6 lg:gap-x-14 lg:gap-y-28 motion-safe:sticky motion-safe:top-[var(--photo-board-top,96px)]"
          >
            {POLAROIDS.map((item, index) => {
              const pos = positions[item.id] || { x: 0, y: 0, zIndex: 10 + index };
              const isDragging = draggingId === item.id;
              const tapeClass = TAPE_STYLES[item.tapeColor] || TAPE_STYLES.blue;

              return (
                <div
                  key={item.id}
                  id={`polaroid-${item.id}`}
                  onDragStart={(e) => e.preventDefault()}
                  onPointerDown={(e) => handlePointerDown(item.id, e)}
                  onPointerMove={handlePointerMove}
                  onLostPointerCapture={(e) => handlePointerUp(item.id, e)}
                  style={{
                    translate: `${pos.x}px ${pos.y}px`,
                    transform: `rotate(${item.initialRotation}deg)`,
                    zIndex: pos.zIndex,
                    top: index === 1 ? 24 : index === 2 ? -28 : undefined,
                  }}
                  className="group relative cursor-grab active:cursor-grabbing select-none data-[dragging=true]:will-change-[translate] motion-safe:transition-[rotate] motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:[rotate:3deg] motion-safe:focus-within:[rotate:3deg] motion-safe:data-[dragging=true]:[rotate:0deg]"
                  data-dragging={isDragging || undefined}
                  data-cursor={isDragging ? "Dragging" : "Drag me"}
                >
                  {/* Masking Tape Strip at Top Edge */}
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-7 z-20 transform -rotate-1 rounded-sm pointer-events-none ${tapeClass}`}
                    aria-hidden="true"
                  />

                  {/* Polaroid Frame Surface (Pure Paper with Natural Drop Shadow) */}
                  <div className="bg-[#FFFFFF] dark:bg-[#25221E] border border-[#E5E0D8] dark:border-[#3D3730] p-3.5 pb-5 rounded-sm shadow-[0_10px_25px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)] group-hover:shadow-[0_18px_36px_rgba(0,0,0,0.14)] group-data-[dragging=true]:shadow-[0_24px_48px_rgba(0,0,0,0.20)] motion-safe:group-data-[dragging=true]:scale-[1.035] motion-safe:transition-[transform,box-shadow] duration-200">
                    
                    {/* Photograph Container */}
                    <div className={`relative w-full ${item.aspectRatio} motion-safe:max-h-[clamp(8rem,calc((100svh-380px)/2),28svh)] bg-[#EFECE6] dark:bg-[#1E1B18] overflow-hidden rounded-sm border border-black/5 mb-3`}>
                      <img
                        src={item.image}
                        alt={item.caption}
                        loading="lazy"
                        style={{ objectPosition: item.id === "uipath-community-meetup" ? "center 20%" : undefined }}
                        className="absolute inset-0 w-full h-full object-cover object-center filter grayscale contrast-[1.08] group-hover:grayscale-0 group-focus-within:grayscale-0 group-data-[dragging=true]:grayscale-0 group-hover:contrast-100 group-data-[dragging=true]:contrast-100 motion-safe:group-hover:scale-[1.02] motion-safe:transition-[filter,transform] duration-300 pointer-events-none"
                      />

                      {/* Quick Inspect Trigger (Accessible button overlay) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPhoto(item);
                        }}
                        aria-label={`Inspect photo: ${item.caption}`}
                        data-cursor="Open"
                        className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer focus-visible:opacity-100"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Handwriting-Style / Monospace Editorial Caption */}
                    <div className="px-1 text-left">
                      <p className="font-serif text-[15px] text-[#252A29] dark:text-[#E8E2D8] font-normal leading-snug tracking-tight mb-1">
                        {item.caption}
                      </p>
                      <span className="font-mono text-[10px] text-[#6D6962] dark:text-[#9E9A92] uppercase tracking-wider block">
                        {item.dateLocation}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View: Clean Responsive Touch-Friendly Scrapbook Grid */}
        <div className="block md:hidden space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {POLAROIDS.map((item) => {
              const tapeClass = TAPE_STYLES[item.tapeColor] || TAPE_STYLES.blue;
              return (
                <div
                  key={`mobile-${item.id}`}
                  className="relative bg-[#FFFFFF] dark:bg-[#25221E] border border-[#E5E0D8] dark:border-[#3D3730] p-4 pb-5 rounded-sm shadow-md"
                >
                  {/* Masking Tape */}
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 z-20 rounded-sm pointer-events-none ${tapeClass}`}
                    aria-hidden="true"
                  />

                  <div className={`relative ${item.aspectRatio} bg-[#EFECE6] dark:bg-[#1E1B18] overflow-hidden rounded-sm border border-black/5 mb-3 group`}>
                    <img
                      src={item.image}
                      alt={item.caption}
                      loading="lazy"
                      className="w-full h-full object-cover object-top filter grayscale contrast-[1.08] hover:grayscale-0 active:grayscale-0 transition-all duration-500"
                    />

                    <button
                      type="button"
                      onClick={() => setSelectedPhoto(item)}
                      aria-label={`Inspect photo: ${item.caption}`}
                      data-cursor="Open"
                      className="absolute bottom-2 right-2 p-2 rounded-full bg-black/70 text-white"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="px-1">
                    <p className="font-serif text-base text-[#252A29] dark:text-[#E8E2D8] font-normal leading-snug mb-1">
                      {item.caption}
                    </p>
                    <span className="font-mono text-xs text-[#6D6962] dark:text-[#9E9A92] uppercase tracking-wider block">
                      {item.dateLocation}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* High-Resolution Photo Inspection Dialog Overlay */}
      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-2xl bg-card border border-border p-6 rounded-2xl shadow-2xl">
          {selectedPhoto && (
            <div>
              <div className="relative max-h-[70vh] bg-secondary/80 rounded-xl overflow-hidden mb-4 border border-border flex items-center justify-center">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.caption}
                  className="max-h-[68vh] w-auto object-contain"
                />
              </div>

              <DialogTitle className="font-serif text-2xl text-foreground font-normal mb-1">
                {selectedPhoto.caption}
              </DialogTitle>

              <DialogDescription className="font-mono text-xs text-primary uppercase tracking-widest">
                {selectedPhoto.dateLocation}
              </DialogDescription>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
