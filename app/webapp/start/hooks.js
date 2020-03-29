const { hooks } = require('@adonisjs/ignitor')
const { version } = require('../package.json')
const Helpers = use('Helpers')

const mixManifest = require(Helpers.publicPath('mix-manifest.json'))

hooks.after.providersBooted(async () => {
    const View = use('View')

    View.global('node_env', () => {
      return { "env": process.env.NODE_ENV, "hmr": process.env.WEBPACK_HMR }
    })

    View.global('versionjs', (filename) => {
        filename = `/dist/js/${filename}.js`
        if (!mixManifest.hasOwnProperty(filename)) {
            throw new Error('Could not find asset for versioning' + filename)
        }

        return mixManifest[filename]
    })

    View.global('versioncss', (filename) => {
        filename = `/dist/css/${filename}.css`
        if (!mixManifest.hasOwnProperty(filename)) {
            throw new Error('Could not find asset for versioning' + filename)
        }

        return mixManifest[filename]
    })

    const Inertia = use('Adonis/Addons/Inertia')

    // these vars get pushed to the inertia frontend
    Inertia.setVersion(version)
    Inertia.share('app.name', process.env.APP_NAME)
})
