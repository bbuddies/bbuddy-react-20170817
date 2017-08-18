import present from './presenter'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
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
    if (!validateResult.valid) {
      this.setState({
        errorTextForMonth: validateResult.message.month,
        errorTextForAmount: validateResult.message.amount
      })
      return
    }
    
    let existsBudget = _.find(this.props.budgets, {month: budget.month})
    let action = this.props.addBudget
    if(existsBudget) {
      budget.id = existsBudget.id
      action = this.props.modifyBudget
    }

    action(budget, () => {
      this.props.goBack()
    })

    // action(budget, () => this.props.goBack())
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
    return {budgets: state.entities.budgets}
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators(merge({}, BudgetActions, NavigationActions), dispatch)
  }
}

const
  isEmpty = value => !value.length
const
  invalidFormat = regex => value => !regex.test(value)
const
  isNegative = value => value <= 0
const
  emptyValidation = (field, chinese) =>
    [_.conforms({[field]: isEmpty}), _.constant({[field]: `没有填写${chinese}`})]
const
  formatValidation = (field, regex, chinese) =>
    [_.conforms({[field]: invalidFormat(regex)}), _.constant({[field]: `${chinese}的格式不正确`})]
const
  numberValidation = (field, chinese) =>
    [_.conforms({[field]: invalidFormat(/\d+/)}), _.constant({[field]: `填写的不是数字`})]
const
  postiveValidation = (field, chinese) =>
    [_.conforms({[field]: isNegative}), _.constant({[field]: `${chinese}数字不能小于或等于0`})]
const
  valid = () =>
    [_.stubTrue, _.constant('')]


const
  validateBudget = _.cond([
    emptyValidation('month', '月份'),
    formatValidation('month', /^\d{4}-\d{2}$/, '月份'),
    emptyValidation('amount', '金额'),
    numberValidation('amount', '金额'),
    postiveValidation('amount', '金额'),
    valid()
  ])

export default present(AddBudgetPagePresenter)
