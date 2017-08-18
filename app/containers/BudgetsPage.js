import React from 'react';
import {Card, CardTitle, CardText, TextField, CardActions, RaisedButton, Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui'

import preseter from '../presenters/BudgetsPagePresenter'

@preseter
export default class BudgetsPage extends React.Component {
  calcBudgets(){
    let startAt = this.refs.startAt.getValue()
    let endAt = this.refs.endAt.getValue()
    this.props.calcBudgets({startAt, endAt})
  }
  render() {
    const {budgets, goToAddBudget} = this.props
    return (
      <div>
        <Card>
          <CardTitle title='Budget Total'/>
          <CardText>
            <TextField fullWidth={true} id="startAt" ref="startAt" hintText="StartAt" floatingLabelText="StartAt" autoFocus />
            <TextField fullWidth={true} id="endAt" ref="endAt" hintText="EndAt" floatingLabelText="EndAt" />
            <div>
              <span>Total of amount in selected time period :</span>
              <span id="result">1000</span>
            </div>
          </CardText>
          <CardActions>
            <RaisedButton id='calc' label='Calc' primary={true} onTouchTap={() => this.calcBudgets()} />
          </CardActions>
        </Card>
        <br />
        <Card>
          <CardTitle title='Budgets'/>
          <CardText>
            <Table height='500px' fixedHeader={true} >
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn tooltip="Month">Month</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Amount">Amount</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody showRowHover={true} stripedRows={true}>
                {this.props.budgets.map((budget, index) => (
                  <TableRow key={index}>
                    <TableRowColumn>{budget.month}</TableRowColumn>
                    <TableRowColumn>{budget.amount}</TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardText>
          <CardActions>
            <RaisedButton label='Add' primary={true} onTouchTap={goToAddBudget}/>
          </CardActions>
        </Card>
      </div>
    )
  }
}
