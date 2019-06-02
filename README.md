# CDGameStore_API
Link API: https://cd-game-store.herokuapp.com/

**Product**

- ```products/create``` creat product
- ```products/``` get all products
- ```products/findBYProductId/:productId``` get a product by product id
- ```products/findByName/:productName``` get a product by product name
- ```products/findByFIlter/:product``` get product(s) that match user request
- ```products/update:productId``` update a product
- ```products/delete/:productId``` delete a product

**DLC**

- ```dlcs/create``` create dlc
- ```dlcs/``` get all dlcs
- ```dlcs/findByDLCId/:dlcId``` get a dlc by dlc id
- ```dlcs/findByProductId/:productId``` get dlc(s) by product id
- ```dlcs/update/:dlcId``` update a dlc
- ```dlcs/delete/:dlcId``` delete a dlc

**Achievement**

- ```achievements/create``` create achievement
- ```achievements/``` get all achievements
- ```achievements/findByAchievementId/:achievementId``` get a achievement by achievement id
- ```achievements/findByProductId/:productId``` get achievement(s) by product id
- ```achievements/delete``` delete achievement

**User**

- ```users/signup``` signup user
- ```users/login``` login user
- ```users/details/:userId``` get user information
- ```users/update/:userId``` update user information
- ```users/guest``` use guset user to buy item
- ```users/delete/:userID``` delete user

**Stock**

- ```stocks/create``` create stock
- ```stocks/``` get all stocks
- ```stocks/findById/:itemId``` get a item by item id
- ```stocks/findByStockId/:stockId``` get a stock by stock id
- ```stocks/update/:stockId``` update stock
- ```stocks/delete/:stockId``` delete stock

**Cart**

- ```carts/create``` create cart
- ```carts/`:userId``` get cart(s) by user id
- ```carts/update/:cartId```  update cart
- ```carts/delete/:cartId``` delete cart

**HIstory**

- ```historys/create``` creat history
- ```historys/``` get all histories
- ```historys/findByItemId/:itemId``` get history by item id
- ```historys/findByUserId/:userId``` get history by user id