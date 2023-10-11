/*
Promise
非同期処理のコールバックをわかりやすく記述できるようにしたJSのビルトインオブジェクト
→コールバック関数を渡す代わりに、コールバックをアタッチしたオブジェクトを返すことで、ネストを深くすることなく、メソッド連鎖として書くことが可能
*/

const doSomethingAsync = () => {
    return new Promise((resolve, reject) => {
        // 非同期の処理が成功したらresolve()を呼ぶ
				setTimeout(() => { resolve(true) }, 1000)
				// 非同期の処理が失敗したらreject()を呼ぶ
				setTimeout(() => { reject(false) }, 1000)
    })
	}

	const successCallback = () => { console.log('成功！') }
	const failureCallback = () => { console.log('失敗！') }

	// thenとcatchを利用してみる
	doSomethingAsync().then(successCallback).catch(failureCallback)

	// thenのみを利用してみる
	doSomethingAsync().then(successCallback, failureCallback)


	// コールバックでネストを繰り返すとこうなる
	const task = (callback, name, total) => {
		setTimeout(() => {
			total += 1
			console.log(`${name} finished! Total is ${total}`);
			callback(total)
		})
	}
	// 非同期の処理を5回実行した場合
	task((total) => {
		task((total) => {
			task((total) => {
				task((total) => {
					task(() => {}, 'task5', total)
				}, 'task4', total)
			}, 'task3', total)
		}, 'task2', total)
	}, 'task1', 0)

	// コールバックをPromiseで書き換えるとこうなる
	const taskPromise = (name, total) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				total += 1
				console.log(`${name} finished! Total is ${total}`);
				resolve(total)
			}, 1000)
		})
	}

	taskPromise('task1', 0).then(total => taskPromise('task2', total))
	.then(total => taskPromise('task3', total))
	.then(total => taskPromise('task4', total))
	.then(total => taskPromise('task5', total))

	