/**
 * Day 6: Tuning Trouble
 * Link: https://adventofcode.com/2022/day/6
 */

import * as fs from "fs";
import * as path from "path";

/**
 * Reads the contents of a file and returns an array of its lines.
 * @param filePath - The path to the file to read.
 * @returns An array of strings, each representing a line in the file.
 */
function readLinesFromFile(filePath: string): string {
  const fileContents = fs.readFileSync(path.join(__dirname, filePath), "utf-8");
  return fileContents;
}
/**
 * Finds the index of the last distinct character in a string.
 * @param  {string} inputs
 * @param  {number} distinctCount
 * @returns the index + 1 of the last distinct character
 */
function findDistinctChars(inputs: string, distinctCount: number): number {
  let pointer = 0;
  let cells: Record<string, number> = {};

  while (pointer < inputs.length) {
    if (Object.keys(cells).length >= distinctCount) {
      break;
    }

    const char = inputs[pointer];

    if (char in cells) {
      pointer = cells[char] + 1;
      cells = {};
    } else {
      cells[char] = pointer;

      pointer++;
    }
  }

  return pointer;
}
/**
 * Calculates the marker and message start points.
 * @returns {markerStartPoint: number, messageStartPoint: number}
 */
function calculateMarker(): {
  markerStartPoint: number;
  messageStartPoint: number;
} {
  const inputs = readLinesFromFile("inputs.txt");

  const markerStartPoint = findDistinctChars(inputs, 4);
  const messageStartPoint = findDistinctChars(inputs, 14);

  return { markerStartPoint, messageStartPoint };
}

console.log(calculateMarker());
