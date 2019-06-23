import nodemailer from 'nodemailer'
import conf from 'nconf'

const {
  ADMINS,
  STAGE,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD
} = conf.get()

const ALLOWED_DEV_EMAILS_REGEX = [
  /\.33mail\.com$/
]

const IGNORED_EMAILS_REGEX = [
  /@example\.com/,
  /@test\.com/,
  /@example\.org/
]

let smtpConfig = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD
  }
}

function isAllowedEmail (email) {
  if (STAGE === 'development') {
    if (ADMINS.includes(email)) return true
    for (const ALLOWED_DEV_EMAIL_REGEX of ALLOWED_DEV_EMAILS_REGEX) {
      if (ALLOWED_DEV_EMAIL_REGEX.test(email)) return true
    }
    return false
  } else {
    for (const IGNORED_EMAIL_REGEX of IGNORED_EMAILS_REGEX) {
      if (IGNORED_EMAIL_REGEX.test(email)) return false
    }
    return true
  }
}

if (STAGE === 'production') {
  smtpConfig = Object.assign({ debug: true }, smtpConfig)
}

const transporter = nodemailer.createTransport(smtpConfig)

async function sendWithSmtp (options) {
  let _options = Object.assign({}, options)
  let to = _options.to
  if (!Array.isArray(to)) to = [to]
  _options.to = to.filter(isAllowedEmail)
  return transporter.sendMail(options)
}

module.exports = sendWithSmtp
