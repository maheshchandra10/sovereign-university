export { trpc } from './trpc';

export const getDomain = () => {
  return window.location.hostname;
};

export const computeAssetCdnUrl = (commitHash: string, path: string) => {
  const baseUrl =
    process.env['NODE_ENVIRONMENT'] === 'production'
      ? `https://cdn.${process.env['DOMAIN']}`
      : 'http://localhost:8080';

  return `${baseUrl}/${commitHash}/${path}`;
};

export const compose = (...args: string[]) => args.join(' ');
