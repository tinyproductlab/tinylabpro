'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CopyName } from './copy-name';

export function TutorialSection({ html }: { html: string }) {
  const content = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<{ toolbar: HTMLDivElement; text: string }[]>([]);

  useEffect(() => {
    const controls = Array.from(content.current?.querySelectorAll('pre > code') ?? []).flatMap(code => {
      const pre = code.parentElement;
      if (!pre) return [];

      const toolbar = document.createElement('div');
      toolbar.className = 'flex justify-end px-1 pb-1';
      pre.before(toolbar);
      return [{ toolbar, text: (code.textContent ?? '').replace(/\n$/, '') }];
    });

    setBlocks(controls);
    return () => controls.forEach(({ toolbar }) => toolbar.remove());
  }, [html]);

  return <>
    <div ref={content} dangerouslySetInnerHTML={{ __html: html }} />
    {blocks.map(({ toolbar, text }, index) => createPortal(
      <CopyName name={text} label="一键复制代码" buttonText="一键复制" />,
      toolbar,
      String(index),
    ))}
  </>;
}
