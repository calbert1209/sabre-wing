import { PropsWithChildren } from "preact/compat";

type LayoutProps = {
  className: string;
};

function Layout({ className }: LayoutProps) {
  return function (props: PropsWithChildren<{}>) {
    return <div className={className}>{props.children}</div>;
  };
}

export const CenterRow = Layout({ className: "layout__center-row" });
export const CenterColumn = Layout({ className: "layout__center-col" });
