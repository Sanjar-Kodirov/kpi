const findChildren = (tree: any, children = []) => {
  if (!tree || !tree.length) {
    return [];
  }

  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    // @ts-ignore
    children.push(item.code, ...findChildren(item.children));
  }

  return children;
};

export const findPermissionsInTree = (tree: any, annotation: any, parents: any, addParent: boolean) => {
  if (!tree || !tree.length) {
    return null;
  }

  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    const newParents = addParent ? [...parents] : [];

    newParents.push(item.code);

    if (item.code === annotation) {
      const children = findChildren(item.children);
      return [...newParents, ...children];
    }

    const subParents = findPermissionsInTree(item.children, annotation, newParents, addParent) as any;

    if (subParents) {
      return subParents;
    }
  }

  return null;
};

export const fromArrayToObj = (array: any, value = true) => {
  return array.reduce(
    (acc: any, item: any) => ({
      ...acc,
      [item]: value,
    }),
    {},
  );
};
