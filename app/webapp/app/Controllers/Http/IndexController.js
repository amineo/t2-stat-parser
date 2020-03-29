'use strict'

class IndexController {

  index({ inertia }) {
    const pageTitle = "Home!"
   return inertia.render('Index', { pageTitle }, { edgeVar: 'server-variable' })
  }

}

module.exports = IndexController
