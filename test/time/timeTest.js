import getNow from '../../app/time/time'
import * as Now from '../../app/time/now'

describe('time', () => {
  it('shows current time in format', () => {
    sinon.stub(Now, 'default').returns(new Date(2017, 6, 1))
    getNow().should.be.eql('2017-07-01')
  })
})
