import { TextField, Tooltip, Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';

import { IParameter } from '../../../../../../interfaces/strategy';
import RolloutSlider from '../RolloutSlider/RolloutSlider';
import Select from '../../../../../common/select';
import React from 'react';
import Input from '../../../../../common/Input/Input';

const builtInStickinessOptions = [
    { key: 'default', label: 'default' },
    { key: 'userId', label: 'userId' },
    { key: 'sessionId', label: 'sessionId' },
    { key: 'random', label: 'random' },
];

interface IFlexibleStrategyProps {
    parameters: IParameter;
    updateParameter: (field: string, value: any) => void;
    context: any;
}

const FlexibleStrategy = ({
    updateParameter,
    parameters,
    context,
}: IFlexibleStrategyProps) => {
    const onUpdate =
        (field: string) => (e: React.ChangeEvent, newValue: number) => {
            updateParameter(field, newValue);
        };

    const updateRollout = (
        e: React.ChangeEvent<{}>,
        value: number | number[]
    ) => {
        updateParameter('rollout', value);
    };

    const resolveStickiness = () =>
        builtInStickinessOptions.concat(
            context
                .filter(c => c.stickiness)
                .filter(
                    c => !builtInStickinessOptions.find(s => s.key === c.name)
                )
                .map(c => ({ key: c.name, label: c.name }))
        );

    const stickinessOptions = resolveStickiness();

    const rollout = parameters.rollout;
    const stickiness = parameters.stickiness;
    const groupId = parameters.groupId;

    return (
        <div>
            <RolloutSlider
                name="Rollout"
                value={1 * rollout}
                onChange={updateRollout}
            />
            <br />
            <div>
                <Tooltip title="Stickiness defines what parameter should be used to ensure that your users get consistency in features. By default unleash will use the first value present in the context in the order of userId, sessionId and random.">
                    <Typography
                        variant="subtitle2"
                        style={{
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        Stickiness
                        <Info
                            style={{
                                fontSize: '1rem',
                                color: 'gray',
                                marginLeft: '0.2rem',
                            }}
                        />
                    </Typography>
                </Tooltip>
                <Select
                    name="stickiness"
                    label="Stickiness"
                    options={stickinessOptions}
                    value={stickiness}
                    onChange={e => onUpdate('stickiness')(e, e.target.value)}
                />
                &nbsp;
                <br />
                <br />
                <Tooltip title="GroupId is used to ensure that different toggles will hash differently for the same user. The groupId defaults to feature toggle name, but you can override it to correlate rollout of multiple feature toggles.">
                    <Typography
                        variant="subtitle2"
                        style={{
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        GroupId
                        <Info
                            style={{
                                fontSize: '1rem',
                                color: 'gray',
                                marginLeft: '0.2rem',
                            }}
                        />
                    </Typography>
                </Tooltip>
                <Input
                    label="groupId"
                    value={groupId || ''}
                    onChange={e => onUpdate('groupId')(e, e.target.value)}
                />
            </div>
        </div>
    );
};

export default FlexibleStrategy;
