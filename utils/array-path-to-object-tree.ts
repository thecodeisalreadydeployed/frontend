type TreeNode = {
  label: string;
  items?: Array<TreeNode>;
};

type TreeNodeObject = {
  label: string;
  items?: Record<string, TreeNodeObject>;
};

const addPath = (
  arr: Array<string>,
  obj: Record<string, TreeNodeObject>
): Record<string, TreeNodeObject> => {
  const component = arr.shift();
  if (!component) return obj;

  const current =
    obj[component] ||
    (obj[component] = {
      label: component,
    });
  if (arr.length) {
    addPath(arr, current.items || (current.items = {}));
  }
  return obj;
};

const makeArray = (obj: Record<string, TreeNodeObject>): Array<TreeNode> => {
  const arr = Object.values(obj);
  const result: Array<TreeNode> = [];
  for (let index = 0; index < arr.length; index++) {
    const items = arr[index].items;
    if (items === undefined) {
      result.push({
        label: arr[index].label,
      });
    } else {
      result.push({
        label: arr[index].label,
        items: makeArray(items),
      });
    }
  }
  return result;
};

export const arrayPathToObjectTree = (data: Array<string>): Array<TreeNode> => {
  const treeObj: Record<string, TreeNodeObject> = data.reduce(
    (obj, path) => addPath(path.split("/"), obj),
    {}
  );

  const arr: Array<TreeNode> = makeArray(treeObj);

  return arr;
};
