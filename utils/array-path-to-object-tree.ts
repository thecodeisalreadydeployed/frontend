import type { Node } from "@naisutech/react-tree";

function addPath(
  arr: Array<string>,
  obj: Record<string, any>,
  parentId: string | null
) {
  const component = arr.shift();
  if (!component) return obj;
  const id = (Math.random() * 10).toString();
  const current =
    obj[component] ||
    (obj[component] = {
      id: id,
      label: component,
      parentId: parentId,
    });
  if (arr.length) {
    addPath(arr, current.items || (current.items = {}), id);
  }
  return obj;
}

function makeArray(obj: Record<string, any>) {
  const arr = Object.values(obj);
  arr
    .filter((item) => item.items)
    .forEach((item) => {
      item.items = makeArray(item.items);
    });
  return arr;
}

export const arrayPathToObjectTree = (data: Array<string>): Array<Node> => {
  const treeObj = data.reduce(
    (obj, path) => addPath(path.split("/"), obj, null),
    {}
  );

  const arr: Array<Node> = makeArray(treeObj);

  return arr;
};
