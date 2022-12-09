import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export interface IWithRouterProps<T extends Record<string, string> = Record<string, string>> {
  location: ReturnType<typeof useLocation>;
  params: T;
  navigate: ReturnType<typeof useNavigate>;
}

const withRouter = <Props extends IWithRouterProps>(
  Component: React.ComponentClass<Props>
) => {
  return (props: Omit<Props, keyof IWithRouterProps>) => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    return (
      <Component
        {...(props as Props)}
        location={location}
        params={params}
        navigate={navigate}
      />
    );
  };
};

export default withRouter;
