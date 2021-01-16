const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const md5 = require('md5');
const jwtToken = require('jsontokens')
const Helpers = require('./utils/helpers.js');


/* const DatabaseHelper = require('./helper/DatabaseHelper'); */



const pg = require('knex')({
  client: 'pg',
  version: '9.6',
  searchPath: ['knex', 'public'],
  connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/test'
});


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (req, res) => {
  res.send('Hello World -- deployed again!')
})

app.get('/test', (req, res) => {
  res.send('TEST');
    res.sendStatus(400);
  res.status(204).send();
});

app.get('/numbers', async (req, res) => {
  const result = await pg
    .select(['uuid', 'number', 'category', 'answer', 'created_at','updated_at'])
    .from('numbers');
  res.json({
    res: result,
  });
});


app.post('/number', async (req, res) => {
  const uuid = Helpers.generateUUID();
  const result = await pg

    .table('numbers')
    .insert({ uuid, number: `2`, answer: `Tweede nummer`, category: `nummer` })
    .then((res) => {
      return res;
    });
  // console.log(result);
  res.send(result);
});

app.get('/number/:uuid', async (req, res) => {
  const result = await pg
    .select(['uuid', 'number', 'category', 'answer', 'created_at','updated_at'])
    .from('numbers')
    .where({ uuid: req.params.uuid });
  res.json({
    res: result,
  });
});

//DELETE endpoint

/**
* 
* @params:
* @returns: 
*/

app.delete('/number/:uuid', async (req, res) => {
  const result = await pg
    .table('numbers')
    .where({ uuid: req.params.uuid})
    .del(['id','uuid', 'number', 'category', 'answer', 'created_at','updated_at'])
    .then((res) => {
      return res;
    });
  console.log(result);
  res.send(result);
});

//DELETE CATEGORY - DELETE EVERY RECORD
app.get('/join', async (req, res) => {
  await DatabaseHelper
    .table('items')
    .join('lists', DatabaseHelper.raw('item.list_id::varchar'), DatabaseHelper.raw('lists.uuid::varchar'))
    .select('lists.*', 'items.*')
    .then((data) => {
      res.send(data)
    })

})

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT || 3000}`));
}



async function initialiseTables() {
  await pg.schema.hasTable('numbers').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('numbers', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('number');
          table.string('answer');
          table.string('category');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table numbers');
         
        });

    }
  });
  await pg.schema.hasTable('numbersCategory').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('numbersCategory', (table) => {
          table.increments().primary();
          table.uuid('uuid');
          table.string('math');
          table.string('trivia');
          table.string('date');
          table.string('category_name');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table numbersCategory');
          
        });

    }
  });
}
initialiseTables()

module.exports = app