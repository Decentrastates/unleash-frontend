import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Badge,
    Tooltip,
} from '@material-ui/core';
import { ExpandMore, Add } from '@material-ui/icons';
import React from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import useFeature from '../../../../../../hooks/api/getters/useFeature/useFeature';
import useFeatureMetrics from '../../../../../../hooks/api/getters/useFeatureMetrics/useFeatureMetrics';
import { IFeatureEnvironment } from '../../../../../../interfaces/featureToggle';
import { IFeatureViewParams } from '../../../../../../interfaces/params';
import { getFeatureMetrics } from '../../../../../../utils/get-feature-metrics';
import { getFeatureStrategyIcon, getHumanReadableStrategyName } from '../../../../../../utils/strategy-names';
import ConditionallyRender from '../../../../../common/ConditionallyRender';
import DisabledIndicator from '../../../../../common/DisabledIndicator/DisabledIndicator';
import EnvironmentIcon from '../../../../../common/EnvironmentIcon/EnvironmentIcon';
import PermissionIconButton from '../../../../../common/PermissionIconButton/PermissionIconButton';
import StringTruncator from '../../../../../common/StringTruncator/StringTruncator';
import { UPDATE_FEATURE } from '../../../../../providers/AccessProvider/permissions';

import { useStyles } from './FeatureOverviewEnvironment.styles';
import FeatureOverviewEnvironmentBody from './FeatureOverviewEnvironmentBody/FeatureOverviewEnvironmentBody';
import FeatureOverviewEnvironmentFooter from './FeatureOverviewEnvironmentFooter/FeatureOverviewEnvironmentFooter';
import FeatureOverviewEnvironmentMetrics from './FeatureOverviewEnvironmentMetrics/FeatureOverviewEnvironmentMetrics';

interface IStrategyIconObject {
    count: number;
    Icon: React.ReactElement;
    name: string;
}
interface IFeatureOverviewEnvironmentProps {
    env: IFeatureEnvironment;
}

const FeatureOverviewEnvironment = ({
    env,
}: IFeatureOverviewEnvironmentProps) => {
    const styles = useStyles();
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const { metrics } = useFeatureMetrics(projectId, featureId);
    const { feature } = useFeature(projectId, featureId);
    const history = useHistory();

    const featureMetrics = getFeatureMetrics(feature?.environments, metrics);
    const environmentMetric = featureMetrics.find(
        featureMetric => featureMetric.environment === env.name
    );
    const featureEnvironment = feature?.environments.find(
        featureEnvironment => featureEnvironment.name === env.name
    );

    const getOverviewText = () => {
        if (env.enabled) {
            return `${environmentMetric?.yes} received this feature
                                because the following strategies are executing`;
        }
        return `This environment is disabled, which means that none of your strategies are executing`;
    };

    const strategiesLink = `/projects/${projectId}/features2/${featureId}/strategies?environment=${featureEnvironment?.name}&addStrategy=true`;

    const getStrategyIcons = () => {
        const strategyObjects = featureEnvironment?.strategies.reduce(
            (acc, current) => {
                if (acc[current.name]) {
                    acc[current.name].count = acc[current.name].count + 1;
                } else {
                    acc[current.name] = {
                        count: 1,
                        Icon: getFeatureStrategyIcon(current.name),
                    };
                }
                return acc;
            },
            {} as { [key: string]: IStrategyIconObject }
        );

        return Object.keys(strategyObjects).map(strategyName => {
            return { ...strategyObjects[strategyName], name: strategyName };
        });
    };

    return (
        <div className={styles.featureOverviewEnvironment}>
            <Accordion style={{ boxShadow: 'none' }}>
                <AccordionSummary
                    className={styles.accordionHeader}
                    expandIcon={<ExpandMore />}
                >
                    <div className={styles.header} data-loading>
                        <div className={styles.headerTitle}>
                            <EnvironmentIcon
                                enabled={env.enabled}
                                className={styles.headerIcon}
                            />
                            Feature toggle execution for&nbsp;
                            <StringTruncator
                                text={env.name}
                                className={styles.truncator}
                                maxWidth="100"
                            />
                        </div>
                        <ConditionallyRender
                            condition={
                                featureEnvironment?.strategies.length !== 0
                            }
                            show={
                                <div
                                    className={styles.stratigiesIconsContainer}
                                >
                                    {getStrategyIcons()?.map(
                                        ({ name, Icon, count }) => (
                                            <Badge
                                                key={name}
                                                badgeContent={count}
                                                color="secondary"
                                                overlap="circular"
                                                classes={{
                                                    colorSecondary: [
                                                        styles.badgeColor,
                                                    ],
                                                }}
                                            >
                                                <Tooltip title={getHumanReadableStrategyName(name)} arrow>
                                                    <div
                                                    className={
                                                        styles.strategyIconContainer
                                                    }
                                                >
                                                    <Icon
                                                        className={
                                                            styles.strategyIcon
                                                        }
                                                    />
                                                </div>
                                                </Tooltip>
                                                
                                            </Badge>
                                        )
                                    )}
                                    <PermissionIconButton
                                        onClick={() =>
                                            history.push(strategiesLink)
                                        }
                                        tooltip="Add strategy"
                                        permission={UPDATE_FEATURE}
                                        projectId={projectId}
                                    >
                                        <Add />
                                    </PermissionIconButton>
                                </div>
                            }
                            elseShow={
                                <div
                                    className={styles.noStratigiesInfoContainer}
                                >
                                    <p className={styles.strategiesText}>
                                        No strategies defined on this toggle
                                    </p>
                                </div>
                            }
                        />
                        <ConditionallyRender
                            condition={!env.enabled}
                            show={
                                <DisabledIndicator
                                    className={styles.disabledIndicatorPos}
                                />
                            }
                        />
                    </div>

                    <FeatureOverviewEnvironmentMetrics
                        environmentMetric={environmentMetric}
                    />
                </AccordionSummary>

                <AccordionDetails>
                    <div className={styles.accordionContainer}>
                        <FeatureOverviewEnvironmentBody
                            featureEnvironment={featureEnvironment}
                            getOverviewText={getOverviewText}
                        />
                        <FeatureOverviewEnvironmentFooter
                            env={env}
                            environmentMetric={environmentMetric}
                        />
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FeatureOverviewEnvironment;
