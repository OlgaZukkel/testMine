import {ComponentType, LazyExoticComponent, useCallback, useEffect, useMemo, useState} from 'react';
import {lazyWithPreload} from '@/utils/lazyWithPreload.js';
import {useLocation} from 'wouter';
import {createMonoHook} from 'use-mono-hook';


export type RouteApp = {
  path: string
  component: LazyExoticComponent<ComponentType<any>> & { preload?: any }
  loading?: boolean
  finished?: boolean
}

const routes = [
  {
    path: '/',
    component: lazyWithPreload(() => import('@/pages/welcome/index.js'))
  },
  {
    path: '*',
    component: lazyWithPreload(() => import('@/pages/404/index.js'))
  },

];

const _useRouterApp = () => {
  const [location, setLocation] = useLocation();
  const [router, setRouter] = useState<{
    location: string,
    setLocation?: <S = any>(to: string | URL, options?: { replace?: boolean; state?: S; }) => void,
    prevLocation: string,
    routes: RouteApp[]
  }>({
    location: undefined,
    prevLocation: undefined,
    routes
  });

  const route = useMemo(() => {
    return router.routes.reduce<typeof router.routes[number]>((_route, route) => {
      return ((
        route.path.length > 1
          ? router.location?.startsWith(route.path)
          : router.location === route.path
      ) && route.finished)
        ? route
        : (
          route.path === router.prevLocation && !_route
            ? route
            : _route
        );
    }, undefined);
  }, [router]);

  useEffect(() => {
    if(!router.location || router.location === router.prevLocation) {
      return;
    }
    setRouter((prev) => {
      return {
        ...prev,
        prevLocation: prev.location,
        routes: prev.routes.reduce((_prev, route) => {
          return (
            (
              route.path.length > 1
                ? router.location?.startsWith(route.path)
                : router.location === route.path
            ) && !('finished' in route)
          )
            ? [..._prev, {
              ...route,
              loading: true
            }]
            : [..._prev, route];
        }, [])
      };
    });
  }, [router.location]);

  useEffect(() => {
    if(!router.location) {
      return;
    }
    router.routes
    .filter(({loading, finished}) => loading && !finished)
    .map(async ({path, component}) => {
      await component.preload();
      setRouter((prev) => {
        return {
          ...prev,
          routes: prev.routes.reduce((routes, route) => {
            return path === route.path ? [
              ...routes, {
                ...route,
                loading: false,
                finished: true
              }
            ] : [...routes, route];
          }, [])
        };
      });
    });
  }, [router.routes]);

  useEffect(() => {
    if(router.location === location) {
      return;
    }
    setRouter(prev => ({...prev, location, setLocation}));
  }, [location]);

  const Component = useMemo(() => {
    return route?.component || router.routes.find(({path}) => path === '*' /*404 page*/)?.component;
  }, [route]);

  const preloadPage = useCallback(async (path: string) => {

    const page = router.routes.find((router) => router.path === path);

    if(!page || page.finished || page.loading) {
      return;
    }

    await page.component.preload();

    setRouter((prev) => {
      return {
        ...prev,
        routes: prev.routes.reduce((routes, route) => {
          return path === route.path ? [
            ...routes, {
              ...route,
              loading: false,
              finished: true
            }
          ] : [...routes, route];
        }, [])
      };
    });

  }, []);

  return {
    route,
    router: router,
    setRouter,
    preloadPage,
    Component
  };
};

export const useRouterApp = createMonoHook<typeof _useRouterApp>(_useRouterApp).useHook;
