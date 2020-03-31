const { Router } = require('express')
const router = Router()

router.use((req, res, next) => {
  if (typeof req.session.conjunto1 == 'undefined') {
    req.session.conjunto1 = []
    req.session.conjunto2 = []
    req.session.inter = []
    req.session.conjuntoOriginal1 = []
    req.session.conjuntoOriginal2 = []
  }
  next()
})

router.get('/', (req, res) => {
  res.render('conjuntos', {
    conjunto1: req.session.conjunto1,
    conjunto2: req.session.conjunto2,
    inter: req.session.inter,
    original1: req.session.conjuntoOriginal1,
    original2: req.session.conjuntoOriginal2
  })
})

router.post('/', (req, res, next) => {
  let conjunto = req.body.conjuntos1
  let conjunto2 = req.body.conjuntos2
  req.session.conjuntoOriginal1 = conjunto
  req.session.conjuntoOriginal2 = conjunto2 
  // let fix = conjunto.join(',')
  let aux = []
  let fix1 = conjunto.split(',')
  let fix2 = conjunto2.split(',')
  // xif1.push(req.body.conjuntos)
  // xif2.push(req.body.conjuntos2)
  for (let item1 of fix1) {
    for (let item2 of fix2) {
      if( item1 === item2){
        console.log(item1)
        aux.push(item1)
      }
    }
  }
  let newAux1 = fix1.filter(item => {
    return !fix2.includes(item)
  })
  let newAux2 = fix2.filter(item => {
    return !fix1.includes(item)
  })

  req.session.inter = aux
  req.session.conjunto1 = newAux1
  req.session.conjunto2 = newAux2
  res.redirect('/conjuntos')
})

// router.get('/', (req,res) => {
//   console.log("req: "+req.params)
//   console.log("req: "+req.body)

// res.redirect('/conjuntos')
// })

module.exports = router
