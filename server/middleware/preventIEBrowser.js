export default function checkUserAgent (req, res, next) {
  let userAgent = req.get('User-Agent')
  if (userAgent.includes('MSIE ') || userAgent.includes('Trident/')) {
    res.send(`
        <div>
          Пожалуйста установите другой браузер.
        </div>
      `)
  } else {
    return next()
  }
}
