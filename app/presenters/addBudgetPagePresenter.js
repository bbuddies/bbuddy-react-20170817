import present from './presenter'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import isNumber from 'lodash/isNumber'
import toNumber from 'lodash/toNumber'
import * as BudgetActions from '../actions/budget'
import * as NavigationActions from '../actions/navigation'

export class AddBudgetPagePresenter {
  constructor(props){
    this.props = props
  }
  getProps(){
    return {
      addBudget: budget => this.addBudget(budget),
      verfiyMonth: month => this.verfiyMonth(month),
      verfiyAmount: amount => this.verfiyAmount(amount)
    }
  }
  addBudget(budget){
    // const verfiyMonthResult = this.verfiyMonth(budget.month)
    // const verfiyAmountResult = this.verfiyAmount(budget.amount)
    // if(verfiyMonthResult.valid){
      this.props.addBudget(budget, () => {this.props.goBack()})
    // }
  }

  verfiyMonth(month){
    var result = { valid: false, msg: '' }
    if(!month){
      result.msg = '没有填写月份'
      return result   
    }

    if(!/^\d{4}-\d{2}$/.test(month)){
      result.msg = '月份的格式不正确'
      return result
    }

    result.valid = true
    return result
  }

  verfiyAmount(amount){
    return isNumber(amount)

    var result = { valid: false, msg: '' }
    if(!amount){
      result.msg = '没有填写金额'
      return result   
    }
    const amountNumber = toNumber(amount)
    if(!isNumber(amountNumber)){
      result.msg = '填写的不是数字'
      return result
    }
    console.log(amountNumber)
    if(amountNumber <= 0) {
      result.msg = '金额数字不能小于或等于0'
      return result
    }

    result.valid = true
    return result
  }

  static mapStateToProps(state) {
    return {}
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators(merge({}, BudgetActions, NavigationActions), dispatch)
  }
}

export default present(AddBudgetPagePresenter)
