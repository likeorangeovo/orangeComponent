export interface FilterTagItem {
  title: string;
  value: string | number;
  name?: string;
  /**
   * 互斥标签：选中该项后会清除其他所有已选项
   * 适用于"不予共享"等与其他选项逻辑互斥的场景
   */
  isIncompatible?: boolean;
}
