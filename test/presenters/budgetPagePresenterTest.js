import { BudgetsPagePresenter} from '../../app/presenters/budgetsPagePresenter'

describe('BudgetPagePresenter', () => {
    context('Calc Total Amount', () => {
        let presenter
        beforeEach(() => {
          let props = {
              budgets: [
                { month: '2016-10', amount: 3100 },
                { month: '2016-11', amount: 3000 },
                { month: '2017-01', amount: 3100 },
              ]}
          presenter = new BudgetsPagePresenter(props)
        })
        it('length of budgets between 2016-09-01 and 2016-10-02 should be 1', () => {
            presenter.findMatchedBudgets({startAt: '2016-09-01', endAt: '2016-10-02'}).length.should.be.equal(1)
        })
    })
})
