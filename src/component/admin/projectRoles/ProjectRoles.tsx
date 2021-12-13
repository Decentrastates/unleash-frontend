import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useContext } from 'react';
import AccessContext from '../../../contexts/AccessContext';
import ConditionallyRender from '../../common/ConditionallyRender';
import HeaderTitle from '../../common/HeaderTitle';
import PageContent from '../../common/PageContent';
import { ADMIN } from '../../providers/AccessProvider/permissions';
import AdminMenu from '../admin-menu';
import { useStyles } from './ProjectRoles.styles';
import RolesList from './RolesList';

function ProjectRoles({ history }) {
    const { hasAccess } = useContext(AccessContext);
    const styles = useStyles();

    return (
        <div>
            <AdminMenu history={history} />
            <PageContent
                bodyClass={styles.rolesListBody}
                headerContent={
                    <HeaderTitle
                        title="Project Roles"
                        actions={
                            <ConditionallyRender
                                condition={hasAccess(ADMIN)}
                                show={
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => console.log('hi')}
                                    >
                                        New Project role
                                    </Button>
                                }
                                elseShow={
                                    <small>
                                        PS! Only admins can add/remove roles.
                                    </small>
                                }
                            />
                        }
                    />
                }
            >
                <ConditionallyRender
                    condition={hasAccess(ADMIN)}
                    show={<RolesList location={location} />}
                    elseShow={
                        <Alert severity="error">
                            You need instance admin to access this section.
                        </Alert>
                    }
                />
            </PageContent>
        </div>
    );
}

export default ProjectRoles;
