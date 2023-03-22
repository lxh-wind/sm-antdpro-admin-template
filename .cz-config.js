'use strict';
module.exports = {
  types: [
    { value: 'feat', name: '特性:   🚀  新增功能', emoji: '🚀' },
    { value: 'fix', name: '修复:   🧩  修复缺陷', emoji: '🧩' },
    { value: '文档', name: '文档:   📚  文档变更', emoji: '📚' },
    {
      value: '格式',
      name: '格式:   🎨  代码格式（不影响功能，例如空格、分号等格式修正）',
      emoji: '🎨',
    },
    { value: '重构', name: '重构:   ♻️  代码重构（不包括 bug 修复、功能新增）', emoji: '♻️' },
    { value: '性能', name: '性能:   ⚡️  性能优化', emoji: '⚡️' },
    { value: '测试', name: '测试:   ✅  添加疏漏测试或已有测试改动', emoji: '✅' },
    {
      value: '构建',
      name: '构建:   📦️  构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）',
      emoji: '📦️',
    },
    { value: '集成', name: '集成:   🎡  修改 CI 配置、脚本', emoji: '🎡' },
    { value: '回退', name: '回退:   ⏪️  回滚 commit', emoji: '⏪️' },
    {
      value: '其他',
      name: '其他:   🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）',
      emoji: '🔨',
    },
  ],
  scopes: [
    { name: 'components' },
    { name: 'utils' },
    { name: 'styles' },
    { name: 'deps' },
    { name: 'other' },
  ],
  // it needs to match the value for field type. Eg.: 'fix'
  /*  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },  */
  // override the messages, defaults are as follows
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    // used if allowCustomScopes is true
    // customScope: 'Denote the SCOPE of this change:',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?(yes/no)',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['特性', '修复'],
  // limit subject length
  subjectLimit: 100,
};
