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

<img src="https://img-blog.csdnimg.cn/a0f741a62ff94b66bf7b398c7ab60ed4.jpeg#pic_center" alt="javafx架构" style="zoom:80%;" />

<img src="https://img-blog.csdnimg.cn/ff2936af7e8e4852bf92537745b8a110.png" alt="javafx架构" style="zoom:80%;" />



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

## Group容器

- 可以自动管理子结点宽高，`setAutoSizeChildren(false);`//不自动设置 宽高是0 true默认

  

## 事件

### 按钮的事件

```java
Button b1 = new Button("单击双击左键右键快捷键");
//单击
b1.setOnAction(event -> {
    System.out.println( "onAction");
});
//这种冒泡事件 两种
b1.addEventHandler(MouseEvent.MOUSE_CLICKED, event -> {
    if (event.getClickCount()==2 && event.getButton().equals(MouseButton.PRIMARY)) {
        System.out.println("双击");
    }
    System.out.println("handler");
    System.out.println("event.getButton().name() = " + event.getButton().name());
});
//按下有3中类似方法   抬起似乎有4终类似
b1.setOnKeyPressed(event -> {
    System.out.println("event.getText() = " + event.getText());//中文下未定义  空看不见是空格
    System.out.println("event.getCode().getName() = " + event.getCode().getName());
    System.out.println("按下");
    if (event.getCode().equals(KeyCode.R)) {
        System.out.println("R键被按了");
    }
});
b1.setOnKeyReleased(event -> {
    System.out.println("松开");
});
```

### 快捷键

```java
Button b1 = new Button("单击双击左键右键快捷键");
b1.setOnAction(event -> {
    System.out.println("大大的");
});
Group root = new Group();
root.getChildren().add(b1);

Scene scene = new Scene(root);
//快捷键设置，要再scene中
//第一中 不同平台有些问题
KeyCombination kcc1 = new KeyCodeCombination(KeyCode.C, KeyCombination.CONTROL_DOWN, KeyCodeCombination.ALT_DOWN);
Mnemonic m1 = new Mnemonic(b1, kcc1);
scene.addMnemonic(m1);
//第二种
KeyCombination kcc2 = new KeyCharacterCombination("V", KeyCombination.CONTROL_DOWN, KeyCodeCombination.ALT_DOWN);
Mnemonic m2 = new Mnemonic(b1, kcc2);
scene.addMnemonic(m2);
//第三种  文档里有这么个
KeyCombination kcc3 = new KeyCodeCombination(KeyCode.K,
        KeyCombination.SHIFT_DOWN,
        KeyCombination.CONTROL_DOWN,
        KeyCombination.ALT_DOWN,
        KeyCombination.META_DOWN,
        KeyCombination.SHORTCUT_DOWN);
Mnemonic m3 = new Mnemonic(b1, kcc3);
scene.addMnemonic(m3);
//第四种 up常用
KeyCodeCombination kcc = new KeyCodeCombination(KeyCode.F,KeyCombination.SHORTCUT_DOWN);
scene.getAccelerators().put(kcc, () -> {
    System.out.println("第四种");
    System.out.println("Thread.currentThread().getName() = " + Thread.currentThread().getName());
    b1.fire();
});
//第五种 有时冲突
KeyCombination kc5 = KeyCombination.valueOf("ctrl+alt+y");
Mnemonic m5 = new Mnemonic(b1, kc5);
scene.addMnemonic(m5);
```

### 键盘事件

```java
Button b1 = new Button("b1");
Button b2 = new Button("b2");
TextField textField = new TextField("233");
Rectangle rectangle = new Rectangle(60,60);
//color继承Paint
rectangle.setFill(Color.PINK);
VBox vBox = new VBox(b1,b2,textField,rectangle);
AnchorPane an = new AnchorPane(vBox);


an.getChildren().addAll();
Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setTitle("JavaFX");
primaryStage.setWidth(800);
primaryStage.setHeight(800);
primaryStage.show();
b1.setOnKeyPressed(new EventHandler<KeyEvent>() {
    //长按也触发
    @Override
    public void handle(KeyEvent event) {
        System.out.println("event.getCharacter() = " + event.getCharacter());
        System.out.println("event.getEventType() = " + event.getEventType());
        System.out.println("event.getSource() = " + event.getSource());
        System.out.println("event.getTarget() = " + event.getTarget());
        System.out.println("event.getText() = " + event.getText());
        System.out.println("event.isAltDown() = " + event.isAltDown());
        System.out.println("KeyCode.A.equals(event.getCode()) = " + KeyCode.A.equals(event.getCode()));
    }
});
b1.setOnKeyReleased(keyEvent -> {
    System.out.println("释放了" + keyEvent.getCode().getName());

});
textField.setOnKeyTyped(new EventHandler<KeyEvent>() {
    //作用在输入框才有意义，其他有焦点的也可以但无意义
    @Override
    public void handle(KeyEvent event) {
        System.out.println("event.getText() = " + event.getText());
        System.out.println("event.getCharacter() = " + event.getCharacter());
    }
});
rectangle.setOnKeyPressed(keyEvnet -> {
    System.out.println("矩形");
    System.out.println("keyEvnet.getCode().getName() = " + keyEvnet.getCode().getName());
});
rectangle.setOnMouseClicked(event -> {
    rectangle.requestFocus();
});
 
```

### 鼠标事件，单击，进入，退出，按下，释放，移动

```java
Button b1 = new Button("b1");
Button b2 = new Button("b2");
TextField textField = new TextField("233");
Rectangle rectangle = new Rectangle(60,60);
//color继承Paint
rectangle.setFill(Color.PINK);
VBox vBox = new VBox(b1,b2,textField,rectangle);
AnchorPane an = new AnchorPane(vBox);


an.getChildren().addAll();
Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setTitle("JavaFX");
primaryStage.setWidth(800);
primaryStage.setHeight(800);
primaryStage.show();

b1.setOnMouseClicked(mouseEvent -> {
    //点按钮和点按钮上的文字效果不一样
    System.out.println("mouseEvent.getSceneX() = " + mouseEvent.getSceneX());
    System.out.println("mouseEvent.getSceneY() = " + mouseEvent.getSceneY());
    System.out.println("mouseEvent.getScreenX() = " + mouseEvent.getScreenX());
    System.out.println("mouseEvent.getScreenY() = " + mouseEvent.getScreenY());
    System.out.println("mouseEvent.getX() = " + mouseEvent.getX());
    System.out.println("mouseEvent.getY() = " + mouseEvent.getY());
    System.out.println("mouseEvent.getZ() = " + mouseEvent.getZ());
    System.out.println("mouseEvent.getButton() = " + mouseEvent.getButton());
    System.out.println("mouseEvent.getSource() = " + mouseEvent.getSource());
    //点按钮和点按钮上的文字效果不一样
    System.out.println("mouseEvent.getTarget() = " + mouseEvent.getTarget());
    System.out.println("mouseEvent.getEventType() = " + mouseEvent.getEventType());

    //按下时是否安装其他按钮
    System.out.println("mouseEvent.isAltDown() = " + mouseEvent.isAltDown());
    System.out.println("mouseEvent.isControlDown() = " + mouseEvent.isControlDown());
    //和上面一样
    System.out.println("mouseEvent.isSecondaryButtonDown() = " + mouseEvent.isSecondaryButtonDown());

    System.out.println("mouseEvent.getClickCount() = " + mouseEvent.getClickCount());

    System.out.println("mouseEvent.getPickResult() = " + mouseEvent.getPickResult());


});
b1.setOnMouseReleased(event -> {
    System.out.println("\"鼠标释放\" = " + "鼠标释放");
});
b1.setOnAction(new EventHandler<ActionEvent>() {
    @Override
    public void handle(ActionEvent event) {
        System.out.println("ActionEvent event.getEventType() = " + event.getEventType());
    }
});
b1.setOnMouseEntered(event -> System.out.println("进入"));
b1.setOnMouseExited(event -> System.out.println("出来"));

b2.setOnMouseMoved(event -> System.out.println("移动"));
```

### 拖拽移动，拖拽进入，拖拽退出，拖拽释放，拖拽检测

```java
Button b1 = new Button("b1");
Button b2 = new Button("b2");
TextField textField = new TextField("233");
Rectangle rectangle = new Rectangle(60,60);
//color继承Paint
rectangle.setFill(Color.PINK);
VBox vBox = new VBox(b1,b2,textField,rectangle);
AnchorPane an = new AnchorPane(vBox);


an.getChildren().addAll();
Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setTitle("JavaFX");
primaryStage.setWidth(800);
primaryStage.setHeight(800);
primaryStage.show();
b1.setOnMouseDragged(new EventHandler<MouseEvent>() {
    @Override
    public void handle(MouseEvent event) {
        //                System.out.println("鼠标拖拽");
    }
});
//检测拖拽 一次
b1.setOnDragDetected(new EventHandler<MouseEvent>() {
    @Override
    public void handle(MouseEvent event) {
        System.out.println("setOnDragDetected");
        //下面事件才会出发
        b1.startFullDrag();
    }
});
//和上面结合
b1.setOnMouseDragOver(new EventHandler<MouseDragEvent>() {
    @Override
    public void handle(MouseDragEvent event) {
        //                System.out.println("组件上面拖拽");
        System.out.println(event.getSource());
        System.out.println("event.getGestureSource() = " + event.getGestureSource());
        //源和目标要分析，事件要细分一下，
    }
});

b1.setOnMouseDragEntered(new EventHandler<MouseDragEvent>() {
    @Override
    public void handle(MouseDragEvent event) {
        System.out.println("setOnMouseDragEntered");
    }
});
b1.setOnMouseDragExited(new EventHandler<MouseDragEvent>() {
    @Override
    public void handle(MouseDragEvent event) {
        System.out.println("setOnMouseDragExited");
    }
});

```

### 鼠标setDragDetect、setMouseTransparent、isStillSincePress

```java
Button b1 = new Button("b1");
Button b2 = new Button("b2");
TextField textField = new TextField("233");
Rectangle rectangle = new Rectangle(60,60);
Circle circle = new Circle(60);
circle.setFill(Color.RED);
//color继承Paint
rectangle.setFill(Color.PINK);
VBox vBox = new VBox(b1,b2,textField,rectangle,circle);
AnchorPane an = new AnchorPane(vBox);


an.getChildren().addAll();
Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setTitle("JavaFX");
primaryStage.setWidth(800);
primaryStage.setHeight(800);
primaryStage.show();

b1.setOnDragDetected(new EventHandler<MouseEvent>() {
    @Override
    public void handle(MouseEvent event) {
        System.out.println("setOnDragDetected");
        //下面事件才会出发
        //                b1.startFullDrag();
    }
});
b1.setOnMousePressed(event -> {
    System.out.println("鼠标按下");
    //            event.setDragDetect(true);
    //原地点击true
    System.out.println("event.isStillSincePress() = " + event.isStillSincePress());
});
//边界检测
rectangle.setOnMouseClicked(new EventHandler<MouseEvent>() {
    @Override
    public void handle(MouseEvent event) {
        System.out.println("rectangle图形点击");
    }
});
circle.setPickOnBounds(true);
circle.setOnMouseClicked(new EventHandler<MouseEvent>() {
    @Override
    public void handle(MouseEvent event) {
        System.out.println("circle图形点击");
    }
});
//阻止事件传递给子组件
circle.setMouseTransparent(true);
vBox.setOnMouseClicked(new EventHandler<MouseEvent>() {
    @Override
    public void handle(MouseEvent event) {
        System.out.println("vBox点击");
        //一些包装的东西
        System.out.println("event.getPickResult() = " + event.getPickResult());
    }
});
```

### copyFor、fireEvent

```java
Button b1 = new Button("b1");
Button b2 = new Button("b2");
TextField textField = new TextField("233");
Rectangle rectangle = new Rectangle(60,60);
Circle circle = new Circle(60);
circle.setFill(Color.RED);
//color继承Paint
rectangle.setFill(Color.PINK);
VBox vBox = new VBox(b1,b2,textField,rectangle,circle);
AnchorPane an = new AnchorPane(vBox);


an.getChildren().addAll();
Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setTitle("JavaFX");
primaryStage.setWidth(800);
primaryStage.setHeight(800);
primaryStage.show();

KeyEvent keyEvent = new KeyEvent(b2, b2, KeyEvent.KEY_PRESSED, "A", "A", KeyCode.A, false, false, false, false);
b1.setOnMouseClicked(event -> {
    System.out.println("setOnMouseClicked");
    //触摸屏
    System.out.println("event.isSynthesized() = " + event.isSynthesized());

    MouseEvent mouseEvent = event.copyFor(b2, b2);
    //可以借此触发不在面板上的组件的事件
    //           Event.fireEvent(b2,keyEvent);
    Event.fireEvent(mouseEvent.getTarget(),mouseEvent);
});
b2.setOnKeyPressed(event -> System.out.println("b2按下"));
b2.setOnMouseClicked(event -> {
    System.out.println("b2-setOnMouseClicked");

});
```

### 拖拽实现文本或文件的复制粘贴等效果


剪切板有个子类拖拽的剪切板


