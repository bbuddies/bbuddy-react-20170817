import {addBudget, loadBudgets, modifyBudget} from "../../app/actions/budget";
import * as actions from "../../app/actions/budget.generated";

describe('budget action', () =>{
  let dispatch, getState, budget, success
  beforeEach(() => {
    dispatch = sinon.stub().returns(Promise.resolve({}))
    getState = null
    budget = {}
    success = sinon.spy()
  })
  it('load budgets', () => {
    loadBudgets()(dispatch, getState)
    dispatch.should.be.calledWith(actions.fetchBudgets())
  })
  context('add budget', () => {
    it('dispatch create budget', () => {
      addBudget(budget, success)(dispatch, getState)
      dispatch.should.be.calledWith(actions.createBudget(budget))
    })
    it('callback when add success', () => {
      dispatch.returns(Promise.resolve({type: actions.ADD_BUDGET_SUCCESS}))
      addBudget(budget, success)(dispatch, getState)
      success.should.be.called
    })
    it('no callback when add fail', () => {
      dispatch.returns(Promise.resolve({type: actions.ADD_BUDGET_FAILURE}))
      addBudget(budget, success)(dispatch, getState)
      success.should.not.be.called
    })
  })
  context('modify budget', () => {
    it('dispatch modify budget', () => {
      modifyBudget(budget, success)(dispatch, getState)
      dispatch.should.be.calledWith(actions.updateBudget(budget))
    })
    it('callback when modify success', () => {
      dispatch.returns(Promise.resolve({type: actions.UPDATE_BUDGET_SUCCESS}))
      modifyBudget(budget, success)(dispatch, getState)
      success.should.be.called
    })
    it('no callback when modify fail', () => {
      dispatch.returns(Promise.resolve({type: actions.UPDATE_BUDGET_FAILURE}))
      modifyBudget(budget, success)(dispatch, getState)
      success.should.not.be.called
    })
  })
})
