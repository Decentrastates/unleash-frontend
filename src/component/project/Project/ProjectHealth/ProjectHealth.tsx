import { useHealthReport } from 'hooks/api/getters/useHealthReport/useHealthReport';
import ApiError from 'component/common/ApiError/ApiError';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { usePageTitle } from 'hooks/usePageTitle';
import { ReportCard } from './ReportTable/ReportCard/ReportCard';
import { ReportTable } from './ReportTable/ReportTable';

interface IProjectHealthProps {
    projectId: string;
    projectName: string;
}

const ProjectHealth = ({ projectId, projectName }: IProjectHealthProps) => {
    usePageTitle(`Project health – ${projectName}`);

    const { healthReport, refetchHealthReport, error } = useHealthReport(
        projectId,
        { refreshInterval: 15 * 1000 }
    );

    if (!healthReport) {
        return null;
    }

    return (
        <div>
            <ConditionallyRender
                condition={Boolean(error)}
                show={
                    <ApiError
                        data-loading
                        style={{ maxWidth: '500px', marginTop: '1rem' }}
                        onClick={refetchHealthReport}
                        text={`Could not fetch health rating for ${projectId}`}
                    />
                }
            />
            <ReportCard healthReport={healthReport} />
            <ReportTable
                projectId={projectId}
                features={healthReport.features}
            />
        </div>
    );
};

export default ProjectHealth;
