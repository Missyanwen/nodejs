# 这是用nodejs+Express+mongodb开发的博客功能  
    前后端分离模式开发，分为二个版块博客留言，和博客内容管理

>nodejs目录结构  
      - db 存放数据库结构  
      - models 数据表  
      - public 静态文件  
      - routers 路由  
      - schemas 数据表字段  
      - views 视图页  
      - app.js 主入口文件  


```
    这里少了一个db目录是存放数据库存储的，需求去mongodb官网下载适合自己机器的安装 (https://www.mongodb.com/download-center?jmp=nav#community)
    把他的安装放到一个mongodb目录下，需要用到他bin下的mongod.exe
    打开cmd命令行找到mongodb目录下的bin目录运行 [mongod --dbpath=D:\project\nodejs\db --port=27017]
    --dbpath是指定到那个目录就是上面的db目录
    --port是端口号它默认是27017

    当然建议去下载他的可视化工具(https://robomongo.org/)
```