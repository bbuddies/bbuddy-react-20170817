import present from './presenter'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import values from 'lodash/values'
import moment from 'moment'
import * as BudgetActions from '../actions/budget'
import * as NavigationActions from '../actions/navigation'
import _ from 'lodash'

export class BudgetsPagePresenter {
  constructor(props) {
    this.props = props
  }

  getProps() {
    return {
      calcBudgets: timePeriod => {
        this.setState({calcResult: this.calcBudgets(timePeriod)})
      }
    }
  }

  loadData() {
    this.props.loadBudgets()
  }

  getParamForTotal(budget) {
    const daysOfBudget = moment(budget.month).daysInMonth()
    const oneDayBudget = budget.amount / daysOfBudget
    return {daysOfBudget, oneDayBudget}
  }

  calcBudgets({startAt, endAt}) {
    let total = 0
    const startDay = moment(startAt).get('date')
    const endDay = moment(endAt).get('date')
    const {budgets} = this.props
    budgets && budgets.forEach(budget => {
      if (moment(startAt).isSame(moment(budget.month), 'year') && moment(startAt).isSame(moment(budget.month), 'month')) {
        const {daysOfBudget, oneDayBudget} = this.getParamForTotal(budget)
        let days = daysOfBudget
        if (moment(startAt).isSame(moment(endAt), 'month')) {
          days = endDay
        }
        total += oneDayBudget * (days - startDay + 1)
      }
      if (moment(endAt).isSame(moment(budget.month), 'year')
        && moment(endAt).isSame(moment(budget.month), 'month')
        && !moment(startAt).isSame(moment(endAt), 'month')) {
        const {daysOfBudget, oneDayBudget} = this.getParamForTotal(budget)
        total += oneDayBudget * endDay
      }
      if (moment(budget.month).isBetween(startAt, endAt, 'month')) {
        total += budget.amount
      }
    })
    return total.toFixed(2)
  }

  query({start, end}) {
    let startDate = moment(start, 'YYYY-MM-DD')
    let endDate = moment(end, 'YYYY-MM-DD')

    let budgetMonth = budget => moment(budget.month, 'YYYY-MM');
    let startOfBudget = budget => budgetMonth(budget).startOf('month')
    let endOfBudget = budget => budgetMonth(budget).endOf('month')
    let queryOverlappingAmount = (budget, {startDate, endDate}) => {
      const overlappingStart = startDate.isAfter(startOfBudget(budget)) ? startDate : startOfBudget(budget)
      const overlappingEnd = endDate.isBefore(endOfBudget(budget)) ? endDate : endOfBudget(budget);
      return budget.amount / budgetMonth(budget).daysInMonth() * dayCountBetween({start: overlappingStart, end: overlappingEnd})
    }
    let dayCountBetween = ({start, end}) => start.isAfter(end)? 0 : (end.diff(start, 'days') + 1)

    return _.sumBy(this.props.budgets, budget => queryOverlappingAmount(budget, {startDate, endDate}))
  }

  static mapStateToProps(state) {
    return {
      budgets: values(state.entities.budgets)
    }
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators(merge({}, BudgetActions, NavigationActions), dispatch)
  }
}

export default present(BudgetsPagePresenter)
