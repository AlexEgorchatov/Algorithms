/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mainBackground, mainFontColor, pageBackground } from './Resources/Colors';
import { Header } from './Components/Shared Components/Header';
import { modules } from './Core/Data/ModuleData';
import { store } from './Redux/Store';
import { HomePage } from './Pages/HomePage';
import { SortingPage } from './Pages/SortingPage';
import { StringMatchingPage } from './Pages/StringMatchingPage';
import { PathFindingPage } from './Pages/PathFindingPage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { AboutModal } from './Components/Modals/AboutModal';
import { headerFooterHeight, minAppWidth } from './Resources/Constants';
import packageInfo from '../package.json';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
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
          <AboutModal />
          <div
            css={css`
              background-color: ${pageBackground};
              height: calc(100% - ${headerFooterHeight}px);
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
              height: 25px;
              color: ${mainFontColor};
              text-align: end;
            `}
          >
            v{packageInfo.version}
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
