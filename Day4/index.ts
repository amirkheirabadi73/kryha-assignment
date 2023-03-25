/**
 * Day 4: Camp Cleanup
 * Link: https://adventofcode.com/2022/day/4
 */

import * as fs from "fs";
import * as path from "path";

/**
 * Reads the contents of a file and returns an array of its lines.
 * @param filePath - The path to the file to read.
 * @returns An array of strings containing the lines of the file.
 */
function readLinesFromFile(filePath: string): string[] {
  const fileContents = fs.readFileSync(path.join(__dirname, filePath), "utf-8");
  return fileContents.split("\n");
}

/**
 * Checks if two pairs of numbers have a full overlap.
 * @param pair1 - The first pair of numbers.
 * @param pair2 - The second pair of numbers.
 * @returns True if the two pairs have a full overlap, false otherwise.
 */
function hasFullOverlap(
  pair1: [number, number],
  pair2: [number, number]
): boolean {
  const [start1, end1] = pair1;
  const [start2, end2] = pair2;

  return (
    (start1 <= start2 && end1 >= end2) || (start2 <= start1 && end2 >= end1)
  );
}

/**
 * Checks if two pairs of numbers have a partial overlap.
 * @param pair1 - The first pair of numbers.
 * @param pair2 - The second pair of numbers.
 * @returns True if the two pairs have a partial overlap, false otherwise.
 */
function hasPartialOverlap(
  pair1: [number, number],
  pair2: [number, number]
): boolean {
  const [start1, end1] = pair1;
  const [start2, end2] = pair2;

  return (
    (start1 <= start2 && end1 >= start2) || (start2 <= start1 && end2 >= start1)
  );
}

/**
 * Parses the input file and calculates the number of pairs that have a full overlap and partial overlap.
 * @returns An object containing the fullOverlapCounter and partialOverlapCounter.
 */
function calculateOverlap(): {
  fullOverlapCounter: number;
  partialOverlapCounter: number;
} {
  const inputLines = readLinesFromFile("inputs.txt");

  const pairs = inputLines.map((line) => {
    return line.split(",").map((range) => {
      const parsedPair = range.split("-").map(Number);
      return [parsedPair[0], parsedPair[1]] as [number, number];
    });
  });

  let fullOverlapCounter = 0;
  let partialOverlapCounter = 0;

  for (const pair of pairs) {
    const pair1 = pair[0];
    const pair2 = pair[1];
    if (hasFullOverlap(pair1, pair2)) {
      fullOverlapCounter++;
    }

    if (hasPartialOverlap(pair1, pair2)) {
      partialOverlapCounter++;
    }
  }

  return { fullOverlapCounter, partialOverlapCounter };
}

console.log(calculateOverlap());
