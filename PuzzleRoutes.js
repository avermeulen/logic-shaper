const { PuzzleService } = require("./PuzzleService");
const marked = require("marked");

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

    const puzzlesWithHtml = puzzles.map(puzzle => {
      return {
        ...puzzle,
        html : marked.parse(puzzle.instructions)
      }
    });


    res.render('puzzles/index', {
      puzzles : puzzlesWithHtml
    })
  }

  async function addPuzzleScreen(req, res) {
    // const puzzles = await puzzleService.getPuzzles()
    // return res.render("puzzles", {puzzles});
    res.render('puzzles/add')
  }

  async function addPuzzle(req, res) {

    // console.log(req.body);
    // todo add some validation
    await puzzleService.addPuzzle(req.body);
    
    res.redirect('/puzzles')
  }

  return {
    addPuzzleScreen,
    addPuzzle,
    getPuzzle,
    getPuzzles
  };
}