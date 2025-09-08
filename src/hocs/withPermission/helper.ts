export const findChildren = (tree: any, children: any[] = []) => {
  if (!tree || !tree.length) {
    return [];
  }

  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    children.push(item.code, ...findChildren(item.children));
  }

  return children;
};
