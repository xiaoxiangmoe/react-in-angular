import { ConfigProvider } from 'antd';
import { Route, Navigate, Routes } from 'react-router-dom';
import { AngularRouter2ReactRouter } from '../angular-lib/AngularRouter2ReactRouter';
import ReactPageFooDetail from '../pages/ReactPageFooDetail';
import ReactPageFooList from '../pages/ReactPageFooList';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Button, Result } from 'antd';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Result
      status="500"
      title="出现错误"
      subTitle={
        <>
          Uncaught {error.name}: {error.message}
        </>
      }
      extra={<Button onClick={resetErrorBoundary}>Try again</Button>}
    />
  );
}

export function RoutesRootComponent() {
  const routes = (
    <Routes>
      <Route path="/react-page-in-angular">
        <Route path="/" element={<Navigate to="foo" />} />
        <Route path="/foo">
          <Route path="/" element={<ReactPageFooList />} />
          <Route path="/:id" element={<ReactPageFooDetail />} />
        </Route>
      </Route>
    </Routes>
  );

  return (
    <ConfigProvider prefixCls="antd">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        <AngularRouter2ReactRouter>{routes}</AngularRouter2ReactRouter>
      </ErrorBoundary>
    </ConfigProvider>
  );
}