```java
Label label = new Label("hello World");
TextField textField = new TextField();
ImageView imageView = new ImageView();
//        imageView.prefWidth(300);
//        imageView.prefHeight(300);
//保持宽高比
imageView.setPreserveRatio(true);
imageView.setFitHeight(300);
imageView.setStyle("-fx-background-color: pink");
VBox vBox = new VBox(10,label,textField,imageView);

vBox.setAlignment(Pos.CENTER);
vBox.setStyle("-fx-background-color: yellow");
AnchorPane an = new AnchorPane(vBox);
AnchorPane.setLeftAnchor(vBox,300.0);
AnchorPane.setTopAnchor(vBox,300.0);
an.setStyle("-fx-background-color: darkorange");

an.getChildren().addAll();
Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setTitle("JavaFX");
primaryStage.setWidth(800);
primaryStage.setHeight(800);
primaryStage.show();
//1
label.setOnDragDetected(event -> {
    Dragboard dragboard = label.startDragAndDrop(TransferMode.COPY);
    ClipboardContent clipboardContent = new ClipboardContent();
    clipboardContent.putString(label.getText());
    dragboard.setContent(clipboardContent);
    //图片
    WritableImage writableImage = new WritableImage((int)label.getWidth(), (int)label.getHeight());
    label.snapshot(new SnapshotParameters(),writableImage);
    dragboard.setDragView(writableImage,(int)label.getWidth(),(int)label.getHeight());

    System.out.println("拖拽"+(int)label.getHeight()+ " "+(int)label.getWidth());
});
//2
textField.setOnDragOver(new EventHandler<DragEvent>() {
    @Override
    public void handle(DragEvent event) {
        System.out.println("文本框上面");
        //模式要一样
        event.acceptTransferModes(TransferMode.COPY);

    }
});
//3
textField.setOnDragDropped(event -> {
    textField.setText(event.getDragboard().getString());
    //可选
    event.setDropCompleted(true);
});
//4可选
label.setOnDragDone(event -> {
    label.setText(label.getText()+"完成");
});
//其他的放入
vBox.setOnDragEntered(event -> {
    vBox.setBorder(new Border(new BorderStroke(
        Color.GREEN,
        BorderStrokeStyle.SOLID,
        new CornerRadii(0),
        new BorderWidths(10)
    )));
    //            System.out.println("setOnDragEntered event.getTransferMode() = " + event.getTransferMode());
});
vBox.setOnDragExited(event -> {
    vBox.setBorder(null);
});
//        //1
//        vBox.setOnDragDetected(event -> {
//            Dragboard dragboard = label.startDragAndDrop(TransferMode.COPY);
//            ClipboardContent clipboardContent = new ClipboardContent();
//
//        });
//2
vBox.setOnDragOver(new EventHandler<DragEvent>() {
    @Override
    public void handle(DragEvent event) {
        //模式要一样
        event.acceptTransferModes(event.getTransferMode());
        //                System.out.println("setOnDragOver event.getTransferMode() = " + event.getTransferMode());
    }
});
//3
vBox.setOnDragDropped(event -> {
    Dragboard dragboard = event.getDragboard();
    if (dragboard.hasFiles()) {
        System.out.println("经历");
        File file = dragboard.getFiles().get(0);
        System.out.println(file);
        imageView.setImage(new Image("file:"+file.getAbsolutePath()));
    }else {
        System.out.println("dragboard.getUrl() = " + dragboard.getUrl());
        System.out.println("dragboard.getUrl().toString() = " + dragboard.getUrl().toString());
        imageView.setImage(new Image(dragboard.getUrl().toString()));
    }
});

```

自定义拖拽数据类型

```java
public class Event7 extends Application {
    //mime类型
    DataFormat myDataFormat = new DataFormat("data/person");
    @Override
    public void start(Stage primaryStage) throws Exception {
        Button button = new Button("拖拽数据");
        Person zs = new Person("张三", 25, "https://www.baidu.com/img/flexible/logo/pc/result.png");
        Button person1 = new Button(zs.getName());
        VBox vBox1 = new VBox(10,button,person1);
        VBox vBox = getVBox();
        AnchorPane an = new AnchorPane(vBox,vBox1);
        AnchorPane.setLeftAnchor(vBox,100.0);
        AnchorPane.setTopAnchor(vBox,100.0);
        an.setStyle("-fx-background-color: darkorange");

        an.getChildren().addAll();
        Scene scene = new Scene(an);
        primaryStage.setScene(scene);
        primaryStage.setTitle("JavaFX");
        primaryStage.setWidth(800);
        primaryStage.setHeight(800);
        primaryStage.show();
        person1.setOnDragDetected(event -> {
            Dragboard dragboard = person1.startDragAndDrop(TransferMode.COPY);
            ClipboardContent content = new ClipboardContent();
            content.put(myDataFormat,zs);
            dragboard.setContent(content);
            VBox vBox2 = getVBox();
            ObservableList<Node> list = vBox2.getChildren();
            ((TextField)list.get(1)).setText(zs.getName());
            ((TextField)list.get(2)).setText(""+zs.getAge());
            ((ImageView)list.get(3)).setImage(new Image(zs.getPhoto()));
            an.getChildren().add(vBox2);
            WritableImage writableImage = new WritableImage((int)vBox2.prefWidth(-1), (int)vBox2.prefHeight(-1));
            vBox2.snapshot(new SnapshotParameters(),writableImage);
            an.getChildren().remove(vBox2);
            dragboard.setDragView(writableImage,(int)vBox2.prefWidth(-1)/2, (int)vBox2.prefHeight(-1)/2);


        });
        vBox.setOnDragOver(event -> {
            event.acceptTransferModes(TransferMode.COPY);
        });
        vBox.setOnDragDropped(event -> {
            Dragboard dragboard = event.getDragboard();
            if (dragboard.hasContent(myDataFormat)) {
                Object content = dragboard.getContent(myDataFormat);
                Person person = (Person) content;
                ObservableList<Node> list = vBox.getChildren();
                ((TextField)list.get(1)).setText(person.getName());
                ((TextField)list.get(2)).setText(""+person.getAge());
                ((ImageView)list.get(3)).setImage(new Image(person.getPhoto()));
            }
        });


}

    public static void main(String[] args) {
        launch(args);

    }
    public VBox getVBox(){
        Label msg = new Label("个人信息");
        javafx.scene.control.TextField nameTextFiled = new javafx.scene.control.TextField();
        TextField ageTextField = new TextField();
        ImageView photoView = new javafx.scene.image.ImageView();
        photoView.setPreserveRatio(true);
        photoView.setFitHeight(60);
        VBox vBox = new VBox(10,msg,nameTextFiled,ageTextField,photoView);
        vBox.setPrefHeight(300);//不够大的话截图显示不全

        vBox.setAlignment(Pos.CENTER);
        vBox.setStyle("-fx-background-color: yellow");
        return vBox;
    }
}

class Person implements Serializable{
    private String name;
    private int age;
    private String photo;

    public Person(String name, int age, String photo) {
        this.name = name;
        this.age = age;
        this.photo = photo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}
```


## 组件

### Button

```java
Button b1 = new Button("b1");
b1.setFont(Font.font("sans-serif",40));
b1.setTextFill(Paint.valueOf("#2f8f8f"));
//有些参数有默认值 可以不new
b1.setBackground(new Background(new BackgroundFill(
    Paint.valueOf("#8f8f8f"),//颜色
    new CornerRadii(40),//圆角 每个角的半径（不是弧度？）
    new Insets(5,10,15,50)))// 距离边框的距离
                );
b1.setBorder(new Border(new BorderStroke(
    Paint.valueOf("#2f8c8c55"),//颜色+透明度
    BorderStrokeStyle.DASHED,//边框类型
    new CornerRadii(40),
    new BorderWidths(20)
)));
b1.setLayoutX(200);
b1.setLayoutY(200);
b1.setPrefWidth(200);
b1.setPrefHeight(200);
//也可以用css样式
//b1.setStyle("-fx-background-color: cornsilk");//会无效之前的style
b1.setOnAction((e)->{
    System.out.println("相应按按钮");
    Button b = (Button) e.getSource();
    System.out.println("b.getText() = " + b.getText());
});
```

### 单选多选按钮

```java
AnchorPane an = new AnchorPane();
an.setStyle("-fx-background-color: pink");

RadioButton rb1 = new RadioButton("rb1");
RadioButton rb2 = new RadioButton("rb2");
RadioButton rb3 = new RadioButton("rb3");
RadioButton rb4 = new RadioButton("rb4");
ToggleGroup toggleGroup = new ToggleGroup();
toggleGroup.getToggles().addAll( rb1, rb2, rb3, rb4);
//        rb1.setToggleGroup(toggleGroup);//也是一种方式
HBox hBox = new HBox(10,rb1, rb2, rb3, rb4);
//        toggleGroup.selectToggle(rb4);
rb4.setSelected(true);
rb1.selectedProperty().addListener((observable, oldValue, newValue) -> {
    System.out.println("newValue = " + newValue);
});
toggleGroup.selectedToggleProperty().addListener((observable, oldValue, newValue) -> {
    RadioButton newValue1 = (RadioButton) newValue;
    System.out.println("newValue1.getText() = " + newValue1.getText());
    System.out.println("newValue1.isSelected() = " + newValue1.isSelected());
});


CheckBox c1 = new CheckBox("c1");
CheckBox c2 = new CheckBox("c2");
CheckBox c3 = new CheckBox("c3");
CheckBox c4 = new CheckBox("c4");
VBox vBox = new VBox(10.0, c1, c2, c3, c4);
AnchorPane.setTopAnchor(vBox,20.0);
c1.setSelected(true);
//不确定状态
c2.setIndeterminate(true);
c3.setAllowIndeterminate(true);
c3.selectedProperty().addListener((observable, oldValue, newValue) -> {
    System.out.println("newValue = " + newValue);
});

an.setOnMouseClicked(event -> {
    CheckBox[] checkBoxes = vBox.getChildren().toArray(new CheckBox[1]);
    for (CheckBox checkBox : checkBoxes) {
        System.out.println("checkBox.getText() = " + checkBox.getText());
        System.out.println("checkBox.isSelected() = " + checkBox.isSelected());
        System.out.println("checkBox.isIndeterminate() = " + checkBox.isIndeterminate());
    }
});
an.getChildren().addAll(hBox,vBox);

Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setHeight(800);
primaryStage.setWidth(800);
primaryStage.setTitle("javaFx");
primaryStage.show();
```

### ButtonBar按钮栏

```java
public class WhatButtonBar extends Application  implements EventHandler<ActionEvent> {

    @Override
    public void start(Stage primaryStage) throws Exception {
        AnchorPane an = new AnchorPane();
        an.setStyle("-fx-background-color: pink");
        ButtonBar buttonBar = new ButtonBar();
        Button b1 = new Button("APPLY");
        Button b2 = new Button("FINISH");
        Button b3 = new Button("NO");
        ButtonBar.setButtonData(b1, ButtonBar.ButtonData.APPLY);
        ButtonBar.setButtonData(b2, ButtonBar.ButtonData.FINISH);
        ButtonBar.setButtonData(b3, ButtonBar.ButtonData.NO);
        buttonBar.getButtons().addAll(b1,b2,b3);
        buttonBar.setButtonOrder(ButtonBar.BUTTON_ORDER_LINUX);
//        b1.setPrefSize(100,60);
//        b1.setPrefWidth(200);
//        ButtonBar.setButtonUniformSize(b1,true);
//        b1.setPrefSize(100,60);
//        b1.setPrefWidth(200);

        b1.setOnAction(this);
        b2.setOnAction(this::handle);
        b3.setOnAction(this);

        an.getChildren().addAll(buttonBar);
        Scene scene = new Scene(an);
        primaryStage.setScene(scene);
        primaryStage.setHeight(800);
        primaryStage.setWidth(800);
        primaryStage.setTitle("javaFx");
        primaryStage.show();

    }

    public static void main(String[] args) {
        launch(WhatButtonBar.class);
    }

    @Override
    public void handle(ActionEvent event) {
        Button b = (Button)event.getSource();
        if (ButtonBar.getButtonData(b) == ButtonBar.ButtonData.APPLY) {
            System.out.println("标签Apply" + b.getText());
        }
        if (ButtonBar.getButtonData(b) == ButtonBar.ButtonData.FINISH) {
            System.out.println("标签FINISH" + b.getText());
        }
        if (ButtonBar.getButtonData(b) == ButtonBar.ButtonData.NO) {
            System.out.println("标签NO" + b.getText());
        }
    }
}
```

### 文本框（附监听）、输入框、密码框、标签

```java
TextField textField = new TextField("这是文本框");
textField.setLayoutX(100);
textField.setLayoutY(100);
textField.setPrefSize(300,100);
textField.setFont(Font.font(20));

Tooltip tooltip = new Tooltip("这是一个输入框");
tooltip.setFont(Font.font(20));
textField.setTooltip(tooltip);//提示

textField.setPromptText("输入密码");
textField.setText("");
textField.setFocusTraversable(false);//失去焦点

//注意tProperty  Property().addListener
textField.textProperty().addListener((observable, oldValue, newValue) -> {
    System.out.println("newValue = " + newValue);
    if (newValue.length() > 7){
        textField.setText(oldValue);
    }
});
textField.selectedTextProperty().addListener((observable, oldValue, newValue) -> {
    System.out.println("选择" + newValue);
});

//密码
PasswordField passwordField = new PasswordField();
passwordField.setLayoutX(400);
passwordField.setLayoutY(400);
passwordField.setPrefSize(300,100);
passwordField.setFont(Font.font(20));
passwordField.setTooltip(tooltip);//提示

Label label = new Label("我是一个标签", passwordField);//这样可以改变passwordField位置
label.setLayoutX(10);
label.setLayoutY(600);

//相关事件都差不多
```

### 文本域（附内容控制）

```java
TextArea textArea = new TextArea();
textArea.setFont(Font.font(16));
//        textArea.setWrapText(true);//自动换行
textArea.setPrefColumnCount(2);
textArea.setPrefRowCount(2);
textArea.setPrefSize(200,500);
textArea.appendText("住家");
//        textArea.deleteText(0,3);
textArea.insertText(2,"dsaffes");
textArea.replaceText(0,1,"dasdsadas");
textArea.selectAll();
textArea.selectForward();
textArea.selectPositionCaret(4);//选择后面的
textArea.getLength();
textArea.selectRange(3,5);//选择位置
textArea.positionCaret(5);//光标位置
textArea.setScrollLeft(20);


an.getChildren().addAll(textArea);
an.setOnMouseClicked(event -> {
    textArea.setScrollLeft(i=i+10);
});
textArea.scrollLeftProperty().addListener((observable, oldValue, newValue) -> {
    System.out.println("newValue = " + newValue);
});
```

{% fold 点击显/隐内容 %}

