export default function Custom500() {
  return null;
}

Custom500.getInitialProps = ({ res }) => {
  if (res) {
    res.writeHead(302, { Location: '/' });
    res.end();
  }
  return {};
};
