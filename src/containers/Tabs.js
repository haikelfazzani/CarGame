import React, { useEffect, useState } from 'react';
import '../styles/Tabs.css';
import LocalData from '../util/LocalData';

export default function Tabs ({ editorState, setEditorState, setResult }) {

  const [tabsState, setTabsState] = useState({
    code: '',
    tabs: LocalData.getTabs(),
    currTabIndex: 0,
    nbTabs: LocalData.getTabs().length - 1
  });

  useEffect(() => {
    tabsState.tabs.find(t => t.index === tabsState.currTabIndex).code = editorState;
    setTabsState({ ...tabsState, tabs: tabsState.tabs });

    localStorage.setItem('reacto-tabs', JSON.stringify(tabsState.tabs));

    let r = tabsState.tabs.reduce((a, c) => c.code + '\n' + a, '');
    setResult(r);
  }, [editorState, setEditorState, setResult]);

  const onAddTab = () => {
    let cnt = tabsState.nbTabs + 1;
    let tab = { name: 'Comp' + cnt, code: '', index: cnt };

    setTabsState({
      ...tabsState,
      currTabIndex: cnt,
      nbTabs: cnt,
      tabs: [...tabsState.tabs, tab],
      code: ''
    });
    setEditorState('');
  }

  const onClickTab = (tabIdx) => {
    let tab = tabsState.tabs.find(t => t.index === tabIdx);

    if (tab) {
      setTabsState({ ...tabsState, currTabIndex: tabIdx, code: tab.code });
      setEditorState(tab.code);
    }
  }

  const onRemoveTab = (tabIdx) => {
    if (tabIdx !== 0) {
      let newTabs = tabsState.tabs.filter(t => t.index !== tabIdx);
      newTabs = newTabs.map((n, i) => {
        return { ...n, index: n.index = i }
      });

      setTabsState({ ...tabsState, tabs: newTabs, currTabIndex: 0, nbTabs: newTabs.length - 1 });
      setEditorState(tabsState.tabs[0].code);
      localStorage.setItem('reacto-tabs', JSON.stringify(newTabs));
    }
  }

  return (
    <header className="tabs overflow-auto">
      <ul>
        {tabsState.tabs.map((tab, i) => {
          return <li key={'tab' + i} className={'tab ' + (tabsState.currTabIndex === i ? 'active-tab' : '')}>
            <span onClick={() => { onClickTab(tab.index) }} className="mr-2">{tab.name}</span>
            <span onClick={() => { onRemoveTab(tab.index) }} className="btn-rm">x</span>
          </li>
        })}
      </ul>
      <button className="btn-plus" onClick={() => { onAddTab() }}>
        <i className="fa fa-plus"></i>
      </button>
    </header>
  );
}