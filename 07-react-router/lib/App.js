import{jsx as _jsx,jsxs as _jsxs}from"react/jsx-runtime";import{Suspense,lazy}from"react";import"./App.css";import Page404 from"./pages/404.jsx";import SearchPage from"./pages/Search.jsx";import{Routers}from"./Routers.jsx";import{Route}from"./Route.jsx";const LazyHomePage=lazy(()=>import("./pages/Home.jsx"));const LazyAboutPage=lazy(()=>import("./pages/About.jsx"));const appRoutes=[{path:"/:lang/about",Component:LazyAboutPage},{path:"/search/:query",Component:SearchPage}];function App(){return _jsx("main",{children:_jsx(Suspense,{fallback:_jsx("div",{children:"Loading..."}),children:_jsxs(Routers,{routes:appRoutes,defaultComponent:Page404,children:[_jsx(Route,{path:"/",Component:LazyHomePage}),_jsx(Route,{path:"/about",Component:LazyAboutPage})]})})})}export default App;