"use client";

import React, { useState, useRef, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/icons/landing-icons";

const VIMEO_BASE_SRC =
  "https://player.vimeo.com/video/1168628584?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=0&loop=0&muted=1&controls=0&title=0&byline=0&portrait=0";

const Section1 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const playerRef = useRef(null);
  const videoContainerRef = useRef(null);

  const ensurePlayer = () => {
    if (playerRef.current) return playerRef.current;

    if (typeof window === "undefined" || !window.Vimeo?.Player) return null;

    const iframe = document.getElementById("hero-vimeo-player");
    if (!iframe) return null;

    // eslint-disable-next-line no-undef
    const player = new window.Vimeo.Player(iframe);
    playerRef.current = player;

    return player;
  };

  useEffect(() => {
    let checkVimeo = setInterval(() => {
      if (window.Vimeo?.Player && document.getElementById("hero-vimeo-player")) {
        clearInterval(checkVimeo);
        const player = ensurePlayer();
        if (player) {
          player.ready().then(() => {
            player.pause().catch(() => {});
            setIsVideoReady(true);
          });
        }
      }
    }, 500);

    return () => clearInterval(checkVimeo);
  }, []);

  const handleTogglePlay = async () => {
    const player = ensurePlayer();
    if (!player) return;

    try {
      if (isPlaying) {
        await player.pause();
        setIsPlaying(false);
      } else {
        await player.setMuted(false);
        await player.setVolume(1);
        await player.play();
        setIsPlaying(true);
      }
    } catch {
      // Silently ignore play/pause errors (e.g., autoplay restrictions).
    }
  };

  return (
    <>
      <Script
        src="https://player.vimeo.com/api/player.js"
        strategy="afterInteractive"
      />

      <div className="grid lg:grid-cols-2 sm:gap-8 gap-4 w-full self-center bg-white sm:bg-transparent p-5 sm:p-0 max-w-360 rounded-[16px] sm:rounded-2xl overflow-hidden">
        <div ref={videoContainerRef} className="relative rounded-2xl overflow-hidden min-h-[458px] sm:min-h-auto">
          <div className="absolute inset-0 bg-white">
            <iframe
              id="hero-vimeo-player"
              src={VIMEO_BASE_SRC}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full"
              title="video 001 copy"
            />
          </div>

          {/* Play/Pause Overlay (custom design kept) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="size-[70px] sm:size-24 rounded-full bg-white/16 border border-white/25 hover:bg-white transition-colors flex items-center justify-center"
                aria-label="Play video"
                suppressHydrationWarning
                onClick={(e) => {
                  e.stopPropagation();
                  handleTogglePlay();
                }}
              >
                <svg
                  width="48"
                  height="50"
                  viewBox="0 0 48 50"
                  className="size-9 sm:size-12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.2941 24.7059V13.3059C11.2941 8.95979 15.998 6.24272 19.7627 8.41427L29.6482 14.1164L39.5234 19.816C43.2896 21.9897 43.2889 27.4258 39.5221 29.5985L29.6458 35.2954L19.763 40.9967C15.9983 43.1685 11.2941 40.4515 11.2941 36.1052V24.7084V24.7059Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2.82353"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Clickable overlay when playing: click anywhere on video to pause */}
          {isPlaying && (
            <button
              type="button"
              className="absolute inset-0 cursor-pointer"
              aria-label="Pause video"
              onClick={handleTogglePlay}
            />
          )}
        </div>
        <div className="flex-1 md:text-xl text-lg bg-white text-[#2A2A2A] rounded-2xl flex flex-col w-full items-start gap-4 p-0 sm:p-8 lg:p-10 xl:p-10">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold leading-tight text-primary">
            Creating something real... for us.
          </h1>
          <p className="">
            We're connected to everything and yet still out of touch with
            ourselves.
          </p>
          <p className="mt-1.5">
            Social media edits our personalities. Perfection is curated. Every
            scroll says: Do more. Be better. Glow up. Heal. Repeat.
          </p>
          <p className="mt-1.5">It's all so... loud.</p>
          <p className="mt-1.5">What if all you needed was space?</p>
          <p className="mt-1.5">
            To actually hear yourself. To break the loops. To practice who you're
            becoming, not just talk about her.
          </p>
          <Button asChild className="mt-2 text-xl h-[58px] w-[165px] gap-1.5">
            <Link href="/#section3">
              I'm so in
              <ArrowIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Section1;