```java
public class WhatTextField extends Application {
    int i = 10;
    @Override
    public void start(Stage primaryStage) throws Exception {


        VBox vBox = new VBox(20);
        TextField textField = new TextField();
        TextArea textArea = new TextArea();
        //过滤用户输入
        textField.setTextFormatter(new TextFormatter<String>(new UnaryOperator<TextFormatter.Change>() {
            @Override
            public TextFormatter.Change apply(TextFormatter.Change change) {
                System.out.println(change.getText());
                String text = change.getText();
                if (text.contains("5")){
                    System.out.println("555");
                    change.setText(change.getText().replace('5', '6'));
                }
                return change;
            }
        }));
        //转换，用法很多
        textField.textProperty().addListener((observable, oldValue, newValue) -> {
            textField.setTextFormatter(new TextFormatter<Integer>(new StringConverter<Integer>() {
                @Override
                public String toString(Integer object) {
                    return String.valueOf(object);
                }

                @Override
                public Integer fromString(String string) {
                    return Integer.valueOf(string);
                }
            }));
            textField.commitValue();
        });

        textArea.textProperty().addListener((observable, oldValue, newValue) -> {
            textArea.setTextFormatter(new TextFormatter<String>(new MyStringconvter()));
            textArea.commitValue();
        });

        vBox.getChildren().addAll(textField,textArea);
        vBox.setAlignment(Pos.CENTER);


        Scene scene = new Scene(vBox);
        primaryStage.setScene(scene);
        primaryStage.setHeight(400);
        primaryStage.setWidth(400);
        primaryStage.setTitle("javaFx");
        primaryStage.show();

    }

    public static void main(String[] args) {
        launch(WhatTextField.class);
    }
}

class MyStringconvter extends StringConverter<String>{


    @Override
    public String toString(String object) {
        System.out.println("object = " + object);
        return object==null ?"":object;//返回null空指针

    }

    @Override
    public String fromString(String string) {
        System.out.println("string = " + string);
        if (string.contains("5")) {
            return  string.replace("5","五");
        }
        return string;
    }

}
```

{% endfold %}

### MenuBar，Menu，MenuItem 菜单

```java
AnchorPane an = new AnchorPane();
an.setStyle("-fx-background-color: pink");
MenuBar menuBar = new MenuBar();
Menu m1 = new Menu("m1");
Menu m2 = new Menu("m2",new Button("233"));
Menu m3 = new Menu("m3");
Menu m4 = new Menu("m4");
Menu m5 = new Menu("m5");
m1.setOnShowing(event -> {
    System.out.println("m1正在显示");
});
m1.setOnHidden(event -> {
    System.out.println("m1正在隐藏");
});
//横线分离
SeparatorMenuItem separatorMenuItem1 = new SeparatorMenuItem();
SeparatorMenuItem separatorMenuItem2 = new SeparatorMenuItem();

MenuItem mi1 = new MenuItem("mi1",new ImageView("icons8-apple-logo-26.png"));
MenuItem mi2 = new MenuItem("mi2");
MenuItem mi3 = new MenuItem("mi3");
MenuItem mi4 = new MenuItem("mi4");
MenuItem mi5 = new MenuItem("mi5");

MenuItem mi6 = new MenuItem("mi6");
MenuItem mi7 = new MenuItem("mi7");
MenuItem mi8 = new MenuItem("mi8");
Menu menu = new Menu("下级");
menu.getItems().addAll(mi6,mi7,mi8);
mi1.setAccelerator(KeyCombination.valueOf("ctrl+shift+y"));

mi1.setOnAction(event -> {
    System.out.println("mi1");
});
mi2.setOnAction(event -> {
    System.out.println("mi2");
});

ToggleGroup toggleGroup = new ToggleGroup();
RadioMenuItem rmi1 = new RadioMenuItem("rmi1");
RadioMenuItem rmi2 = new RadioMenuItem("rmi2");
RadioMenuItem rmi3 = new RadioMenuItem("rmi3");
rmi1.setToggleGroup(toggleGroup);
rmi2.setToggleGroup(toggleGroup);
rmi3.setToggleGroup(toggleGroup);
rmi2.setSelected(true);
rmi1.setOnAction(event -> {
    RadioMenuItem source = (RadioMenuItem)event.getSource();
    System.out.println("source.isSelected() = " + source.isSelected());
    System.out.println("rmi1.isSelected() = " + rmi1.isSelected());
    System.out.println("rmi2.isSelected() = " + rmi2.isSelected());
    System.out.println("rmi3.isSelected() = " + rmi3.isSelected());
});

CheckMenuItem cmi1 = new CheckMenuItem("cmi1");
CheckMenuItem cmi2 = new CheckMenuItem("cmi2");
CheckMenuItem cmi3 = new CheckMenuItem("cmi3");
cmi3.setOnAction(event -> {
    System.out.println("check");
});

CustomMenuItem customMenuItem1 = new CustomMenuItem();
Button b1 = new Button("b1");
customMenuItem1.setContent(b1);
CustomMenuItem customMenuItem2 = new CustomMenuItem(new ProgressBar(0.5));
CustomMenuItem customMenuItem3 = new CustomMenuItem();
HBox hBox = new HBox(new Button("b21"),new Button("b22"),new Button("b23"));
hBox.setStyle("-fx-background-color: black");
hBox.setPrefSize(150,100);
customMenuItem3.setContent(hBox);




m1.getItems().addAll(mi1,separatorMenuItem1,mi2,separatorMenuItem2,mi3,menu);
m2.getItems().addAll(customMenuItem1,customMenuItem3,customMenuItem2,mi4,mi5);//customMenuItem3 8不行
m3.getItems().addAll(rmi1,rmi2,rmi3);
m4.getItems().addAll(cmi1,cmi2,cmi3);

menuBar.getMenus().addAll(m1,m2,m3,m4);

MenuButton  menuButton= new MenuButton("菜单按钮");
AnchorPane.setTopAnchor(menuButton,300.0);
MenuItem mib3 = new MenuItem("mib3");
MenuItem mib4 = new MenuItem("mib4");
MenuItem mib5 = new MenuItem("mib5");
mib5.setOnMenuValidation(event -> {
    System.out.println("专门响应快捷键");
});
menuButton.getItems().addAll(mib3,mib4,mib5,customMenuItem3);

SplitMenuButton splitMenuButton = new SplitMenuButton();
splitMenuButton.getItems().addAll(mib3,mib4,mib5);
AnchorPane.setTopAnchor(splitMenuButton,400.0);
splitMenuButton.setText("长得不一样");

//鼠标右键
ContextMenu contextMenu = new ContextMenu();
MenuItem mib6 = new MenuItem("mib6");
MenuItem mib7 = new MenuItem("mib7");
MenuItem mib8 = new MenuItem("mib8");
contextMenu.getItems().addAll(mib6,mib7,mib8);
Button button = new Button("鼠标右键");
AnchorPane.setTopAnchor(button,500.0);
splitMenuButton.setContextMenu(contextMenu);
button.setContextMenu(contextMenu);

button.setOnContextMenuRequested(new EventHandler<ContextMenuEvent>() {
    @Override
    public void handle(ContextMenuEvent event) {
        System.out.println("菜单弹出了");
    }
});

an.getChildren().addAll(menuBar,menuButton,splitMenuButton,button);
Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setHeight(800);
primaryStage.setWidth(800);
primaryStage.setTitle("javaFx");
primaryStage.show();

menuBar.setPrefWidth(primaryStage.getWidth());
an.widthProperty().addListener((e,o,n)->{
    menuBar.setPrefWidth(n.doubleValue());
});
```

### ChoiceBox下拉选择

```java
ChoiceBox<String> stringChoiceBox = new ChoiceBox<>();
stringChoiceBox.getItems().addAll("1","2","valignment","3");//new Separator()放分割符不指定泛型
stringChoiceBox.setPrefSize(60,20);
stringChoiceBox.setValue("2");
stringChoiceBox.getSelectionModel().selectFirst();
stringChoiceBox.show();
stringChoiceBox.getSelectionModel().selectedItemProperty().addListener(new ChangeListener<String>() {
    @Override
    public void changed(ObservableValue<? extends String> observable, String oldValue, String newValue) {
        System.out.println("newValue = " + newValue);
    }
});
```

```java
    @Override
    public void start(Stage primaryStage) throws Exception {
        ObservableList<String> list1 = FXCollections.observableArrayList();
        list1.addAll("数字","字母");
        ObservableList<Integer> list2 = FXCollections.observableArrayList();
        list2.addAll(8,1,2,3,4,5,6,7);
        ObservableList<Character> list3 = FXCollections.observableArrayList();
        list3.addAll('E','A','B','D','C');


        AnchorPane an = new AnchorPane();
        an.setStyle("-fx-background-color: pink");

        ChoiceBox<String> stringChoiceBox1 = new ChoiceBox<>(list1);
        ChoiceBox<Object> stringChoiceBox2 = new ChoiceBox<>();
        AnchorPane.setLeftAnchor(stringChoiceBox2,200.0);

        Button button = new Button("排序");
        AnchorPane.setRightAnchor(button,200.0);

        an.getChildren().addAll(stringChoiceBox1,stringChoiceBox2,button);
        Scene scene = new Scene(an);
        primaryStage.setScene(scene);
        primaryStage.setHeight(800);
        primaryStage.setWidth(800);
        primaryStage.setTitle("javaFx");
        primaryStage.show();

        stringChoiceBox1.getSelectionModel().selectedItemProperty().addListener((observable, oldValue, newValue) -> {
            if (newValue.equals("数字")) {//我最终还是转换了
                stringChoiceBox2.setItems(FXCollections.observableArrayList(list2));
            }
            if (newValue.equals("字母")) {
                stringChoiceBox2.setItems(FXCollections.observableArrayList(list3));
            }
        });
        button.setOnAction(event -> {
            ObservableList<Object> items = stringChoiceBox2.getItems();
            if (items.size()>0){
                items.sort((o1, o2) -> {
                    if (o1 instanceof Integer){
                        System.out.println("Integer");
                        return (Integer)o2-(Integer)o1;
                    }
                    if (o1 instanceof Character){
                        System.out.println("Character");
                        return (Character)o2-(Character)o1;
                    }
                    System.out.println("无");
                    return 0;
                });
            }

        });
    }

```



{% fold 学生类 %}

```java
/**
 * Copyright (C), 2015-2023, px有限公司
 * FileName: Student
 * Author:   15081
 * Date:     2023/4/2 18:30
 * Description: 学生
 * History:
 * <author>          <time>          <version>          <desc>
 * px                修改时间           版本号              描述
 */
package demo1.l036;

import javafx.beans.property.SimpleDoubleProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;

/**
 * 〈一句话功能简述〉<br> 
 * 〈学生〉
 *
 * @author 15081
 * @create 2023/4/2
 * @since 1.0.0
 */
public class Student {

    private SimpleStringProperty name = new SimpleStringProperty();
    private SimpleStringProperty id = new SimpleStringProperty();
    private SimpleIntegerProperty age = new SimpleIntegerProperty();
    private SimpleDoubleProperty score = new SimpleDoubleProperty();
    {
        id.addListener((observable, oldValue, newValue) -> {
            System.out.println("id的监听");
        });
    }

    public Student() {
    }

    public Student(String name, String id, int age, double score) {
        this.name.setValue(name);
        this.id.setValue(id);
        this.age.setValue(age);
        this.score.setValue(score);
    }

    public String getName() {
        return name.getValue();
    }

    public void setName(String name) {
        this.name.setValue(name);
    }

    public String getId() {
        return id.getValue();
    }

    public void setId(String id) {
        this.id.setValue(id);
    }

    public int getAge() {
        return age.getValue();
    }

    public void setAge(int age) {
        this.age.setValue(age);
    }

    public double getScore() {
        return score.getValue();
    }

    public void setScore(double score) {
        this.score.setValue(score);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Student student = (Student) o;

        if (!age.getValue().equals(student.age.getValue())) {
            return false;
        }
        if (Double.compare(student.score.getValue(), score.getValue()) != 0) {
            return false;
        }
        if (!name.getValue().equals(student.name.getValue())) {
            return false;
        }
        return id.getValue().equals(student.id.getValue());
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = name.getValue().hashCode();
        result = 31 * result + id.getValue().hashCode();
        result = 31 * result + age.getValue();
        temp = Double.doubleToLongBits(score.getValue());
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name.getValue() + '\'' +
                ", id='" + id.getValue() + '\'' +
                ", age=" + age.getValue() +
                ", score=" + score.getValue() +
                '}';
    }

    public SimpleStringProperty nameProperty() {
        return name;
    }

    public SimpleStringProperty idProperty() {
        return id;
    }

    public SimpleIntegerProperty ageProperty() {
        return age;
    }

    public SimpleDoubleProperty scoreProperty() {
        return score;
    }

}
```

{% endfold %}

{% fold 学生选择 %}

```java
package demo1.l036;

import javafx.application.Application;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.collections.ObservableList;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ChoiceBox;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;
import javafx.util.StringConverter;

public class StudentChoiceBox extends Application {

    private Student student= new Student();
    @Override
    public void start(Stage primaryStage) throws Exception {
        AnchorPane an = new AnchorPane();
        an.setStyle("-fx-background-color: pink");
        ChoiceBox<Student> studentChoiceBox = new ChoiceBox<>();
        studentChoiceBox.setPrefSize(300,60);
        studentChoiceBox.setStyle("-fx-font-size: 22");
        Student zs = new Student("张三", "001", 15, 98);
        Student ls = new Student("李四", "002", 18, 70);
        Student ww = new Student("王五", "003", 25, 40);
        Student ml = new Student("马六", "004", 17, 60);
        Student pq = new Student("彭七", "005", 15, 80);
        ObservableList<Student> list = studentChoiceBox.getItems();
        list.addAll(zs,ls,ww,ml,pq);


        //StringConverter不是转为ChoiceBox设计的
        studentChoiceBox.setConverter(new StringConverter<Student>() {
            //所以如果只是简单展示可以重写对象的tostring
            @Override
            public String toString(Student object) {
                System.out.println("发现修改对象，在多次执行，修改Student");
                return object.getName()+ " " + object.getId()+ " " + object.getAge() + " "  +object.getScore();
//                return object.toString();
            }
            //不用了
            @Override
            public Student fromString(String string) {
                System.out.println("没有运行");
                return null;
            }
        });
        studentChoiceBox.getSelectionModel().selectedItemProperty().addListener(new ChangeListener<Student>() {
            @Override
            public void changed(ObservableValue<? extends Student> observable, Student oldValue, Student newValue) {
                student = newValue;
                System.out.println("newValue.toString() = " + newValue.toString());
                student.nameProperty().addListener((observableStudent, oldStudent, newStudent) -> {
                    //要是能直接更新就好了
                    int index = list.indexOf(student);
                    list.remove(index);
                    list.add(index,student);
                });
            }
        });

        Button button = new Button("改名");
        TextField textField = new TextField();
        Button button2 = new Button("改id");
        TextField textField2 = new TextField();
        HBox hBox = new HBox(textField, button);
        HBox hBox2 = new HBox(textField2, button2);
        AnchorPane.setLeftAnchor(hBox,400.0);
        AnchorPane.setLeftAnchor(hBox2,400.0);
        AnchorPane.setTopAnchor(hBox2,60.0);

        an.getChildren().addAll(studentChoiceBox,hBox,hBox2);
        Scene scene = new Scene(an);
        primaryStage.setScene(scene);
        primaryStage.setHeight(800);
        primaryStage.setWidth(800);
        primaryStage.setTitle("javaFx");
        primaryStage.show();
        button.setOnAction(event -> {
//            String name = textField.getText();
//            int index = list.indexOf(student);
//            student.setName(name);
//            list.remove(index);
//            list.add(index,student);

            String name = textField.getText();
            student.setName(name);
            System.out.println("student -name = " + student);

        });
        button2.setOnAction(event -> {
//            String name = textField.getText();
//            int index = list.indexOf(student);
//            student.setName(name);
//            list.remove(index);
//            list.add(index,student);

            String id = textField2.getText();
            student.setId(id);
            System.out.println("student -id = " + student);

        });

    }

    public static void main(String[] args) {
        launch(StudentChoiceBox.class);
    }
}
```

