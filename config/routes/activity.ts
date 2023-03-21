export default {
  path: '/activity',
  name: '活动',
  // access: 'canAdmin',
  routes: [
    {
      path: '/activity',
      redirect: '/activity/category-one'
    },
    {
      path: '/activity/category-one',
      name: '分类一',
      routes: [
        {
          path: '/activity/category-one',
          redirect: '/activity/category-one/activity-one',
        },
        /**
         * ----------- 活动一 ------------
         */
        {
          path: '/activity/category-one/activity-one',
          name: '活动一',
          component: './Activity/ActivityOne/List',
        },
        {
          path: '/activity/category-one/activity-one/add',
          name: '新建%NAME%',
          component: './Activity/ActivityOne/Edit',
          hideInMenu: true
        },
        {
          path: '/activity/category-one/activity-one/edit',
          name: '编辑%NAME%',
          component: './Activity/ActivityOne/Edit',
          hideInMenu: true
        },
        {
          path: '/activity/category-one/activity-one/record',
          name: '%NAME%记录',
          component: './Activity/ActivityOne/Record',
          hideInMenu: true
        },
        /**
         * ----------- 活动二 ------------
         */
        {
          path: '/activity/category-one/activity-two',
          name: '活动二',
          component: './Activity/ActivityTwo/List',
        }
      ]
    },
    {
      path: '/activity/category-two',
      name: '分类二',
      routes: [
        {
          path: '/activity/category-two/activity-one',
          name: '活动一',
          component: './Activity/ActivityOne/List',
        },
        {
          path: '/activity/category-two/activity-two',
          name: '活动二',
          component: './Activity/ActivityTwo/List',
        }
      ]
    },
  ]
};
