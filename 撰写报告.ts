import { cloneDeep } from 'lodash';
import visit from 'unist-util-visit';
import nlcstToString from 'nlcst-to-string';

import { 正面短语, 负面短语 } from './报告片段';

/** 以实事求是的精神撰写报告 */
export default function 撰写报告(正面工作: string, 负面工作: string = '') {
  const 报告树 = {
    type: 'RootNode',
    children: [开脑洞(['推进工作', '赞美传扬'], 正面短语), 开脑洞(['大力抨击'], 负面短语)],
  };
  // 把具体内容填入槽中
  visit(报告树, { type: 'TextNode', slot: '{{正面工作}}' }, (node) => {
    delete node.slot;
    node.value = 正面工作;
  });
  visit(报告树, { type: 'TextNode', slot: '{{负面工作}}' }, (node) => {
    delete node.slot;
    node.value = 负面工作;
  });
  // 序列化报告树为文本
  return nlcstToString(报告树);
}

/** 放开脑洞，随机选择短语资源，构建报告具体语法树 */
function 开脑洞<T>(素材开关: Array<keyof T>, 素材库: T) {
  const useableResources = 素材开关.map((key) => 素材库[key]);
  // 取出我们需要的素材树，并 cloneDeep，因为我们随后会通过树遍历来修改其中的内容，得保证它是 immutable 的
  const reportContentNlcst = useableResources.map((subTree) => cloneDeep(subTree));
  // 拼凑为完整的 NLCST
  return { type: 'ParagraphNode', children: reportContentNlcst };
}
