export const routes = (app) => {
    app.get('/', (req, res) => {
        res.status(200).send({})
    })
}