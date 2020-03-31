const { Router } = require('express')
const router = Router()

router.use((req,res,next) => {
  if(typeof req.session.listaDeTareas == 'undefined') {
    req.session.listaDeTareas = []
    console.log(req.session.listaDeTareas)
  }
  next()
})

router.get('/', (req, res) => {
  res.render('index.ejs', {
    listaDeTareas: req.session.listaDeTareas,
  })
})

router.post('/add', (req, res, next) => {
  // if(req.body.listaDeTareas)
  let nuevaTarea = req.body.nuevaTarea
  console.log(nuevaTarea)
  if (nuevaTarea != '') {
    req.session.listaDeTareas.push(nuevaTarea)
  }
  res.redirect('/todo')
})

router.get('/delete/:id', (req, res) => {
  let id = req.params.id
  if(id != '') {
    console.log(req.session.listaDeTareas)
    console.log(id+":id")
    req.session.listaDeTareas.splice(id,1)
  }

  res.redirect('/todo')
})
module.exports = router
