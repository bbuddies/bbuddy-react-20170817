import present from './presenter'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import values from 'lodash/values'
import moment from 'moment'
import * as BudgetActions from '../actions/budget'
import * as NavigationActions from '../actions/navigation'

export class BudgetsPagePresenter {
  constructor(props){
    this.props = props
  }

  getProps() {
    return {
      calcBudgets: timePeriod => {
        this.setState({calcResult: this.calcBudgets(timePeriod)})
      }
    }
  }

  loadData(){
    this.props.loadBudgets()
  }

  calcBudgets({startAt, endAt}) {
    let total = 0
    const startYear = moment(startAt).year()
    const startMonth = moment(startAt).month() + 1
    const startDay = moment(startAt).get('date')
    const endYear = moment(endAt).year()
    const endMonth = moment(endAt).month()
    const endDay = moment(endAt).get('date')
    this.props.budgets.forEach(budget => {
      if (moment(startAt).isSame(moment(budget.month),'year') && moment(startAt).isSame(moment(budget.month),'month')) {
        const daysOfBudget = moment(budget.month).daysInMonth()
        const oneDayBudget = budget.amount / daysOfBudget

        let days = daysOfBudget
        if(moment(startAt).isSame(moment(endAt),'month')) {
          days = endDay
        }
        total += oneDayBudget * (days - startDay + 1)
      }
      if (moment(endAt).isSame(moment(budget.month),'year')
          && moment(endAt).isSame(moment(budget.month),'month')
          && !moment(startAt).isSame(moment(endAt),'month')) {
        const daysOfBudget = moment(budget.month).daysInMonth()
        const oneDayBudget = budget.amount / daysOfBudget
        total += oneDayBudget * endDay
      }
      if (moment(budget.month).isBetween(startAt, endAt,'month')){
        total += budget.amount
      }
    })
    return Math.ceil(total)
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
