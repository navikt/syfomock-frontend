import React from 'react';
import Link from './Link';
import {Sider} from '../../sider'
import { Normaltekst } from 'nav-frontend-typografi';
import './Nav.less';

const Nav = ({ active }) => {
    return (
        <nav className={`Nav ${active ? '' : 'inactive'}`}>
        {Object.keys(Sider).map(side => (
            <Link id={side} to={Sider[side].path} active={window.location.pathname !== Sider[side].path}><Normaltekst>{Sider[side].tittel}</Normaltekst></Link>
        ))}
        </nav>
    );
};

export default Nav;
