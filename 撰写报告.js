/* eslint-disable no-unused-vars */

/** 以实事求是的精神撰写报告 */
function 撰写报告(正面工作, 负面工作 = '') {
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
function 开脑洞(素材开关 = ['推进工作', '赞美传扬'], 素材库 = 正面短语) {
  const useableResources = 素材开关.map((key) => 素材库[key]);
  // 取出我们需要的素材树，并 cloneDeep，因为我们随后会通过树遍历来修改其中的内容，得保证它是 immutable 的
  const reportContentNlcst = useableResources.map((subTree) => _.cloneDeep(subTree));
  // 拼凑为完整的 NLCST
  return { type: 'ParagraphNode', children: reportContentNlcst };
}

/** 通过认真领会精神，把一个包含学习资料的字符串变为 UNIST（此处为 NLCST）节点，并保留待填入具体内容的槽，成为一个模板 CST */
function 认真学习(共产中文模板 /*: string */) /*: boolean */ {
  // 取出字符串内容，并去掉空行和空白
  const lines = _.compact(_.compact(共产中文模板[0].split('\n')).map((line) => _.trim(line)));
  const unistWordNodes = lines.map((line) => {
    // 把模板变成 UNIST 节点
    const leafTemplateFragmentNodes = line.split(/({{正面工作}}|{{负面工作}})/g).map((value) => ({
      type: 'TextNode',
      value,
      // 如果是{{正面工作}}这样的节点，则标注为待填的槽（slot 是我们自定义的元信息），等待之后替换为具体内容
      slot: value === '{{正面工作}}' || value === '{{负面工作}}' ? value : undefined,
    }));
    return { type: 'WordNode', children: leafTemplateFragmentNodes };
  });
  const sentenceUnistNode = { type: 'SentenceNode', children: unistWordNodes };
  return sentenceUnistNode;
}
