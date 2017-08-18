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
      calcBudgets: timePeriod => this.calcBudgets(timePeriod)
    }
  }

  loadData(){
    this.props.loadBudgets()
  }

  calcBudgets({startAt, endAt}) {
    let total = 0
    const startYear = moment(startAt).years()
    const startMonth = moment(startAt).months() + 1
    const startDay = moment(startAt).get('date')
    const endYear = moment(endAt).years()
    const endMonth = moment(endAt).months()
    const endDay = moment(endAt).get('date')
    this.props.budgets.forEach(budget => {
      if (moment(startAt).isSame(moment(budget.month),'year') && moment(startAt).isSame(moment(budget.month),'month')) {
// console.log('sum startAt');
        const daysOfBudget = moment(budget.month).daysInMonth()
        const oneDayBudget = budget.amount / daysOfBudget

        let days = daysOfBudget
        if(moment(startAt).isSame(moment(endAt),'month')) {
          days = endDay
        }
        // console.log(daysOfBudget,'-',startDay,'=',daysOfBudget - startDay);
        // console.log(budget.amount,'/',daysOfBudget,'=',oneDayBudget);
        // console.log(oneDayBudget,'*',days - startDay+1,'=',oneDayBudget * (days - startDay+1));
        total += oneDayBudget * (days - startDay + 1)
      }
      if (moment(endAt).isSame(moment(budget.month),'year')
          && moment(endAt).isSame(moment(budget.month),'month')
          && !moment(startAt).isSame(moment(endAt),'month')) {
        console.log('sum endAt');
        const daysOfBudget = moment(budget.month).daysInMonth()
        const oneDayBudget = budget.amount / daysOfBudget
        // console.log(endDay,'=');
        // console.log(budget.amount,'/',daysOfBudget,'=',oneDayBudget);
        // console.log(oneDayBudget,'*',endDay,'=',oneDayBudget * endDay);
        total += oneDayBudget * endDay
      }
      if (moment(budget.month).isBetween(startAt, endAt,'month')){
        total += budget.amount
      }
    })
    this.setState({calcResult: Math.ceil(total)})
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
