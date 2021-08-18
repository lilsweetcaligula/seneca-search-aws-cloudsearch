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


      console.dir(out, { depth: 32 }) // dbg

      const hits = out.hits.hit.map(hit => {
        const { id, fields } = hit


        const doc = Object.keys(fields).reduce((acc, k) => {
          /* NOTE: AWS.CloudSearchDomain#search wraps values in arrays,
           * like this:
           *
              ```
              {
                hits: {
                  found: 3,
                  start: 0,
                  hit: [
                    { id: '1002', fields: { name: [ 'foo' ], extra: [ 'bob' ] } }
                  ]
                }
              }
              ```

           * - hence, we unwrap the values.
           *
           */

          acc[k] = fields[k][0]

          return acc
        }, {})


        return { id, doc }
      })


      return reply(null, { ok: true, data: { hits } })
    })
  })


  return
}


module.exports = search_aws
