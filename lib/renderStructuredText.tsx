import React, { Fragment } from 'react';

export type StructuredTextValue = {
  document: any;
};

interface RenderOptions {
  blocks?: any[];
  renderBlock?: (block: any) => React.ReactNode;
}

function renderNode(
  node: any,
  index: number,
  options: RenderOptions
): React.ReactNode {
  switch (node.type) {
    case 'root':
      return <Fragment key={index}>{node.children?.map((n: any, i: number) => renderNode(n, i, options))}</Fragment>;
    case 'paragraph':
      return <p key={index}>{node.children?.map((n: any, i: number) => renderNode(n, i, options))}</p>;
    case 'heading': {
      const Tag = `h${node.level}` as keyof JSX.IntrinsicElements;
      return <Tag key={index}>{node.children?.map((n: any, i: number) => renderNode(n, i, options))}</Tag>;
    }
    case 'list': {
      const ListTag = node.style === 'unordered' ? 'ul' : 'ol';
      return <ListTag key={index}>{node.children?.map((n: any, i: number) => renderNode(n, i, options))}</ListTag>;
    }
    case 'listItem':
      return <li key={index}>{node.children?.map((n: any, i: number) => renderNode(n, i, options))}</li>;
    case 'blockquote':
      return <blockquote key={index}>{node.children?.map((n: any, i: number) => renderNode(n, i, options))}</blockquote>;
    case 'link':
      return (
        <a key={index} href={node.url}>
          {node.children?.map((n: any, i: number) => renderNode(n, i, options))}
        </a>
      );
    case 'span':
      return node.value;
    case 'block': {
      const block = options.blocks?.find((b: any) => b.id === node.id);
      if (block && options.renderBlock) {
        return <Fragment key={index}>{options.renderBlock(block)}</Fragment>;
      }
      return null;
    }
    default:
      return null;
  }
}

export function renderStructuredText(
  value: StructuredTextValue | null | undefined,
  options: RenderOptions = {}
): React.ReactNode {
  if (!value?.document) return null;
  return renderNode(value.document, 0, options);
}

export default renderStructuredText;
