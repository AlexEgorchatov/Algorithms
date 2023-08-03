/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { HomePage } from './Pages/HomePage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { SortingPage } from './Pages/SortingPage';
import { StringMatchingPage } from './Pages/StringMatchingPage';
import { PathFindingPage } from './Pages/PathFindingPage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { Provider } from 'react-redux';
import { createStore } from './Store/Store';
import { Header } from './Components/Header';
import { mainBackground, mainFontColor, pageBackground } from './Resources/Colors';
import { modules } from './Resources/Home Page Resources/ModuleData';

export const store = createStore();
export const minAppWidth: number = 580;

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div
          css={css`
            height: 100%;
            width: 100%;
            margin: 0px;
            background-color: ${mainBackground};
            min-width: ${minAppWidth}px;
          `}
        >
          <Header data={modules} />
          <div
            css={css`
              background-color: ${pageBackground};
              height: 90%;
              width: 100%;
            `}
          >
            <Routes>
              <Route path="" element={<HomePage />} />
              <Route path="sort" element={<SortingPage />} />
              <Route path="search" element={<StringMatchingPage />} />
              <Route path="pathfinding" element={<PathFindingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <div
            css={css`
              margin: 0px 10px;
              color: ${mainFontColor};
              text-align: end;
            `}
          >
            Made by Alex Egorchatov, 2022
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
