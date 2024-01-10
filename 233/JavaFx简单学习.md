---
title: JavaFx简单学习
abstract:
copyright: true
categories:
  - 笔记
  - java
  - JavaFx
description: <p>&emsp;&emsp;想要玩点东西，所以就简单学学。</p><p>&emsp;&emsp;你问为什么不学些新的。我暂时不想，就是叛逆。</p><p>&emsp;&emsp;以前简单使用过Swing，所以这里面也是简单记记。</p><p>&emsp;&emsp;全一点的可以看这些：<a href = "https://openjfx.cn/">JavaFx中文</a> <a href = "https://openjfx.io/index.html">JavaFx英文</a> <a href = "https://docs.oracle.com/javafx/2/api/index.html">老版本文档</a> <a href = "https://openjfx.io/javadoc/18/">比较新版本文档</a></p><p>&emsp;&emsp;笔记内容主要是依据java8，不超过10。</p>
date: 2023-07-16 22:29:11
tags:
- java
- javaFx
password:
command:
---

## 简介（算是官网抄的）

&emsp;&emsp;JavaFX 是一个开源的下一代客户端应用平台，适用于基于Java构建的桌面、移动端和嵌入式系统。 它是许多个人和公司的共同努力的成果，目的是为开发丰富的客户端应用提供一个现代、高效、功能齐全的工具包。



## <span id = "开局两张图">开局两张图</span>

