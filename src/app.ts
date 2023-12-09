import express, { Request, Response } from 'express';
import { port } from './config';
import route from './routes/vault.route';

const app = express();

app.use(express.json({limit: '2mb'}));
app.use(express.text({limit: '2mb'}));
app.use(express.urlencoded({extended: true, limit: '2mb'}));

app.use(route);

app.get('/health', async (req :Request, res :Response) => {
    res.send({status: 'ok'});
});

app.listen(port || 8081, async () => {
    console.log(`listening at ${port || 8080}`);
});