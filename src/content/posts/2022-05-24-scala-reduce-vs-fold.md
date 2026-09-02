---
title: "Scala Reduce vs Fold"
date: 2022-05-24T20:51:50.482Z
slug: "scala-reduce-vs-fold"
status: archived
tags: ["Scala", "Functional Programming"]
---

There is only a subtle difference between `reduce` and `fold`. Fold requires an initial value, whereas reduce doesn’t need one.

Reduce example:

```scala
scala> (1 to 10).reduce(_ * _)
val res0: Int = 3628800
```

Fold example:

```scala
scala> (1 to 10).fold(0)(_ * _)
val res0: Int = 0

scala> (1 to 10).fold(1)(_ * _)
val res1: Int = 3628800
```

This is because `reduce` requires the operator to be both **commutative** and **associative**, whereas `fold` requires the operator to be **associative** only.

A reminder of some basic arithmetics concepts:

Commutative property:

`a + b = b + a`

Associative property:

`(a + b) + c = a + (b + c)`
