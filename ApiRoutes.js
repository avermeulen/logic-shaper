function ApiRoutes(taskService) {
    async function checkAnswer(req, res) {

        const {
            taskId, answer, dataset, uid
        } = req.body;

        const result = await taskService.checkTask({ answer, dataset });

        res.json(result);
    }

    return {
        checkAnswer
    };
}
exports.ApiRoutes = ApiRoutes;
