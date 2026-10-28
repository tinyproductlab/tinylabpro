'use client';

import { useRef, useState } from 'react';
import { inviteCode, inviteUrl } from './invitation';
import styles from './page.module.css';

export function InviteActions() {
  const codeField = useRef<HTMLInputElement>(null);
  const linkField = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState('');

  async function copy(kind: 'code' | 'link') {
    const label = kind === 'code' ? '邀请码' : '注册链接';
    const value = kind === 'code' ? inviteCode : inviteUrl;
    try {
      await navigator.clipboard.writeText(value);
      setStatus(`${label}已复制。`);
    } catch {
      const field = kind === 'code' ? codeField.current : linkField.current;
      field?.focus();
      field?.select();
      setStatus(`已选中${label}，请长按或手动复制。`);
    }
  }

  return <div className={styles.actions}>
    <label htmlFor="roogoo-link" className={styles.fieldLabel}>优先使用注册链接 · 已附带邀请码</label>
    <input id="roogoo-link" ref={linkField} readOnly value={inviteUrl} onFocus={event => event.currentTarget.select()} className={styles.linkField} />
    <button type="button" onClick={() => copy('link')} className={styles.secondary}>复制注册链接</button>
    <a href={inviteUrl} target="_blank" rel="sponsored nofollow noopener noreferrer" className={styles.primary}>使用邀请链接注册 <span aria-hidden="true">↗</span><span className="sr-only">（新窗口）</span></a>
    <label htmlFor="roogoo-code" className={styles.fieldLabel}>备用邀请码 · 需要手动填写时使用</label>
    <div className={styles.codeRow}>
      <input id="roogoo-code" ref={codeField} readOnly value={inviteCode} onFocus={event => event.currentTarget.select()} className={styles.code} />
      <button type="button" onClick={() => copy('code')} className={styles.secondary}>复制邀请码</button>
    </div>
    <p role="status" aria-live="polite" className={styles.status}>{status || '微信内无法打开时，可复制链接到系统浏览器。'}</p>
  </div>;
}
