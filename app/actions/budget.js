import {createBudget, ADD_BUDGET_SUCCESS, fetchBudgets, updateBudget, UPDATE_BUDGET_SUCCESS} from "./budget.generated";

export function loadBudgets(){
  return (dispatch, getState) => {
    dispatch(fetchBudgets())
  }
}

export function addBudget(budget, success){
  return (dispatch, getState) => {
    dispatch(createBudget(budget)).then(action => {
      if (action.type == ADD_BUDGET_SUCCESS){
        success()
      }
    })
  }
}

export function modifyBudget(budget, success){
  return (dispatch, getState) => {
    dispatch(updateBudget(budget)).then(action => {
      if (action.type == UPDATE_BUDGET_SUCCESS){
        success()
      }
    })
  } 
}