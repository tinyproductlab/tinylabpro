import { CopyName } from './copy-name';

const codeBlock = /(<pre\b[^>]*><code(?:\s[^>]*)?>[\s\S]*?<\/code><\/pre>)/g;
const entities: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", '#x27': "'" };

export function TutorialSection({ html }: { html: string }) {
  return html.split(codeBlock).map((section, index) => {
    if (index % 2 === 0) {
      return section.trim() ? <div key={index} dangerouslySetInnerHTML={{ __html: section }} /> : null;
    }

    const command = section
      .replace(/^<pre\b[^>]*><code(?:\s[^>]*)?>|<\/code><\/pre>$/g, '')
      .replace(/&(amp|lt|gt|quot|#39|#x27);/g, (_, entity: string) => entities[entity])
      .replace(/\n$/, '');

    return <div key={index} className="my-4">
      <div className="flex justify-end pb-1">
        <CopyName name={command} label="一键复制代码" buttonText="一键复制" />
      </div>
      <pre className="!mt-0 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100"><code>{command}</code></pre>
    </div>;
  });
}
