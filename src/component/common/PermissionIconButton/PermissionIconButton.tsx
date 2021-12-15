import { IconButton, Tooltip } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { useContext } from 'react';
import AccessContext from '../../../contexts/AccessContext';

interface IPermissionIconButtonProps extends OverridableComponent<any> {
    permission: string;
    Icon?: React.ElementType;
    tooltip: string;
    onClick?: (e: any) => void;
    projectId?: string;
    environmentId?: string;
}

const PermissionIconButton: React.FC<IPermissionIconButtonProps> = ({
    permission,
    Icon,
    tooltip,
    onClick,
    projectId,
    children,
    environmentId,
    ...rest
}) => {
    const { hasAccess } = useContext(AccessContext);
    let access;
    if (projectId && environmentId) {
        access = hasAccess(permission, projectId, environmentId);
    } else if (projectId) {
        access = hasAccess(permission, projectId);
    } else {
        access = hasAccess(permission);
    }

    const tooltipText = access
        ? tooltip || ''
        : "You don't have access to perform this operation";

    return (
        <Tooltip title={tooltipText} arrow>
            <span>
                <IconButton onClick={onClick} disabled={!access} {...rest}>
                    {children}
                </IconButton>
            </span>
        </Tooltip>
    );
};

export default PermissionIconButton;
