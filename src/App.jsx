// ◆ index.jsの10行目(App component)を実際に書く部分
// ②「react」のインポート：reactのライブラリを使うよ
import React from "react";

// ④「booklist components」のインポート：booklist componentsを呼び出すよ
import Booklist from "./components/Booklist";

// ⑨-1 「React」・「Vue」・「Angular」の3つでページを分けるためにrouterをインポート
// →linkは⑪で使う
import { BrowserRouter, Route, Link } from 'react-router-dom';

// ⑬-1 httpリクエスト：reactの場合のライブラリ「axios」をインポート
import axios from 'axios';

// ⑫-1 関数の定義を「booklist components」にpropsの一つとして渡す ※親コンポーネント側処理
const getDataFromAPI = async keyword => {
  // return `${keyword} books`;

  // ⑬-2 httpリクエスト：APIに以下URLのリクエストを送る
  // →非同期だが、awaitの後に書くことで同期的に書くことが出来る
  const requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'
  const result = await axios.get(`${requestUrl}${keyword}`);
  return result;
};

// ①メイン画面の編集・index.jsの10行目(App conmponent)を実際に書く部分
const App = () => {

  // ⑥AppからBooklistに以下3つのデータを送る
  const languages = ["React", "Vue", "Angular"];
  return (

    // ⑨-2 routerを使うタグ
    <BrowserRouter>   {/* 追加（ルーティングは<BrowserRouter>の中で行う）*/}
      <div>
        <h1>react app</h1>
        {/* ⑤「booklist components」を表示させる
        <Booklist /> */}
        {/* ⑦「language」と名前を付けて、「booklist components」に
        21行目の「0：React」「1：Vue」「2：Angular」を送る
        <Booklist language={languages[0]} />
        <Booklist language={languages[1]} />
        <Booklist language={languages[2]} />
        */}

        {/* ⑨-3 3つをRouteで分けるよ
            →因みに・・・exactがないと、3つとも「/」で反応してしまう
        <Route exact path='/' component={Booklist} />
        <Route path='/vue' component={Booklist} />
        <Route path='/angular' component={Booklist} /> */}

        {/* ⑪毎回URL変更するのは面倒くさいので、リンクで3つがそれぞれ飛べるように設定する */}
        <ul>
          <li><Link to="/">React</Link></li>
          <li><Link to="/vue">Vue</Link></li>
          <li><Link to="/angular">Angular</Link></li>
        </ul>
        {/* ◇ あれこれ何やっけ？？？ */}
        <hr />

          <Route
            exact
            path='/'
            // ⑩ルーティングしながらpropsを渡せるようにここから下を変更
            render={
              props =>
                <Booklist
                  language={languages[0]}

                  // ⑫-2 keywordを入力することで、getDataという名前の関数として
                  getData={keyword => getDataFromAPI(keyword)}
                />
            }
          />
          <Route
            path='/vue'
            render={
              props =>
                <Booklist
                  language={languages[1]}
                  getData={(keyword) => getDataFromAPI(keyword)}
                />
            }
          />
          <Route
            path='/angular'
            render={
              props =>
                <Booklist
                  language={languages[2]}
                  getData={(keyword) => getDataFromAPI(keyword)}
                />
            }
          />
      </div>
    </BrowserRouter>
  );
};
export default App;