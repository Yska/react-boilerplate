import { Model } from 'racer'

export default class BaseModel extends Model.ChildModel {
  getId () {
    let actualField = this.dereferenceSelf()
    return actualField.leaf()
  }

  getCollection () {
    let model = this.root
    let actualField = this.dereferenceSelf()
    return model._splitPath(actualField.path())[0]
  }

  dereferenceSelf () {
    let model = this.root
    let segments = model._splitPath(this.path())
    return model.scope(model._dereference(segments, true).join('.'))
  }

  isEqual ($item, cb) {
    let equal = $item && $item.get('id') && this.get('id') === $item.get('id')
    return cb(null, equal)
  }
}
