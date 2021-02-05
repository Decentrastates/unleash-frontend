import React from 'react';
import AddonForm from '../../component/addons/form-addon-container';
import PropTypes from 'prop-types';

const render = ({ match: { params }, history }) => (
    <AddonForm addonId={params.id} title="Edit addon" history={history} />
);

render.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default render;
