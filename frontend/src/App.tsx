/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { HomePage } from './Pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SortingPage } from './Pages/SortingPage';
import { StringMatchingPage } from './Pages/StringMatchingPage';
import { PathFindingPage } from './Pages/PathFindingPage';
import { NotFoundPage } from './Pages/NotFoundPage';

function App() {
  return (
    <div
      css={css`
        margin: 0px;
        background-color: #222222;
        min-height: 100vh;
      `}
    >
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="sort" element={<SortingPage />} />
          <Route path="search" element={<StringMatchingPage />} />
          <Route path="path_find" element={<PathFindingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <div
        css={css`
          margin: 10px;
          color: #f5c81a;
          text-align: end;
        `}
      >
        Made by Alex Egorchatov, Dec 1, 2022
      </div>
    </div>
  );
}

export default App;