{% endfold %}



### ComboBox带文本框的下拉列表

```java
ComboBox<String> stringComboBox = new ComboBox<>();
stringComboBox.getItems().addAll("str1","str2","str3","str4","str5");
//允许编辑
stringComboBox.setEditable(true);
stringComboBox.setPromptText("请输入");
//没元素有效
stringComboBox.setPlaceholder(new Button("占位符"));
//默认显示数量
stringComboBox.setVisibleRowCount(3);
stringComboBox.getSelectionModel().selectedItemProperty().addListener((observable, oldValue, newValue) -> {
    System.out.println("newValue = " + newValue);
});
stringComboBox.setOnAction(event -> {
    System.out.println(event.getSource());
});
```

{% fold 学生 %}

```java
package demo1.l037;

import javafx.beans.property.SimpleDoubleProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;

public class Student {

    private SimpleStringProperty name = new SimpleStringProperty();
    private SimpleStringProperty id = new SimpleStringProperty();
    private SimpleIntegerProperty age = new SimpleIntegerProperty();
    private SimpleDoubleProperty score = new SimpleDoubleProperty();

    public Student() {
    }

    public Student(String name, String id, int age, double score) {
        this.name.setValue(name);
        this.id.setValue(id);
        this.age.setValue(age);
        this.score.setValue(score);
    }

    public String getName() {
        return name.getValue();
    }

    public void setName(String name) {
        this.name.setValue(name);
    }

    public String getId() {
        return id.getValue();
    }

    public void setId(String id) {
        this.id.setValue(id);
    }

    public int getAge() {
        return age.getValue();
    }

    public void setAge(int age) {
        this.age.setValue(age);
    }

    public double getScore() {
        return score.getValue();
    }

    public void setScore(double score) {
        this.score.setValue(score);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Student student = (Student) o;

        if (!age.getValue().equals(student.age.getValue())) {
            return false;
        }
        if (Double.compare(student.score.getValue(), score.getValue()) != 0) {
            return false;
        }
        if (!name.getValue().equals(student.name.getValue())) {
            return false;
        }
        return id.getValue().equals(student.id.getValue());
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = name.getValue().hashCode();
        result = 31 * result + id.getValue().hashCode();
        result = 31 * result + age.getValue();
        temp = Double.doubleToLongBits(score.getValue());
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name.getValue() + '\'' +
                ", id='" + id.getValue() + '\'' +
                ", age=" + age.getValue() +
                ", score=" + score.getValue() +
                '}';
    }
    private String showMsg(){
        return this.getName() +" "+this.getId()+" "+this.getAge()+" "+this.getScore();
    };

    public SimpleStringProperty nameProperty() {
        return name;
    }

    public SimpleStringProperty idProperty() {
        return id;
    }

    public SimpleIntegerProperty ageProperty() {
        return age;
    }

    public SimpleDoubleProperty scoreProperty() {
        return score;
    }

}
```

{% endfold %}

{% fold 学生选择 %}

```java
AnchorPane an = new AnchorPane();
an.setStyle("-fx-background-color: pink");

demo1.l037.Student zs = new demo1.l037.Student("张三三", "001", 15, 98);
demo1.l037.Student ls = new demo1.l037.Student("李四三", "002", 18, 70);
demo1.l037.Student ww = new demo1.l037.Student("王五四", "003", 25, 40);
demo1.l037.Student ml = new demo1.l037.Student("马六三", "004", 17, 60);
demo1.l037.Student pq = new demo1.l037.Student("彭七四", "005", 15, 80);
ComboBox<Student> stringComboBox = new ComboBox<>();
ObservableList<demo1.l037.Student> list = stringComboBox.getItems();
list.addAll(zs,ls,ww,ml,pq);

stringComboBox.getItems().addAll();
//允许编辑
stringComboBox.setEditable(true);
stringComboBox.setPromptText("请输入");
//没元素有效 占位
//        stringComboBox.setPlaceholder(new Button());
//默认显示数量
//        stringComboBox.setVisibleRowCount(3);
Button button = new Button("按钮");
AnchorPane.setLeftAnchor(button,500.0);
an.getChildren().addAll(stringComboBox,button);
Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setHeight(800);
primaryStage.setWidth(800);
primaryStage.setTitle("javaFx");
primaryStage.show();

stringComboBox.getSelectionModel().selectedItemProperty().addListener((observable, oldValue, newValue) -> {
    System.out.println("newValue = " + newValue);
});
stringComboBox.setConverter(new StringConverter<Student>() {
    @Override
    public String toString(Student object) {
        if (object != null) {
            System.out.println("发现修改对象，在多次执行，修改Student");
            System.out.println("object = " + object);
            //添加对象
            //                    if (!list.contains(object)){
            //                        list.add(object);
            //                    }
            return object.getName()+ " " + object.getId()+ " " + object.getAge() + " "  +object.getScore();
        }else {
            return "";
        }

    }

    @Override
    public Student fromString(String string) {
        System.out.println(string);
        //                Student newStudent = new Student(string, "000", 0, 0.0);
        //                return newStudent;
        return null;
    }
});

TextField editor = stringComboBox.getEditor();
editor.textProperty().addListener((observable, oldValue, newValue) -> {
    System.out.println("oldValue = " + oldValue);
    System.out.println("newValue = " + newValue);

    if (newValue == null ) {
        return;
    }
    //笨办法，解决选择后越界异常
    if (newValue.length()>=15) {
        return;
    }
    if (newValue.length() ==0) {
        stringComboBox.setItems(list);
    }
    System.out.println(newValue.length());
    FilteredList<Student> filtered = list.filtered(student -> student.getName().contains(newValue));
    if (filtered.isEmpty()) {
        stringComboBox.setPlaceholder(new Label("没有找到"));
    }
    stringComboBox.setItems(filtered);
    stringComboBox.hide();
    stringComboBox.show();
});
```

{% endfold %}

### 颜色选择器ColorPicker和时间选择器DatePicker

```java
AnchorPane an = new AnchorPane();
an.setStyle("-fx-background-color: #cc3333ff");
ColorPicker colorPicker = new ColorPicker(Color.BLUE);
DatePicker datePicker = new DatePicker(LocalDate.now());
AnchorPane.setLeftAnchor(datePicker,200.0);

an.getChildren().addAll(colorPicker,datePicker);
Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setHeight(800);
primaryStage.setWidth(800);
primaryStage.setTitle("javaFx");
primaryStage.show();
colorPicker.valueProperty().addListener((observable, oldValue, newValue) -> {
    System.out.println("newValue = " + newValue);
    System.out.println("newValue.getRed() = " + newValue.getRed());
    System.out.println("newValue.getGreen() = " + newValue.getGreen());
    System.out.println("newValue.getBlue() = " + newValue.getBlue());
    an.setStyle("-fx-background-color: #"+newValue.toString().substring(2));
});
datePicker.valueProperty().addListener((observable, oldValue, newValue) -> {
    System.out.println("newValue.getYear() = " + newValue.getYear());
    System.out.println("newValue.getMonth() = " + newValue.getMonth());
    System.out.println("newValue.getDayOfYear() = " + newValue.getDayOfYear());
    System.out.println("newValue.getDayOfWeek().getValue() = " + newValue.getDayOfWeek().getValue());
    System.out.println("newValue.getDayOfMonth() = " + newValue.getDayOfMonth());
    System.out.println("newValue.getDayOfYear() = " + newValue.getDayOfYear());
});
datePicker.setConverter(new StringConverter<LocalDate>() {
    @Override
    public String toString(LocalDate object) {
        return object.toString();
    }

    @Override
    public LocalDate fromString(String string) {
        return null;
    }
});
datePicker.setDayCellFactory(new Callback<DatePicker, DateCell>() {
    @Override
    public DateCell call(DatePicker param) {
        return new DateCell(){
            @Override
            public void updateItem(LocalDate item, boolean empty) {
                super.updateItem(item, empty);
                System.out.println("this.getClass() = " + this.getClass());
                this.setGraphic(new Button("*"));
            }
        };
    }
});
```

### 滑竿Slider、水平进度条ProgressBar、圆形进度ProgressIndicator

```java
package demo1.l044;

import javafx.application.Application;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.concurrent.ScheduledService;
import javafx.concurrent.Task;
import javafx.geometry.Orientation;
import javafx.scene.Scene;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.ProgressIndicator;
import javafx.scene.control.Slider;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;
import javafx.util.Duration;

public class What extends Application {
    Slider mySlider = null;
    ScheduledService<Double> doubleScheduledService;
    @Override
    public void start(Stage primaryStage) throws Exception {
        AnchorPane an = new AnchorPane();
        an.setStyle("-fx-background-color: #cc3333ff");
        Slider slider = new Slider(0, 100, 10);
        mySlider = slider;
        slider.setPrefSize(200, 200);
        slider.setShowTickMarks(true);
        slider.setShowTickLabels(true);
        slider.setMajorTickUnit(20);
        slider.setValue(0);
        slider.setOrientation(Orientation.VERTICAL);

        ProgressBar progressBar = new ProgressBar(0.5);
//        progressBar.setProgress(ProgressBar.INDETERMINATE_PROGRESS);
        progressBar.setPrefWidth(200);
        doubleScheduledService = new ScheduledService<Double>(){
            double i = 0;
            @Override
            protected Task<Double> createTask() {
                return new Task<Double>() {
                    @Override
                    protected Double call() throws Exception {
                        return i=i+0.1;
                    }

                    @Override
                    protected void updateValue(Double value) {
                        super.updateValue(value);
                        progressBar.setProgress(i);
                        if (i==1) {
                            doubleScheduledService.cancel();
                        }
                    }
                };
            }
        };
        doubleScheduledService.setDelay(Duration.millis(0));
        doubleScheduledService.setPeriod(Duration.millis(1000));
        doubleScheduledService.start();

        //判断时要大于1才行
        ProgressIndicator progressIndicator = new ProgressIndicator(ProgressIndicator.INDETERMINATE_PROGRESS);
        progressIndicator.setPrefSize(60,60);

//        slider.setLabelFormatter(new StringConverter<Double>() {
//            @Override
//            public String toString(Double object) {
//                System.out.println("object = " + object);
//                return String.valueOf(object) + " 米";
//            }
//
//            //无作用
//            @Override
//            public Double fromString(String string) {
//                return null;
//            }
//        });
        AnchorPane.setLeftAnchor(progressBar,110.0);
        AnchorPane.setLeftAnchor(progressIndicator,330.0);
        an.getChildren().addAll(slider,progressBar,progressIndicator);
        Scene scene = new Scene(an);
        primaryStage.setScene(scene);
        primaryStage.setHeight(800);
        primaryStage.setWidth(800);
        primaryStage.setTitle("javaFx");
        primaryStage.show();
//        slider.valueProperty().addListener((observable, oldValue, newValue) -> {
//            System.out.println("valueProperty()newValue = " + newValue);
//            slider.setValueChanging(true);//这样可以比较完美，避免可能第一次没有识别到
//        });
//        slider.valueChangingProperty().addListener((observable, oldValue, newValue) -> {
//            System.out.println("valueChangingProperty()newValue = " + newValue);
//        });


        //不倡导 不在javafx线程更新界面
        MyScheduledService myScheduledService = new MyScheduledService(slider);
        myScheduledService.setDelay(Duration.millis(0));
        myScheduledService.setPeriod(Duration.millis(1000));
        myScheduledService.start();

        myScheduledService.valueProperty().addListener(new ChangeListener<Integer>() {
            @Override
            public void changed(ObservableValue<? extends Integer> observable, Integer oldValue, Integer newValue) {
                //每次会执行两次
                System.out.println(newValue);
                if (newValue != null) {
                    slider.setValue(newValue);
                }

            }
        });

    }
    public static void main(String[] args) {
        launch(What.class);
    }

class MyScheduledService extends ScheduledService<Integer>
    {
        int i=0;
        Slider slider ;
        public MyScheduledService(Slider slider) {
            this.slider = slider;
        }

        @Override
        protected Task<Integer> createTask() {
            return new Task<Integer>() {
                @Override
                protected Integer call() throws Exception {
                    return i=i+1;
                }

                @Override
                protected void updateValue(Integer value) {
                    super.updateValue(value);
//                    slider.setValue(i);
//                    if (i == 100) {
//                        this.cancel();
//                    }
                }
            };
        }

    }
}


```

### Spinner带文本框选择器

