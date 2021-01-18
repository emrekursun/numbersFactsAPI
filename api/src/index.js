const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const md5 = require('md5');
const jwtToken = require('jsontokens')
const Helpers = require('./utils/helpers.js');


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

/**  get all numbers record 
 * @params 
 * @returns get all records of that category
 */
app.get('/numbers', async (req, res) => {
  const result = await pg
    .select(['uuid', 'number', 'category_name', 'answer', 'created_at','updated_at'])
    .from('numbers');
  res.json({
    res: result,
  });
});

/**  post numbers to database
 * @params 
 * @returns post a record to numbers table
 */
app.post('/number', async (req, res) => {
  const uuid = Helpers.generateUUID();
  const result = await pg

    .table('numbers')
    .insert({ uuid, number: `2`, answer: `Tweede nummer`, category_name: `trivia`, category_id: `2` })
    .then((res) => {
      return res;
    });
  // console.log(result);
  res.send(result);
});

/**  
 * post a new category
 * @params 
 * @returns post a new category record to numberscategory
 */

app.post('/category', async (req, res) => {
  const uuid = Helpers.generateUUID();
  
  const result = await pg

    .table('numberscategory')
    .insert({ uuid, category_name: `math`, category_id: `1`})  
    .returning('*')
    .then((res) => {
      return res;
    });
  console.log('added one table');
  console.log(result);
  res.send(result);
});

/**  get numbers record by uuid
 * @params uuid
 * @returns get all records of that uuid
 */
app.get('/number/:uuid', async (req, res) => {
  const result = await pg
    .select(['uuid', 'number', 'category_name', 'answer', 'created_at','updated_at'])
    .from('numbers')
    .where({ uuid: req.params.uuid });
  res.json({
    res: result,
  });
});

//DELETE endpoint


/**  delete numbers record by uuid
 * @params uuid
 * @returns delete all records of that category
 */
app.delete('/number/:uuid', async (req, res) => {
  const result = await pg
    .table('numbers')
    .where({ uuid: req.params.uuid})
    .del(['id','uuid', 'number', 'category_name', 'category_id', 'join_category', 'answer', 'created_at','updated_at'])
    .then((res) => {
      return res;
    });
  console.log(result);
  res.send(result);
});

/**  delete a category - every record of that category will be deleted
 * @params uuid
 * @returns deletes all records of that category
 */

app.delete('/category/:category_name', async (req, res) => {
  const result = await pg
    .table('numberscategory')
    .where('category_name', req.params.category_name)
    .del(['id', 'uuid', 'category_name', 'category_id'])
    .then((res) => {
      return res; 
    })

  console.log('deleted record.');
  console.log(result);
  res.send(result);

  await pg
  .table('numbers')
  .where('category_name', req.params.category_name)
  .del(['id', 'uuid', 'number', 'answer','category_name', 'category_id','join_category', 'created_at','updated_at'])
  .then((res) => {
    return res; 
  })

console.log('deleted record.');
console.log(result);
res.send(result);
});


/**  update numbers record by uuid
 * @params uuid
 * @returns returns a status of 200 when updated or status of 404 when error
 */
app.put('/number/:uuid', async (req, res) => {
  const result = await pg
  .table('numbers')
  .where({ uuid: req.params.uuid})
    .update({ number: `1`, answer: `uneven number`, category_name: `math`, category_id: '1' })
    .returning('*')
    .then(function (result) {
      console.log(result);
      res.json(result);
      res.status(200).send();
    })
    .catch((e) => {
      console.log(e);
      res.status(404).send();
    });
});


app.get('/join', async (req, res) => {
  await pg
    .table('numbers')
    .join('numberscategory', pg.raw('numbers.category_id::varchar'), pg.raw('numberscategory.uuid::varchar'))
    .select('numberscategory.*', 'numbers.*')
    .then((data) => {
      res.send(data)
    })

})

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3001, () => console.log(`Listening on port ${process.env.PORT || 3001}`));
}

/**  Creates the tables: numbers & numbersCategory
 * @params 
 * @returns table numbers and numbersCategory
 */

async function initialiseTables() {
  await pg.schema.hasTable('numbers').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('numbers', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('number');
          table.string('answer');
          table.string('category_name');
          table.string('category_id');
          table.string('join_category');
          table.timestamps(true, true);
        })
        .then(async () => { 
          console.log('created table numbers');
          const uuid = Helpers.generateUUID();
          console.log('create the records '); 
          await pg.table('numbers').insert([ 
            { uuid, number: `1`, answer: `uneven number`, category_name: `math`, category_id: '1' },
            { uuid, number: `1`, answer: `first number`, category_name: `trivia`, category_id: '2' },
            { uuid, number: `1`, answer: `first day of the month`, category_name: `date`, category_id: '3' },
           
          ]);
         
        });

    }
  });
  await pg.schema.hasTable('numberscategory').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('numberscategory', (table) => {
          table.increments().primary();
          table.uuid('uuid');
          table.string('category_name');
          table.string('category_id');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table numberscategory');
          const uuid = Helpers.generateUUID();
          console.log('created the categories ');
          await pg.table('numberscategory').insert([
            { uuid, category_name: `math`, category_id: '1' },
            { uuid, category_name: `trivia`, category_id: '2' }, 
            { uuid, category_name: `date`, category_id: '3' }, 

          ]);
          
        });

    }
  });
}
initialiseTables()

module.exports = app