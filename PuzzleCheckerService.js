const format = require('pg-format');
const { nanoid } = require('nanoid');
const { PuzzleService } = require("./PuzzleService");

function PuzzleCheckerService(pool) {

    const puzzleService = PuzzleService(pool);

    function createUid() {
        return nanoid(12);
    }


    async function check({ puzzleId, answer, dataset, uid }) {
        // const task = getTask(id);

        console.log(puzzleId);
        const puzzle = await puzzleService.getPuzzle(puzzleId);

        if (!uid) {
            uid = createUid();
        }

        const dataArray = dataset.map(row => [uid, row.type, row.color, row.number]);

        // insert the dataset in the database
        const insertShapeSQL = `insert into shape (uid, shape, color, the_number) values %L`;
        const allShapesInsertSQL = format(insertShapeSQL, dataArray);
        await pool.query(allShapesInsertSQL);
        // console.log('------->')
        // run the query to get the data

        const passedInParams = puzzle.params.split(",");
        const allParams = [...passedInParams, uid];

        const checkSQL = `${puzzle.sql} and uid = $${allParams.length}`;
        
        // console.log("--------------------");
        // console.log(checkSQL);
        // console.log(allParams);

        const data = await pool.query(checkSQL, allParams);
        const rows = data.rows;

        //todo - work to be done here...
        const ourAnswer = rows[0].result;
        const correct = answer == ourAnswer;

        const result = {
            correct,
            answer,
            ourAnswer
        };

        return result;
        // check if answer is equal to the result from the query
    }

    function getTask(id) {
    }

    return {
        check
    };
}
exports.PuzzleCheckerService = PuzzleCheckerService;
