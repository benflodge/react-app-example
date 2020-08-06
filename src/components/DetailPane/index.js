/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

export default function DetailPane(props) {
    const { title } = props;

    return (
        <div
            className="panel"
            css={css`
                margin: 0;
                min-height: 430px;
                position: relative;
                height: 100%;
            `}
        >
            {title && (
                <div className="panel-heading">
                    <h3 className="main-heading">{title}</h3>
                </div>
            )}
            <div className="panel-body">Example Panel</div>
        </div>
    );
}

DetailPane.propTypes = {
    title: PropTypes.string
};

DetailPane.defaultProps = {
    title: 'Example Details'
};
