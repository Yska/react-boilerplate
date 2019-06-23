const COLLECTIONS = ['auths']

function allowAll (backend, collection) {
  backend.allowRead(collection, () => true)
  backend.allowCreate(collection, () => true)
  backend.allowUpdate(collection, () => true)
  backend.allowDelete(collection, () => true)
}

function allowAllForCollections (backend, collections) {
  for (let collection of collections) {
    allowAll(backend, collection)
  }
}

module.exports = (backend) => {
  allowAllForCollections(backend, COLLECTIONS)
  // how to block some access for client operation see sharedb-access
}
