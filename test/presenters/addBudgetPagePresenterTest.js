import {AddBudgetPagePresenter} from '../../app/presenters/addBudgetPagePresenter'

describe('AddBudgetPAgePresenter', () => {
  context('Save budget', () => {
    let addBudgetStub, goBackSpy
    beforeEach(() => {
      let props = {addBudget: () => {}, goBack: () => {}}
      addBudgetStub = sinon.stub(props, 'addBudget').yields()
      goBackSpy = sinon.spy(props, 'goBack')
      let presenter = new AddBudgetPagePresenter(props)
      presenter.getProps().addBudget({month: '2017-08', balance: '1000'})
    })
    it('save by action', () => {
      addBudgetStub.should.be.calledWith({month: '2017-08', balance: '1000'}, sinon.match.any)
    })
    it('go back after saving', () => {
      goBackSpy.should.be.called
    })
    it('2017-12 should be valid', () => {
      let presenter = new AddBudgetPagePresenter()
      presenter.getProps().verfiyMonth('2017-12').valid.should.be.true
    })
    it('2017-121 should be invalid', () => {
      let presenter = new AddBudgetPagePresenter()
      presenter.getProps().verfiyMonth('2017-121').msg.should.equal('月份的格式不正确')
    })
    it('empty string should be invalid', () => {
      let presenter = new AddBudgetPagePresenter()
      presenter.getProps().verfiyMonth('').msg.should.equal('没有填写月份')
    })
  })

  context('map props', () => {
    it('from state with nothing', () => {
      AddBudgetPagePresenter.mapStateToProps().should.be.eql({})
    })
    it('with account & navigation actions', () => {
      AddBudgetPagePresenter.mapDispatchToProps().should.include.keys('addBudget', 'goBack')
    })
  })
})
