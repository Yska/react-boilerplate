import conf from 'nconf'

export default function (req, res) {
  const { name } = req.params
  const { secret = null } = req.body
  if (!secret || secret !== conf.get('MIGRATION_SECRET')) {
    return res.status(403).send('Restricted access!')
  }

  // Ignore dynamic webpack require
  const requireFunc =
    typeof __webpack_require__ === 'function'
      ? __non_webpack_require__
      : require
  const migration = requireFunc(`../migrations/${name}.js`)

  const model = req.model
  console.log(`>>>>> RUN MIGRATION ${name} <<<<<`)
  migration(model, { ...req.query }).then(() => {
    console.log(`>>>>> END MIGRATION ${name} <<<<<`)
    res.json(true)
  })
}