```java
Spinner<Integer> objectSpinner = new Spinner<>(0, 10, 6);
objectSpinner.setEditable(true);
Spinner<Integer> objectSpinner2 = new Spinner<>(0, 10, 6,2);
objectSpinner2.getStyleClass().add(Spinner.STYLE_CLASS_ARROWS_ON_LEFT_HORIZONTAL);
//        Spinner<Node> objectSpinner3 = new Spinner<>(splitPane.getItems());
Spinner<String> objectSpinner3 = new Spinner<>(FXCollections.observableArrayList("a","b","c"));
Spinner objectSpinner4 = new Spinner<Student>();
Student s1 = new Student("zs", "001", 25, 52);
Student s2 = new Student("zss", "002", 25, 52);
ObservableList<Student> students = FXCollections.observableArrayList(s1, s2);
final int[] i = {0};
objectSpinner4.setValueFactory(new SpinnerValueFactory<Student>() {
    //递减
    @Override
    public void decrement(int steps) {
        //            getConverter().toString(students.get(i+steps));
        i[0] = i[0] +steps;
        this.setValue(students.get(i[0]>=students.size()?i[0]=students.size()-1:i[0]));
    }
    //递增
    @Override
    public void increment(int steps) {
        i[0] = i[0] -steps;
        this.setValue(students.get(i[0]<0?i[0]=0:i[0]));
    }

    {setConverter(new StringConverter<Student>() {
        @Override
        public String toString(Student object) {
            return object.getName() + " " +object.getId();
        }

        @Override
        public Student fromString(String string) {
            return null;
        }
    });}


});
```

### 分页类似轮播图带显示第几个

```java
Pagination pagination = new Pagination();
pagination.setStyle("-fx-background-color: aqua");
pagination.setPrefSize(200,200);
//        pagination.setPageCount(10);
pagination.setPageCount(Pagination.INDETERMINATE);
//        pagination.setCurrentPageIndex(4);
pagination.setCurrentPageIndex(Pagination.INDETERMINATE);
pagination.setMaxPageIndicatorCount(5);
pagination.getStyleClass().add(Pagination.STYLE_CLASS_BULLET);
pagination.currentPageIndexProperty().addListener((observable, oldValue, newValue) -> {
    System.out.println("newValue = " + newValue);
});
pagination.setPageFactory(new Callback<Integer, Node>() {
    @Override
    public Node call(Integer param) {

        return new Button(String.valueOf(param));
    }
});
```

### 滚动条

```java
ScrollBar scrollBar = new ScrollBar();
scrollBar.setOrientation(Orientation.VERTICAL);
scrollBar.setVisibleAmount(50);
scrollBar.setValue(20);
scrollBar.setUnitIncrement(10);
VBox vBox = new VBox(10);
for (int i = 0; i < 10; i++) {
    vBox.getChildren().add(new Button(i+""));
}
scrollBar.valueProperty().addListener((observable, oldValue, newValue) -> {
    System.out.println("newValue = " + newValue);
    vBox.setLayoutY(-newValue.doubleValue());
});

Button button = new Button("滚动");
button.setOnAction(event -> {
    if (Math.round(Math.random()*10)%2==0) {
        scrollBar.increment();
    }else {
        scrollBar.decrement();
    }


});
```

### Separator分隔符

```java
Separator separator = new Separator(Orientation.HORIZONTAL);
HBox hBox1 = new HBox(new Button("1"),separator,new Button("2"));
separator.setPrefSize(100,100);
separator.setHalignment(HPos.CENTER);
//        separator.setValignment(VPos.CENTER);
```

### FileChooser文件选择器、DirectoryChooser文件夹选择权、打开保存文本

```java
AnchorPane an = new AnchorPane();

Button a = new Button("单选文件窗口");
Button b = new Button("多选文件窗口");
Button c = new Button("保存文件窗口,不要点");
Button d = new Button("文件夹选择窗口");
Button openTxt = new Button("打开文本");
Button saveTxt = new Button("保存");
TextArea textArea = new TextArea();
textArea.setWrapText(true);
VBox vBox = new VBox(10.0,a,b,c,d,openTxt,saveTxt,textArea);

an.getChildren().addAll(vBox);
Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setTitle("文件选择器");
primaryStage.setWidth(800);
primaryStage.setHeight(800);
primaryStage.show();
a.setOnAction(event -> {
    Stage stage = new Stage();
    FileChooser fileChooser = new FileChooser();
    fileChooser.setTitle("单选文件");
    fileChooser.setInitialDirectory(new File("E:"+File.separator+"Pictures"+File.separator+"Screenshots"));
    fileChooser.getExtensionFilters().addAll(
        new FileChooser.ExtensionFilter("图片类型","*.jpg","*.png"),
        new FileChooser.ExtensionFilter("文本类型","*.txt","*.md"),
        new FileChooser.ExtensionFilter("所有类型","*"));
    File file = fileChooser.showOpenDialog(stage);
    if (file != null) {
        System.out.println("file.getAbsolutePath() = " + file.getAbsolutePath());
    }

});
b.setOnAction(event -> {
    Stage stage = new Stage();
    FileChooser fileChooser = new FileChooser();
    fileChooser.setTitle("多选文件");
    fileChooser.setInitialDirectory(new File("E:"+File.separator+"Pictures"+File.separator+"Screenshots"));
    fileChooser.getExtensionFilters().addAll(
        new FileChooser.ExtensionFilter("图片类型","*.jpg","*.png"),
        new FileChooser.ExtensionFilter("文本类型","*.txt","*.md"),
        new FileChooser.ExtensionFilter("所有类型","*"));
    List<File> files = fileChooser.showOpenMultipleDialog(stage);
    if (files != null) {
        for (int i = 0; i < files.size(); i++) {
            System.out.println("files["+i+"].getAbsolutePath() = " + files.get(i).getAbsolutePath());

        }
    }

});
openTxt.setOnAction(event -> {
    Stage stage = new Stage();
    FileChooser fileChooser = new FileChooser();
    fileChooser.setTitle("单选文件");
    fileChooser.setInitialDirectory(new File("E:"+File.separator+"Pictures"+File.separator+"Screenshots"));
    fileChooser.getExtensionFilters().addAll(
        new FileChooser.ExtensionFilter("图片类型","*.jpg","*.png"),
        new FileChooser.ExtensionFilter("文本类型","*.txt","*.md"),
        new FileChooser.ExtensionFilter("所有类型","*"));
    File file = fileChooser.showOpenDialog(stage);
    if (file != null) {
        System.out.println("file.getAbsolutePath() = " + file.getAbsolutePath());
        try {
            FileReader fileReader = new FileReader(file);
            BufferedReader reader = new BufferedReader(fileReader);
            String s;
            while ((s = reader.readLine()) != null){
                textArea.appendText(s+"\n");
            }
            fileReader.close();
            reader.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

});
saveTxt.setOnAction(event -> {
    Stage stage = new Stage();
    FileChooser fileChooser = new FileChooser();
    fileChooser.setTitle("保存文件");
    fileChooser.setInitialFileName("332.txt");
    fileChooser.setInitialDirectory(new File("E:"+File.separator+"Pictures"+File.separator+"Screenshots"));
    fileChooser.getExtensionFilters().addAll(
        new FileChooser.ExtensionFilter("文本类型","*.txt","*.md"));
    File file = fileChooser.showSaveDialog(stage);
    if (file != null) {
        System.out.println("file.getAbsolutePath() = " + file.getAbsolutePath());

        try {
            FileOutputStream fileOutputStream = new FileOutputStream(file);
            OutputStreamWriter writer = new OutputStreamWriter(fileOutputStream,"GBK");
            writer.write(textArea.getText());


            writer.close();
            fileOutputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

});
d.setOnAction(event -> {
    DirectoryChooser directoryChooser = new DirectoryChooser();
    directoryChooser.setTitle("文件夹选择");
    directoryChooser.setInitialDirectory(new File("E:"+File.separator+"Pictures"));

    File file = directoryChooser.showDialog(new Stage());
    if (file != null) {
        System.out.println("file.getAbsolutePath() = " + file.getAbsolutePath());
        File[] files = file.listFiles();
        for (File file1 : files) {
            System.out.println("file1.getAbsolutePath() = " + file1.getAbsolutePath());
        }
    }
});
```

### Tooltip提示

```java
AnchorPane an = new AnchorPane();
Button button = new Button("button");
Tooltip tooltip = new Tooltip("提示初始sfghwrwrwerefdsgdfgradergrteragagasd");
tooltip.setFont(new Font(20));
tooltip.setPrefSize(200,200);
//        tooltip.setWrapText(true);
//        tooltip.setTextOverrun(OverrunStyle.CENTER_ELLIPSIS);
tooltip.setTextAlignment(TextAlignment.CENTER);
tooltip.setAnchorLocation(PopupWindow.AnchorLocation.CONTENT_TOP_RIGHT);
tooltip.setOpacity(0.3);
button.setTooltip(tooltip);
Tooltip.uninstall(button,tooltip);
Tooltip.install(button,tooltip);

VBox vBox = new VBox(10.0,button);

an.getChildren().addAll(vBox);
Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setTitle("FXjava");
primaryStage.setWidth(800);
primaryStage.setHeight(800);
primaryStage.show();

tooltip.setX(300);
tooltip.show(primaryStage);
tooltip.setAutoHide(true);
tooltip.setOnShowing(event -> {
    System.out.println("setOnShowing");
});
tooltip.setOnHiding(event -> {
    System.out.println("setOnHiding");
});
tooltip.setOnHidden(event -> {
    System.out.println("setOnHidden");
});
tooltip.setOnShown(event -> {
    System.out.println("setOnShown");
});
tooltip.setGraphic(new Button("banno"));
tooltip.setGraphicTextGap(5);
tooltip.setStyle("-fx-background-color:#ffffff");
```

### ImageView图片

```java
FileInputStream fileInputStream = new FileInputStream("E:\\Pictures\\25125.png");
//多种参数 异步加载
Image image = new Image(fileInputStream,800,0,true,true);
ImageView imageView = new ImageView(image);
//各种监听器 加载可以结合进度条

//        imageView.setSmooth(true);
//        imageView.setFitHeight(600);
//        圆角
//        Rectangle rectangle = new Rectangle(imageView.prefWidth(-1), imageView.prefHeight(-1));
//        rectangle.setArcHeight(30);
//        rectangle.setArcWidth(30);
//        //对图片进行移动 可以显示想要的部分
//        imageView.setClip(rectangle);
//显示区域
imageView.setViewport(new Rectangle2D(200,200,200,200));
imageView.setOnMouseDragged(new EventHandler<MouseEvent>() {
    @Override
    public void handle(MouseEvent event) {
        System.out.println("移动");
        imageView.setViewport(new Rectangle2D(event.getSceneX(),event.getSceneY(),200,200));
    }
});

```

```java
Image image = new Image("file:D:\\IntelliJ IDEA 2020.1.1\\WorkSpace\\yangguangnongchang\\javafx\\src\\main\\resources\\icons8-apple-logo-26.png");
ImageView imageView = new ImageView(image);
PixelReader pixelReader = image.getPixelReader();
if (pixelReader == null) {
    System.out.println("空");
    //异步加载空指针
}
int argb = pixelReader.getArgb(0, 0);
System.out.println("argb = " + argb);
System.out.println("alpha(argb >> 24)&0xff = " + ((argb >> 24) & 0xff));
System.out.println("红(argb >> 16)&0xff = " + ((argb >> 16) & 0xff));
System.out.println("蓝(argb >> 8)&0xff = " + ((argb >> 8) & 0xff));
System.out.println("绿(argb & 0xff) = " + (argb & 0xff));

Color color = pixelReader.getColor(10, 10);
System.out.println("color.toString() = " + color.toString());
System.out.println("color.getOpacity() = " + color.getOpacity()*255);
System.out.println("color.getRed() = " + color.getRed()*255);
System.out.println("color.getBlue() = " + color.getBlue()*255);
System.out.println("color.getGreen() = " + color.getGreen()*255);
System.out.println("Integer.parseInt(\"ff\",16) = " + Integer.parseInt("ff", 16));

//读取所有像素放到数组
//转换
WritablePixelFormat<ByteBuffer> pixelFormat = PixelFormat.getByteBgraInstance();
byte[] bytes = new byte[26 * 26 * 4];
pixelReader.getPixels(0,0,26,26,pixelFormat,bytes,0,26*4);
for (int i = 0; i < bytes.length; i+=4) {
    int b = bytes[i] & 0xFF;
    int g = bytes[i+1] & 0xFF;
    int r = bytes[i+2] & 0xFF;
    int a = bytes[i+3] & 0xFF;
    System.out.print("a = " + a +" ");
    System.out.print("r = " + r +" ");
    System.out.print("g = " + g +" ");
    System.out.println("b = " + b +" ");
}
WritablePixelFormat<IntBuffer> pixelFormatInt = PixelFormat.getIntArgbInstance();
int[] ints = new int[26 * 26];
pixelReader.getPixels(0,0,26,26,pixelFormatInt,ints,0,26);
for (int i = 0; i < ints.length; i++) {
    System.out.println("alpha(argb >> 24)&0xff = " + ((ints[i] >> 24) & 0xff));
    System.out.println("红(argb >> 16)&0xff = " + ((ints[i] >> 16) & 0xff));
    System.out.println("蓝(argb >> 8)&0xff = " + ((ints[i] >> 8) & 0xff));
    System.out.println("绿(argb & 0xff) = " + (ints[i] & 0xff));
}

```

```java
AnchorPane an = new AnchorPane();
WritableImage writableImage = new WritableImage(600, 600);
PixelWriter pixelWriter = writableImage.getPixelWriter();
ImageView imageView = new ImageView(writableImage);
for (int i = 0; i < 600/2; i++) {
    for (int j = i; j < 600-i; j++){
        pixelWriter.setColor(j,i, Color.BLUE);
    }
}
for (int i = 300; i < 600; i++) {
    for (int j = 600-i; j <=i; j++) {
        pixelWriter.setColor(i,j, Color.PINK);
    }
}
for (int i = 300; i < 600; i++) {
    for (int j = 600-i; j < i; j++) {
        pixelWriter.setColor(j,i, Color.RED);
    }
}
for (int i = 0; i < 300; i++) {
    for (int j = i; j < 600-i; j++) {
        pixelWriter.setColor(i,j, Color.GREEN);
    }
}

//2
Image image = new Image("http://www.downxia.com/uploadfiles/2022/0615/20220615042456480.jpg");
WritableImage writableImage2 = new WritableImage(image.getPixelReader(),0,0,(int)image.getWidth(),(int)image.getHeight());

System.out.println("writableImage2.getWidth() = " + writableImage2.getWidth());
System.out.println("writableImage2.getHeight() = " + writableImage2.getHeight());
PixelWriter pixelWriter2 = writableImage2.getPixelWriter();
PixelReader pixelReader2 = writableImage2.getPixelReader();
for (int i = 0; i < 499/2; i++) {
    for (int j = 0; j < 360; j++) {
        int temp1 = pixelReader2.getArgb(i ,j);
        int temp2 = pixelReader2.getArgb(498-i, j);
        pixelWriter2.setArgb(i,j,temp2);
        pixelWriter2.setArgb(498-i,j,temp1);
    }
}
//还有其他写入方式，比如不用for的

//imageio



ImageView imageView2 = new ImageView(writableImage2);
an.getChildren().addAll(imageView2);
Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setTitle("JavaFX");
primaryStage.setWidth(800);
primaryStage.setHeight(800);
primaryStage.show();
```

