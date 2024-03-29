export default function Page() {
  return null;
}

Custom500.getInitialProps = ({ res }) => {
  if (res) {
    res.writeHead(302, { Location: '/' });
    res.end();
  }
  return {};
};
