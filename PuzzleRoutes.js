module.exports = function PuzzleRoutes(pool) {
  async function getPuzzle(req, res) {
    const { id } = req.params;

    const sql = `select * from puzzle where id = $1`;

    const result = await pool.query(sql, [id]);
	let puzzle = {};
    if (result.rowCount > 0) {
       puzzle = result.rows[0];
    }

    return res.send(puzzle);

  }

  return {
    getPuzzle
  };
}