import { cloneDeep, random, shuffle } from 'lodash';
import visit from 'unist-util-visit';
import nlcstToString from 'nlcst-to-string';
import { TextNode, Sentence, Paragraph } from 'nlcst-types';

import { 正面短语, 负面短语, 中立内容 } from './报告片段';

/** 以实事求是的精神撰写报告 */
export default function 撰写报告(正面工作: string, 负面工作: string = '') {
  const 报告树 = {
    type: 'RootNode',
    children: [
      开脑洞(正面短语, ['推进工作', '赞美传扬'], { attitude: 'positive' }),
      开脑洞(负面短语, ['大力抨击'], { attitude: 'negative' }),
    ],
  };
  // 把具体内容填入槽中
  visit(报告树, { type: 'TextNode', slot: '{{正面工作}}' }, (node: TextNode) => {
    delete node.slot;
    node.value = 正面工作;
  });
  visit(报告树, { type: 'TextNode', slot: '{{负面工作}}' }, (node: TextNode) => {
    delete node.slot;
    node.value = 负面工作;
  });
  // 为正面的句子添加正面的句首
  const 可用句首 = 中立内容.句首.children;
  visit(报告树, { type: 'ParagraphNode', attitude: 'positive' }, (paragraph: Paragraph) => {
    visit(paragraph, { type: 'SentenceNode' }, (sentenceToBePad: Sentence) => {
      sentenceToBePad.children.unshift(可用句首[random(可用句首.length - 1)]);
    });
  });
  // 序列化报告树为文本
  return nlcstToString(报告树);
}

/** 放开脑洞，随机选择短语资源，构建报告具体语法树 */
function 开脑洞<T extends { [name: string]: Sentence }>(素材库: T, 素材开关: Array<keyof T>, 元信息 = {}) {
  const useableResources = 素材开关.map((key) => 素材库[key]);
  // 取出我们需要的素材树，并 cloneDeep，因为我们随后会通过树遍历来修改其中的内容，得保证它是 immutable 的
  const reportContentNlcst = shuffle(useableResources).map((subTree) => {
    const treeToBeModify = cloneDeep(subTree);
    treeToBeModify.children = shuffle(treeToBeModify.children);
    return treeToBeModify;
  });
  // 拼凑为完整的 NLCST
  return { type: 'ParagraphNode', children: reportContentNlcst, ...元信息 };
}
