/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { HomePage } from './Pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SortingPage } from './Pages/SortingPage';
import { StringMatchingPage } from './Pages/StringMatchingPage';
import { PathFindingPage } from './Pages/PathFindingPage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { Provider } from 'react-redux';
import { createStore } from './Store/Store';
import { Header } from './Module Resources/Header';
import { mainBackground, mainFontColor, pageBackground } from './Styles/Styles';

const store = createStore();
function App() {
  return (
    <div
      css={css`
        margin: 0px;
        background-color: ${mainBackground};
        min-width: 450px;
      `}
    >
      <Header />
      <div
        css={css`
          margin: 50px 10px 0px 10px;
          background-color: ${pageBackground};
        `}
      >
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="" element={<HomePage />} />
              <Route path="sort" element={<SortingPage />} />
              <Route path="search" element={<StringMatchingPage />} />
              <Route path="path_find" element={<PathFindingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
      <div
        css={css`
          margin: 10px;
          color: ${mainFontColor};
          text-align: end;
        `}
      >
        Made by Alex Egorchatov, 2022
      </div>
    </div>
  );
}

export default App;
