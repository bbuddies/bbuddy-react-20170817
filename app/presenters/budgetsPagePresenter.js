import present from './presenter'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import values from 'lodash/values'
import _ from 'lodash'
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

  calcBudgets({startAt, endAt} = {}) {
    
    if(!startAt && !endAt)
      return false
  }

  findMatchedBudgets({startAt, endAt}) {
    return _.filter(this.props.budgets, (budget) => {
      console.log(budget.month)
      return moment(budget.month, 'YYYY-MM').isBetween(startAt, endAt)
    })
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
