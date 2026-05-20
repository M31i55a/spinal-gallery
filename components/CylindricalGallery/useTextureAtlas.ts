import { useState, useEffect, useMemo, useRef } from "react";
import { CanvasTexture, LinearFilter, ClampToEdgeWrapping } from "three";

interface AtlasMetadata {
  atlas: CanvasTexture | null;
  cols: number;
  rows: number;
  uniqueCount: number;
  /** Maps original image index to atlas tile index */
  indexMap: number[];
  /** Reference to the atlas canvas for debug download */
  atlasCanvasRef: React.RefObject<HTMLCanvasElement | OffscreenCanvas | null>;
}

function isVideo(url: string) {
  return /\.(mp4|webm|ogg)$/i.test(url);
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

function loadVideoFrame(url: string): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    const onSeeked = () => resolve(video);
    video.addEventListener("loadeddata", () => { video.currentTime = 0.001; }, { once: true });
    video.addEventListener("seeked", onSeeked, { once: true });
    video.onerror = reject;
    video.src = url;
    video.load();
  });
}

export function useTextureAtlas(images: string[]): AtlasMetadata {
  const atlasCanvasRef = useRef<HTMLCanvasElement | OffscreenCanvas | null>(null);
  const [atlas, setAtlas] = useState<CanvasTexture | null>(null);
  const [atlasInfo, setAtlasInfo] = useState({ cols: 1, rows: 1 });

  // Deduplicate images
  const uniqueImages = useMemo(() => Array.from(new Set(images)), [images]);

  // Build index map: for each image in the original array, which atlas tile?
  const indexMap = useMemo(() => {
    return images.map((img) => uniqueImages.indexOf(img));
  }, [images, uniqueImages]);

  useEffect(() => {
    let cancelled = false;

    async function buildAtlas() {
      const mediaElements = await Promise.all(
        uniqueImages.map((url) => isVideo(url) ? loadVideoFrame(url) : loadImage(url))
      );
      if (cancelled) return;

      const count = mediaElements.length;
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);

      const first = mediaElements[0];
      const tileW = (first instanceof HTMLVideoElement ? first.videoWidth : (first as HTMLImageElement).naturalWidth) || 512;
      const tileH = (first instanceof HTMLVideoElement ? first.videoHeight : (first as HTMLImageElement).naturalHeight) || 512;
      const padding = 2;

      const canvasW = cols * (tileW + padding);
      const canvasH = rows * (tileH + padding);

      const canvas =
        typeof OffscreenCanvas !== "undefined"
          ? new OffscreenCanvas(canvasW, canvasH)
          : document.createElement("canvas");

      if ("width" in canvas) {
        canvas.width = canvasW;
        canvas.height = canvasH;
      }

      const ctx = canvas.getContext("2d") as
        | CanvasRenderingContext2D
        | OffscreenCanvasRenderingContext2D;

      if (ctx) {
        for (let i = 0; i < count; i++) {
          const col = i % cols;
          const row = Math.floor(i / cols);
        const x = col * (tileW + padding);
          const y = row * (tileH + padding);
          ctx.drawImage(mediaElements[i], x, y, tileW, tileH);
        }
      }

      const atlasTexture = new CanvasTexture(canvas as HTMLCanvasElement);
      atlasTexture.minFilter = LinearFilter;
      atlasTexture.magFilter = LinearFilter;
      atlasTexture.wrapS = ClampToEdgeWrapping;
      atlasTexture.wrapT = ClampToEdgeWrapping;
      atlasTexture.needsUpdate = true;

      atlasCanvasRef.current = canvas as HTMLCanvasElement;

      if (!cancelled) {
        setAtlasInfo({ cols, rows });
        setAtlas(atlasTexture);
      }
    }

    buildAtlas();
    return () => { cancelled = true; };
  }, [uniqueImages]);

  return { atlas, cols: atlasInfo.cols, rows: atlasInfo.rows, uniqueCount: uniqueImages.length, indexMap, atlasCanvasRef };
}
