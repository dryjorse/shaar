import { FC, Fragment } from "react";
import logoIcon from "../../assets/images/icons/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../../constants/routes";

const Header: FC = () => {
  return (
    <header className="py-[16px] bg-green-bg text-white font-comfortaa">
      <nav className="container flex justify-between items-center">
        <div className="flex gap-[140px] items-center">
          <Link to="/">
            <img src={logoIcon} alt="logo" />
          </Link>
          <ul className="flex gap-[80px] items-center capitalize font-bold">
            {routes
              .filter((route) => route.label && !route.icon)
              .map(({ label, path }) => (
                <li key={path}>
                  <NavLink to={path}>{label}</NavLink>
                </li>
              ))}
          </ul>
        </div>
        <ul className="flex items-center capitalize font-bold">
          {routes
            .filter((route) => route.icon)
            .map(({ path, label, icon }, key) => (
              <Fragment key={path}>
                {!!key && (
                  <div className="mx-[14px] flex-[0_0_1px] self-stretch bg-white"></div>
                )}
                <li key={path} className="flex gap-[3px] items-center">
                  <img src={icon} alt="nav" className="w-[26px] h-[26px]" />
                  <Link to={path}>{label}</Link>
                </li>
              </Fragment>
            ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
