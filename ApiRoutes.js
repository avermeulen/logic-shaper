function ApiRoutes(puzzleCheckerService) {
    async function checkAnswer(req, res) {

        const {
            puzzleId, answer, dataset, uid
        } = req.body;

        const result = await puzzleCheckerService.check({puzzleId, answer, dataset });

        res.json(result);
    }

    return {
        checkAnswer
    };
}
exports.ApiRoutes = ApiRoutes;
