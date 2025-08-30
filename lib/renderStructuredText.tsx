import React, { Fragment } from 'react';

export type StructuredTextValue = {
  document: any;
};

interface RenderOptions {
  blocks?: any[];
  renderBlock?: (block: any) => React.ReactNode;
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getText(node: any): string {
  if (!node) return '';
  if (node.type === 'span' && typeof node.value === 'string') return node.value;
  return (node.children ?? []).map(getText).join('');
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
      const id = slugify(getText(node));
      return (
        <Tag key={index} id={id}>
          {node.children?.map((n: any, i: number) => renderNode(n, i, options))}
        </Tag>
      );
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
    case 'span': {
      let content: React.ReactNode = node.value;
      if (node.marks) {
        node.marks.forEach((mark: string) => {
          if (mark === 'strong') {
            content = <strong>{content}</strong>;
          } else if (mark === 'em') {
            content = <em>{content}</em>;
          }
        });
      }
      return <Fragment key={index}>{content}</Fragment>;
    }
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
