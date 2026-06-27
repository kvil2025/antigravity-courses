/* ============================================
   Hash-based Router — Antigravity Courses
   ============================================ */

type RouteCallback = (params: Record<string, string>) => void;

interface Route {
  pattern: RegExp;
  paramNames: string[];
  handler: RouteCallback;
}

class Router {
  private routes: Route[] = [];
  private notFoundHandler: RouteCallback = () => {};

  on(path: string, handler: RouteCallback): this {
    // Convert path like '/course/:id' to regex
    const paramNames: string[] = [];
    const pattern = path.replace(/:(\w+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });
    this.routes.push({
      pattern: new RegExp(`^${pattern}$`),
      paramNames,
      handler,
    });
    return this;
  }

  notFound(handler: RouteCallback): this {
    this.notFoundHandler = handler;
    return this;
  }

  resolve(): void {
    const hash = window.location.hash.slice(1) || '/';

    for (const route of this.routes) {
      const match = hash.match(route.pattern);
      if (match) {
        const params: Record<string, string> = {};
        route.paramNames.forEach((name, i) => {
          params[name] = match[i + 1];
        });
        route.handler(params);
        return;
      }
    }

    this.notFoundHandler({});
  }

  start(): void {
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  }

  static navigate(path: string): void {
    window.location.hash = path;
  }
}

export default Router;
