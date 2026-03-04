export interface Category {
  code: string;
  name: string;
  [key: string]: any;
}

export interface TreeNode {
  code?: string;
  name?: string;
  groupCode?: string;
  groupName?: string;
  catalogAmount?: number;
  cataAmount?: number;
  apiAmount?: number;
  tableAmount?: number;
  fileAmount?: number;
  folderAmount?: number;
  weblinkAmount?: number;
  isLeaf?: boolean;
  children?: TreeNode[];
  [key: string]: any;
}

export type LazyLoadFunction = (
  categoryCode: string,
  parentCode: string,
  searchText: string
) => Promise<TreeNode[]>;
