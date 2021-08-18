const Seneca = require('seneca')
const SenecaSearchAws = require('./search-aws')


async function run() {
  const seneca = Seneca()


  seneca.use(SenecaSearchAws, {
    csd: {
      endpoint: 'http://localhost:15808',
      region: 'us-west-1'
    }
  })


  seneca.use('promisify')


  const out = await seneca.post('sys:search,cmd:search', {
    query: 'bob'
  })

  console.dir(out, { depth: 32 }) // dbg


  return
}


run()
