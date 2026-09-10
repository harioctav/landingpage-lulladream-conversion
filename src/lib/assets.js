/**
 * Central asset registry.
 *
 * Every image is imported here once so components never reference an opaque
 * filename. Vite fingerprints and emits them at build time.
 *
 * IMPORTANT — SVG sizing: the export contains two copies of each decorative
 * shape. The `svg-1xx` / `svg-2` / `svg-3` copies carry
 * `width="100%" height="100%"` plus `preserveAspectRatio="none"`, so they have
 * no intrinsic ratio and stretch to whatever box they land in. Only the
 * pixel-sized twins (listed below) are used.
 */

/* ---- Brand -------------------------------------------------------------- */
import logo from "@assets/SVG/logo-lulladream.svg";

/* ---- Photography --------------------------------------------------------
   The guarantee section's parent-and-child reading shot. */
import restingChild from "@assets/PNG/img-lulladream2.webp";

/* ---- Story cover art ----------------------------------------------------
   The hero's storybook illustration. The AVIF covers in assets/AVIF belong to
   the awareness page and are not imported here. */
import coverHero from "@assets/JPG/cover-hero.jpg"; /* 735×577 */

/* ---- Avatars ------------------------------------------------------------ */
import avatar1 from "@assets/PNG/E0p8byOZTAASic9JX5dHje4JKM.png";
import avatar2 from "@assets/PNG/Ea7QwIyE26ZFved2fo8vOo2hg.png";
import avatar3 from "@assets/PNG/ES1HVkULW2SHmeS4IVG2RTblR0.png";
import avatar4 from "@assets/PNG/JifWr2qjoAfaa4omsivPb6ZTgZY.png";
import avatar5 from "@assets/PNG/qS6AeZIP8Hw44vzi8QuKOaizqps.png";

/* ---- Decorative shapes (pixel-sized twins only) ------------------------- */
import shapeCloud from "@assets/SVG/svg-889674449_700.svg"; /* 253×145 */
import shapeCloudLarge from "@assets/SVG/shape.svg"; /* 227×225 */
import shapeBlobRound from "@assets/SVG/svg539152021_720.svg"; /* 121×121 */
import shapeBlobSoft from "@assets/SVG/svg-695880022_913.svg"; /* 171×174 */
import shapeBlobPetal from "@assets/SVG/svg285309579_906.svg"; /* 138×138 */
import shapeBlobBud from "@assets/SVG/svg1358484439_910.svg"; /* 149×143 */
import shapeBlobSeed from "@assets/SVG/svg-1643664828_719.svg"; /* 129×126 */
import shapeSparkle from "@assets/SVG/svg1031543220_9253.svg"; /* 100×103 */
import shapeSparkleAlt from "@assets/SVG/svg-202640766_9260.svg"; /* 127×131 */
import shapeSwoosh from "@assets/SVG/svg1267207472_4673.svg"; /* 63×49 */
import shapeSwooshAlt from "@assets/SVG/svg-882616378_4701.svg"; /* 62×49 */
import shapePetal from "@assets/SVG/svg1148744201_643.svg"; /* 231×244 */
import shapeArc from "@assets/SVG/svg1461738047_385.svg"; /* 140×116 */
import shapePaperPlane from "@assets/SVG/svg-1203999258_25150.svg"; /* 101×68 */
import shapeBunny from "@assets/SVG/svg-1862830764_11036.svg"; /* 119×122 */

export const brand = { logo };

export const photos = { restingChild };

export const covers = { coverHero };

export const avatars = { avatar1, avatar2, avatar3, avatar4, avatar5 };

export const shapes = {
  shapeCloud,
  shapeCloudLarge,
  shapeBlobRound,
  shapeBlobSoft,
  shapeBlobPetal,
  shapeBlobBud,
  shapeBlobSeed,
  shapeSparkle,
  shapeSparkleAlt,
  shapeSwoosh,
  shapeSwooshAlt,
  shapePetal,
  shapeArc,
  shapePaperPlane,
  shapeBunny,
};

/**
 * Intrinsic aspect ratios, so `Decor` can reserve the right box even before
 * the file loads and never squash a shape.
 */
export const shapeRatios = {
  shapeCloud: "253/145",
  shapeCloudLarge: "227/225",
  shapeBlobRound: "121/121",
  shapeBlobSoft: "171/174",
  shapeBlobPetal: "138/138",
  shapeBlobBud: "149/143",
  shapeBlobSeed: "129/126",
  shapeSparkle: "100/103",
  shapeSparkleAlt: "127/131",
  shapeSwoosh: "63/49",
  shapeSwooshAlt: "62/49",
  shapePetal: "231/244",
  shapeArc: "140/116",
  shapePaperPlane: "101/68",
  shapeBunny: "119/122",
};