### ListView

```java
//可自带滚动条
ListView<String> stringListView = new ListView<>();
stringListView.setPlaceholder(new Label("没有数据"));
stringListView.setPrefSize(300,80);

ObservableList<String> observableArrayList = FXCollections.observableArrayList();
observableArrayList.addAll("a","b","c","d","e");
stringListView.scrollTo(5);
stringListView.getItems().addAll(observableArrayList);
//        stringListView.setOrientation(Orientation.HORIZONTAL);
//多选模式
stringListView.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE);
Button button = new Button("按钮");

stringListView.setEditable(true);
stringListView.setCellFactory(TextFieldListCell.forListView(new StringConverter<String>() {
    @Override
    public String toString(String object) {
        return object;
    }

    @Override
    public String fromString(String string) {
        return string.toUpperCase();
    }
}));
```

四种修改样式

```java
public class WhatListView2 extends Application {

    @Override
    public void start(Stage primaryStage) throws Exception {


        AnchorPane an = new AnchorPane();
        an.setStyle("-fx-background-color: darkorange");
        //可自带滚动条
        ListView<Data> stringListView = new ListView<>();
        stringListView.setPlaceholder(new Label("没有数据"));
        stringListView.setPrefSize(300,80);

        ObservableList<Data> observableArrayList = FXCollections.observableArrayList();
        observableArrayList.addAll(new Data("a"),new Data("b"),new Data("c"),new Data("d"),new Data("e"));
        stringListView.scrollTo(5);
        stringListView.getItems().addAll(observableArrayList);
//        stringListView.setOrientation(Orientation.HORIZONTAL);
        //多选模式
        stringListView.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE);
        Button button = new Button("按钮");

        stringListView.setEditable(true);
        stringListView.setCellFactory(TextFieldListCell.forListView(new StringConverter<Data>() {
            @Override
            public String toString(Data object) {
                return object.getString();
            }

            @Override
            public Data fromString(String string) {
                return new Data(string+" new");
            }
        }));
        //下拉列表方式修改
        stringListView.setCellFactory(ComboBoxListCell.forListView(new StringConverter<Data>() {
            @Override
            public String toString(Data object) {
                return object.getString();
            }

            @Override
            public Data fromString(String string) {
                return new Data(string+" new");
            }
        },new Data("AA"),new Data("BB")));
        //下拉列表方式修改
        stringListView.setCellFactory(ChoiceBoxListCell.forListView(new StringConverter<Data>() {
            @Override
            public String toString(Data object) {
                return object.getString();
            }

            @Override
            public Data fromString(String string) {
                return new Data(string+" new");
            }
        },new Data("AAA"),new Data("BBB")));
        //多选方式修改
        stringListView.setCellFactory(CheckBoxListCell.forListView(new Callback<Data, ObservableValue<Boolean>>() {
            @Override
            public ObservableValue<Boolean> call(Data param) {
                //true购上，false不够  对数据进行改造将是否选择保存，这样在选择的时候可以获取到是否选择
                SimpleBooleanProperty simpleBooleanProperty = new SimpleBooleanProperty(true);
                return simpleBooleanProperty;
            }
        }, new StringConverter<Data>() {
            @Override
            public String toString(Data object) {
                return object.getString();
            }

            @Override
            public Data fromString(String string) {
                return new Data(string+" new");
            }
        }));
        AnchorPane.setLeftAnchor(stringListView,200.0);
        an.getChildren().addAll(stringListView,button);
        Scene scene = new Scene(an);
        primaryStage.setScene(scene);
        primaryStage.setTitle("JavaFX");
        primaryStage.setWidth(800);
        primaryStage.setHeight(800);
        primaryStage.show();
        button.setOnAction(event -> {
//          stringListView.edit(2);
        });

        stringListView.setOnEditStart(new EventHandler<ListView.EditEvent<Data>>() {
            @Override
            public void handle(ListView.EditEvent<Data> event) {
                System.out.println("event.getIndex() = " + event.getIndex());
                System.out.println("event.getNewValue() = " + event.getNewValue());
            }
        });
        stringListView.setOnEditCancel(event -> {
            System.out.println("取消");
        });
        //干扰setCellFactory javafx bug
        stringListView.setOnEditCommit(event -> {
            System.out.println("提交");
            System.out.println("event.getIndex() = " + event.getIndex());
            System.out.println("event.getNewValue() = " + event.getNewValue().getString());
            //bug解决之法
            observableArrayList.set(event.getIndex(),event.getNewValue());
            stringListView.setItems(observableArrayList);
        });


}

    public static void main(String[] args) {
        launch(args);

    }
}
class Data{
    private String string;

    public Data(String string) {
        this.string = string;
    }

    public String getString() {
        return string;
    }

    public void setString(String string) {
        this.string = string;
    }
}
```

string增删改

```java
AnchorPane an = new AnchorPane();
an.setStyle("-fx-background-color: darkorange");
Button b1 = new Button("添加");
Button b2 = new Button("倒序");
HBox hBox = new HBox(10,b1,b2);


//        //
//        ObservableList<String> observableArrayList = stringListView.getItems();
//        observableArrayList.addAll("a","b","c","d","e");

ObservableList<SimpleStringProperty> simpleStringProperties = FXCollections.observableArrayList(new Callback<SimpleStringProperty, Observable[]>() {
    @Override
    public Observable[] call(SimpleStringProperty param) {
        System.out.println("\"Callback\" = " + "Callback");
        return new SimpleStringProperty[]{param};
    }
});
//可自带滚动条
ListView<SimpleStringProperty> stringListView = new ListView<>(simpleStringProperties);
stringListView.setPlaceholder(new Label("没有数据"));
stringListView.setPrefSize(300,300);
ObservableList<SimpleStringProperty> observableArrayList = stringListView.getItems();
SimpleStringProperty A = new SimpleStringProperty("A");
SimpleStringProperty B = new SimpleStringProperty("B");
SimpleStringProperty C = new SimpleStringProperty("C");
SimpleStringProperty D = new SimpleStringProperty("D");
observableArrayList.addAll(A,B,C,D);
stringListView.setCellFactory(TextFieldListCell.forListView(new StringConverter<SimpleStringProperty>() {
    @Override
    public String toString(SimpleStringProperty object) {
        return object.get();
    }

    @Override
    public SimpleStringProperty fromString(String string) {
        return new SimpleStringProperty(string);
    }
}));

AnchorPane.setLeftAnchor(stringListView,200.0);
AnchorPane.setTopAnchor(stringListView,200.0);
an.getChildren().addAll(stringListView,hBox);
Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setTitle("JavaFX");
primaryStage.setWidth(800);
primaryStage.setHeight(800);
primaryStage.show();
b1.setOnAction(event -> {
    //            observableArrayList.add("admin");
    //            observableArrayList.set(0,"add");
    //            observableArrayList.add(new SimpleStringProperty("AA"));

    observableArrayList.get(0).set("AA");
    System.out.println("A.get() = " + A.get());
    //            stringListView.refresh();


});

b2.setOnAction(event -> {
    observableArrayList.sort((o1, o2) -> o2.get().compareTo(o1.get()));
});
observableArrayList.addListener(new InvalidationListener() {
    @Override
    public void invalidated(Observable observable) {
        ObservableList<SimpleStringProperty> list = (ObservableList<SimpleStringProperty>) observable;
        list.forEach(System.out::println);
    }
});
```

对象增删改

```java
public class WhatListView4 extends Application {

    @Override
    public void start(Stage primaryStage) throws Exception {


        AnchorPane an = new AnchorPane();
        an.setStyle("-fx-background-color: darkorange");
        Button b1 = new Button("添加");
        Button b2 = new Button("倒序");
        HBox hBox = new HBox(10,b1,b2);



        //可自带滚动条
        ListView<Data1> stringListView = new ListView<>();
        stringListView.setPlaceholder(new Label("没有数据"));
        stringListView.setPrefSize(300,300);

        ObservableList<Data1> observableArrayList = stringListView.getItems();
        Data1 A = new Data1("A", "20");
        Data1 B = new Data1("B", "21");
        Data1 C = new Data1("C", "22");
        Data1 D = new Data1("D", "23");

        observableArrayList.addAll(A,B,C,D);
        stringListView.setCellFactory(TextFieldListCell.forListView(new StringConverter<Data1>() {
            @Override
            public String toString(Data1 object) {
                return object.getName()+ " "+ object.getAge();
            }

            @Override
            public Data1 fromString(String string) {
                return null;
            }
        }));

        AnchorPane.setLeftAnchor(stringListView,200.0);
        AnchorPane.setTopAnchor(stringListView,200.0);
        an.getChildren().addAll(stringListView,hBox);
        Scene scene = new Scene(an);
        primaryStage.setScene(scene);
        primaryStage.setTitle("JavaFX");
        primaryStage.setWidth(800);
        primaryStage.setHeight(800);
        primaryStage.show();
        observableArrayList.addListener(new ListChangeListener<Data1>() {
            @Override
            public void onChanged(Change<? extends Data1> c) {
                while (c.next()) {
                    System.out.println("c.wasAdded() = " + c.wasAdded());
                    System.out.println("c.wasPermutated() = " + c.wasPermutated());
                    System.out.println("c.wasRemoved() = " + c.wasRemoved());
                    System.out.println("c.wasReplaced() = " + c.wasReplaced());
                    System.out.println("c.wasUpdated() = " + c.wasUpdated());
                }
            }
        });
        b1.setOnAction(event -> {
//            observableArrayList.add(new Data1("zs","100"));
//            observableArrayList.remove(0);
//            observableArrayList.set(0,new Data1(observableArrayList.get(0).getName(),"100"));
//            Data1 data1 = observableArrayList.get(0);
//            data1.setAge("1000");
//            stringListView.refresh();

        });

        b2.setOnAction(event -> {

        });
        observableArrayList.addListener(new InvalidationListener() {
            @Override
            public void invalidated(Observable observable) {
                ObservableList<Data1> list = (ObservableList<Data1>) observable;
                list.forEach(System.out::println);
            }
        });



}

    public static void main(String[] args) {
        launch(args);

    }
}

class Data1 {
    private String name;
    private String age;

    public Data1(String name, String age) {
        this.name = name;
        this.age = age;
    }

    public Data1() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }
}
```

对象属性修改

```java
public class WhatListView5 extends Application {

    @Override
    public void start(Stage primaryStage) throws Exception {


        AnchorPane an = new AnchorPane();
        an.setStyle("-fx-background-color: darkorange");
        Button b1 = new Button("添加");
        Button b2 = new Button("倒序");
        HBox hBox = new HBox(10,b1,b2);

        ObservableList<Data2> list = FXCollections.observableArrayList(new Callback<Data2, Observable[]>() {
            @Override
            public Observable[] call(Data2 param) {
                SimpleStringProperty[] simpleStringProperties = {param.nameProperty(), param.ageProperty()};
                return simpleStringProperties;
            }
        });

        //可自带滚动条
        ListView<Data2> stringListView = new ListView<>(list);
        stringListView.setPlaceholder(new Label("没有数据"));
        stringListView.setPrefSize(300,300);

        ObservableList<Data2> observableArrayList = stringListView.getItems();
        Data2 A = new Data2("A", "20");
        Data2 B = new Data2("B", "21");
        Data2 C = new Data2("C", "22");
        Data2 D = new Data2("D", "23");

        observableArrayList.addAll(A,B,C,D);
        stringListView.setCellFactory(TextFieldListCell.forListView(new StringConverter<Data2>() {
            @Override
            public String toString(Data2 object) {
                return object.getName()+ " "+ object.getAge();
            }

            @Override
            public Data2 fromString(String string) {
                return null;
            }
        }));

        AnchorPane.setLeftAnchor(stringListView,200.0);
        AnchorPane.setTopAnchor(stringListView,200.0);
        an.getChildren().addAll(stringListView,hBox);
        Scene scene = new Scene(an);
        primaryStage.setScene(scene);
        primaryStage.setTitle("JavaFX");
        primaryStage.setWidth(800);
        primaryStage.setHeight(800);
        primaryStage.show();
        observableArrayList.addListener(new ListChangeListener<Data2>() {
            @Override
            public void onChanged(Change<? extends Data2> c) {
                while (c.next()) {
                    System.out.println("c.wasAdded() = " + c.wasAdded());
                    System.out.println("c.wasPermutated() = " + c.wasPermutated());
                    System.out.println("c.wasRemoved() = " + c.wasRemoved());
                    System.out.println("c.wasReplaced() = " + c.wasReplaced());
                    System.out.println("c.wasUpdated() = " + c.wasUpdated());
                }
            }
        });
        b1.setOnAction(event -> {
            System.out.println("b1");
//            observableArrayList.add(new Data2("zs","100"));
//            observableArrayList.remove(0);
//            observableArrayList.set(0,new Data2(observableArrayList.get(0).getName(),"100"));
            Data2 data1 = observableArrayList.get(0);
            data1.setAge("1000");
//            stringListView.refresh();
            
            
        });

        b2.setOnAction(event -> {

        });
        observableArrayList.addListener(new InvalidationListener() {
            @Override
            public void invalidated(Observable observable) {
                ObservableList<Data2> list = (ObservableList<Data2>) observable;
                list.forEach(System.out::println);
            }
        });



}

    public static void main(String[] args) {
        launch(args);

    }
}

class Data2 {
    private SimpleStringProperty name = new SimpleStringProperty();
    private SimpleStringProperty age = new SimpleStringProperty();

    public Data2() {
    }

    public Data2(SimpleStringProperty name, SimpleStringProperty age) {
        this.name = name;
        this.age = age;
    }
    public Data2(String name, String age) {
        this.name.set(name);
        this.age.set(age);
    }

    public String getName() {
        return name.get();
    }

    public SimpleStringProperty nameProperty() {
        return name;
    }

    public void setName(String name) {
        this.name.set(name);
    }

    public String getAge() {
        return age.get();
    }

    public SimpleStringProperty ageProperty() {
        return age;
    }

    public void setAge(String age) {
        this.age.set(age);
    }
}
```

