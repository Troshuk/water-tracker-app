import ContentLoader from 'react-content-loader';

export const Loader = props => {
  return (
    <ContentLoader
      speed={1}
      width="800"
      height={300}
      viewBox="0 0 400 160"
      backgroundColor="#333"
      foregroundColor="#555"
      {...props}
    >
      <rect x="20" y="8" rx="5" ry="5" width="60%" height="10" />
      <rect x="20" y="26" rx="5" ry="5" width="40%" height="10" />
      <rect x="0" y="56" rx="5" ry="5" width="100%" height="10" />
      <rect x="0" y="72" rx="5" ry="5" width="90%" height="10" />
      <rect x="0" y="88" rx="5" ry="5" width="60%" height="10" />
      <circle cx="20" cy="120" r="15" />
    </ContentLoader>
  );
};
