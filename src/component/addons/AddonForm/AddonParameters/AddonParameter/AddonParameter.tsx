import { TextField } from '@mui/material';
import { IAddonConfig, IAddonProviderParams } from 'interfaces/addons';
import { ChangeEventHandler } from 'react';

const resolveType = ({ type = 'text', sensitive = false }, value: string) => {
    if (sensitive && value === MASKED_VALUE) {
        return 'text';
    }
    if (type === 'textfield') {
        return 'text';
    }
    return type;
};

const MASKED_VALUE = '*****';

export interface IAddonParameterProps {
    parametersErrors: Record<string, string>;
    definition: IAddonProviderParams;
    setParameterValue: (param: string) => ChangeEventHandler<HTMLInputElement>;
    config: IAddonConfig;
}

export const AddonParameter = ({
    definition,
    config,
    parametersErrors,
    setParameterValue,
}: IAddonParameterProps) => {
    const value = config.parameters[definition.name] || '';
    const type = resolveType(definition, value);
    const error = parametersErrors[definition.name];

    return (
        <div style={{ width: '80%', marginTop: '25px' }}>
            <TextField
                size="small"
                style={{ width: '100%' }}
                minRows={definition.type === 'textfield' ? 9 : 0}
                multiline={definition.type === 'textfield'}
                type={type}
                label={definition.displayName}
                name={definition.name}
                placeholder={definition.placeholder || ''}
                InputLabelProps={{
                    shrink: true,
                }}
                value={value}
                error={Boolean(error)}
                onChange={setParameterValue(definition.name)}
                variant="outlined"
                helperText={definition.description}
            />
        </div>
    );
};
