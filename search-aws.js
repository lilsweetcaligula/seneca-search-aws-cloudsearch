const AWS = require('aws-sdk')


function search_aws(options) {
  const seneca = this


  if (null == options.csd) {
    return seneca.fail('The "csd" option is required')
  }

  const { csd: csd_config } = options
  const csd = new AWS.CloudSearchDomain(csd_config)


  seneca.add('sys:search,cmd:search', function (msg, reply) {
    if (null == msg.query) {
      return {
        ok: false,
        why: 'invalid-field',
        details: {
          path: ['query'],
          why_exactly: 'required'
        }
      }
    }

    const { query } = msg


    /* NOTE: For more information, please see documentation at:
     *
     * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudSearchDomain.html#search-property
     *
     */
    const search_params = { query }
    
    return csd.search(search_params, function (err, out) {
      if (err) {
        return reply(err)
      }

      return reply(null, { ok: true, data: out })
    })
  })


  return
}


module.exports = search_aws
