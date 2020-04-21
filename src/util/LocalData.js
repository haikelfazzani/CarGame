const codeJsx = `function Button({ onClick }) {
  return <button onClick={onClick}>click</button>
}

function App() {
  const [count, setCount] = React.useState(0);
  
  const onCount = () => setCount(count + 1);
  
  return <div>
    {count} <Button onClick={onCount} />
  </div>
}

render(<App />, document.getElementById('root'))`;

export default class LocalData {

  static getTabs () {
    let tabsEncoded = window.location.search.split('=')[1];
    let decodedTabs = null;
    if (tabsEncoded) { 
      decodedTabs = window.atob(tabsEncoded); 
      decodedTabs = JSON.parse(decodedTabs)
    }

    let tab = { name: 'App.js', code: codeJsx, index: 0 };
    let local = localStorage.getItem('reacto-tabs');
    return decodedTabs || (local ? JSON.parse(local) : [tab]);
  }

  static getFirstTabCode () {
    return this.getTabs()[0].code || codeJsx;
  }

  static getResult () {
    return this.getTabs().reduce((a, c) => c.code + '\n' + a, '');
  }
}