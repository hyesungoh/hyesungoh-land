/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css } from '@emotion/react';
import { useKBar } from 'kbar';
import { useTheme } from '@nextui-org/react';

export default function KBarSearch(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { query, search, actions, currentRootActionId } = useKBar(state => ({
    search: state.searchQuery,
    currentRootActionId: state.currentRootActionId,
    actions: state.actions,
  }));
  const { theme } = useTheme();
  const ownRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    query.setSearch('');
    ownRef.current?.focus();
  }, [currentRootActionId, query]);

  return (
    <input
      ref={ownRef}
      {...props}
      value={search}
      placeholder="Cmd (or Cont) + k"
      onChange={event => {
        props.onChange?.(event);
        query.setSearch(event.target.value);
      }}
      onKeyDown={event => {
        if (currentRootActionId && !search && event.key === 'Backspace') {
          const parent = actions[currentRootActionId].parent;
          query.setCurrentRootAction(parent);
        }
      }}
      css={css`
        padding: 14px 24px;
        width: 100%;
        box-sizing: border-box;
        outline: none;
        border: none;
        background: transparent;
        color: ${theme?.colors?.foreground?.value};

        &:focus::placeholder {
          opacity: 1;
          transition: opacity 0.25s ease 0s;
        }

        &::placeholder {
          color: ${theme?.colors?.accents4?.value};
          transition: opacity 0.25s ease 0s;
          -moz-transition: opacity 0.25s ease 0s;
          -ms-transition: opacity 0.25s ease 0s;
          -webkit-transition: opacity 0.25s ease 0s;
        }
      `}
    />
  );
}
