import { LOCALE_ID } from '@angular/core';
import { Link } from 'react-router-dom';
import { useAngularInjector } from '../angular-lib/AngularInjector';

export default function ReactPageFooList() {
  // 展示了从 React 侧拿 Angular Service 的能力
  const localeId = useAngularInjector().get(LOCALE_ID);

  return (
    <>
      ReactPageFooList, localeId={localeId}
      <ul>
        <li>
          <Link to="1"> go to 1</Link>
        </li>
        <li>
          <Link to="2"> go to 2</Link>
        </li>
      </ul>
    </>
  );
}
