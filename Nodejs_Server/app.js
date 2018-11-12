const express = require('express');
const morgan = require('morgan');

const indexRouter = require('./routes');
const accountRouter = require('./routes/account');
const mainRouter = require('./routes/main');
const fundRouter = require('./routes/funding');

const swaggerUI = require('swagger-ui-express');
const swaggerJSDOC = require('swagger-jsdoc');
//Swagger definition
var swaggerDefinition = {
    info : {
        title : 'Cause API',
        version : '1.0.0',
        description : 'Cause API specificcation by huewilliams',
    },
    host : "13.125.6.4:9000",
    basePath : '/',
};

var options = {
    swaggerDefinition : swaggerDefinition,
    apis : [
        './docs/swagger.js'
    ]
};
const swaggerSpec = swaggerJSDOC(options);

const app = express();

app.set('port', process.env.PORT || 9000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/main', mainRouter);
app.use('/funding', fundRouter);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        message : res.locals.message,
        error : res.locals.error,
        status : res.status,
    })
});

app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`);
});