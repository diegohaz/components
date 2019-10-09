import * as React from 'react';
// @ts-ignore TODO: submit a PR to react-live types so that onChange doesn't override the onChange from context
import {LiveProvider, LiveEditor, LiveContext} from 'react-live';
import copy from 'clipboard-copy';
import {CodeScope} from './types';
import {parse} from './parse';
import {CodeSandboxButton} from './CodeSandboxButton';
import {
  Wrapper,
  Preview,
  EditorWrapper,
  EditorToolbar,
  Error,
  Imports,
} from './lazy.style';

export interface LazyCodeProps {
  scope?: CodeScope;
  language?: string;
  source: string;
  isPreviewable?: boolean;
}

// TODO: submit a PR to react-live types so that onChange doesn't override the onChange from context
const Editor = ({
  isDisabled,
  onChange,
}: {
  isDisabled: boolean;
  onChange: (code: string) => void;
}) => {
  const live = React.useContext<any>(LiveContext);
  return (
    <LiveEditor
      disabled={isDisabled}
      onChange={code => {
        live.onChange(code);
        onChange(code);
      }}
    />
  );
};

const LazyCode: React.FC<LazyCodeProps> = ({
  scope,
  source,
  isPreviewable = true,
}) => {
  const {imports, dependencies, code} = parse(source);
  const body = React.useRef(code);

  const handleChange = (code: string) => (body.current = code);

  const handleCopy = () =>
    copy(`${imports.join('\n')}\n${body.current}`.trim());

  return (
    <Wrapper>
      <LiveProvider scope={scope} code={code}>
        {isPreviewable && <Preview />}
        <EditorWrapper>
          <Imports>{imports.join('\n')}</Imports>
          <Editor isDisabled={!isPreviewable} onChange={handleChange} />
          {isPreviewable && <Error />}
          <EditorToolbar>
            <input
              type="button"
              onClick={handleCopy}
              value="📋"
              title="Copy to clipboard"
            />{' '}
            <CodeSandboxButton
              imports={imports}
              dependencies={dependencies}
              code={code}
            />
          </EditorToolbar>
        </EditorWrapper>
      </LiveProvider>
    </Wrapper>
  );
};

export default LazyCode;
