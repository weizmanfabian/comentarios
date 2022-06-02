const Footer = ({ version }) => {
  return (
    <footer className="footer bg-dark">
      <div className="footer_conteiner container">

        <div className="text-center text-white">
          <p className="">{version}</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;