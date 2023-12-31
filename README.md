# Project structure

├─ src
│  ├─ App.tsx
│  ├─ components
│  │  ├─ AdminCreateProduct.tsx
│  │  ├─ AdminProductList.tsx
│  │  ├─ Banner.tsx
│  │  ├─ Categories.tsx
│  │  ├─ Category.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Header.tsx
│  │  ├─ Product.tsx
│  │  ├─ ProductsList.tsx
│  │  ├─ SingleCategory.tsx
│  │  ├─ SingleProduct.tsx
│  │  └─ Subscribe.tsx
│  ├─ hooks
│  │  └─ hooks.tsx
│  ├─ index.css
│  ├─ index.tsx
│  ├─ pages
│  │  ├─ Cart.tsx
│  │  ├─ Home.tsx
│  │  ├─ Product.tsx
│  │  ├─ Products.tsx
│  │  ├─ Profile.tsx
│  │  ├─ SignIn.tsx
│  │  └─ SignUp.tsx
│  ├─ responsive.ts
│  ├─ selectors
│  │  └─ cartSelector.ts
│  ├─ setupTests.ts
│  ├─ store
│  │  ├─ apiSlice.ts
│  │  ├─ cartSlice.ts
│  │  ├─ categoriesSlice.ts
│  │  ├─ productsSlice.ts
│  │  ├─ store.tsx
│  │  └─ userSlice.ts
│  ├─ tests
│  │  ├─ data
│  │  │  ├─ cartData.ts
│  │  │  ├─ categoriesData.ts
│  │  │  ├─ productData.ts
│  │  │  └─ usersData.ts
│  │  ├─ servers
│  │  │  ├─ categoriesServer.ts
│  │  │  ├─ productsServer.ts
│  │  │  └─ usersServer.ts
│  │  └─ slices
│  │     ├─ cartSlice.test.ts
│  │     ├─ categoriesSlice.test.ts
│  │     ├─ productSlice.test.ts
│  │     └─ userSlice.test.ts
│  ├─ types
│  │  ├─ CartItem.ts
│  │  ├─ Category.ts
│  │  ├─ Product.ts
│  │  └─ User.ts
│  └─ utils
│     ├─ common.ts
│     ├─ constants.jsx
│     └─ routes.ts
└─ tsconfig.json

## Instruction to start the project

In the project directory, you can run:

### `npm install`

Install all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

