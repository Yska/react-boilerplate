import conf from 'nconf'
import sendWithSmtp from './sendWithSmtp'
import layout from './layout'

const DOMAIN = conf.get('DOMAIN')
const templates = require('./templates')

async function sendEmail (data) {
  try {
    if (!data) throw new Error('Missing data.')
    const { template, templateParams = {} } = data
    const templateFn = templates[template]

    let mailOptions = Object.assign(
      templateFn ? templateFn(templateParams) : {},
      data.options
    )
    const { html } = mailOptions
    if (html) mailOptions.html = layout(html)
    if (!mailOptions.from) mailOptions.from = `support@${DOMAIN}`
    const res = await sendWithSmtp(mailOptions)
    console.log(`Sendemail - sent to ${res.accepted.join(', ')}`)
  } catch (err) {
    throw new Error(`Sendmail - ${err.message}`)
  }
}

module.exports = sendEmail
