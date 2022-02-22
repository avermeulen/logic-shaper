function PuzzleService(pool) {
  return {
    async getPuzzle(id) {
      const sql = `select * from puzzle where id = $1`;
      const result = await pool.query(sql, [id]);
      let puzzle = {};
      if (result.rowCount > 0) {
        puzzle = result.rows[0];
      }
      return puzzle;
    },
	async getPuzzles() {
		const sql = `select * from puzzle order by id desc`;
		const result = await pool.query(sql);
		return result.rows;
	  },
  };
}
exports.PuzzleService = PuzzleService;
