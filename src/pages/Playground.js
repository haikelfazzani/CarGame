import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { GlobalContext } from '../store/GlobalStore';
import Split from 'react-split';

import AddLib from '../containers/AddLib';
import Modal from '../components/Modal';

import Editor from "@monaco-editor/react";
import Languages from '../utils/Languages';
import ConsoleHeader from '../containers/ConsoleHeader';
import OutputHeader from '../containers/OutputHeader';

import RunJs from '../utils/RunJs';
import Snackbar from '../components/Snackbar';
import Tabs from '../utils/Tabs';
import '../styles/Playground.css';

function Playground() {
  const isMobile = window.innerWidth < 700,
    params = new URLSearchParams(window.location.search);

  const { gstate, dispatch } = useContext(GlobalContext);
  const { tabIndex, editorOptions } = gstate;

  let lang = params.get('language'),
    code = params.get('code'),
    theme = params.get('theme') || editorOptions.theme,
    fontSize = params.get('fontSize') || editorOptions.fontSize,
    minimap = params.get('minimap') || editorOptions.minimap.enabled,
    tabSize = params.get('tabSize') || editorOptions.tabSize;

  const [message, setMessage] = useState('');

  const onEditorDidMount = (editor, monaco) => {
    let language = gstate.language;
    if (lang) {
      language = Languages.find(l => l.name === lang);
    }

    const runner = () => {
      dispatch({ type: 'isRunning', payload: { isRunning: true } });
      RunJs.run(Tabs.getContent(), gstate.language.name);
    }

    dispatch({ type: 'language', payload: { language } });
    editor.getModel().updateOptions({ fontSize, tabSize, minimap: { enabled: minimap } });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runner);
    monaco.editor.setModelLanguage(editor.getModel(), language.syntax);
  }

  const onMessageFromWorker = (e) => {
    const data = e.data;

    if (data && (/webpack/gi.test(data.type || data) || data.vscodeSetImmediateId)) return;

    if (data.type && data.type === 'transpiler-error') {
      RunJs.run(Tabs.getContent(), gstate.language.name);
      return;
    }

    setMessage(data);
    dispatch({ type: 'isRunning', payload: { isRunning: false } });
    localStorage.setItem('output', data);
  }

  const onEditorValueChange = value => {
    Tabs.updateOne(tabIndex, value);
  }

  useEffect(() => {
    try {
      if (code) {
        Tabs.updateOne(0, decodeURIComponent(atob(code)));
      }
    } catch (error) {
      console.log(error.message);
    }

    window.addEventListener("message", onMessageFromWorker, false);
    return () => {
      window.removeEventListener("message", onMessageFromWorker, false);
    }
  }, []);

  return <main>
    <Split direction={isMobile ? "vertical" : "horizontal"}
      minSize={0} gutterSize={7} className={"h-100 bg-dark playground d-flex" + (isMobile ? " flex-column" : "")}>
      <div className="h-100 bg-dark editor br7">
        <ConsoleHeader />

        <Editor
          height="calc(100% - 45px)"
          language={gstate.language.syntax}
          value={Tabs.getOne(tabIndex).content}
          path={'app-' + tabIndex + '.' + gstate.language.extension}
          onChange={onEditorValueChange}
          onMount={onEditorDidMount}
          theme={theme}
          options={editorOptions}
        />
      </div>

      <div className="w-100 h-100 output">
        <OutputHeader />
        {gstate.language.name === 'html'
          ? <iframe className='w-100 h-100' title='sandbox' srcDoc={message}></iframe>
          : <pre className='w-100' style={{ fontSize: fontSize + 'px' }} dangerouslySetInnerHTML={{ __html: message }}></pre>}
      </div>
    </Split>

    <Modal showModal={gstate.showAddLibModal} setShowModal={() => { dispatch({ type: 'show-add-lib-modal' }) }}><AddLib /></Modal>

    <Modal showModal={gstate.showInfoModal} setShowModal={() => { dispatch({ type: 'show-info-modal' }) }}>
      <pre className='p-0'>
        <h3 className='blue'>How to embed Vconsole into your website</h3>
        {`const code = encodeURIComponent(btoa("console.log('hello')"));
const language = 'livescript';
const theme = 'vs-dark'; // or 'vs-light'

https://vconsole.ml?language=language&code=code&theme=theme`}
        <hr />
        <h3 className='blue'>Shortcuts</h3>
        CtrlCmd + Enter: Run code
      </pre>
    </Modal>

    <Snackbar />
  </main>;
}

export default withRouter(Playground);
