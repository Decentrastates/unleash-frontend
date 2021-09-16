import { IStrategy } from '../../../../../../../interfaces/strategy';
import { FEATURE_STRATEGIES_DRAG_TYPE } from '../../../FeatureStrategiesList/FeatureStrategyCard/FeatureStrategyCard';
import FeatureStrategyAccordion from './FeatureStrategyAccordion/FeatureStrategyAccordion';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { useContext, useEffect, useState } from 'react';
import { resolveDefaultParamValue } from '../../../../../strategy/AddStrategy/utils';
import { useParams } from 'react-router-dom';
import useStrategies from '../../../../../../../hooks/api/getters/useStrategies/useStrategies';
import { mutate } from 'swr';
import useFeature from '../../../../../../../hooks/api/getters/useFeature/useFeature';
import { useStyles } from './FeatureStrategiesEnvironmentList.styles';
import classnames from 'classnames';
import { GetApp } from '@material-ui/icons';
import FeatureStrategiesUIContext from '../../../../../../../contexts/FeatureStrategiesUIContext';

interface IFeatureStrategiesEnvironmentListProps {
    strategies: IStrategy[];
    env: string;
}

interface IFeatureDragItem {
    name: string;
}

const FeatureStrategiesEnvironmentList = ({
    strategies,
    env,
}: IFeatureStrategiesEnvironmentListProps) => {
    const styles = useStyles();
    const { strategies: selectableStrategies } = useStrategies();
    const { projectId, featureId } = useParams();
    const { setConfigureNewStrategy } = useContext(FeatureStrategiesUIContext);
    const { FEATURE_CACHE_KEY, feature } = useFeature(projectId, featureId);

    const addNewStrategy = async (strategy: IStrategy) => {
        // Consider a deepclone tool or write a utility function
        let envs = [...feature.environments];
        envs = envs.map(env => {
            const newEnv = { ...env };
            newEnv.strategies = [...newEnv.strategies];
            return newEnv;
        });

        const newFeature = {
            ...feature,
            environments: envs,
        };

        const environment = newFeature.environments.find(
            environment => environment.name === env
        );

        environment?.strategies.push(strategy);

        mutate(FEATURE_CACHE_KEY, { ...newFeature }, false);
    };

    const selectStrategy = (name: string) => {
        const selectedStrategy = selectableStrategies.find(
            strategy => strategy.name === name
        );

        selectedStrategy?.parameters.forEach(({ name }) => {
            selectedStrategy.parameters[name] = resolveDefaultParamValue(
                name,
                featureId
            );
        });

        return selectedStrategy;
    };

    const [{ isOver }, drop] = useDrop({
        accept: FEATURE_STRATEGIES_DRAG_TYPE,
        collect(monitor) {
            return {
                isOver: monitor.isOver(),
            };
        },
        drop(item: IFeatureDragItem, monitor: DropTargetMonitor) {
            //  const dragIndex = item.index;
            //  const hoverIndex = index;

            const strategy = selectStrategy(item.name);

            if (!strategy) return;
            addNewStrategy(strategy);
            setConfigureNewStrategy(true);
        },
    });

    const renderStrategies = () => {
        return strategies.map(strategy => {
            return <FeatureStrategyAccordion strategy={strategy} />;
        });
    };

    const classes = classnames(styles.container, {
        [styles.isOver]: isOver,
    });

    const dropboxClasses = classnames(styles.dropbox, {
        [styles.dropboxActive]: isOver,
    });

    const iconClasses = classnames(styles.dropIcon, {
        [styles.dropIconActive]: isOver,
    });

    return (
        <div className={classes} ref={drop}>
            {renderStrategies()}
            <div className={dropboxClasses}>
                <p>Drag and drop strategies from the left side menu</p>
                <GetApp className={iconClasses} />
            </div>
        </div>
    );
};

export default FeatureStrategiesEnvironmentList;
