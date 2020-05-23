/* eslint-disable no-unused-vars */
function 撰写报告(正面工作, 负面工作 = '') {
  const 报告树 = _.cloneDeep(正面短语);
  // 把具体内容填入槽中
  visit(报告树, { type: 'TextNode', slot: '正面工作' }, (node) => {
    delete node.slot;
    node.value = 正面工作;
  });
  // 序列化报告树为文本
  return nlcstToString(报告树);
}



/** 通过认真领会精神，把一个包含学习资料的字符串变为 UNIST（此处为 NLCST）节点，并保留待填入具体内容的槽，成为一个模板 CST */
function 认真学习(共产中文模板 /*: string */) /*: boolean */ {
  const lines = _.compact(共产中文模板[0].split('\n'));
  const unistWordNodes = lines.map((line) => {
    // 把模板变成 UNIST 节点
    const leafTemplateFragmentNodes = line.split(/{{正面工作}}/g).map((value) => ({ type: 'TextNode', value }));
    // 在节点之间补上代表{{正面工作}}的节点，作为待填的槽
    let leafNodesWithInputNode = leafTemplateFragmentNodes.flatMap((node) => [
      node,
      { type: 'TextNode', value: '正面工作', slot: '正面工作' },
    ]);
    leafNodesWithInputNode = leafNodesWithInputNode.slice(0, -1);
    return { type: 'WordNode', children: leafNodesWithInputNode };
  });
  const sentenceUnistNode = { type: 'SentenceNode', children: unistWordNodes };
  return sentenceUnistNode;
}