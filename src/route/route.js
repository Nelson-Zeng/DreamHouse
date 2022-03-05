const route = [{
  title: '游戏工具集',
  key: 'gameutils',
  children: [{
    title: '欧陆风云4',
    key: 'eu4',
    children: [{
      title: '奇观生成器',
      key: 'wonders',
    }]
  }]}
];

export default (() => {
  // 通过项目key遍历整合出path
  const ergodic = (arr, basePath) =>
    arr.map((item) => {
      item.path = basePath ? `${basePath}/${item.key}` : `/${item.key}`;
      if (item.children) {
        item.children = ergodic(item.children, item.path);
      }
      return item;
    })
  ;

  return ergodic(route);
}
)();

