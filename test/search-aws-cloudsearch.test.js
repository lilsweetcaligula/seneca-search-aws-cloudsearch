const Seneca = require('seneca')
const Shared = require('seneca-search-test')
const SearchAws = require('../search-aws-cloudsearch')


describe('Compliance tests', () => {
  const seneca = make_seneca()

  beforeAll(done => {
    seneca.ready(done)
  })

  Shared.supports_add({
    seneca
  })

  Shared.supports_search({
    seneca
  })

  Shared.supports_remove({
    seneca
  })
})


function make_seneca() {
  const si = Seneca({ log: 'test' })

  si.use(SearchAws, {
    csd: {
      endpoint: 'http://localhost:15808',
      region: 'us-west-1'
    }
  })

  return si
}

