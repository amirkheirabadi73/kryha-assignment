/**
 * Day 5: Supply Stacks
 * Link: https://adventofcode.com/2022/day/5
 */

import * as fs from "fs";
import * as path from "path";

type Move = {
  count: number;
  from: number;
  to: number;
};

type Stack = string[];

/**
 * Reads the contents of a file and returns an array of its lines.
 * @param filePath - The path to the file to read.
 * @returns An array of strings containing the lines of the file.
 */
function readLinesFromFile(filePath: string): string[] {
  const fileContents = fs.readFileSync(path.join(__dirname, filePath), "utf-8");
  return fileContents.split("\n\n");
}

/**
 * Parses the input file
 * @returns An array of stacks and an array of moves.
 */
function getInput(): { stacks: Stack[]; moves: Move[] } {
  const stacks: Stack[] = [];
  const moves: Move[] = [];

  const [inputStacks, inputMoves] = readLinesFromFile("inputs.txt");

  // Parse stacks
  const stackLines = inputStacks.split("\n");

  // Remove the blank line at the end of stackLines
  stackLines.pop();

  for (const line of stackLines) {
    for (
      let stackLineIndex = 0;
      stackLineIndex < line.length;
      stackLineIndex += 4
    ) {
      const start = stackLineIndex;
      const end = start + 3;
      const crate = line.substring(start, end);

      const stackIndex = stackLineIndex / 4;
      if (!stacks[stackIndex]) {
        stacks[stackIndex] = [];
      }
      if (crate.trim()) {
        stacks[stackIndex].unshift(crate.substring(1, 2));
      }
    }
  }

  // Parse moves
  const moveLines = inputMoves.split("\n");
  for (const line of moveLines) {
    const [count, from, to] = line
      .split(" ")
      .map(Number)
      .filter((element) => !isNaN(element));

    moves.push({
      count,
      from: from - 1,
      to: to - 1,
    });
  }

  return { stacks, moves };
}

/**
 * Makes a string from the top crate of each stack.
 * @param  {Stack[]} stacks
 * @returns string containing the top crate of each stack.
 */
function makeResultString(stacks: Stack[]): string {
  let result = "";
  for (const stack of stacks) {
    result += stack[stack.length - 1] ?? "";
  }

  return result;
}

/**
 * Calculates the supply stacks after the moves have been made.
 * @returns string containing the top crate of each stack.
 */
function calculateSupplyStacksPartOne(): string {
  const { stacks, moves } = getInput();

  for (const move of moves) {
    for (let counts = 0; counts < move.count; counts++) {
      const item = stacks[move.from].pop();
      if (item) {
        stacks[move.to].push(item);
      }
    }
  }

  return makeResultString(stacks);
}

/**
 * Calculates the supply stacks after the moves have been made. (keep the stacks in the same order)
 * @returns string containing the top crate of each stack.
 */
function calculateSupplyStacksPartTwo(): string {
  const { stacks, moves } = getInput();

  for (const move of moves) {
    const items = stacks[move.from].splice(-1 * move.count, move.count);

    stacks[move.to].push(...items);
  }

  return makeResultString(stacks);
}

console.log(calculateSupplyStacksPartOne());
console.log(calculateSupplyStacksPartTwo());
