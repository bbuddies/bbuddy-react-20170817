import {AddBudgetPagePresenter} from '../../app/presenters/addBudgetPagePresenter'

describe('AddBudgetPagePresenter', () => {
  context('Save budget', () => {
    let presenter, addBudgetStub, goBackSpy
    beforeEach(() => {
      let props = {addBudget: () => {}, goBack: () => {}}
      addBudgetStub = sinon.stub(props, 'addBudget').yields()
      goBackSpy = sinon.spy(props, 'goBack')
      presenter = new AddBudgetPagePresenter(props)
      presenter.setState = sinon.spy()
      presenter.getProps().addBudget({month: '2017-08', amount: '1000'})
    })
    it('save by action', () => {
      addBudgetStub.should.be.calledWith({month: '2017-08', amount: '1000'}, sinon.match.any)
    })
    it('go back after saving', () => {
      goBackSpy.should.be.called
    })
    it('2017-121 should be invalid', () => {
      presenter.getProps().addBudget({month: '2017-121', amount: '1000'})
      presenter.setState.should.be.calledWith(sinon.match.has('errorTextForMonth', '月份的格式不正确'))
    })
    it('empty string should be invalid', () => {
      presenter.getProps().addBudget({month: '', amount: '1000'})
      presenter.setState.should.be.calledWith(sinon.match.has('errorTextForMonth', '没有填写月份'))
    })
    it('empty amount should be invalid', () => {
      presenter.getProps().addBudget({month: '2017-12', amount: ''})
      presenter.setState.should.be.calledWith(sinon.match.has('errorTextForAmount', '没有填写金额'))
    })
    it('amount should be number', () => {
      presenter.getProps().addBudget({month: '2017-12', amount: 'not number'})
      presenter.setState.should.be.calledWith(sinon.match.has('errorTextForAmount', '填写的不是数字'))
    })
    it('amount should be greater than 0', () => {
      presenter.getProps().addBudget({month: '2017-12', amount: '-1'})
      presenter.setState.should.be.calledWith(sinon.match.has('errorTextForAmount', '金额数字不能小于或等于0'))
    })
  })

  context('map props', () => {
    it('from state with budgets', () => {
      let state = {entities: {budgets:[]}}
      AddBudgetPagePresenter.mapStateToProps(state).should.include.keys('budgets')
    })
    it('with account & navigation actions', () => {
      AddBudgetPagePresenter.mapDispatchToProps().should.include.keys('addBudget', 'goBack')
    })
  })
})
