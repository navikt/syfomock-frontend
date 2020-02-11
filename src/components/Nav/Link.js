import React from 'react';
import {NavLink} from 'react-router-dom';

const Link = ({active = true, id, to, children}) => {
    const onClick = (event) => {
        (event.target).blur();
    };

    return active && to ? (
        <NavLink id={id} to={to} tabIndex={0} onClick={onClick}>
            {children}
        </NavLink>
    ) : (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a className="inactive">{children}</a>
    );
};

export default Link;
