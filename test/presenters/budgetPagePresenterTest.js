import { BudgetsPagePresenter} from '../../app/presenters/budgetsPagePresenter'

describe('BudgetPagePresenter', () => {
    context('Calc Total Amount', () => {
        let presenter
        beforeEach(() => {
          let props = {
              budgets: [
                { month: '2016-10', amount: 3100 },
                { month: '2016-08', amount: 3100 },
                { month: '2016-05', amount: 3100 },
                { month: '2016-11', amount: 3000 },
                { month: '2017-01', amount: 3100 },
                { month: '2008-02', amount: 2900 },
                { month: '2009-02', amount: 2900 },
              ]}
          presenter = new BudgetsPagePresenter(props)
        })
        it('budgets between 2016-09-01 and 2016-10-02 should be 200.00', () => {
            presenter.calcBudgets({startAt: '2016-09-01', endAt: '2016-10-02'}).should.be.equal('200.00')
        })
        it('budgets between 2016-10-01 and 2016-11-15 should be 4600.00', () => {
            presenter.calcBudgets({startAt: '2016-09-01', endAt: '2016-11-15'}).should.be.equal('4600.00')
        })
        it('budgets between 2017-02-01 and 2017-11-15 should be 0.00', () => {
            presenter.calcBudgets({startAt: '2017-02-01', endAt: '2017-11-15'}).should.be.equal('0.00')
        })
        it('budgets between 2008-02-01 and 2008-02-15 should be 1500.00', () => {
            presenter.calcBudgets({startAt: '2008-02-01', endAt: '2008-02-15'}).should.be.equal('1500.00')
        })
        it('budgets between 2009-02-01 and 2009-02-15 should be 1553.57', () => {
            presenter.calcBudgets({startAt: '2009-02-01', endAt: '2009-02-15'}).should.be.equal('1553.57')
        })
        it('budgets between 2016-05-01 and 2016-10-15 should be 7700.00', () => {
            presenter.calcBudgets({startAt: '2016-05-01', endAt: '2016-10-15'}).should.be.equal('7700.00')
        })
        it('budgets between 2008-01-01 and 2008-02-01 should be 100.00', () => {
            presenter.calcBudgets({startAt: '2008-01-01', endAt: '2008-02-01'}).should.be.equal('100.00')
        })
        it('budgets between 2008-02-01 and 2008-02-01 should be 100.00', () => {
            presenter.calcBudgets({startAt: '2008-02-01', endAt: '2008-02-01'}).should.be.equal('100.00')
        })
    })
})
