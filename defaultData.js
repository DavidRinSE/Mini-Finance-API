const defaultData = {
    user: {
            balance: 16642,
            income: 47500,
            expense: 30858,
            transactions: [
              {
                name: 'Job 1',
                category: 'undefined',
                amount: 47500,
                date: '2020-07-24',
                isExpense: false,
              },
              {
                name: 'Car gas',
                category: 'Gas',
                amount: 2575,
                date: '2020-07-25',
                isExpense: true,
              },
              {
                name: 'Car Gas',
                category: 'Gas',
                amount: 2630,
                date: '2020-07-29',
                isExpense: true,
              },
              {
                name: 'Car Gas',
                category: 'Gas',
                amount: 2430,
                date: '2020-08-06',
                isExpense: true,
              },
              {
                name: 'Snacks',
                category: 'Snacks',
                amount: 1000,
                date: '2020-07-25',
                isExpense: true,
              },
              {
                name: 'Snacks',
                category: 'Snacks',
                amount: 850,
                date: '2020-07-29',
                isExpense: true,
              },
              {
                name: 'Snacks',
                category: 'Snacks',
                amount: 520,
                date: '2020-07-30',
                isExpense: true,
              },
              {
                name: 'Snacks',
                category: 'Snacks',
                amount: 1230,
                date: '2020-08-05',
                isExpense: true,
              },
              {
                name: 'Drone Parts',
                category: 'Hobbies',
                amount: 12500,
                date: '2020-07-25',
                isExpense: true,
              },
              {
                name: 'Dinner',
                category: 'Food',
                amount: 1260,
                date: '2020-07-24',
                isExpense: true,
              },
              {
                name: 'Lunch',
                category: 'Food',
                amount: 630,
                date: '2020-07-27',
                isExpense: true,
              },
              {
                name: 'Dinner',
                category: 'Food',
                amount: 1265,
                date: '2020-07-28',
                isExpense: true,
              },
              {
                name: 'Dinner',
                category: 'Food',
                amount: 919,
                date: '2020-07-29',
                isExpense: true,
              },
              {
                name: 'Lunch',
                category: 'Food',
                amount: 1019,
                date: '2020-08-01',
                isExpense: true,
              },
              {
                name: 'Dinner',
                category: 'Food',
                amount: 2030,
                date: '2020-08-06',
                isExpense: true,
              }
            ]
        },
    history: [
        {
          balance: 3000,
          income: 40000,
          expense: 37000,
          startDate: '2020-05-15',
          endDate: '2020-05-29',
          categories: [
            {
              name: 'Gas',
              amount: '5000',
            },
            {
              name: 'Snacks',
              amount: '4500',
            },
            {
              name: 'Hobbies',
              amount: '10000',
            },
            {
              name: 'Food',
              amount: '17500',
            }
          ],
        },
        {
          balance: 10000,
          income: 52500,
          expense: 42500,
          startDate: '2020-05-29',
          endDate: '2020-06-12',
          categories: [
            {
              name: 'Food',
              amount: '20000',
            },
            {
              name: 'Gas',
              amount: '10000',
            },
            {
              name: 'Snacks',
              amount: '12500',
            }
          ],
        },
        {
          balance: 25577,
          income: 41700,
          expense: 16123,
          startDate: '2020-06-12',
          endDate: '2020-06-26',
          categories: [
            {
              name: 'Food',
              amount: '7500',
            },
            {
              name: 'Gas',
              amount: '7500',
            },
            {
              name: 'Snacks',
              amount: '1123',
            }
          ],
        },
        {
          balance: 1244,
          income: 37500,
          expense: 36256,
          startDate: '2020-06-26',
          endDate: '2020-07-10',
          categories: [
            {
              name: 'Food',
              amount: '12500',
            },
            {
              name: 'Gas',
              amount: '7500',
            },
            {
              name: 'Snacks',
              amount: '7556',
            },
            {
              name: 'Hobbies',
              amount: '8700',
            }
          ],
        },
        {
          balance: 18987,
          income: 50000,
          expense: 31013,
          startDate: '2020-07-10',
          endDate: '2020-07-24',
          categories: [
            {
              name: 'Gas',
              amount: '8663',
            },
            {
              name: 'Food',
              amount: '10230',
            },
            {
              name: 'Snacks',
              amount: '7584',
            },
            {
              name: 'Hobbies',
              amount: '4536',
            }
          ],
        }
      ]
}

const bcrypt = require("bcrypt")

const makeDefaultEntries = async (models) => {
    const searchUser = await models.User.findAll({where: {username: "default_user"}})
    let user;
    if (searchUser.length === 0) {
        const hash = await bcrypt.hash(process.env.DEFAULT_USER_PASS, 10)  // This can be found in docker-compose.yml. Don't worry, it's not the same as the deployed database ;-P
        user = await models.User.create({
            username: "default_user",
            password: hash,
            balance: defaultData.user.balance,
            income: defaultData.user.income,
            expense: defaultData.user.expense
        })
    } else {
        user = searchUser[0]
    }

    const defaultTransactions = await models.Transaction.findAll({where: {userId: user.id}})
    const defaultHistories = await models.History.findAll({where: {userId: user.id}})

    if (defaultTransactions.length === 0){
        const transactions = defaultData.user.transactions.map(data => {
            return {userId: user.id, ...data}
        })
        await models.Transaction.bulkCreate(transactions)
    }

    if (defaultHistories.length === 0) {
        for(let i = 0; i < defaultData.history.length; i++){ // Legacy for loop makes async easier
            const data = defaultData.history[i]
            history = await models.History.create({
                userId: user.id,
                balance: data.balance,
                income: data.income,
                expense: data.expense,
                startDate: data.startDate,
                endDate: data.endDate
            })
            const categories = data.categories.map(category => {
                return {historyId: history.id, ...category}
            })
            await models.HistoryCategory.bulkCreate(categories)
        }
    }
}

module.exports = makeDefaultEntries