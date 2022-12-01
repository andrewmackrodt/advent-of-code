# 🎅🏽 🧝🏻‍♀️ Advent of Code 🧝🏻‍♀️ 🎅🏽

TypeScript solutions for [Advent of Code](https://adventofcode.com). Supports web browsers and Node.js.

Demo: https://andrewmackrodt.github.io/advent-of-code/

[advent-of-code-js-repl.webm](https://user-images.githubusercontent.com/831182/206891280-d8c9c616-65cd-40a4-9cc3-a12f63b81692.webm)

## Project Structure

Solutions are located in `./src/year/day/`:

- `README.md`: puzzle description
- `input.txt`: my puzzle input
- `index.ts`: solution
- `index.test.ts`: jest tests

## Usage

### Solve

To run a solution for a specific day of the current year, run `npm run solve <day>`, replacing `<day>` with
the particular puzzle you want to run, e.g. `npm run solve 10`. To run a solution for a previous year, use
`<year>/<day>`, e.g. `npm run solve 2021/10`.

### Update

To use the update command, retrieve the value of your `session` cookie from https://adventofcode.com and enter it in
`.env` under the `SESSION_ID=` key. The command will fetch any missing descriptions or inputs for the current year. If
either `README.md` or `input.txt` exists for a specific day, those files will be skipped. External requests are
throttled to one request every 2 seconds.

Description HTML responses are cached to `./cache/<year>-<day>.html`. To force it to be retrieved again,
e.g. to fetch the description for part 2, the file must be deleted manually.

### Other Commands

| Command                 | Description                                                         |
|-------------------------|---------------------------------------------------------------------|
| `npm run solve 10`      | Print day 10 solution for the current year                          |
| `npm run solve 2021/10` | Print day 10 solution for 2021                                      |
| `npm run test`          | Run all tests for all years                                         |
| `npm run test 2022`     | Run all tests for 2022                                              |
| `npm run test 10`       | Run day 10 tests for the current year                               |
| `npm run test 2021/10`  | Run day 10 tests for 2021                                           |
| `npm run update`        | Download puzzle descriptions and puzzle inputs for the current year |
| `npm run update 2021`   | Download puzzle descriptions and puzzle inputs for 2021             |
| `npm run build`         | Compile JS files to `./out`                                         |
| `npm run lint`          | Run eslint                                                          |
| `npm run lint:fix`      | Run eslint --fix                                                    |
