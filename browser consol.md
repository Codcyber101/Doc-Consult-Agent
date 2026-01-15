forward-logs-shared.js:28 Download the React DevTools for a better development experience: https://react.dev/link/react-devtools
forward-logs-shared.js:28 [HMR] connected
intercept-console-error.js:52 A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <HotReload globalError={[...]} webSocket={WebSocket} staticIndicatorState={{pathname:null, ...}}>
      <AppDevOverlayErrorBoundary globalError={[...]}>
        <ReplaySsrOnlyErrors>
        <DevRootHTTPAccessFallbackBoundary>
          <HTTPAccessFallbackBoundary notFound={<NotAllowedRootHTTPFallbackError>}>
            <HTTPAccessFallbackErrorBoundary pathname="/" notFound={<NotAllowedRootHTTPFallbackError>} ...>
              <RedirectBoundary>
                <RedirectErrorBoundary router={{...}}>
                  <Head>
                  <__next_root_layout_boundary__>
                    <SegmentViewNode type="layout" pagePath="/src/layou...">
                      <SegmentTrieNode>
                      <link>
                      <RootLayout>
                        <html
                          lang="en"
-                         data-darkreader-mode="dynamic"
-                         data-darkreader-scheme="dark"
-                         data-darkreader-proxy-injected="true"
                        >
                          ...
                            <Home>
                              <main className="min-h-scre...">
                                ...
                                  <div className="flex justi...">
                                    <div className="flex items...">
                                      <div className="w-8 h-8 ro...">
                                        <ShieldCheck>
                                          <>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width={24}
                                              height={24}
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth={2}
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="lucide lucide-shield-check w-5 h-5 text-white"
                                              aria-hidden="true"
-                                             data-darkreader-inline-stroke=""
-                                             style={{--darkreader-inline-stroke:"currentColor"}}
                                            >
                                      ...
                                    ...
                                ...
                                  <div className="text-cente...">
                                    <span>
                                    <h1>
                                    <p>
                                    <div className="relative m...">
                                      <div className="absolute i...">
                                        <Search>
                                          <>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width={24}
                                              height={24}
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth={2}
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="lucide lucide-search h-5 w-5 text-slate-400"
                                              aria-hidden="true"
-                                             data-darkreader-inline-stroke=""
-                                             style={{--darkreader-inline-stroke:"currentColor"}}
                                            >
                                      ...
                                <div className="max-w-5xl ...">
                                  <div className="grid grid-...">
                                    <div className="lg
error @ intercept-console-error.js:52
Unable to add filesystem: <illegal path>
