// canの型を定義
type CanType = {
  flavor: string;
  ounces: number;
};

// can1とcan2はそれぞれ同じプロパティと値を持つ
const can1: CanType = {
  flavor: "grape",
  ounces: 12,
};

const can2: CanType = {
  flavor: "grape",
  ounces: 12,
};

// can3はcan2の参照を持つ
const can3: CanType = can2;

// Canクラス
class Can {
  flavor: string;
  ounces: number;

  constructor({ flavor, ounces }: CanType) {
    this.flavor = flavor;
    this.ounces = ounces;
  }
}

// can4はCanクラスで生成されたオブジェクトでcan1、can2と同じプロパティを持つ
const can4 = new Can({
  flavor: "grape",
  ounces: 12,
});

// toBeを使用するとcan1とcan2は等しくないと評価される
test("can1 and can2 are not the exact same instance", () => {
  expect(can1).not.toBe(can2);
});

// can2とcan3は同じ参照を持つため、toBeを使用するとcan2とcan3は等しいと評価される
test("can2 and can3 have the same reference", () => {
  expect(can2).toBe(can3);
});


/* 
toBe, toEqual, toStrictEqualの使い分け
- toBeを利用するケース
	- 基本的にはプリミティブ型の比較に利用する
	- 同じオブジェクトの参照を持つ変数であることを評価(引数として渡したオブジェクトの参照を比較する)
- toEqualを利用するケース
	- オブジェクトのプロパティの値を比較する
- toStrictEqualを利用するケース
	- 生成元のクラス名やundefinedなプロパティ、配列内の未定義の要素とundefinedの評価を含めた厳密なオブジェクトの評価
*/