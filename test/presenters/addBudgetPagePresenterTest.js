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
