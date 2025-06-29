---
title: "Taylor Series - crash-course"
date: 2025-06-29
draft: false
toc: true
tags: [calculus, taylor, series]
description: "One‐page reminder of what a Taylor series is, the must-know formulas, and two classic examples."
---

Outcome
	•	{{< bi "target" >}} Remember the general Taylor formula and the Maclaurin special case
	•	{{< bi "123" >}} Know how to grab the first n terms for quick approximations
	•	{{< bi "exclamation-diamond-fill" >}} Recall the remainder term’s shape to bound your error

---

Definition {{< bi "book" >}}

For a function $f(x)$ with enough derivatives near $a$:

$$
f(x)=\sum_{k=0}^{\infty}\frac{f^{(k)}(a)}{k!}(x-a)^{k}
$$
	•	If $a=0$ it’s called a Maclaurin series.

The $n^{\text{th}}$-degree Taylor polynomial:

$$
P_n(x)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^{k}
$$

Remainder / error after $n$ terms (Lagrange form):

$$
R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{,n+1},
\quad \xi \text{ between } a \text{ and } x
$$

---

Classic examples {{< bi "lightning-charge" >}}

Function	First few Maclaurin terms
$\displaystyle e^{x}$	$1+x+\dfrac{x^{2}}{2!}+\dfrac{x^{3}}{3!}+\cdots$
$\displaystyle \sin x$	$x-\dfrac{x^{3}}{3!}+\dfrac{x^{5}}{5!}-\cdots$
$\displaystyle \cos x$	$1-\dfrac{x^{2}}{2!}+\dfrac{x^{4}}{4!}-\cdots$

Quick hack: drop after $x^{3}$ for $\sin x$ when $|x|\le 0.2$ — error $<10^{-4}$ thanks to $R_3$.

---

How to grind it fast {{< bi "stopwatch-fill" >}}
	1.	Take derivatives until the pattern is obvious.
	2.	Evaluate at $a$ (often $0$).
	3.	Plug into the coefficient formula $\dfrac{f^{(k)}(a)}{k!}$.
	4.	Stop at the term your exam asks for; quote the remainder to justify accuracy.

Mnemonic: "Derive, Plug, Divide, Write."

---

Micro-practice {{< bi "pencil-fill" >}}

Approximate $\ln(1+x)$ near $x=0$ up to $x^{3}$:

$$
f(x)=\ln(1+x), ; f’(x)=\frac1{1+x},;f’’(x)=-\frac1{(1+x)^2},;f’’’(x)=\frac{2}{(1+x)^3}
$$

At $x=0$: $f(0)=0,;f’(0)=1,;f’’(0)=-1,;f’’’(0)=2$.

So

$$
\ln(1+x)=x-\frac{x^{2}}{2}+\frac{x^{3}}{3}+R_3(x)
$$

with

$$
|R_3(x)|\le\frac{2|x|^{4}}{4!(1+\xi)^{4}}\le\frac{|x|^{4}}{12}
$$

(for $|x|\le 0.5$, error $<0.002$).

---

Source: lecture PDF "Taylor Series"