# communism-report-generator

共产中文报告生成器，用于生成有伏特加味的参水报告。

本项目主要为了试验 UNIST 项目在中文内容上的应用，以及使用中文 DSL 的体验。

## 添加内容

内容分为资源和规则，资源在 [报告片段.ts](报告片段.ts) 里，规则在 [撰写报告.ts](撰写报告.ts) 内。

目前资源为含有 `{{正面工作}}` 和 `{{负面工作}}` 槽的短文本，这些文本会交由规则进行填槽和组合。

目前规则为使用 JS 写就的命令式的树遍历操作，未来将更换为声明式的领域特定语言。

## 参考

- 狗屁不通生成器 https://github.com/menzi11/BullshitGenerator
- 自然语言具体语法树 https://github.com/syntax-tree/nlcst
- 通用语法树 https://github.com/syntax-tree/unist

---

继任者：「『模板生成器』生成器」 https://github.com/linonetwo/template-based-generator-template
