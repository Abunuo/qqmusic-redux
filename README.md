# QQMusic Redux

QQMusic API client with React / Redux / react-router / immutable-js and rxjs .

一个基于React全家桶（react、redux、react-router、immutable-js）以及rxjs的QQ音乐单页应用。

[Demo戳我](qqmusic.padabon.com)：http://qqmusic.padabon.com.

1. 安装 npm install
2. 运行 npm start
3. 访问 http://localhost:3000

### 小结与问题

1. 使用creat-react-app构建项目，可以快速起手进入代码编写
2. 使用redux可以方便的对播放状态进行存储与还原
3. 使用immutable-js可以方便的进行shouldComponentUpdate判断
4. 实际使用immutable-js并不那么舒服，需要使用get拿到value，不能使用扩展运算符，
对于需要localStorage本地存储的state，也只能使用Map和List，其他数据类型并不能通
过fromJS进行还原，容易与原生Object和Array混用，或许seamless-immutable是更好的
选择，更可能只是我使用姿势不对
5. react动画并不能达到理想效果，搜索页的tab切换使用了一下，大概还没领悟正确的使用方法
6. 由redux-sagas替换为redux-observable,只是觉得rxjs更有趣强大
7. css都是QQ音乐页面的，css in js似乎不错
8. React全家桶起手比较困难，上手之后还是比较顺手的
9. 使用不当的的地方，欢迎反馈、建议等~
10. ...

### Todos

1. 测试
2. 服务器端渲染
3. 使用normalizr
4. Web Audio Api
5. 动画
6. ...


欢迎各种反馈、建议等~