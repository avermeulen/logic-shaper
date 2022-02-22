const format = require('pg-format');
const { nanoid } = require('nanoid');

function TaskService(pool) {

    function createUid() {
        return nanoid(12);
    }


    async function checkTask({ answer, dataset, uid }) {
        // const task = getTask(id);
        if (!uid) {
            uid = createUid();
        }

        const dataArray = dataset.map(row => [uid, row.type, row.color, row.number]);

        // insert the dataset in the database
        const insertShapeSQL = `insert into shape (uid, shape, color, the_number) values %L`;
        const allShapesInsertSQL = format(insertShapeSQL, dataArray);
        // console.log('----')
        await pool.query(allShapesInsertSQL);
        // console.log('------->')
        // run the query to get the data
        const checkSQL = `select count(*) as result from shape where "shape".shape = 'square' and uid = $1`;
        const data = await pool.query(checkSQL, [uid]);
        const rows = data.rows;
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
        checkTask
    };
}
exports.TaskService = TaskService;
