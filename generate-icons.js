#!/usr/bin/env node

import fs from 'fs';
import { createCanvas } from 'canvas';

const sizes = [72, 96, 120, 128, 144, 152, 180, 192, 384, 512];

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, size, size);
  
  // Draw "L" for Lux
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.5}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('L', size / 2, size / 2);
  
  return canvas.toBuffer('image/png');
}

// Generate icons
sizes.forEach(size => {
  const buffer = generateIcon(size);
  fs.writeFileSync(`public/icon-${size}x${size}.png`, buffer);
  console.log(`Generated icon-${size}x${size}.png`);
});

// Generate favicon
const favicon = generateIcon(32);
fs.writeFileSync('public/favicon-32x32.png', favicon);

const favicon16 = generateIcon(16);
fs.writeFileSync('public/favicon-16x16.png', favicon16);

console.log('Icon generation complete!');