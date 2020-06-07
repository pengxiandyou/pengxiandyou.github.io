---
title: Java核心技术卷一之第一章Java程序设计概述
tags:
  - Java
copyright: true
categories:
  - 笔记
  - Java
  - Java核心技术卷一
description: 在阅读这本书时，进行的简单整理和自我理解等内容<br/><h/>1996年Java第一次发布。Java是第一种也是唯一一种在National Public Radio上占用了10分钟来进行介绍的程序设计语言，并且还得到$100000000的风险投资基金。(<font color=red>第二章Java程序设计环境略过，自己搞</font>)
date: 2020-01-14 15:51:50
password:
command:
---

# Java程序设计平台

&nbsp;&nbsp;&nbsp;&nbsp; Java是一个完整的平台，有庞大的库，其中包含了很多可重用的代码和一个提供诸如完全性、跨操作系统的可移植性以及自动垃圾收集等服务的执行环境。它具有赏心悦目的语法和易于理解的语义（C++不是这样）。它是一种功能齐全的出色语言，是一个高质量的执行环境，还提供了一个庞大的库。

# Java“白皮书”的关键术语

1. 简单性<br/>&nbsp;&nbsp;&nbsp;&nbsp;人们希望构建一个无须深奥的专业训练就可以进行编程的系统<br/>&nbsp;&nbsp;&nbsp;&nbsp;的确，Java语法是C++语法的一个“纯净”版本。这里没有头文件、指针运算（甚至指针语法）、结构、联合、操作符重载（<font color=red> 真的没有吗？是不是String的+？</font>[知乎看看](https://www.zhihu.com/question/24013247)）、虚基类([百度](http://www.baidu.com/s?wd=%E8%99%9A%E5%9F%BA%E7%B1%BB))等。<br/>&nbsp;&nbsp;&nbsp;&nbsp;小。现在有一个独立的具有较小类库的Java微型版（[Java Micro  Edition](https://www.oracle.com/java/technologies/javameoverview.html)),这个版本适用于嵌入式设备。
2.  面向对象<br/>&nbsp;&nbsp;&nbsp;&nbsp;面向对象设计是一种程序设计技术。它将重点放在数据（即对象）和对象的接口上。在本质上，Java的面向对象能力与C++是一样的。<br/>&nbsp;&nbsp;&nbsp;&nbsp;Java与C++的主要不同点在于多重继承，在Java中，取而代之的是更简单的接口概念。与C++相比，Java提供了更丰富的运行时自省功能（[第五章讨论](http://localhost:4000/2020/01/14/第五章)）。
3. 分布式<br/>&nbsp;&nbsp;&nbsp;&nbsp; Java有一个丰富的例程库，用于处理像[HTTP](http://www.baidu.com/s?wd=HTML)和[FTP](http://www.baidu.com/s?wd=FTP)之类的[TCP/IP](http://www.baidu.com/s?wd=TCP/IP)协议。Java应用程序能够通过URL打开和访问网络上的对象，其便捷程度就好像访问本地文件一样。<br/>&nbsp;&nbsp;&nbsp;&nbsp;不过在1995年，主要还是从C++或Visual Basic程序连接Web服务器。
4. 健壮性,<br/>&nbsp;&nbsp;&nbsp;&nbsp; Java和C++最大的不同在于Java采用的指针模型可以消除重写内存和损坏数据的可能性。<br/>&nbsp;&nbsp;&nbsp;&nbsp; Java编译器能够检测许多其他语言中仅在运行时才能够检测出来的问题。
5. 安全性<br/>&nbsp;&nbsp;&nbsp;&nbsp; 使用Java可以构建防病毒、防篡改的系统。<br/>&nbsp;&nbsp;&nbsp;&nbsp;从一开始，Java就设计成能够防范各种攻击，其中包括：<ul>
    <li>运行时堆栈溢出。如蠕虫和病毒常用的攻击手段。</li>
    <li> 破坏自己的进程空间之外的内存。</li>
    <li> 未经授权读取文件。</li></ul>
6. 体系结构中立<br/>&nbsp;&nbsp;&nbsp;&nbsp;编译器生成一个体系结构中立的目标文件格式，这是一种编译过的代码，只要有Java运行时系统，这些编译过后的代码可以在许多处理器上运行。Java编译器通过生成与特定的计算机体系结构无关的字节码指令来实现这一特性。字节码还可以动态地翻译成本地机器码。<br/>&ensp;&ensp;解释虚拟机指令肯定会比全速运行机器指令慢很多。然而，虚拟机有一个选项，可以将执行最频繁的字节码序列翻译成机器码，这一过程称为即使编译。<br/>&ensp;&ensp;Java虚拟机还有一些其他的优点。。它可以检测指令序列的行为，从而增强其安全性。
7. 可移植性<br/>&ensp;&ensp;基本数据类型的大小以及有关运算都做了明确的说明。<br/>&ensp;&ensp;
