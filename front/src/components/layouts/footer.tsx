import "../../css/footer.css";

export const Footer = () => {
  return (
    <footer className="footer text-white p-9 text-center">
      <p className="text-sm">@{new Date().getFullYear()} | Todos los derechos reservados</p>
    </footer>
  );
};