const { PuzzleService } = require("./PuzzleService");

module.exports = function PuzzleRoutes(pool) {

  const puzzleService = PuzzleService(pool);

  async function getPuzzle(req, res) {
    const { id } = req.params;
    const puzzle = await puzzleService.getPuzzle(id)
    return res.send(puzzle);
  }

  async function getPuzzles(req, res) {
    const puzzles = await puzzleService.getPuzzles()
    // return res.render("puzzles", {puzzles});
    res.send({
      puzzles
    })
  }

  return {
    getPuzzle,
    getPuzzles
  };
}