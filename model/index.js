import { Model } from 'racer'
import batchModel from './util/batchModel'
import { promisifyAll } from 'bluebird'
import GlobalModel from './Global'

// Promisify the default model methods like subscribe, fetch, set, push, etc.
promisifyAll(Model.prototype)

// Add batching method
Model.prototype.batch = batchModel

export default function (racer) {
  racer.orm('', GlobalModel, 'GlobalModel')
};
