//express
import * as express from 'express';
//React 
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../client/App';
const dev = process.env.NODE_ENV !== "production";
const app = express();
app.use(express.static("dist"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("port", dev ? 3000 : process.env.PORT);
//.ts에서는 .tsx가 불가능한가??
//일단 찾아보기!! 제너 레이터와 충돌 할 수 있음
app.get('*', (req, res, next) => {
    const ReactComponent = renderToString(React.createElement(App, null));
    res.send(` <html lang="en" >
    <head>
        <meta charset="UTF-8" />
        <title>React_Templete</title>
    </head>
    <body>
        <div id="root">${ReactComponent}</div>
        <script src="/build.js"></script>
    </body>
</html>`);
});
app.listen(app.get("port"), () => {
    console.log(`express Server running in ${app.get("port")}`);
});
