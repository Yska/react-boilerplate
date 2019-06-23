export default function setAdmin (backend) {
  return (req, res, next) => {
    let model = req.model
    if (backend.ADMINS.includes(req.session.userId)) {
      model.set('_session.isAdmin', true)
      if (!req.session.isAdmin) req.session.isAdmin = true
    } else {
      if (req.session.isAdmin) delete req.session.isAdmin
    }
    next()
  }
}
