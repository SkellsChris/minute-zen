import React from 'react';

type StructuredTextNode = {
  type: string;
  value?: string;
  children?: StructuredTextNode[];
};

interface StructuredTextProps {
  data: {
    value?: {
      document?: StructuredTextNode;
    };
  } | null;
}

function renderNode(node: StructuredTextNode, key: number): React.ReactNode {
  switch (node.type) {
    case 'paragraph':
      return <p key={key}>{node.children?.map((child, i) => renderNode(child, i))}</p>;
    case 'span':
      return node.value ?? null;
    default:
      return node.children?.map((child, i) => renderNode(child, i));
  }
}

export default function StructuredText({ data }: StructuredTextProps) {
  const document = data?.value?.document;
  if (!document) return null;
  return <>{document.children?.map((node, i) => renderNode(node, i))}</>;
}
