// ◆「Booklist component」部分

// ⑬-3-ⅰ httpリクエスト：送った関数を実行するためにインポート
// →取得データを保持できない問題：react hooksの一種(useState)で解消
// →API無限ループになる問題：react hooksの一種(useEffect)解消
import React, { useState, useEffect } from "react";

// ③componentsのメイン処理：propsで親「app components」から子「booklist components」にデータ(divに入ったpの塊)を渡しますよ
// const Booklist = props => {
//   return (
//     <div>
//       <p>this is book list component</p>
//     </div>
//   );
// };

// ⑧App.jsxの29行目で送ったlanguage(0番目のReact)をデータで受け取る
// const Booklist = props => {
//   return (
//     <div>
//       <p>this is {props.language} list component</p>
//     </div>
//   );
// };

const Booklist = props => {

  // ⑬-3-ⅱ useStateを使うための処理
  // →bookData：データを保管しておくための変数
  // →setBookData：bookDataの値を更新するための関数
  // →null：bookDataの初期値
  const [bookData, setBookData] = useState(null);
  
  // ⑬-3-ⅲ useEffectを使うための処理
  // →配列の中身「props」：「bookData」が実行された時には実行されず、配列の中身に変化があった時に実行
  useEffect(() => {
    const result = props
      .getData?.(props.language)
      .then(response => setBookData(response));
  }, [props])

  // ⑫-3 「booklist components」で呼び出して関数を動かす ※子コンポーネント側処理
  // →`?`を使用することで，`getData`が存在する場合のみ関数を実行できる
  // const result = props.getData?.(props.language);

  return (
    <div>
      {/* ⑫-4 ⑫-3の結果を実際に出力する
          <p>this is {result} list component</p> */}

      {/* ⑬-3-ⅳ オブジェクトはそのまま表示できないのでJSON.stringify()する
      <p>this is {JSON.stringify(bookData)} list component</p> */}

      <ul>
          {/* {bookData.data.items.map(x =>
          <li>{x.volumeInfo.title}</li>
          )} */}
          {

            // ⑭-2 三項演算子を使い、nullならnow loading、nullじゃないなら⑭-1の処理)
            bookData === null
            ? <p>now loading...</p>

            // ⑭-1 表示を整える：bookDataの中のパラメータ「data」内の「items」の中で=書籍のデータが配列で入っている状態
            // この中にタイトルや著者など色々入っているので、map関数を使うことで、「volumeInfo」の「例：title」を指定して取り出す
            // →エラーが出る（APIからデータが返ってきていないから・・・
            : bookData.data.items.map((x, index) =>
            <li key={index}>{x.volumeInfo.title} (著者)：{x.volumeInfo.authors}・・・{x.volumeInfo.description}</li>
            )
          }
      </ul>
    </div>
  );
};
// ◆ Booklist componentsを呼び出せるようにエキスポートしている
export default Booklist;