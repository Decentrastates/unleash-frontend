import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, ProgressBar, Button, Card, CardTitle, CardActions, Switch } from 'react-mdl';
import { Link } from 'react-router-dom';

import HistoryComponent from '../history/history-list-toggle-container';
import MetricComponent from './metric-container';
import EditFeatureToggle from './form/form-update-feature-container';
import EditVariants from './variant/update-variant-container';
import ViewFeatureToggle from './form/form-view-feature-container';
import UpdateDescriptionComponent from './form/update-description-component';
import { styles as commonStyles } from '../common';
import { CREATE_FEATURE, DELETE_FEATURE, UPDATE_FEATURE } from '../../permissions';

const TABS = {
    strategies: 0,
    view: 1,
    variants: 2,
    history: 3,
};

export default class ViewFeatureToggleComponent extends React.Component {
    isFeatureView;
    constructor(props) {
        super(props);
        this.isFeatureView = !!props.fetchFeatureToggles;
    }

    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        featureToggleName: PropTypes.string.isRequired,
        features: PropTypes.array.isRequired,
        toggleFeature: PropTypes.func,
        removeFeatureToggle: PropTypes.func,
        revive: PropTypes.func,
        fetchArchive: PropTypes.func,
        fetchFeatureToggles: PropTypes.func,
        editFeatureToggle: PropTypes.func,
        featureToggle: PropTypes.object,
        history: PropTypes.object.isRequired,
        hasPermission: PropTypes.func.isRequired,
    };

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
        if (this.props.features.length === 0) {
            if (this.isFeatureView) {
                this.props.fetchFeatureToggles();
            } else {
                this.props.fetchArchive();
            }
        }
    }

    getTabContent(activeTab) {
        const { features, featureToggle, featureToggleName, hasPermission } = this.props;

        if (TABS[activeTab] === TABS.history) {
            return <HistoryComponent toggleName={featureToggleName} />;
        } else if (TABS[activeTab] === TABS.strategies) {
            if (this.isFeatureView && hasPermission(UPDATE_FEATURE)) {
                return (
                    <EditFeatureToggle featureToggle={featureToggle} features={features} history={this.props.history} />
                );
            }
            return <ViewFeatureToggle featureToggle={featureToggle} />;
        } else if (TABS[activeTab] === TABS.variants) {
            return (
                <EditVariants
                    featureToggle={featureToggle}
                    features={features}
                    history={this.props.history}
                    hasPermission={this.props.hasPermission}
                />
            );
        } else {
            return <MetricComponent featureToggle={featureToggle} />;
        }
    }

    goToTab(tabName, featureToggleName) {
        let view = this.props.fetchFeatureToggles ? 'features' : 'archive';
        this.props.history.push(`/${view}/${tabName}/${featureToggleName}`);
    }

    render() {
        const {
            featureToggle,
            features,
            activeTab,
            revive,
            // setValue,
            featureToggleName,
            toggleFeature,
            removeFeatureToggle,
            hasPermission,
        } = this.props;

        if (!featureToggle) {
            if (features.length === 0) {
                return <ProgressBar indeterminate />;
            }
            return (
                <span>
                    Could not find the toggle{' '}
                    {hasPermission(CREATE_FEATURE) ? (
                        <Link
                            to={{
                                pathname: '/features/create',
                                query: { name: featureToggleName },
                            }}
                        >
                            {featureToggleName}
                        </Link>
                    ) : (
                        featureToggleName
                    )}
                </span>
            );
        }

        const activeTabId = TABS[this.props.activeTab] ? TABS[this.props.activeTab] : TABS.strategies;
        const tabContent = this.getTabContent(activeTab);

        const removeToggle = () => {
            if (
                // eslint-disable-next-line no-alert
                window.confirm('Are you sure you want to remove this toggle?')
            ) {
                removeFeatureToggle(featureToggle.name);
                this.props.history.push('/features');
            }
        };
        const reviveToggle = () => {
            revive(featureToggle.name);
            this.props.history.push('/features');
        };
        const updateDescription = description => {
            let feature = { ...featureToggle, description };
            if (Array.isArray(feature.strategies)) {
                feature.strategies.forEach(s => {
                    delete s.id;
                });
            }

            this.props.editFeatureToggle(feature);
        };

        return (
            <Card shadow={0} className={commonStyles.fullwidth} style={{ overflow: 'visible' }}>
                <CardTitle style={{ wordBreak: 'break-all', paddingBottom: 0 }}>{featureToggle.name} </CardTitle>
                <UpdateDescriptionComponent
                    isFeatureView={this.isFeatureView}
                    description={featureToggle.description}
                    update={updateDescription}
                    hasPermission={hasPermission}
                />

                <CardActions
                    border
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <span style={{ paddingRight: '24px' }}>
                        {hasPermission(UPDATE_FEATURE) ? (
                            <Switch
                                disabled={!this.isFeatureView}
                                ripple
                                checked={featureToggle.enabled}
                                onChange={() => toggleFeature(!featureToggle.enabled, featureToggle.name)}
                            >
                                {featureToggle.enabled ? 'Enabled' : 'Disabled'}
                            </Switch>
                        ) : (
                            <Switch disabled ripple checked={featureToggle.enabled}>
                                {featureToggle.enabled ? 'Enabled' : 'Disabled'}
                            </Switch>
                        )}
                    </span>

                    {this.isFeatureView ? (
                        <div>
                            <Link
                                to={`/features/copy/${featureToggle.name}`}
                                title="Create new feature toggle by cloning configuration"
                            >
                                <Button style={{ flexShrink: 0 }}>Clone</Button>
                            </Link>
                            <Button
                                disabled={!hasPermission(DELETE_FEATURE)}
                                onClick={removeToggle}
                                title="Archive feature toggle"
                                accent
                                style={{ flexShrink: 0 }}
                            >
                                Archive
                            </Button>
                        </div>
                    ) : (
                        <Button
                            disabled={!hasPermission(UPDATE_FEATURE)}
                            onClick={reviveToggle}
                            style={{ flexShrink: 0 }}
                        >
                            Revive
                        </Button>
                    )}
                </CardActions>
                <hr />
                <Tabs
                    activeTab={activeTabId}
                    ripple
                    tabBarProps={{ style: { width: '100%' } }}
                    className="mdl-color--grey-100"
                >
                    <Tab onClick={() => this.goToTab('strategies', featureToggleName)}>Strategies</Tab>
                    <Tab onClick={() => this.goToTab('view', featureToggleName)}>Metrics</Tab>
                    <Tab onClick={() => this.goToTab('variants', featureToggleName)}>Variants</Tab>
                    <Tab onClick={() => this.goToTab('history', featureToggleName)}>History</Tab>
                </Tabs>
                {tabContent}
            </Card>
        );
    }
}