![javafx架构](https://img-blog.csdnimg.cn/a0f741a62ff94b66bf7b398c7ab60ed4.jpeg#pic_center)

![javafx架构](https://img-blog.csdnimg.cn/ff2936af7e8e4852bf92537745b8a110.png)



## helloWorld

~~~java
public class Main extends Application {
    @Override
    public void start(Stage primaryStage) throws Exception {
        primaryStage.setTitle("hello World");
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
~~~

~~~java
public class Main2 extends Application {
    @Override
    public void start(Stage primaryStage) throws Exception {
        System.out.println("活着");
        primaryStage.show();
    }
    @Override
    public void init() throws Exception {
        System.out.println("生");
        super.init();
    }
    @Override
    public void stop() throws Exception {
        System.out.println("死");
        super.stop();
    }
    public static void main(String[] args) {
        Application.launch(Main2.class,args);
    }
}
~~~

&emsp;&emsp;11之后最好单独写一个类继承`Application`，在主类里调用。



## Stage

&emsp;&emsp;一些方法。

~~~java
@Override
public void start(Stage primaryStage) throws Exception {
    primaryStage.setTitle("JavaFx");
    primaryStage.getIcons().add(new Image("icons8-apple-logo-26.png"));
    //primaryStage.setIconified(true);//最小化
    //        primaryStage.setMaximized(true);//最大化
    //        primaryStage.close();//关闭窗口
    primaryStage.setWidth(500);
    primaryStage.setHeight(500);
    //        primaryStage.setResizable(false);//不可改变窗口大小
    //        primaryStage.setMaxWidth(600);//设置最大宽度，其他同理
    //        System.out.println(primaryStage.getHeight());//获得高，没设置的话要在show后面获取。其他同理
    primaryStage.heightProperty().addListener(new ChangeListener<Number>() {
        @Override
        public void changed(ObservableValue<? extends Number> observable, Number oldValue, Number newValue) {
            System.out.println(newValue.doubleValue());
        }
    });//监听高度 ，其他同理
    primaryStage.setFullScreen(true);//全屏不是最大化，必须设置Scene
    primaryStage.setScene(new Scene(new Group()));

    primaryStage.show();
}
~~~

~~~java
@Override
public void start(Stage primaryStage) throws Exception {
    //        primaryStage.setOpacity(0.5);//背景透明度
    primaryStage.setAlwaysOnTop(true);//置顶
    primaryStage.setX(500);//起始坐标X
    primaryStage.setY(100);//起始坐标Y
    primaryStage.xProperty().addListener((observable, oldValue, newValue) -> {
        System.out.println("x坐标="+newValue);
    });
    primaryStage.yProperty().addListener((observable, oldValue, newValue) -> {
        System.out.println("y坐标="+newValue);
    });
    primaryStage.show();
}
~~~

&emsp;&emsp;窗口上方的样式。

~~~java
@Override
public void start(Stage primaryStage) throws Exception {
    Stage s1 = new Stage();
    s1.setTitle("s1");
    s1.initStyle(StageStyle.DECORATED);//默认
    s1.show();

    Stage s2 = new Stage();
    s2.setTitle("s2");
    s2.initStyle(StageStyle.TRANSPARENT);//透明无装饰

    Stage s3 = new Stage();
    s3.setTitle("s3");
    s3.initStyle(StageStyle.UNDECORATED);//白色无装饰
    s3.setScene(new Scene(new Group()));
    //s3.show();

    Stage s4 = new Stage();
    s4.setTitle("s4");
    s4.initStyle(StageStyle.UNIFIED);//没平台装饰 顶部的横条
    s4.show();

    Stage s5 = new Stage();
    s5.setTitle("s5");
    s5.initStyle(StageStyle.UTILITY);//没有最大最小化

    Platform.exit();
}
~~~

&emsp;&emsp;模态。

- 模态设置  `Modality.WINDOW_MODAL` 建立在二级窗口上限制用户操作父窗口 (子级互不干扰)

- 模态设置  `Modality.APPLICATION_MODAL` 建立在二级窗口上限制用户操作父窗口 (子级间也会干扰)

~~~java
@Override
public void start(Stage primaryStage) throws Exception {
    Stage s1 = new Stage();
    s1.setTitle("s1");
    s1.setWidth(500);
    s1.setHeight(500);
    s1.show();

    Stage s2 = new Stage();
    s2.setTitle("s2");
    s2.initOwner(s1);//s2的拥有者s1
    s2.initModality(Modality.WINDOW_MODAL);//可以s3，s2,但不能s1 因为上一句，注意显示顺序，父窗口先显示
    s2.setWidth(500);
    s2.setHeight(500);
    s2.show();
    //s1.show();

    Stage s3 = new Stage();
    //        s3.initModality(Modality.APPLICATION_MODAL);//当前程序只能点击当前窗口
    //        s3.initOwner();
    s3.setTitle("s3");
    s3.setWidth(500);
    s3.setHeight(500);
    s3.show();

}
~~~

## Platfrom

~~~java
@Override
public void start(Stage primaryStage) throws Exception {
    primaryStage.setTitle("MyPlatfro");
    System.out.println("start方法里的线程名" + Thread.currentThread().getName());
    Platform.runLater(() ->{//一个队列，在空闲时更新ui界面 不能频繁可能造成阻塞
        System.out.println("run方法里的线程名" + Thread.currentThread().getName());
        System.out.println("我是先吗？");
        int i = 1;
        while ((i < 10)) {
            System.out.println("i = " + i);
            try {
                Thread.sleep(1000);//明显阻塞了
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            i++;
        }
    });
    System.out.println("是不是我先？");
    primaryStage.show();
}
~~~

~~~java
@Override
public void start(Stage primaryStage) throws Exception {
    primaryStage.setTitle("MyPlatfro");
    Platform.setImplicitExit(true);//关了窗口，但不停止程序 true默认
    System.out.println("Platform.isSupported(ConditionalFeature.GRAPHICS) = " + Platform.isSupported(ConditionalFeature.GRAPHICS));
    System.out.println("Platform.isSupported(ConditionalFeature.FXML) = " + Platform.isSupported(ConditionalFeature.FXML));
    primaryStage.show();
}
~~~

## Screen

&emsp;&emsp;屏幕坐标和宽高。

~~~java
@Override
public void start(Stage primaryStage) throws Exception {
    Screen primaryScreen = Screen.getPrimary();
    System.out.println("primaryScreen.getDpi() = " + primaryScreen.getDpi());

    Rectangle2D primaryScreenBounds = primaryScreen.getBounds();
    Rectangle2D primaryScreenVisualBounds = primaryScreen.getVisualBounds();
    //全部屏幕宽高和坐标
    System.out.println("左上角x" + primaryScreenBounds.getMinX() + "     " + "左上角Y" + primaryScreenBounds.getMinY());
    System.out.println("右上角x" + primaryScreenBounds.getMaxX() + "     " + "右上角Y" + primaryScreenBounds.getMaxY());
    System.out.println("宽度" + primaryScreenBounds.getWidth() + "     " + "高度" + primaryScreenBounds.getHeight());
    //可以看到的屏幕宽高和坐标  没有隐藏任务栏的话会不一样
    System.out.println("左上角x" + primaryScreenVisualBounds.getMinX() + "     " + "左上角Y" + primaryScreenVisualBounds.getMinY());
    System.out.println("右上角x" + primaryScreenVisualBounds.getMaxX() + "     " + "右上角Y" + primaryScreenVisualBounds.getMaxY());
    System.out.println("宽度" + primaryScreenVisualBounds.getWidth() + "     " + "高度" + primaryScreenVisualBounds.getHeight());
    primaryStage.show();
}
~~~

## 结构

&emsp;&emsp;参考<a href = "#开局两张图">开局两张图</a>

~~~java
@Override
public void start(Stage primaryStage) throws Exception {
    primaryStage.setHeight(800);
    primaryStage.setWidth(800);
    primaryStage.setTitle("javaFx");

    Button button = new Button("不要钱的按钮");
    //直接放按钮没效果，根节点一般要布局类
    button.setPrefHeight(40);
    button.setPrefWidth(200);
    button.setCursor(Cursor.CROSSHAIR);

    //打开网页
    //HostServices hostServices = this.getHostServices();//是Application里方法 用this提醒我 当前类应该是在LauncherImpl里的Class.forName实现的吧
    //hostServices.showDocument("http://www.baidu.com");

    System.out.println("this.getClass().toString() = " + this.getClass().toString());


    Group group = new Group();//不是布局类，父类（父类的父类）是node
    boolean add = group.getChildren().add(button);


    Scene scene = new Scene(group);//用得少，一般在下面的控件
    //scene.setCursor(Cursor.CLOSED_HAND);//鼠标样式 还可以用url getClass().getClassLoader().getResource(name)
    URL url = getClass().getClassLoader().getResource("icons8-apple-logo-26.png");
    String s = url.toExternalForm();
    System.out.println("url = " + url);
    System.out.println("url.toString() = " + url.toString());
    System.out.println("s = " + s);
    scene.setCursor(Cursor.cursor("file:/D:/IntelliJ%20IDEA%202020.1.1/WorkSpace/yangguangnongchang/javafx/target/classes/icons8-apple-logo-26.png"));

    primaryStage.setScene(scene);
    primaryStage.show();
}
~~~




​    

  

  

  

  

  

​		

  

  

  

  

  

  

  
