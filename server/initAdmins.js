import conf from 'nconf'

export default async backend => {
  backend.ADMINS = []
  let model = backend.createModel()
  let $adminIds = model.at('service.adminIds')
  let $admins = model.query('auths', {
    email: {
      $in: conf.get('ADMINS') || []
    }
  })
  await model.fetchAsync($adminIds, $admins)
  if (!$adminIds.get()) {
    await model.addAsync('service', { id: 'adminIds', value: [] })
  }
  const adminIds = $adminIds.get('value')
  $admins.get().map(admin => {
    const adminId = admin.id
    if (!adminIds.includes(adminId)) {
      $adminIds.push('value', adminId)
    }
  })
  backend.ADMINS = $adminIds.get('value')
  console.log('Admins:', backend.ADMINS.length)
  model.close()
}
