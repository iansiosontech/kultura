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

function drawRibbonTail(
  ctx: CanvasRenderingContext2D,
  cx: number,
  topY: number,
  bottomY: number,
  side: -1 | 1
) {
  const innerX = cx + side * 20;
  const outerX = cx + side * 90;
  const notchY = bottomY - 40;
  ctx.beginPath();
  ctx.moveTo(innerX, topY);
  ctx.lineTo(outerX, topY);
  ctx.lineTo(outerX, bottomY);
  ctx.lineTo(cx + side * 55, notchY);
  ctx.lineTo(innerX, bottomY);
  ctx.closePath();
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
    WIDTH / 2, 300, 60,
    WIDTH / 2, 300, 760
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

  const cx = WIDTH / 2;
  const medalCy = 260;
  const outerR = 160;
  const innerR = 125;

  // ribbon tails (drawn first, so the medal face sits on top of them)
  const tailTop = medalCy + 60;
  const tailBottom = medalCy + 260;
  const tailGradient = ctx.createLinearGradient(0, tailTop, 0, tailBottom);
  tailGradient.addColorStop(0, "#F2C14E");
  tailGradient.addColorStop(1, "#B9821F");
  ctx.fillStyle = tailGradient;
  drawRibbonTail(ctx, cx, tailTop, tailBottom, -1);
  ctx.fill();
  drawRibbonTail(ctx, cx, tailTop, tailBottom, 1);
  ctx.fill();

  // medal outer ring
  const medalGradient = ctx.createRadialGradient(
    cx, medalCy, innerR * 0.6,
    cx, medalCy, outerR
  );
  medalGradient.addColorStop(0, "#FFE9B0");
  medalGradient.addColorStop(1, "#C98A1B");
  ctx.beginPath();
  ctx.arc(cx, medalCy, outerR, 0, Math.PI * 2);
  ctx.fillStyle = medalGradient;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(255,255,255,.35)";
  ctx.stroke();

  // medal inner face
  ctx.beginPath();
  ctx.arc(cx, medalCy, innerR, 0, Math.PI * 2);
  ctx.fillStyle = "#241B10";
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#F2C14E";
  ctx.stroke();

  // train icon
  ctx.font = "150px sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText("🚂", cx, medalCy + 10);
  ctx.textBaseline = "alphabetic";

  // wordmark
  ctx.fillStyle = "#FFD98A";
  ctx.font = "900 50px ui-monospace, monospace";
  ctx.fillText("KUWENTO-QUEST", cx, 610);

  ctx.fillStyle = "rgba(242,230,204,.8)";
  ctx.font = "600 26px system-ui, sans-serif";
  ctx.fillText("Sertipikadong Manlalakbay", cx, 648);

  // headline banner
  const bannerY = 686;
  const bannerH = 88;
  const bannerW = 860;
  roundRect(ctx, cx - bannerW / 2, bannerY, bannerW, bannerH, 20);
  ctx.fillStyle = "#F2C14E";
  ctx.fill();
  ctx.fillStyle = "#1A1208";
  ctx.font = "900 46px ui-monospace, monospace";
  ctx.fillText("GANAP NA MANLALAKBAY!", cx, bannerY + 58);

  // tier chip
  ctx.font = "800 28px ui-monospace, monospace";
  const tierText = data.tierName;
  const tierWidth = ctx.measureText(tierText).width + 64;
  const tierY = bannerY + bannerH + 36;
  roundRect(ctx, cx - tierWidth / 2, tierY, tierWidth, 64, 99);
  ctx.strokeStyle = "rgba(255,217,138,.6)";
  ctx.lineWidth = 3;
  ctx.fillStyle = "rgba(242,193,78,.12)";
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#FFD98A";
  ctx.fillText(tierText, cx, tierY + 42);

  // name
  const nameTop = tierY + 100;
  ctx.fillStyle = "rgba(242,230,204,.75)";
  ctx.font = "700 24px ui-monospace, monospace";
  ctx.fillText("MANLALAKBAY", cx, nameTop);

  ctx.fillStyle = "#FFFBF0";
  ctx.font = "800 54px system-ui, sans-serif";
  ctx.fillText(data.name, cx, nameTop + 62);

  if (data.section) {
    ctx.fillStyle = "rgba(242,230,204,.75)";
    ctx.font = "600 28px system-ui, sans-serif";
    ctx.fillText(data.section, cx, nameTop + 102);
  }

  // score
  const scoreTop = nameTop + 160;
  ctx.fillStyle = "rgba(242,230,204,.75)";
  ctx.font = "700 24px ui-monospace, monospace";
  ctx.fillText("PUNTOS", cx, scoreTop);

  ctx.fillStyle = "#FFD98A";
  ctx.font = "900 110px ui-monospace, monospace";
  ctx.fillText(`${data.score} / ${data.maxScore}`, cx, scoreTop + 95);

  // badge shelf
  const shelfTop = scoreTop + 125;
  const shelfH = 90;
  roundRect(ctx, 100, shelfTop, WIDTH - 200, shelfH, 18);
  ctx.fillStyle = "rgba(255,217,138,.08)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,217,138,.3)";
  ctx.lineWidth = 2;
  ctx.stroke();

  const iconCount = badges.length;
  const iconSize = 56;
  const gap = 16;
  const totalWidth = iconCount * iconSize + (iconCount - 1) * gap;
  let bx = cx - totalWidth / 2;
  const by = shelfTop + (shelfH - iconSize) / 2;
  ctx.font = "34px system-ui, sans-serif";
  ctx.textBaseline = "middle";
  for (const badge of badges) {
    roundRect(ctx, bx, by, iconSize, iconSize, 14);
    ctx.fillStyle = "rgba(255,217,138,.18)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,217,138,.5)";
    ctx.lineWidth = 2;
    roundRect(ctx, bx, by, iconSize, iconSize, 14);
    ctx.stroke();
    ctx.fillStyle = "#FFFBF0";
    ctx.fillText(badge.icon, bx + iconSize / 2, by + iconSize / 2 + 2);
    bx += iconSize + gap;
  }
  ctx.textBaseline = "alphabetic";

  // footer
  ctx.fillStyle = "rgba(242,230,204,.6)";
  ctx.font = "600 24px ui-monospace, monospace";
  ctx.fillText("kuwentoquest.vercel.app", cx, HEIGHT - 48);
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}
