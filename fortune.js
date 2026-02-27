// fortune.js - Custom Cow starter
// Based on HAP's Fortunate Cow — you'll refactor this to use JSON objects

import * as cowsay from "cowsay";

import fortunes from "./fortunes.json" with { type: "json" };

const randomIndex = Math.floor(Math.random() * fortunes.length);
const todaysFortune = fortunes[randomIndex];

console.log(cowsay.say({ text: todaysFortune.text, r: true }));



// Get the current hour (0-23)
// HAP learned that getHours() uses 24-hour time, not 12-hour!
const hour = new Date().getHours();

// Choose greeting based on time of day
let greeting;
if (hour < 12) {
  greeting = "Good morning";
} else if (hour < 18) {
  greeting = "Good afternoon";
} else {
  greeting = "Good evening";
}


// Combine greeting and fortune
// const fullMessage = `${greeting}! ${todaysFortune}`;

// Display Tux the penguin (HAP likes penguins!)
// Notice: cowsay.say() takes an OBJECT as its parameter
// const output = cowsay.say({ text: fullMessage, f: "tux" });
// console.log(output);
