import express from 'express'
// import { sendEmail } from './../services'
const router = express.Router()

router.post('/send-email', async (req, res) => {
  // EXAMPLE!!!
  // try {
  //   await sendEmail({
  //     options: {
  //       subject: 'Test email',
  //       html: '<span>We are glad to see you</span>',
  //       to: 'someemail@gmail.com'
  //     }
  //   })
  // } catch (err) {
  //   console.error(err.message)
  // }
  // return res.json('Email was sent')
})

export default router
