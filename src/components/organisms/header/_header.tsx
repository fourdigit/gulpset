import * as React from 'react';

interface HeaderProps {
  dummyprop1?: string;
  dummyprop2?: number;
  dummyprop3?: Date;
}

export class Header extends React.Component<HeaderProps, {}> {
  render() {
    return <header className="o-header">{this.props.children}</header>;
  }
}

export default Header;
