const getUser = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const Users = [
        {
          'id': 1,
          'name': 'One',
          'salary': 100
        },
        {
          'id': 2,
          'name': 'Two',
          'salary': 200
        },
        {
          'id': 3,
          'name': 'Three',
          'salary': 300
        },
        {
          'id': 4,
          'name': 'Four',
          'salary': 400
        },
      ]
      const user = Users.find(user => user.id === userId)
      if (!user) {
        reject(new Error('User not found'))
      }

      resolve(user)
    }, Math.random() * 2000)

  })
}

// getUser(1).then(user => {
//   console.log(user)
// }).catch(error => {
//   console.log(error)
// })

const ids = [1, 3, 4]
let total = 0


  /**
   * Callback
   */
  // const receiveSalary = (ids, callback) => {
  //   let total = 0
  //   let count = 0
  //   for (const id of ids) {
  //     // console.log(id)
  //     getUser(id).then(user => {
  //       total += user.salary
  //       count++
  //       console.log(id, user.salary, count)
  //       if (count === ids.length) {
  //         callback(total)
  //       }
  //     })
  //   }
  // }

  // receiveSalary(ids, (total) => {
  //   console.log(total)
  // })

  /**
   * For
   */
  // for (const id of ids) {
  //   getUser(id).then(user => {
  //     total += user.salary;
  //     count++;
  //     console.log(user, user.salary);
  //     if (count === ids.length) {
  //       console.log(total)
  //     }
  //   });
  // }

  /**
   * Promise khác
   */
  // const promiseKhac = new Promise((resolve, reject) => {
  //   let total = 0;
  //   let count = 0;

  //   for (const id of ids) {
  //     getUser(id).then(user => {
  //       console.log(user, user.salary);
  //       total += user.salary;
  //       count++;

  //       if (count === ids.length) {
  //         resolve(total);
  //       }
  //     })
  //   }
  // });

  // promiseKhac.then(total => {
  //   console.log(total);
  // });


  /**
   * Promise.all
   */
  // const arrayPromise = ids.map(id => getUser(id))
  // Promise.all(arrayPromise).then(users => {
  //   console.log(users)
  //   const total = users.reduce((acc, user) => acc + user.salary, 0)
  //   console.log(total)
  // })


  /**
   * Async/await
   */

  // const doSomething = async () => {
  //   try {
  //     const user1 = await getUser(1)
  //     const user3 = await getUser(3)
  //     const user45 = await getUser(45)
  //     console.log(user1, user3, user45)
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }

  // doSomething()

  /**
   * IIFE
   */
  (async () => {
    let total = 0;

    for (const id of ids) {
      const user = await getUser(id)
      total += user.salary
    }
    console.log(total)
  })();

