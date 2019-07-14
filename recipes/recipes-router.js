require('dotenv').config();


const router = require('express').Router();
const knex = require('knex')
const knexConfig = require('./knexfile')

// connect database to knex
const database = knex(knexConfig.development);

router.use(express.json())

// GET RECIPE table 
router.get('/', (req, res) => {
  database('recipes').then(recipe => {
    res.status(200).json(recipe);
  }).catch(error => {
    console.log(error);
    res.status(500).json(error);
  })
})

//POST to RECIPE table
router.post('/', (req, res) => {
  database('recipes').insert(req.body, ['id', 'name'])
    .then(ids => {
      database('recipes')
        .where({ id: ids[0] })
        .first()
        .then(r => {
          res.status(200).json(r)
        })
    }).catch(error => {
      res.status(500).json({ error: "POST ERROR!" })
    })
})



// GET RECIPE table with ID



router.get('/:id', (req, res) => {
  database('recipes')
    .where({ id: req.params.id })
    .first()
    .then(specificRecipeID => {
      if (specificRecipeID) {
        res.status(200).json(specificRecipeID);
      } else {
        res.status(404).json({ message: 'RECIPE Id not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
})


// DEL request to with ID
router.delete('/:id', (req, res) => {
  db('recipes')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? 'records DELETED' : 'record DELETED'}`
        })

      } else {
        res.status(404).json({ message: 'RECIPE does not exist' })
      }

    }).catch(error => {
      res.status(500).json(error)
    })

})


router.get('/now', (req, res) => {
  const now = new Date().toISOString();
  res.send(now);
});

module.exports = router;