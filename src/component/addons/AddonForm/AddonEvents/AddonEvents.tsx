import React from 'react';
import { Grid, FormControlLabel, Checkbox } from '@mui/material';

import { styles as themeStyles } from 'component/common';
import { IAddonProvider } from 'interfaces/addons';

interface IAddonProps {
    provider?: IAddonProvider;
    checkedEvents: string[];
    setEventValue: (
        name: string
    ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export const AddonEvents = ({
    provider,
    checkedEvents,
    setEventValue,
    error,
}: IAddonProps) => {
    if (!provider) return null;

    return (
        <React.Fragment>
            <h4>Events</h4>
            <span className={themeStyles.error}>{error}</span>
            <Grid container spacing={0}>
                {provider.events.map(e => (
                    <Grid item xs={4} key={e}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkedEvents.includes(e)}
                                    onChange={setEventValue(e)}
                                />
                            }
                            label={e}
                        />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
};
