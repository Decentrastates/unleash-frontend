import { Link, useParams, useHistory } from 'react-router-dom';
import { IFeatureViewParams } from '../../../../../../../interfaces/params';
import ConditionallyRender from '../../../../../../common/ConditionallyRender';
import NoItemsStrategies from '../../../../../../common/NoItems/NoItemsStrategies/NoItemsStrategies';
import FeatureOverviewEnvironmentStrategies from '../FeatureOverviewEnvironmentStrategies/FeatureOverviewEnvironmentStrategies';

import { useStyles } from '../FeatureOverviewEnvironment.styles';
import { IFeatureEnvironment } from '../../../../../../../interfaces/featureToggle';

interface IFeatureOverviewEnvironmentBodyProps {
    getOverviewText: () => string;
    featureEnvironment: IFeatureEnvironment;
}

const FeatureOverviewEnvironmentBody = ({
    featureEnvironment,
    getOverviewText,
}: IFeatureOverviewEnvironmentBodyProps) => {
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const styles = useStyles();
    const history = useHistory();
    const strategiesLink = `/projects/${projectId}/features2/${featureId}/strategies?environment=${featureEnvironment?.name}`;

    return (
        <div className={styles.accordionBody}>
            <div className={styles.accordionBodyInnerContainer}>
                <div className={styles.resultInfo}>{getOverviewText()}</div>

                <ConditionallyRender
                    condition={featureEnvironment?.strategies.length > 0}
                    show={
                        <>
                            <div className={styles.linkContainer}>
                                {' '}
                                <Link to={strategiesLink}>Edit strategies</Link>
                            </div>
                            <FeatureOverviewEnvironmentStrategies
                                strategies={featureEnvironment?.strategies}
                                environmentName={featureEnvironment.name}
                            />
                        </>
                    }
                    elseShow={
                        <NoItemsStrategies
                            envName={featureEnvironment.name}
                            onClick={() => history.push(strategiesLink)}
                            projectId={projectId}
                        />
                    }
                />
            </div>
        </div>
    );
};

export default FeatureOverviewEnvironmentBody;
