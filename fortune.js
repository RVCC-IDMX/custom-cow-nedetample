// fortune.js - Custom Cow starter
// Based on HAP's Fortunate Cow — you'll refactor this to use JSON objects


import * as cowsay from "cowsay";
import chalk from "chalk";

import fortunes from "./fortunes.json" with { type: "json" };

// Get CLI arguments (skip first two: node and script path)
const args = process.argv.slice(2);


// Handle --count flag
if (args.includes("--count")) {
  // Count fortunes by mood
  const counts = fortunes.reduce((acc, f) => {
    const mood = f.mood || "unknown";
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});
  const total = fortunes.length;
  console.log("Fortune counts by category:");
  Object.entries(counts).forEach(([mood, count]) => {
    console.log(`  ${mood}: ${count}`);
  });
  console.log(`  Total: ${total}`);
  process.exit(0);
}

// Handle --list flag
if (args.includes("--list")) {
  const categories = [...new Set(fortunes.map(f => f.mood))];
  console.log("Available categories:");
  categories.forEach(cat => console.log(`  - ${cat}`));
  process.exit(0);
}

// If a category is provided as the first argument, filter fortunes
let filteredFortunes = fortunes;
let selectedCategory = null;
if (args.length > 0 && !args[0].startsWith("--")) {
  selectedCategory = args[0].toLowerCase();
  filteredFortunes = fortunes.filter(f => (f.mood || "").toLowerCase() === selectedCategory);
}

// If no fortunes match, show helpful error and exit
if (filteredFortunes.length === 0) {
  // Get all unique categories
  const categories = [...new Set(fortunes.map(f => f.mood))];
  console.log(`No fortunes found for category \"${selectedCategory}\".`);
  console.log("Available categories:", categories.join(", "));
  process.exit(1);
}

// Pick a random fortune from the filtered list
const randomIndex = Math.floor(Math.random() * filteredFortunes.length);
const todaysFortune = filteredFortunes[randomIndex];

// Mood to eyes mapping
const moodEyes = {
  happy: "^^",
  motivational: "OO",
  sad: ".."
};

// Mood to color mapping
const moodColor = {
  happy: chalk.yellow,
  motivational: chalk.green,
  sad: chalk.cyan
};

const eyes = moodEyes[todaysFortune.mood] || "oo";
const colorFn = moodColor[todaysFortune.mood] || chalk.white;

const cowOutput = cowsay.say({ text: todaysFortune.text, e: eyes });
console.log(colorFn(cowOutput));
