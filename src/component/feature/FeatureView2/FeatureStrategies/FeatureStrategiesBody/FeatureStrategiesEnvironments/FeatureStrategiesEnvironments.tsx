import { useParams } from 'react-router-dom';
import useFeature from '../../../../../../hooks/api/getters/useFeature/useFeature';
import { useStyles } from './FeatureStrategiesEnvironments.styles';
import { Tabs, Tab } from '@material-ui/core';
import TabPanel from '../../../../../common/TabNav/TabPanel';
import useTabs from '../../../../../../hooks/useTabs';
import FeatureStrategiesEnvironmentList from './FeatureStrategiesEnvironmentList/FeatureStrategiesEnvironmentList';
import { useContext, useEffect } from 'react';
import FeatureStrategiesUIContext from '../../../../../../contexts/FeatureStrategiesUIContext';

const FeatureStrategiesEnvironments = () => {
    const startingTabId = 1;
    const { projectId, featureId } = useParams();
    const styles = useStyles();
    const { a11yProps, activeTab, setActiveTab } = useTabs(startingTabId);
    const { setActiveEnvironment } = useContext(FeatureStrategiesUIContext);
    const { feature } = useFeature(projectId, featureId, false);

    useEffect(() => {
        setActiveEnvironment(feature?.environments[activeTab]);
    }, [feature]);

    const renderTabs = () => {
        return feature?.environments?.map((env, index) => {
            return (
                <Tab
                    key={`${env.name}_${index}`}
                    label={env.name}
                    {...a11yProps(index)}
                    onClick={() => setActiveTab(index)}
                    className={styles.tabButton}
                />
            );
        });
    };

    const renderTabPanels = () => {
        return feature.environments?.map((env, index) => {
            return (
                <TabPanel
                    key={`tab_panel_${index}`}
                    value={activeTab}
                    index={index}
                >
                    <FeatureStrategiesEnvironmentList
                        strategies={env.strategies}
                        env={env.name}
                    />
                </TabPanel>
            );
        });
    };

    return (
        <div>
            <div className={styles.tabContainer}>
                <Tabs
                    value={activeTab}
                    onChange={(_, tabId) => {
                        setActiveTab(tabId);
                        setActiveEnvironment(feature?.environments[tabId]);
                    }}
                    indicatorColor="primary"
                    textColor="primary"
                    className={styles.tabNavigation}
                >
                    {renderTabs()}
                </Tabs>
            </div>

            <div className={styles.bodyContent}>{renderTabPanels()}</div>
        </div>
    );
};

export default FeatureStrategiesEnvironments;
