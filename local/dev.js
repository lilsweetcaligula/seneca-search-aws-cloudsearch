const Assert = require('assert')
const Seneca = require('seneca')
const SenecaSearchAws = require('../search-aws-cloudsearch')


async function run() {
  const seneca = Seneca()


  seneca.use(SenecaSearchAws, {
    csd: {
      endpoint: 'http://localhost:15808',
      region: 'us-west-1'
    }
  })


  seneca.use('promisify')


  const docs = [
    { id: 1001, name: 'bob' },
    { id: 1002, name: 'foo', extra: 'bob' }
  ]

  for (const doc of docs) {
    const added = await seneca.post('sys:search,cmd:add', { doc })
    Assert(added.ok)
  }


  const out = await seneca.post('sys:search,cmd:search', {
    query: 'bob'
  })

  console.dir(out, { depth: 32 })


  return
}


run()
