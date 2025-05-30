/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignUpImport } from './routes/sign-up'
import { Route as SignInImport } from './routes/sign-in'
import { Route as PricingImport } from './routes/pricing'
import { Route as FeaturesImport } from './routes/features'
import { Route as ContactImport } from './routes/contact'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const SignUpRoute = SignUpImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => rootRoute,
} as any)

const SignInRoute = SignInImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const PricingRoute = PricingImport.update({
  id: '/pricing',
  path: '/pricing',
  getParentRoute: () => rootRoute,
} as any)

const FeaturesRoute = FeaturesImport.update({
  id: '/features',
  path: '/features',
  getParentRoute: () => rootRoute,
} as any)

const ContactRoute = ContactImport.update({
  id: '/contact',
  path: '/contact',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/contact': {
      id: '/contact'
      path: '/contact'
      fullPath: '/contact'
      preLoaderRoute: typeof ContactImport
      parentRoute: typeof rootRoute
    }
    '/features': {
      id: '/features'
      path: '/features'
      fullPath: '/features'
      preLoaderRoute: typeof FeaturesImport
      parentRoute: typeof rootRoute
    }
    '/pricing': {
      id: '/pricing'
      path: '/pricing'
      fullPath: '/pricing'
      preLoaderRoute: typeof PricingImport
      parentRoute: typeof rootRoute
    }
    '/sign-in': {
      id: '/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInImport
      parentRoute: typeof rootRoute
    }
    '/sign-up': {
      id: '/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof SignUpImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/contact': typeof ContactRoute
  '/features': typeof FeaturesRoute
  '/pricing': typeof PricingRoute
  '/sign-in': typeof SignInRoute
  '/sign-up': typeof SignUpRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/contact': typeof ContactRoute
  '/features': typeof FeaturesRoute
  '/pricing': typeof PricingRoute
  '/sign-in': typeof SignInRoute
  '/sign-up': typeof SignUpRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/contact': typeof ContactRoute
  '/features': typeof FeaturesRoute
  '/pricing': typeof PricingRoute
  '/sign-in': typeof SignInRoute
  '/sign-up': typeof SignUpRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/contact'
    | '/features'
    | '/pricing'
    | '/sign-in'
    | '/sign-up'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/contact'
    | '/features'
    | '/pricing'
    | '/sign-in'
    | '/sign-up'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/contact'
    | '/features'
    | '/pricing'
    | '/sign-in'
    | '/sign-up'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  ContactRoute: typeof ContactRoute
  FeaturesRoute: typeof FeaturesRoute
  PricingRoute: typeof PricingRoute
  SignInRoute: typeof SignInRoute
  SignUpRoute: typeof SignUpRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  ContactRoute: ContactRoute,
  FeaturesRoute: FeaturesRoute,
  PricingRoute: PricingRoute,
  SignInRoute: SignInRoute,
  SignUpRoute: SignUpRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/contact",
        "/features",
        "/pricing",
        "/sign-in",
        "/sign-up"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/contact": {
      "filePath": "contact.tsx"
    },
    "/features": {
      "filePath": "features.tsx"
    },
    "/pricing": {
      "filePath": "pricing.tsx"
    },
    "/sign-in": {
      "filePath": "sign-in.tsx"
    },
    "/sign-up": {
      "filePath": "sign-up.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
