import present from './presenter'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import * as BudgetActions from '../actions/budget'
import * as NavigationActions from '../actions/navigation'

export class AddBudgetPagePresenter {
  constructor(props){
    this.props = props
  }
  getProps(){
    return {
      addBudget: budget => this.addBudget(budget)
    }
  }
  addBudget(budget){
    this.props.addBudget(budget, () => {this.props.goBack()})
  }

  static mapStateToProps(state) {
    return {}
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators(merge({}, BudgetActions, NavigationActions), dispatch)
  }
}

export default present(AddBudgetPagePresenter)
