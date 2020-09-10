/* server */
const app = require ('./app')

const port = 3000
app.listen(process.env.PORT || port, () => {
  //console.log(`Bare listening at port:${port}`)
  //the above line gives a misleading log in production
  console.log(`Bare listening`)
})
