import {addBudget, loadBudgets} from "../../app/actions/budget";
import * as actions from "../../app/actions/budget.generated";

describe('budget action', () =>{
  let dispatch, getState, budget
  beforeEach(() => {
    dispatch = sinon.stub().returns(Promise.resolve({}))
    getState = null
    budget = {}
  })
  it('load budgets', () => {
    loadBudgets()(dispatch, getState)
    dispatch.should.be.calledWith(actions.fetchBudgets())
  })
  context('add budget', () => {
    let success
    beforeEach(() => {
      success = sinon.spy()
    })
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
})
