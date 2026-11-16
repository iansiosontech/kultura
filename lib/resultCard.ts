"use client";

import { badges } from "@/lib/badges";

export type ResultCardData = {
  name: string;
  section: string;
  score: number;
  maxScore: number;
  tierName: string;
};

const WIDTH = 1080;
const HEIGHT = 1350;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

export function drawResultCard(canvas: HTMLCanvasElement, data: ResultCardData) {
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // background
  ctx.fillStyle = "#1A1208";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  const glow = ctx.createRadialGradient(
    WIDTH / 2, 420, 60,
    WIDTH / 2, 420, 700
  );
  glow.addColorStop(0, "rgba(242,193,78,.22)");
  glow.addColorStop(1, "rgba(242,193,78,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // outer border
  ctx.strokeStyle = "rgba(255,217,138,.55)";
  ctx.lineWidth = 6;
  roundRect(ctx, 36, 36, WIDTH - 72, HEIGHT - 72, 36);
  ctx.stroke();

  ctx.textAlign = "center";

  // brand
  ctx.fillStyle = "#FFD98A";
  ctx.font = "900 54px ui-monospace, monospace";
  ctx.fillText("KUWENTO-QUEST", WIDTH / 2, 150);

  ctx.fillStyle = "rgba(242,230,204,.8)";
  ctx.font = "600 26px system-ui, sans-serif";
  ctx.fillText("Isang Paglalakbay sa Panitikang Filipino", WIDTH / 2, 196);

  // divider
  ctx.strokeStyle = "rgba(255,255,255,.18)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(140, 240);
  ctx.lineTo(WIDTH - 140, 240);
  ctx.stroke();

  // completion headline
  ctx.fillStyle = "#FFD98A";
  ctx.font = "900 62px ui-monospace, monospace";
  ctx.fillText("GANAP NA MANLALAKBAY!", WIDTH / 2, 340);

  // tier chip
  ctx.font = "800 28px ui-monospace, monospace";
  const tierText = data.tierName;
  const tierWidth = ctx.measureText(tierText).width + 64;
  roundRect(ctx, WIDTH / 2 - tierWidth / 2, 380, tierWidth, 64, 99);
  ctx.fillStyle = "#F2C14E";
  ctx.fill();
  ctx.fillStyle = "#2A2317";
  ctx.fillText(tierText, WIDTH / 2, 422);

  // name
  ctx.fillStyle = "rgba(242,230,204,.75)";
  ctx.font = "700 24px ui-monospace, monospace";
  ctx.fillText("MANLALAKBAY", WIDTH / 2, 530);

  ctx.fillStyle = "#FFFBF0";
  ctx.font = "800 58px system-ui, sans-serif";
  const displayName = data.section ? `${data.name}` : data.name;
  ctx.fillText(displayName, WIDTH / 2, 600);

  if (data.section) {
    ctx.fillStyle = "rgba(242,230,204,.75)";
    ctx.font = "600 30px system-ui, sans-serif";
    ctx.fillText(data.section, WIDTH / 2, 645);
  }

  // score
  ctx.fillStyle = "rgba(242,230,204,.75)";
  ctx.font = "700 26px ui-monospace, monospace";
  ctx.fillText("PUNTOS", WIDTH / 2, 760);

  ctx.fillStyle = "#FFD98A";
  ctx.font = "900 150px ui-monospace, monospace";
  ctx.fillText(`${data.score} / ${data.maxScore}`, WIDTH / 2, 900);

  // badges row
  const iconCount = badges.length;
  const iconSize = 70;
  const gap = 18;
  const totalWidth = iconCount * iconSize + (iconCount - 1) * gap;
  let bx = WIDTH / 2 - totalWidth / 2;
  const by = 1000;
  ctx.font = "40px system-ui, sans-serif";
  for (const badge of badges) {
    roundRect(ctx, bx, by, iconSize, iconSize, 16);
    ctx.fillStyle = "rgba(255,217,138,.18)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,217,138,.5)";
    ctx.lineWidth = 2;
    roundRect(ctx, bx, by, iconSize, iconSize, 16);
    ctx.stroke();
    ctx.fillStyle = "#FFFBF0";
    ctx.fillText(badge.icon, bx + iconSize / 2, by + iconSize / 2 + 14);
    bx += iconSize + gap;
  }

  // footer
  ctx.fillStyle = "rgba(242,230,204,.6)";
  ctx.font = "600 24px ui-monospace, monospace";
  ctx.fillText("kuwentoquest.vercel.app", WIDTH / 2, HEIGHT - 70);
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}