ListCell和查找

```java
public class WhatListView6 extends Application {

    @Override
    public void start(Stage primaryStage) throws Exception {


        AnchorPane an = new AnchorPane();
        an.setStyle("-fx-background-color: darkorange");
        Button b1 = new Button("添加");
        Button b2 = new Button("倒序");
        TextField textField = new TextField();
        Label label = new Label("查找", textField);

        HBox hBox = new HBox(10,b1,b2,label);

        ObservableList<Data3> list = FXCollections.observableArrayList(new Callback<Data3, Observable[]>() {
            @Override
            public Observable[] call(Data3 param) {
                SimpleStringProperty[] simpleStringProperties = {param.nameProperty(), param.ageProperty()};
                return simpleStringProperties;
            }
        });

        //可自带滚动条
        ListView<Data3> stringListView = new ListView<>(list);
        stringListView.setPlaceholder(new Label("没有数据"));
        stringListView.setPrefSize(300,300);

        ObservableList<Data3> observableArrayList = stringListView.getItems();

        Data3 A = new Data3("A", "20");
        Data3 B = new Data3("B", "21");
        Data3 C = new Data3("C", "22");
        Data3 D = new Data3("D", "23");

        observableArrayList.addAll(A,B,C,D);
        ObservableList<Data3> observableArrayListBak = observableArrayList;

        AnchorPane.setLeftAnchor(stringListView,200.0);
        AnchorPane.setTopAnchor(stringListView,200.0);
        an.getChildren().addAll(stringListView,hBox);
        Scene scene = new Scene(an);
        primaryStage.setScene(scene);
        primaryStage.setTitle("JavaFX");
        primaryStage.setWidth(800);
        primaryStage.setHeight(800);
        primaryStage.show();
        observableArrayList.addListener(new ListChangeListener<Data3>() {
            @Override
            public void onChanged(Change<? extends Data3> c) {
                while (c.next()) {
                    System.out.println("c.wasAdded() = " + c.wasAdded());
                    System.out.println("c.wasPermutated() = " + c.wasPermutated());
                    System.out.println("c.wasRemoved() = " + c.wasRemoved());
                    System.out.println("c.wasReplaced() = " + c.wasReplaced());
                    System.out.println("c.wasUpdated() = " + c.wasUpdated());
                }
            }
        });
        b1.setOnAction(event -> {
            System.out.println("b1");
//            observableArrayList.add(new Data3("zs","100"));
//            observableArrayList.remove(0);
//            observableArrayList.set(0,new Data3(observableArrayList.get(0).getName(),"100"));
            Data3 data1 = observableArrayList.get(0);
            data1.setAge("1000");
//            stringListView.refresh();
            
            
        });

        b2.setOnAction(event -> {

        });
        observableArrayList.addListener(new InvalidationListener() {
            @Override
            public void invalidated(Observable observable) {
                ObservableList<Data3> list = (ObservableList<Data3>) observable;
                list.forEach(System.out::println);
            }
        });
        stringListView.setEditable(true);
        stringListView.setCellFactory(new MyCallback(stringListView));
        textField.textProperty().addListener((observable, oldValue, newValue) -> {
            stringListView.setCellFactory(null);
            FilteredList<Data3> filtered = stringListView.getItems().filtered(new Predicate<Data3>() {
                @Override
                public boolean test(Data3 data3) {
                    return data3.getName().contains(textField.getText());
                }
            });
            if (textField.getText().length()==0) {
                stringListView.setItems(observableArrayList);
            }else {
                stringListView.setItems(filtered);
            }
            stringListView.setCellFactory(new MyCallback(stringListView));
//            System.out.println("filtered = " + filtered);;
//            stringListView.setItems(filtered);
//
//            System.out.println("-------------------");
//            observableArrayList.forEach(System.out::println);
//            System.out.println("-------------------");
//            stringListView.getItems().forEach(System.out::println);
//            System.out.println("-------------------");

        });


    }


    public static void main(String[] args) {
        launch(args);

    }
}



class MyCallback implements Callback<ListView<Data3>, ListCell<Data3>>{
    public MyCallback(ListView<Data3> stringListView) {
        this.stringListView = stringListView;
    }
    ListView<Data3> stringListView;
    Data3 item;
    @Override
    public ListCell<Data3> call(ListView<Data3> param){
            param.setOnEditStart(event->{
            System.out.println("setOnEditStart");
            item=stringListView.getSelectionModel().getSelectedItem();
            });
            param.setOnEditCancel(event->{
            System.out.println("setOnEditCancel");

            });
            ListCell<Data3> data3ListCell=new ListCell<Data3>(){
            @Override
            public void startEdit(){
                    super.startEdit();
                    System.out.println("startEdit");
                    HBox box=getHBox(item,true,this);
                    this.setGraphic(box);
                    }

            @Override
            public void cancelEdit(){
                    super.cancelEdit();
                    System.out.println("cancelEdit");
                    HBox box=getHBox(item,false,this);
                    this.setGraphic(box);
                    }

            @Override
            public void commitEdit(Data3 newValue){
                    System.out.println("commitEdit");
                    System.out.println("newValue = "+newValue);
                    super.commitEdit(newValue);
                    HBox box=getHBox(newValue,false,this);
                    this.setGraphic(box);
                    }

        @Override
        protected void updateItem(Data3 item,boolean empty){
            System.out.println("updateItem");
            super.updateItem(item,empty);
                if(!empty){
                    System.out.println("this.getClass() = "+this.getClass());
                    HBox box=getHBox(item,false,this);
                    this.setGraphic(box);
                }
            }

            //                    @Override
            //                    public void updateSelected(boolean selected) {
            //                        System.out.println("updateSelected");
            //                        super.updateSelected(selected);
            //                    }

            //                    @Override
            //                    protected boolean isItemChanged(Data3 oldItem, Data3 newItem) {
            //                        System.out.println("isItemChanged");
            //                        return super.isItemChanged(oldItem, newItem);
            //                    }
            };

            return data3ListCell;
            }
    public  HBox getHBox(Data3 item,Boolean edit,ListCell<Data3> cell){
        ImageView imageView = new ImageView("file:D:\\IntelliJ IDEA 2020.1.1\\WorkSpace\\yangguangnongchang\\javafx\\src\\main\\resources\\icons8-apple-logo-26.png");
        Button button = new Button(item.getName() + "- button");
        Node name;
        Node age;
        if (edit) {
            name = new TextField(item.getName());
            age = new TextField(item.getAge());
            ((TextField)name).setPrefWidth(50);
            ((TextField)name).setOnKeyPressed(event -> {
                if (KeyCode.ENTER.equals(event.getCode())) {
                    if (((TextField) name).getText() != null&&((TextField) name).getText().length() != 0) {
                        item.setName(((TextField) name).getText() );
                        item.setAge(((TextField)age).getText());
                        cell.commitEdit(item);
                    }else {
                        cell.commitEdit(item);
                    }
                }
            });
            ((TextField)age).setPrefWidth(50);
            ((TextField)age).setOnKeyPressed(event -> {
                if (KeyCode.ENTER.equals(event.getCode())) {
                    if (((TextField)age).getText() != null&&((TextField)age).getText().length() != 0) {
                        item.setAge(((TextField)age).getText());
                        item.setName(((TextField) name).getText() );
                        cell.commitEdit(item);
                    }else {
                        cell.commitEdit(item);
                    }
                }
            });
        }else {
            name = new Label(item.getName());
            age = new Label(item.getAge());
        }
        HBox box = new HBox(10,imageView,button,name,age);
        box.setAlignment(Pos.CENTER_LEFT);
        button.setOnAction(event -> {
            System.out.println("item = " + item);
        });
        return box;
    }
}

class Data3 {
    private SimpleStringProperty name = new SimpleStringProperty();
    private SimpleStringProperty age = new SimpleStringProperty();

    public Data3() {
    }

    public Data3(SimpleStringProperty name, SimpleStringProperty age) {
        this.name = name;
        this.age = age;
    }
    public Data3(String name, String age) {
        this.name.set(name);
        this.age.set(age);
    }

    public String getName() {
        return name.get();
    }

    public SimpleStringProperty nameProperty() {
        return name;
    }

    public void setName(String name) {
        this.name.set(name);
    }

    public String getAge() {
        return age.get();
    }

    public SimpleStringProperty ageProperty() {
        return age;
    }

    public void setAge(String age) {
        this.age.set(age);
    }

    @Override
    public String toString() {
        return "Data3{" +
                "name=" + name +
                ", age=" + age +
                '}';
    }
}
```




## 布局

### AnchorPane

```java
//AnchorPane
AnchorPane anchorPane = new AnchorPane();
anchorPane.setStyle("-fx-background-color: pink");//没有效果
//        anchorPane.setOnMouseClicked(event -> {
//            System.out.println("怎么不出来");
//        });
Button b1 = new Button("b1");
b1.setLayoutX(10);//相对于父，//因此可设置在group里的位置，又可以设置Group的位置
b1.setLayoutY(10);
Button b2 = new Button("b2");
b2.setLayoutX(50);
b2.setLayoutY(10);
//        Group root = new Group();//容器 不是布局
//        root.setStyle("-fx-background-color: pink");//没有效果
//        root.setOnMouseClicked(event -> {
//            System.out.println("怎么不出来");
//        });
//会使b1设置位置失效 可以岁窗口改变
anchorPane.setTopAnchor(b1,100.0);//静态方法
anchorPane.setLeftAnchor(b1,100.0);
//        AnchorPane.setLeftAnchor(b1,100.0);
anchorPane.setRightAnchor(b1,100.0);
anchorPane.setBottomAnchor(b1,100.0);
anchorPane.setPadding(new Insets(20));//anchorPane的内边距

Group g1 = new Group();
Group g2 = new Group();
Button b3 = new Button("b3");
Button b4 = new Button("b4");

g1.getChildren().addAll(b3);//还是默认左上角
g2.getChildren().addAll(b4);
anchorPane.setTopAnchor(g1,50.0);//静态方法
anchorPane.setLeftAnchor(g1,50.0);
anchorPane.getChildren().addAll(b1,b2,g1,g2);

Scene scene = new Scene(anchorPane);
```

```java
//AnchorPane
AnchorPane anchorPane = new AnchorPane();
anchorPane.setStyle("-fx-background-color: pink");//没有效果
AnchorPane anchorPane2 = new AnchorPane();
anchorPane2.setStyle("-fx-background-color: blue");//没有效果
anchorPane.getChildren().addAll(anchorPane2);//在构造时加入也可以

Button button = new Button("这是按钮");
anchorPane2.setRightAnchor(button,0.0);
anchorPane2.setBottomAnchor(button,0.0);
anchorPane2.getChildren().add(button);

//button 想单飞
button.setManaged(false);// 失去父类管理 消失 不见了 其他可占用位置 但还在里面
//        button.setVisible(false);// 不可见
//        button.setOpacity(0);//透明度0
Scene scene = new Scene(anchorPane);

primaryStage.setScene(scene);
primaryStage.setHeight(800);
primaryStage.setWidth(800);
primaryStage.setTitle("javaFx");
primaryStage.show();

//show不是最后一行代码
anchorPane.setTopAnchor(anchorPane2,0.0);//静态方法
anchorPane.setLeftAnchor(anchorPane2,0.0);
//        AnchorPane.setLeftAnchor(b1,100.0);
anchorPane.setBottomAnchor(anchorPane2,anchorPane.getHeight()/2);
anchorPane.setRightAnchor(anchorPane2,anchorPane.getWidth()/2);

primaryStage.heightProperty().addListener((observable, oldValue, newValue) -> {
    anchorPane.setBottomAnchor(anchorPane2,anchorPane.getHeight()/2);
});
primaryStage.widthProperty().addListener((observable, oldValue, newValue) -> {
    anchorPane.setRightAnchor(anchorPane2,anchorPane.getWidth()/2);
});
```

### HBox

```java
HBox hBox = new HBox();
hBox.setStyle("-fx-background-color: pink");
hBox.setPrefSize(400,400);
hBox.setPadding(new Insets(10));
hBox.setSpacing(10);
hBox.setMargin(b1,new Insets(10));//低版本静态方法
hBox.setAlignment(Pos.BOTTOM_CENTER);//Pos.BOTTOM_CENTER 内外边距无效 ，间距还在

hBox.getChildren().addAll(b1,b2,b3);
```

###  VBox

```java
VBox vBox = new VBox();
vBox.setStyle("-fx-background-color: pink");
vBox.setPrefSize(400,400);
vBox.setPadding(new Insets(10));
vBox.setSpacing(10);
vBox.setMargin(b1,new Insets(10));//低版本静态方法
vBox.setAlignment(Pos.BOTTOM_CENTER);//Pos.BOTTOM_CENTER 内外边距无效 ，间距还在

vBox.getChildren().addAll(b1,b2,b3);
```

### BorderPane、FlowPane、GridPane、StackPane、TextFlow、TillPane、DailogPane简述

```java
/* 〈BorderPane 方位布局，中间挤占 设置setleft right center top bottom来布局而不是以前的方式，
* 可以设置内边距 和组件的外边距 获得组件用getleft right center top bottom，返回node
*
* FlowPane 流式布局 从左至右，自动根据窗口大小调整位置（下移） 水平间距setHgap 垂直间距 setVgap 方向setOrientation
*
* GridPane 网格布局    直接用add放组件 有间距设置   放组件也可以setConstraints(组件，位置）在用以前的add,但直接的add就不要用了，也可分开设置行列
*
* StackPane 图层类布局
*
* TextFlow 文本流式布局
*
* TillPane  像flow 对组件的部分调整是全部从众的感觉，还会对齐比较美观
*
* DailogPane
*/
```

### DialogPane（附定时服务）

