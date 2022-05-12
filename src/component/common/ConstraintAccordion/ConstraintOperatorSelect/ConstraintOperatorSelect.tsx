import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import {
    dateOperators,
    inOperators,
    numOperators,
    semVerOperators,
    stringOperators,
} from 'constants/operators';
import React, { useState } from 'react';
import { formatOperatorDescription } from 'component/common/ConstraintAccordion/ConstraintOperator/formatOperatorDescription';
import { useStyles } from 'component/common/ConstraintAccordion/ConstraintOperatorSelect/ConstraintOperatorSelect.styles';
import classNames from 'classnames';
import { ConstraintSchemaOperatorEnum } from '../../../../openapi';

interface IConstraintOperatorSelectProps {
    options: ConstraintSchemaOperatorEnum[];
    value: ConstraintSchemaOperatorEnum;
    onChange: (value: ConstraintSchemaOperatorEnum) => void;
}

export const ConstraintOperatorSelect = ({
    options,
    value,
    onChange,
}: IConstraintOperatorSelectProps) => {
    const { classes: styles } = useStyles();
    const [open, setOpen] = useState(false);

    const onSelectChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as ConstraintSchemaOperatorEnum);
    };

    const renderValue = () => {
        return (
            <div className={styles.valueContainer}>
                <div className={styles.label}>{value}</div>
                <div className={styles.description}>
                    {formatOperatorDescription(value)}
                </div>
            </div>
        );
    };

    return (
        <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel htmlFor="operator-select">Operator</InputLabel>
            <Select
                id="operator-select"
                name="operator"
                label="Operator"
                value={value}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                onChange={onSelectChange}
                renderValue={renderValue}
            >
                {options.map(operator => (
                    <MenuItem
                        key={operator}
                        value={operator}
                        className={classNames(
                            needSeparatorAbove(options, operator) &&
                                styles.separator
                        )}
                    >
                        <div className={styles.optionContainer}>
                            <div className={styles.label}>{operator}</div>
                            <div className={styles.description}>
                                {formatOperatorDescription(operator)}
                            </div>
                        </div>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

const needSeparatorAbove = (
    options: ConstraintSchemaOperatorEnum[],
    option: ConstraintSchemaOperatorEnum
): boolean => {
    if (option === options[0]) {
        return false;
    }

    return operatorGroups.some(group => {
        return group[0] === option;
    });
};

const operatorGroups = [
    inOperators,
    stringOperators,
    numOperators,
    dateOperators,
    semVerOperators,
];
