---
tags: ['gridsome','bug','query','ssr']
date: 2020-02-27
description: 如果在query的時候出現這個錯誤，表示在query裡面找不到這個參數，需要打開schema裡面查看。
cover_image: ../img/gridsome.png
---

# bug
## query路徑
```typescript=
query {
  mdPost(date:"2020-02-08T00:00:00.000Z")
  {
    id
    title
    path
    date
    content
    
    
  }
}
```

如果在query的時候出現這個錯誤，表示在query裡面找不到這個參數，需要打開schema裡面查看。
```typescript=
Unknown argument on field of type \"Query\".
```
```typescript=
Unknown argument \"date\" on field \"mdPost\" of type \"Query\". Did you mean \"path\"?"
```
會發現支援query mdPost 的參數只有id和path。

![](https://i.imgur.com/Uu4J9IF.png)

所以可以query的屬性只有出現在schema中query的才可以。
## SSR(server side rendering)
[參考文章](https://blog.hinablue.me/2019-ithome-ironman-day-18/)
當你在<code>gridsome develop</code>的時候，效果都正常，這個問題是當你在<code>gridsome build</code>的時候才會出現的問題，十分的惱人，錯誤訊息顯示**window is not defined**或是**document is not defined**，找了許多資料，才知道原來這是ssr的問題。
### SSR(server side rendering)是什麼
意思是在伺服端先渲染的意思，像是vue或是react的前端框架，可以不用寫兩次程式碼。
* 好處
可以自己控制想要渲染的部分。
對seo較友善。
內容呈現效率較高。
* 缺點
對第三方套件不友善。
當你用了 window 或是 document 這一類**瀏覽器端**才會有的全域變數時，在 NodeJS 執行過程中，就會拋出錯誤。
因為 SSR 是在 伺服器端 運作，所以，所有關於**瀏覽器端**的事情，對他來說都是未知的東西，因此，倘若你，或是你所使用的第三方套件當中，有使用瀏覽器端的專屬操作的時候，那麼你的 SSR 就會因此而中斷。所以，你就必須想辦法替換，或是在這個區塊避開 SSR 的運作。

我在使用<code>skrollr</code>套件的時候，在build的時候就域到了這個問題，以及在使用<code>window.scrollTop()</code>的方法時，就會報錯，這個部分需要很小心。