```java
Button b1 = new Button("显示tisi窗口");
b1.setOnAction(event -> {
DialogPane dialogPane = new DialogPane();
dialogPane.setHeaderText("zailau");
dialogPane.setContentText("text");

dialogPane.getButtonTypes().add(ButtonType.APPLY);
dialogPane.getButtonTypes().add(ButtonType.CANCEL);
Button applyButton = (Button)dialogPane.lookupButton(ButtonType.APPLY);
Button node = (Button)dialogPane.lookupButton(ButtonType.CANCEL);
applyButton.setOnAction(event1 -> {
System.out.println("dadasd");
});
node.setOnAction(event1 -> {
System.out.println("dadasd");
});
ImageView imageView = new ImageView("icons8-apple-logo-26.png");
dialogPane.setGraphic(imageView);

dialogPane.setExpandableContent(new Text("这是扩展内容"));
dialogPane.setExpanded(false);


Scene scene = new Scene(dialogPane);

Stage stage = new Stage();
stage.setTitle("弹出窗口");
stage.initOwner(primaryStage);
stage.initModality(Modality.WINDOW_MODAL);
//            stage.initStyle(StageStyle.UTILITY);
stage.setScene(scene);
stage.show();
});
```

{% fold 点击显/隐内容 %}

```java
public class UseWorker extends Application {
    @Override
    public void start(Stage primaryStage) throws Exception {
        AnchorPane anchorPane = new AnchorPane();
        anchorPane.setStyle("-fx-background-color: pink");

        Button b1 = new Button("显示tisi窗口");
        b1.setOnAction(event -> {
            DialogPane dialogPane = new DialogPane();
            dialogPane.setHeaderText("zailau");
            dialogPane.setContentText("text");

            dialogPane.getButtonTypes().add(ButtonType.APPLY);
            dialogPane.getButtonTypes().add(ButtonType.CANCEL);
            Button applyButton = (Button)dialogPane.lookupButton(ButtonType.APPLY);
            Button node = (Button)dialogPane.lookupButton(ButtonType.CANCEL);
            applyButton.setOnAction(event1 -> {
                System.out.println("dadasd");
            });
            node.setOnAction(event1 -> {
                System.out.println("dadasd");
            });



            ImageView imageView = new ImageView("icons8-apple-logo-26.png");
            dialogPane.setGraphic(imageView);

            dialogPane.setExpandableContent(new Text("这是扩展内容"));
            dialogPane.setExpanded(false);



            Scene scene = new Scene(dialogPane);

            Stage stage = new Stage();
            stage.setTitle("弹出窗口");
            stage.initOwner(primaryStage);
            stage.initModality(Modality.WINDOW_MODAL);
//            stage.initStyle(StageStyle.UTILITY);
            stage.setScene(scene);
            stage.show();

            MyScheduleService service = new MyScheduleService(dialogPane,stage);
            service.setDelay(Duration.millis(0));
            service.setPeriod(Duration.millis(1000));
            service.start();

        });


        AnchorPane.setTopAnchor(b1,100.0);
        AnchorPane.setLeftAnchor(b1,100.0);

        anchorPane.getChildren().addAll(b1);
        Scene scene = new Scene(anchorPane);
        primaryStage.setScene(scene);
        primaryStage.setHeight(800);
        primaryStage.setWidth(800);
        primaryStage.setTitle("javaFx");
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(UseWorker.class);
    }
}

class MyScheduleService extends ScheduledService<Integer>{

    DialogPane dp = null;
    Stage stage = null;

    public MyScheduleService(DialogPane dp, Stage stage) {
        this.dp = dp;
        this.stage = stage;
    }
    int  i =0;
    @Override
    protected Task<Integer> createTask() {

        return new Task<Integer>() {
            @Override
            protected Integer call() throws Exception {
                String name = Thread.currentThread().getName();
                System.out.println("name = " + name);//不停的新开线程

                return i++;
            }

            @Override
            protected void updateValue(Integer value) {
                System.out.println("Thread.currentThread().getName() = " + Thread.currentThread().getName());
                System.out.println("value = " + value);
                MyScheduleService.this.dp.setContentText(String.valueOf(value));
                if (value>10){
                    MyScheduleService.this.stage.close();
                    MyScheduleService.this.cancel();
                }
                super.updateValue(value);
            }
        };
    }
}
```

  {% endfold %}

  

### TitledPane折叠显示

```java
AnchorPane an = new AnchorPane();
an.setStyle("-fx-background-color: pink");

TitledPane titledPane1 = new TitledPane("tp1", new Button("b1"));
AnchorPane.setTopAnchor(titledPane1,0.0);

TitledPane titledPane2 = new TitledPane();
titledPane2.setText("tp2");
titledPane2.setContent(new Button("b2"));
AnchorPane.setTopAnchor(titledPane2,100.0);

TitledPane titledPane3 = new TitledPane();
AnchorPane.setTopAnchor(titledPane3,200.0);
titledPane3.setText("tp3");
HBox hBox = new HBox(new Button("tp3b1"), new Button("tp3b2"), new Button("tp3b3"));
hBox.setStyle("-fx-background-color: plum");
titledPane3.setContent(hBox);
titledPane3.setGraphic(new ImageView("icons8-apple-logo-26.png"));

TitledPane titledPane4 = new TitledPane("tp4", new Button("b4"));
AnchorPane.setTopAnchor(titledPane4,300.0);
titledPane4.setAnimated(false);
//        titledPane4.setCollapsible(false);
titledPane4.setExpanded(false);
titledPane4.expandedProperty().addListener((observable, oldValue, newValue) -> {
    System.out.println("newValue = " + newValue);
});
titledPane4.setNodeOrientation(NodeOrientation.RIGHT_TO_LEFT);
//只能展开一个
Accordion accordion = new Accordion(titledPane1, titledPane2);
accordion.getPanes().addAll(titledPane3,titledPane4);
accordion.expandedPaneProperty().addListener(new ChangeListener<TitledPane>() {
    @Override
    public void changed(ObservableValue<? extends TitledPane> observable, TitledPane oldValue, TitledPane newValue) {
        System.out.println("newValue = " + newValue);//有null
    }
});

//an.getChildren().addAll(titledPane1,titledPane2,titledPane3,titledPane4);
an.getChildren().addAll(accordion);
Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setHeight(800);
primaryStage.setWidth(800);
primaryStage.setTitle("javaFx");
primaryStage.show();
```

### TabPane切换面板类似浏览器页面的布局

```java
AnchorPane an = new AnchorPane();
an.setStyle("-fx-background-color: pink");
TabPane tabPane = new TabPane();
tabPane.setPrefSize(200,400);
tabPane.setStyle("-fx-background-color: aqua");
AnchorPane.setTopAnchor(tabPane,100.0);
AnchorPane.setLeftAnchor(tabPane,300.0);

Tab t1 = new Tab("t1");
Tab t2 = new Tab("t2");
Tab t3 = new Tab("t3");

HBox hBox = new HBox(new Button("b1"), new Button("b2"), new Button("b3"), new Button("b4"));
hBox.setAlignment(Pos.CENTER);
t1.setContent(hBox);

VBox vBox = new VBox(new Button("b1"), new Button("b2"), new Button("b3"), new Button("b4"));
vBox.setAlignment(Pos.CENTER);
t2.setContent(vBox);

t3.setGraphic(new ImageView("icons8-apple-logo-26.png"));
t3.setClosable(false);//不让关

tabPane.setSide(Side.LEFT);
tabPane.setRotateGraphic(false);//在show前面 图片不旋转 正常
tabPane.getSelectionModel().select(t3);
//        tabPane.getSelectionModel().selectLast();
tabPane.setTabClosingPolicy(TabPane.TabClosingPolicy.SELECTED_TAB);
tabPane.getSelectionModel().selectedItemProperty().addListener(new ChangeListener<Tab>() {
    @Override
    public void changed(ObservableValue<? extends Tab> observable, Tab oldValue, Tab newValue) {
        System.out.println("newValue.getText() = " + newValue.getText());
    }
});

t1.setOnSelectionChanged(event -> {
    Tab source = (Tab)event.getSource();
    System.out.println("source.getText() = " + source.getText());
});

tabPane.getTabs().addAll(t1,t2,t3);


an.getChildren().addAll(tabPane);

Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setHeight(800);
primaryStage.setWidth(800);
primaryStage.setTitle("javaFx");
primaryStage.show();

an.setOnMouseClicked(event -> {
    tabPane.getTabs().add(new Tab("hello"));
});
t1.setOnClosed(event -> {
    System.out.println(t1);
});
t1.setOnCloseRequest(event -> {
    System.out.println(t1);
    event.consume();
});



}
```

### 可拖拽分隔面板和栈

```java
SplitPane splitPane = new SplitPane();
splitPane.setPrefWidth(300);
Button b1 = new Button("b1");
Button b2 = new Button("b2");
Button b3 = new Button("b3");
Button b4 = new Button("b4");
//        splitPane.getItems().addAll(b1,b2,b3,b4);

StackPane sp1 = new StackPane(b1);
StackPane sp2 = new StackPane(b2);
StackPane sp3 = new StackPane(b3);
StackPane sp4 = new StackPane(b4);
splitPane.getItems().addAll(sp1,sp2,sp3,sp4);
splitPane.setDividerPosition(0,0.25);
splitPane.setDividerPosition(1,0.5);
splitPane.setDividerPosition(2,0.75);
splitPane.setDividerPosition(3,1);
```

### 滚动面板

  ```java
  VBox vBox1 = new VBox(10);
  for (int i = 0; i < 10; i++) {
      vBox1.getChildren().add(new Button(i+"v"));
  }
  HBox hBox = new HBox(10);
  for (int i = 0; i < 10; i++) {
      hBox.getChildren().add(new Button(i+"h"));
  }
  ScrollPane scrollPane = new ScrollPane();
  scrollPane.setPrefSize(300,300);
  scrollPane.setContent(new Group(vBox1,hBox));
  ```



## 其他

### 宽高坐标

```java
AnchorPane an = new AnchorPane();
Button button = new Button("button");
button.setRotate(80);
HBox hBox = new HBox(button);
//        hBox.setPrefSize(300,3000);
Rectangle rectangle = new Rectangle(200,100);
hBox.getChildren().addAll(rectangle);
System.out.println("button.isResizable() = " + button.isResizable());
System.out.println("rectangle.isResizable() = " + rectangle.isResizable());

an.getChildren().addAll(hBox);
Scene scene = new Scene(an);
primaryStage.setScene(scene);
primaryStage.setTitle("JavaFX");
primaryStage.setWidth(800);
primaryStage.setHeight(800);
primaryStage.show();

System.out.println("button.prefHeight(-1) = " + button.prefHeight(-1));
System.out.println("button.getContentBias() = " + button.getContentBias());

Bounds layoutBounds = button.getLayoutBounds();
System.out.println("layoutBounds.getMinX() = " + layoutBounds.getMinX());
System.out.println("layoutBounds.getMaxX() = " + layoutBounds.getMaxX());
Bounds bounds = button.localToParent(layoutBounds);
System.out.println("bounds.contains(layoutBounds.getMinX(),layoutBounds.getMinY()) = " + bounds.contains(layoutBounds.getMinX(), layoutBounds.getMinY()));
//scence
Bounds bounds1 = button.localToScene(layoutBounds);
Bounds bounds2 = button.localToScreen(layoutBounds);
```

### 工具类

```java
public class FXConllection {
    public static void main(String[] args) {
        ObservableList<SimpleStringProperty> sl1 = FXCollections.observableArrayList();
        ObservableList<SimpleStringProperty> ss = FXCollections.observableArrayList(new Callback<SimpleStringProperty, Observable[]>() {
            @Override
            public Observable[] call(SimpleStringProperty param) {
                Observable[] observables = {param};
                System.out.println("CALL");
                return observables;
            }
        });
        ss.addListener(new ListChangeListener<SimpleStringProperty>() {
            @Override
            public void onChanged(Change<? extends SimpleStringProperty> c) {
                System.out.println("onChanged" + c);
                System.out.println("c.getClass().getName() = " + c.getClass().getName());
                while (c.next()){
                    System.out.println("c.wasAdded() = " + c.wasAdded());
                    System.out.println("c.wasPermutated() = " + c.wasPermutated());
                    System.out.println("c.wasRemoved() = " + c.wasRemoved());
                    System.out.println("c.wasReplaced() = " + c.wasReplaced());
                    System.out.println("c.wasUpdated() = " + c.wasUpdated());
                }
            }
        });
        SimpleStringProperty a = new SimpleStringProperty("A");
        SimpleStringProperty b= new SimpleStringProperty("B");
        ss.add(a);
        a.set("AA");
        ss.add(0,b);


        ObservableList<SimpleStringProperty> ss2 = FXCollections.observableList(sl1,new Callback<SimpleStringProperty,Observable[]>(){

            @Override
            public Observable[] call(SimpleStringProperty param) {
                Observable[] observables = {param};
                System.out.println("CALL ss2");
                return observables;
            }
        });
        ss2.addListener(new ListChangeListener<SimpleStringProperty>() {
            @Override
            public void onChanged(Change<? extends SimpleStringProperty> c) {
                if (c == null) {
                    return;
                }
                System.out.println("onChanged ss2 " + c);
                System.out.println("c.getClass().getName() = " + c.getClass().getName());
                while (c.next()){
                    System.out.println("c.wasAdded() = " + c.wasAdded());
                    System.out.println("c.wasPermutated() = " + c.wasPermutated());
                    System.out.println("c.wasRemoved() = " + c.wasRemoved());
                    System.out.println("c.wasReplaced() = " + c.wasReplaced());
                    System.out.println("c.wasUpdated() = " + c.wasUpdated());
                }
            }
        });
        ss2.add(a);
        sl1.forEach(System.out::println);
        ss2.forEach(System.out::println);
//        sl1.set(0,b);
        sl1.forEach(System.out::println);
        ss2.forEach(System.out::println);
//        ss2.set(0,b);
//        ss2.add(a);
        ss2.set(0,b);
        sl1.forEach(System.out::println);
        ss2.forEach(System.out::println);
    }
}
```



## 缺少

- 数据绑定
- 可观察集合、Callback、ChangeListener
- ListView鼠标悬浮、拖拽排序、鼠标滚轮事件
- Alert弹窗、ChoiceDialog、TextInputDialog、自定义
- TableView、TreeView、TreeTableView
- Task、Service、ScheduledService
- FXML（不想）
- ResourceBundle国际化和Initializable
- 制作系统托盘
- 不考虑
	- 组件变换
	- 图表Chart、Paint类
	- Effect效果
	- 2D、3D图像
	- Animation动画
