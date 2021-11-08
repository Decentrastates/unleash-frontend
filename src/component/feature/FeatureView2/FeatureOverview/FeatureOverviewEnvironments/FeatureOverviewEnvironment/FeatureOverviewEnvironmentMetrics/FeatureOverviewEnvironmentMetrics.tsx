import PieChart from '@material-ui/icons/PieChart';
import { IFeatureEnvironmentMetrics } from '../../../../../../../interfaces/featureToggle';
import { calculatePercentage } from '../../../../../../../utils/calculate-percentage';
import PercentageCircle from '../../../../../../common/PercentageCircle/PercentageCircle';
import { useStyles } from './FeatureOverviewEnvironmentMetrics.styles';

interface IFeatureOverviewEnvironmentMetrics {
    environmentMetric: IFeatureEnvironmentMetrics;
}

const FeatureOverviewEnvironmentMetrics = ({
    environmentMetric,
}: IFeatureOverviewEnvironmentMetrics) => {
    const styles = useStyles();

    const total = environmentMetric.yes + environmentMetric.no;
    const percentage = calculatePercentage(total, environmentMetric.yes);

    if (environmentMetric.yes === 0 && environmentMetric.no === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.info}>
                    <p className={styles.percentage}>{percentage}%</p>
                    <p className={styles.infoParagraph}>
                        No one has received this in the last hour.
                    </p>
                </div>
                <PieChart
                    className={styles.icon}
                    style={{ transform: 'scale(1.1)' }}
                    data-loading
                />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <p className={styles.percentage}>{percentage}%</p>
                <p className={styles.infoParagraph}>
                    {environmentMetric.yes} users have received the feature.
                </p>
            </div>
            <PercentageCircle percentage={percentage} data-loading />
        </div>
    );
};

export default FeatureOverviewEnvironmentMetrics;
