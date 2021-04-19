import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialogue from '../../../component/common/Dialogue';
import UserForm from './AddUser/AddUserForm/AddUserForm';

function AddUser({ user = {}, showDialog, closeDialog, updateUser, roles }) {
    const [data, setData] = useState({});
    const [error, setError] = useState({});

    useEffect(() => {
        setData({
            id: user.id,
            email: user.email || '',
            rootRole: user.rootRole || '',
            name: user.name || '',
        });
    }, [user]);

    if (!user) {
        return null;
    }

    const submit = async e => {
        e.preventDefault();

        try {
            await updateUser(data);
            setData({});
            setError({});
            closeDialog();
        } catch (error) {
            setError({ general: 'Could not update user' });
        }
    };

    const onCancel = e => {
        e.preventDefault();
        setData({});
        setError({});
        closeDialog();
    };

    return (
        <Dialogue
            onClick={e => {
                submit(e);
            }}
            open={showDialog}
            onClose={onCancel}
            primaryButtonText="Update user"
            secondaryButtonText="Cancel"
            title="Update team member"
            fullWidth
        >
            <UserForm
                data={data}
                setData={setData}
                roles={roles}
                submit={submit}
                error={error}
            />
        </Dialogue>
    );
}

AddUser.propTypes = {
    showDialog: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    user: PropTypes.object,
    roles: PropTypes.array.isRequired,
};

export default AddUser;
