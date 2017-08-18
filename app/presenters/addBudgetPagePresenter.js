import present from './presenter'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import isNumber from 'lodash/isNumber'
import toNumber from 'lodash/toNumber'
import _ from 'lodash'
import * as BudgetActions from '../actions/budget'
import * as NavigationActions from '../actions/navigation'

export class AddBudgetPagePresenter {
  constructor(props) {
    this.props = props
  }

  getProps() {
    return {
      addBudget: budget => this.addBudget(budget)
    }
  }

  addBudget(budget) {
    let validateResult = this.validate(budget);
    if (validateResult.valid) {
      this.props.addBudget(budget, () => {
        this.props.goBack()
      })
    } else {
      this.setState({
        errorTextForMonth: validateResult.message.month,
        errorTextForAmount: validateResult.message.amount
      })
    }
  }

  validate(budget) {
    let message = _(this.validations).chain()
      .find(validation => !validation.validate(budget))
      .defaultTo({message: {month: '', amount: ''}})
      .value().message
    return {valid: !message.month && !message.amount, message}
  }

  validations = [
    {validate: budget => budget.month, message: {month: '没有填写月份'}},
    {validate: budget => /^\d{4}-\d{2}$/.test(budget.month), message: {month: '月份的格式不正确'}},
    {validate: budget => budget.amount, message: {amount: '没有填写金额'}},
    {validate: budget => !isNaN(toNumber(budget.amount)), message: {amount: '填写的不是数字'}},
    {validate: budget => toNumber(budget.amount) > 0, message: {amount: '金额数字不能小于或等于0'}},
  ]

  static mapStateToProps(state) {
    return {}
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators(merge({}, BudgetActions, NavigationActions), dispatch)
  }
}

export default present(AddBudgetPagePresenter)
