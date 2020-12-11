import React, { useEffect } from 'react';
import Split from 'react-split';

export default function SplitPane ({ children }) {

  const onDrag = (e) => {
    try {
      let section = document.querySelector('.editor');
      let editor = document.querySelector('.editor section div');

      let width = section.clientWidth;

      editor.style.width = width + 'px';
    } catch (error) { }
  }

  useEffect(() => {
    window.addEventListener('resize', (e) => {
      try {
        let section = document.querySelector('.editor section');
        let editor = document.querySelector('.editor section div');

        let width = section.clientWidth;

        editor.style.width = width + 'px';
      } catch (error) { }
    });
  }, []);

  return <Split split="vertical" onDrag={onDrag}>{children}</Split>;
}