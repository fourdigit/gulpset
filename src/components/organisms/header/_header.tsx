import * as React from 'react';

interface HeaderProps {
  type: 'backspace' | 'enter';
}

class Header extends React.Component<HeaderProps, object> {
  public render() {
    return <header className='o-header'>header sample</header>;
  }
}

export default Header;

